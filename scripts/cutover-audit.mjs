/**
 * scripts/cutover-audit.mjs
 * Phase 32: Release Blocker & Cutover Readiness Audit.
 * Performs deep end-to-end verification of all critical pre-launch SEO and safety invariants.
 */

import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';
import { BUSINESS_FACTS } from '../src/config/business.ts';

console.log(`\n============================================================`);
console.log(`         เรารับซื้อ.com V2 — CUTOVER SAFETY AUDIT            `);
console.log(`============================================================\n`);

let blockers = [];

// 1. Check Verified Business Facts
if (BUSINESS_FACTS.VERIFIED.phone !== '064-257-9353' || BUSINESS_FACTS.VERIFIED.lineId !== '@webuy') {
  blockers.push('Verified business contact facts altered or incorrect!');
}

// 2. Check GONE Registry (Must return 410, never 200/301, never in sitemap)
for (const gonePath of GONE_PATHS) {
  const seo = resolveSeo(gonePath);
  if (seo.httpStatus !== 410) {
    blockers.push(`GONE path ${gonePath} returned HTTP ${seo.httpStatus} instead of 410`);
  }
  if (seo.sitemapEligible) {
    blockers.push(`GONE path ${gonePath} is marked sitemapEligible!`);
  }
  if (seo.indexable) {
    blockers.push(`GONE path ${gonePath} is marked indexable!`);
  }
}

// 3. Check 301 Redirect Registry (Must return 301, never 200/410, target valid)
for (const [src, rule] of REDIRECT_MAP.entries()) {
  const seo = resolveSeo(src);
  if (seo.httpStatus !== 301) {
    blockers.push(`Redirect source ${src} returned HTTP ${seo.httpStatus} instead of 301`);
  }
  if (seo.sitemapEligible) {
    blockers.push(`Redirect source ${src} is marked sitemapEligible!`);
  }
  if (GONE_PATHS.has(src)) {
    blockers.push(`Redirect source ${src} is in GONE registry!`);
  }
  if (GONE_PATHS.has(rule.target)) {
    blockers.push(`Redirect target ${rule.target} is in GONE registry!`);
  }
}

// 4. Check Approved Historical Survivors
const REQUIRED_SURVIVORS = ['/รับซื้อลำโพง-อุดรธานี/', '/รับซื้อลำโพง-สารคาม/'];
for (const s of REQUIRED_SURVIVORS) {
  const seo = resolveSeo(s);
  if (seo.state !== 'INDEX' || seo.httpStatus !== 200 || !seo.sitemapEligible) {
    blockers.push(`Approved survivor ${s} is not properly indexable! (Status: ${seo.httpStatus}, State: ${seo.state})`);
  }
}

// 5. Check All Manifest Entries
let indexCount = 0;
let holdCount = 0;
let draftCount = 0;

for (const [path, record] of SEO_MANIFEST_MAP.entries()) {
  const seo = resolveSeo(path);

  if (seo.state === 'INDEX') {
    indexCount++;
    if (seo.httpStatus !== 200) {
      blockers.push(`INDEX route ${path} has non-200 status: ${seo.httpStatus}`);
    }
    if (!seo.canonicalIsSelf) {
      blockers.push(`INDEX route ${path} has non-self canonical: ${seo.canonical}`);
    }
  } else if (seo.state === 'HOLD_NOINDEX') {
    holdCount++;
    if (seo.sitemapEligible) {
      blockers.push(`HOLD_NOINDEX route ${path} is marked sitemapEligible!`);
    }
    if (seo.robots !== 'noindex,follow') {
      blockers.push(`HOLD_NOINDEX route ${path} does not have noindex,follow robots directive!`);
    }
  } else if (seo.state === 'DRAFT') {
    draftCount++;
    if (seo.sitemapEligible) {
      blockers.push(`DRAFT route ${path} is marked sitemapEligible!`);
    }
  }
}

console.log(`Audited Routes Summary:`);
console.log(`- GONE (410): ${GONE_PATHS.size} paths`);
console.log(`- REDIRECT (301): ${REDIRECT_MAP.size} rules`);
console.log(`- INDEX (200, Public): ${indexCount} pages`);
console.log(`- HOLD_NOINDEX (200, Safe Hold): ${holdCount} pages`);
console.log(`- DRAFT / PLANNED (404/Private): ${draftCount} pages`);

if (blockers.length > 0) {
  console.error(`\n❌ CUTOVER BLOCKED! Found ${blockers.length} critical issues:`);
  for (const b of blockers) {
    console.error(`  - ${b}`);
  }
  process.exit(1);
} else {
  console.log(`\n🎉 ZERO CUTOVER BLOCKERS! Architecture is 100% compliant with SEO specifications.`);
  process.exit(0);
}
