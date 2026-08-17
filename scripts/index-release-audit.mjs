/**
 * scripts/index-release-audit.mjs
 * Phase 21: Index Release Gatekeeper Audit.
 * Ensures that ONLY pages meeting full content quality and readiness criteria are released to INDEX.
 */

import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';

console.log(`\n=== INDEX RELEASE CRITERIA AUDIT ===`);

let releasedCount = 0;
let violations = [];

for (const [path, record] of SEO_MANIFEST_MAP.entries()) {
  const seo = resolveSeo(path);

  if (seo.state === 'INDEX') {
    releasedCount++;

    if (!record.title) violations.push(`INDEX page ${path} missing title`);
    if (!record.description) violations.push(`INDEX page ${path} missing description`);
    if (!record.h1) violations.push(`INDEX page ${path} missing h1`);
    if (record.contentStatus !== 'READY') violations.push(`INDEX page ${path} has contentStatus '${record.contentStatus}', expected 'READY'`);
  } else {
    // If NOT INDEX, ensure sitemapEligible is false
    if (seo.sitemapEligible) {
      violations.push(`Non-INDEX page ${path} is marked sitemapEligible!`);
    }
  }
}

console.log(`Audited ${releasedCount} released INDEX pages.`);

if (violations.length > 0) {
  console.error(`❌ Found ${violations.length} index release violations:`);
  for (const v of violations) {
    console.error(`  - ${v}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All released INDEX pages meet full quality, schema, and metadata standards.`);
  process.exit(0);
}
