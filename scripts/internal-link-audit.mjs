/**
 * scripts/internal-link-audit.mjs
 * Phase 31: Cluster Linking & Internal Links Audit.
 * Scans internal linking engine output for broken, GONE, or redirected links.
 */

import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { getInternalLinks } from '../src/lib/seo/internal-links.ts';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';

console.log(`\n=== INTERNAL LINK & CLUSTER AUDIT ===`);

let checkedPages = 0;
let linkViolations = [];

for (const path of SEO_MANIFEST_MAP.keys()) {
  const seo = resolveSeo(path);
  if (seo.state !== 'INDEX') continue;

  checkedPages++;
  const links = getInternalLinks(seo);
  const allGenerated = [
    ...(links.parentLink ? [links.parentLink.path] : []),
    ...links.clusterLinks.map(l => l.path),
    ...links.guideLinks.map(l => l.path)
  ];

  for (const targetPath of allGenerated) {
    // Check GONE
    if (GONE_PATHS.has(targetPath)) {
      linkViolations.push(`Page ${path} links to GONE path: ${targetPath}`);
    }

    // Check Redirect
    if (REDIRECT_MAP.has(targetPath)) {
      linkViolations.push(`Page ${path} links to redirect source: ${targetPath}`);
    }

    // Check Target Resolver Status
    const targetSeo = resolveSeo(targetPath);
    if (targetSeo.state !== 'INDEX' || targetSeo.httpStatus !== 200) {
      linkViolations.push(`Page ${path} links to non-INDEX target: ${targetPath} (${targetSeo.state})`);
    }
  }
}

console.log(`Checked internal links across ${checkedPages} indexable pages.`);

if (linkViolations.length > 0) {
  console.error(`❌ Found ${linkViolations.length} internal link violations:`);
  for (const lv of linkViolations) {
    console.error(`  - ${lv}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All internal links point directly to 200 OK indexable targets.`);
  process.exit(0);
}
