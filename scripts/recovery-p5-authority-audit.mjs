import fs from 'node:fs';
import path from 'node:path';
import { RECOVERY_V3_CORE_HUBS, RECOVERY_V3_WINNERS, getRecoveryWinnersForCluster } from '../src/config/seo/recovery-v3.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { getInternalLinks } from '../src/lib/seo/internal-links.ts';

const root = process.cwd();
const equityPath = path.join(root, 'reports', 'seo', 'p0-url-equity-decisions.csv');
const equityCsv = fs.readFileSync(equityPath, 'utf8');

const failures = [];
const warnings = [];
const allowedClusters = new Set(['notebook', 'pc', 'iphone', 'camera', 'ipad', 'macbook']);
const prohibitedTerms = ['เหล้า', 'จำนำ', 'ตู้แช่', 'ทีวี'];

for (const winner of RECOVERY_V3_WINNERS) {
  const seo = resolveSeo(winner.path);

  if (!allowedClusters.has(winner.cluster)) {
    failures.push(`${winner.path}: unsupported recovery cluster ${winner.cluster}`);
  }
  if (prohibitedTerms.some((term) => winner.path.includes(term))) {
    failures.push(`${winner.path}: off-topic URL cannot enter Recovery V3 winner network`);
  }
  if (!equityCsv.includes(`${winner.path},`)) {
    failures.push(`${winner.path}: missing from P0 GSC equity evidence`);
  }
  if (winner.historicalClicks90d < 7) {
    failures.push(`${winner.path}: insufficient historical click evidence (${winner.historicalClicks90d})`);
  }
  if (seo.state !== 'INDEX') failures.push(`${winner.path}: state=${seo.state}, expected INDEX`);
  if (!seo.indexable) failures.push(`${winner.path}: not indexable`);
  if (seo.httpStatus !== 200) failures.push(`${winner.path}: httpStatus=${seo.httpStatus}, expected 200`);
  if (!seo.canonicalIsSelf || seo.canonical !== seo.normalizedPath) {
    failures.push(`${winner.path}: canonical=${seo.canonical}, expected self canonical`);
  }
  if (!seo.sitemapEligible) failures.push(`${winner.path}: missing sitemap eligibility`);
}

for (const [cluster, hubPath] of Object.entries(RECOVERY_V3_CORE_HUBS)) {
  const hubSeo = resolveSeo(hubPath);
  if (hubSeo.state !== 'INDEX' || !hubSeo.indexable) {
    failures.push(`${hubPath}: recovery core hub is not INDEX`);
    continue;
  }

  const expectedWinners = getRecoveryWinnersForCluster(cluster, 4)
    .map((winner) => winner.path)
    .filter((winnerPath) => {
      const seo = resolveSeo(winnerPath);
      return seo.state === 'INDEX' && seo.indexable;
    });

  const links = getInternalLinks(hubSeo).clusterLinks.map((item) => item.path);
  const linkedWinners = expectedWinners.filter((winnerPath) => links.includes(winnerPath));
  const minimum = Math.min(expectedWinners.length, 2);

  if (linkedWinners.length < minimum) {
    failures.push(`${hubPath}: only ${linkedWinners.length}/${expectedWinners.length} priority winners appear inside the six-link cluster surface`);
  }

  if (expectedWinners.length === 0) {
    warnings.push(`${hubPath}: no historical winner available for ${cluster}`);
  }
}

const layoutPath = path.join(root, 'src', 'layouts', 'BaseLayout.astro');
const layoutSource = fs.readFileSync(layoutPath, 'utf8');
if (!layoutSource.includes('RecoveryAuthorityLinks')) {
  failures.push('Homepage layout is missing RecoveryAuthorityLinks import/render');
}
if (!layoutSource.includes("showHomepageRecoveryNetwork = seo.normalizedPath === '/'")) {
  failures.push('Homepage recovery network guard missing');
}

const componentPath = path.join(root, 'src', 'components', 'RecoveryAuthorityLinks.astro');
if (!fs.existsSync(componentPath)) failures.push('RecoveryAuthorityLinks component missing');

const summary = {
  protectedWinners: RECOVERY_V3_WINNERS.length,
  tier1: RECOVERY_V3_WINNERS.filter((item) => item.priority === 'tier1').length,
  tier2: RECOVERY_V3_WINNERS.filter((item) => item.priority === 'tier2').length,
  historicalClicks90d: RECOVERY_V3_WINNERS.reduce((sum, item) => sum + item.historicalClicks90d, 0),
  historicalImpressions90d: RECOVERY_V3_WINNERS.reduce((sum, item) => sum + item.historicalImpressions90d, 0),
  coreHubs: Object.keys(RECOVERY_V3_CORE_HUBS).length,
  warnings,
};

console.log('WERAB RECOVERY V3 — P5 AUTHORITY GATE');
console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  console.error('\nFAILURES');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('P5_AUTHORITY_GATE=FAIL');
  process.exit(1);
}

console.log('P5_AUTHORITY_GATE=PASS');
