/**
 * scripts/sitemap-audit.mjs
 * Phase 30: Sitemap & Indexability Audit.
 * Validates sitemap generation logic to guarantee zero non-indexable or dirty URLs enter sitemap.xml.
 */

import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';

console.log(`\n=== SITEMAP & INDEX AUDIT ===`);

const sitemapEligiblePaths = [];
let violations = [];

for (const path of SEO_MANIFEST_MAP.keys()) {
  const seo = resolveSeo(path);

  if (seo.sitemapEligible) {
    sitemapEligiblePaths.push(path);

    // Rule 1: Must be state INDEX
    if (seo.state !== 'INDEX') {
      violations.push(`Sitemap URL ${path} has non-INDEX state: ${seo.state}`);
    }

    // Rule 2: Must be HTTP 200
    if (seo.httpStatus !== 200) {
      violations.push(`Sitemap URL ${path} has non-200 status: ${seo.httpStatus}`);
    }

    // Rule 3: Must not be in GONE
    if (GONE_PATHS.has(path)) {
      violations.push(`Sitemap URL ${path} is in GONE registry!`);
    }

    // Rule 4: Must not be a redirect source
    if (REDIRECT_MAP.has(path)) {
      violations.push(`Sitemap URL ${path} is a redirect source!`);
    }

    // Rule 5: Canonical must be self
    if (!seo.canonicalIsSelf) {
      violations.push(`Sitemap URL ${path} has non-self canonical: ${seo.canonical}`);
    }
  }
}

console.log(`Total eligible sitemap URLs: ${sitemapEligiblePaths.length}`);

// Verify required historical pages are present
const REQUIRED_HISTORICAL = [
  '/รับซื้อลำโพง-อุดรธานี/',
  '/รับซื้อลำโพง-สารคาม/',
  '/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/',
  '/รับซื้อคอม-อุดรธานี/',
  '/รับซื้อคอม-ขอนแก่น/',
  '/รับซื้อโน๊ตบุ๊ค-บุรีรัม/',
  '/รับซื้อโน๊ตบุ๊ค-เลย/',
  '/รับซื้อโทรศัพท์มือถือ-จ/',
  '/รับซื้อมือถือ-อุบล/',
  '/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/',
  '/รับซื้อไอโฟน-มหาสารคาม/',
  '/รับซื้อโน๊ตบุ๊ค-สกลนคร/',
  '/รับซื้อโน๊ตบุ๊ค-นครพนม/',
  '/รับซื้อโน๊ตบุ๊ค-นครราชส/',
  '/รับซื้อเมืองขอนแก่น/',
  '/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/',
  '/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/'
];
for (const req of REQUIRED_HISTORICAL) {
  if (!sitemapEligiblePaths.includes(req)) {
    violations.push(`Required historical URL ${req} missing from sitemap!`);
  }
}

if (violations.length > 0) {
  console.error(`❌ Found ${violations.length} sitemap violations:`);
  for (const v of violations) {
    console.error(`  - ${v}`);
  }
  process.exit(1);
} else {
  console.log(`✅ Sitemap audit passed cleanly across all ${sitemapEligiblePaths.length} indexable URLs.`);
  process.exit(0);
}
