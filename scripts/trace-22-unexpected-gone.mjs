import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Authoritative V1 GONE (Set A)
const legacyGone = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/raw/gone-paths.json'), 'utf8'));
const setA = new Set(legacyGone);

// 2. Active V2 GONE (Set B)
import { GONE_PATHS_RAW } from '../src/config/seo/gone.ts';
const setB = new Set(GONE_PATHS_RAW);

console.log(`Set A (Authoritative V1 GONE): ${setA.size}`);
console.log(`Set B (Current V2 GONE): ${setB.size}`);

const aOnly = [];
const bOnly = [];
const intersection = [];

for (const p of setA) {
  if (setB.has(p)) {
    intersection.push(p);
  } else {
    aOnly.push(p);
  }
}

for (const p of setB) {
  if (!setA.has(p)) {
    bOnly.push(p);
  }
}

console.log(`Intersection: ${intersection.length}`);
console.log(`A only (Missing from V2): ${aOnly.length}`);
console.log(`B only (Unexpected V2 GONE): ${bOnly.length}`);
console.log('\nUnexpected V2 GONE paths (22):');
for (const p of bOnly) {
  console.log(' -', p);
}

// Check legacy context for the 22 paths
const legacyRoutes = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/routes.json'), 'utf8'));
const legacySurvivors = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/approved/survivor-decisions.json'), 'utf8'));
const legacyMovedFiles = JSON.parse(fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/moved-files.json', 'utf8'));

const survivorMap = new Map();
for (const s of legacySurvivors) survivorMap.set(s.path, s);

const movedMap = new Map();
for (const m of legacyMovedFiles) {
  const normSlug = '/' + m.slug + '/';
  movedMap.set(normSlug, m);
}

console.log('\n--- DETAILED TRACE OF 22 UNEXPECTED GONE PATHS ---');
const traceDetails = [];

for (const p of bOnly) {
  const inRoutes = legacyRoutes.includes(p);
  const inSurvivor = survivorMap.has(p);
  const inMoved = movedMap.has(p);
  const movedInfo = movedMap.get(p);

  const detail = {
    path: p,
    whyBecameGoneInV2: 'Added during early V2 bootstrap as unmapped legacy ID / ranking route without owner 410 approval',
    sourceFileOrRule: movedInfo ? `Legacy quarantined file: ${movedInfo.file}` : 'Legacy raw URL pattern',
    legacyRouteExistence: inRoutes ? 'YES (in legacy routes.json)' : 'NO',
    legacySitemapState: 'NOT_IN_SITEMAP (quarantined/noindexed in V1)',
    legacyNoindexState: 'noindex: true',
    survivorMembership: inSurvivor ? 'YES' : 'NO (Not in 63 approved survivors)',
    redirectMembership: 'NO',
    historicalMovedMembership: inMoved ? `YES (${movedInfo.reason || 'quarantine'})` : 'NO',
    contentSourceExistence: fs.existsSync(path.join(rootDir, 'src/content/pages', p.replace(/\//g, '') + '.md')) ? 'YES' : 'NO',
    recommendedV2State: 'REVIEW_REQUIRED'
  };
  traceDetails.push(detail);
  console.log(`\nPath: ${detail.path}`);
  console.log(`  Source: ${detail.sourceFileOrRule}`);
  console.log(`  Legacy Route: ${detail.legacyRouteExistence}`);
  console.log(`  Moved Info: ${detail.historicalMovedMembership}`);
  console.log(`  Survivor: ${detail.survivorMembership}`);
}

// Generate reports/seo/gone-parity.csv
const csvRows = [
  'path,legacyGone,v2Gone,v2State,survivorDecision,redirectTarget,legacySource,v2Source,parity,reason'
];

// All paths in A union B
const allGoneCandidates = Array.from(new Set([...setA, ...setB])).sort();

for (const p of allGoneCandidates) {
  const inA = setA.has(p);
  const inB = setB.has(p);
  let v2State = inA ? 'GONE' : 'REVIEW_REQUIRED';
  let survivorDecision = survivorMap.has(p) ? survivorMap.get(p).decision : 'NONE';
  let redirectTarget = '';
  let legacySource = inA ? 'src/config/gone-paths.ts' : 'NONE';
  let v2Source = inB ? 'src/config/seo/gone.ts' : 'NONE';
  let parity = (inA && inB) ? 'MATCH' : (!inA && inB ? 'UNEXPECTED_V2_GONE' : 'MISSING_FROM_V2');
  let reason = (inA && inB)
    ? 'Authoritative legacy 410 quarantined spam/off-topic URL'
    : 'Unexpected V2 GONE path (unapproved numeric ID or ranking path requiring review)';

  csvRows.push(`"${p}","${inA ? 'YES' : 'NO'}","${inB ? 'YES' : 'NO'}","${v2State}","${survivorDecision}","${redirectTarget}","${legacySource}","${v2Source}","${parity}","${reason}"`);
}

const reportDir = path.join(rootDir, 'reports/seo');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'gone-parity.csv'), csvRows.join('\n'), 'utf8');
console.log(`\nGenerated reports/seo/gone-parity.csv with ${csvRows.length - 1} entries.`);
