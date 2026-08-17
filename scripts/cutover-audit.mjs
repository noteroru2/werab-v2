/**
 * scripts/cutover-audit.mjs
 * Phase 32: Release Blocker & Cutover Readiness Audit.
 * Performs deep end-to-end verification of all critical pre-launch SEO, survivor parity, GONE parity, and safety invariants.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { GONE_PATHS, GONE_PATHS_RAW } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';
import { BUSINESS_FACTS } from '../src/config/business.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log(`\n============================================================`);
console.log(`         เรารับซื้อ.com V2 — CUTOVER SAFETY AUDIT            `);
console.log(`============================================================\n`);

let blockers = [];

// 1. Check Verified Business Facts
if (BUSINESS_FACTS.VERIFIED.phone !== '064-257-9353' || BUSINESS_FACTS.VERIFIED.lineId !== '@webuy') {
  blockers.push('Verified business contact facts altered or incorrect!');
}

// 2. Check Authoritative 208 GONE Parity
const rawLegacyGone = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/legacy/raw/gone-paths.json'), 'utf8')
);
const legacyGoneSet = new Set(rawLegacyGone.map(p => normalizePath(p)));
const v2GoneSet = new Set(GONE_PATHS_RAW.map(p => normalizePath(p)));

if (legacyGoneSet.size !== 208) {
  blockers.push(`Legacy raw GONE count is ${legacyGoneSet.size}, expected exactly 208!`);
}
if (v2GoneSet.size !== 208) {
  blockers.push(`Active V2 GONE count is ${v2GoneSet.size}, expected exactly 208!`);
}

for (const p of legacyGoneSet) {
  if (!v2GoneSet.has(p)) {
    blockers.push(`Missing legacy GONE path in V2: ${p}`);
  }
}
for (const p of v2GoneSet) {
  if (!legacyGoneSet.has(p)) {
    blockers.push(`Unexpected unapproved GONE path in V2: ${p}`);
  }
}

// 3. Check Authoritative 63 Survivor Parity
const survivorDecisions = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/approved/survivor-decisions.json'), 'utf8')
);

if (survivorDecisions.length !== 63) {
  blockers.push(`Survivor decisions count is ${survivorDecisions.length}, expected exactly 63!`);
}

const survivorCounts = {
  REBUILD_INDEX: 0,
  NEW_REDIRECT: 0,
  EXISTING_REDIRECT: 0,
  HOLD_NOINDEX: 0
};

const survivorPaths = new Set();

for (const s of survivorDecisions) {
  const normS = normalizePath(s.path);
  survivorPaths.add(normS);
  survivorCounts[s.decision] = (survivorCounts[s.decision] || 0) + 1;
  const seo = resolveSeo(normS);

  if (s.decision === 'REBUILD_INDEX') {
    if (seo.state !== 'INDEX' && seo.state !== 'HOLD_NOINDEX') {
      blockers.push(`REBUILD_INDEX survivor ${normS} state mismatch: ${seo.state}`);
    }
  } else if (s.decision === 'NEW_REDIRECT' || s.decision === 'EXISTING_REDIRECT') {
    if (seo.state !== 'REDIRECT' || seo.httpStatus !== 301) {
      blockers.push(`Redirect survivor ${normS} status mismatch: ${seo.httpStatus} (state: ${seo.state})`);
    }
  } else if (s.decision === 'HOLD_NOINDEX') {
    if (seo.state !== 'HOLD_NOINDEX' || seo.httpStatus !== 200) {
      blockers.push(`HOLD_NOINDEX survivor ${normS} state mismatch: ${seo.state}`);
    }
  }
}

if (survivorCounts.REBUILD_INDEX !== 13) blockers.push(`REBUILD_INDEX count is ${survivorCounts.REBUILD_INDEX}, expected 13`);
if (survivorCounts.NEW_REDIRECT !== 10) blockers.push(`NEW_REDIRECT count is ${survivorCounts.NEW_REDIRECT}, expected 10`);
if (survivorCounts.EXISTING_REDIRECT !== 11) blockers.push(`EXISTING_REDIRECT count is ${survivorCounts.EXISTING_REDIRECT}, expected 11`);
if (survivorCounts.HOLD_NOINDEX !== 29) blockers.push(`HOLD_NOINDEX count is ${survivorCounts.HOLD_NOINDEX}, expected 29`);

// 4. Check GONE Registry (Must return 410, never 200/301, never in sitemap)
for (const gonePath of GONE_PATHS) {
  const seo = resolveSeo(gonePath);
  if (seo.httpStatus !== 410 || seo.state !== 'GONE') {
    blockers.push(`GONE path ${gonePath} returned HTTP ${seo.httpStatus} instead of 410`);
  }
  if (seo.sitemapEligible) {
    blockers.push(`GONE path ${gonePath} is marked sitemapEligible!`);
  }
  if (seo.indexable) {
    blockers.push(`GONE path ${gonePath} is marked indexable!`);
  }
  if (survivorPaths.has(gonePath)) {
    blockers.push(`GONE path ${gonePath} overlaps with survivor set!`);
  }
  if (REDIRECT_MAP.has(gonePath)) {
    blockers.push(`GONE path ${gonePath} overlaps with redirect registry!`);
  }
}

// 5. Check 301 Redirect Registry (Must return 301, never 200/410, target valid)
if (REDIRECT_MAP.size !== 44) {
  blockers.push(`Migration redirect registry size is ${REDIRECT_MAP.size}, expected exactly 44!`);
}

for (const [src, rule] of REDIRECT_MAP.entries()) {
  const seo = resolveSeo(src);
  if (seo.httpStatus !== 301 || seo.state !== 'REDIRECT') {
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

// 6. Check Approved Historical Survivors
const REQUIRED_READY_SURVIVORS = ['/รับซื้อลำโพง-อุดรธานี/', '/รับซื้อลำโพง-สารคาม/'];
for (const s of REQUIRED_READY_SURVIVORS) {
  const seo = resolveSeo(s);
  if (seo.state !== 'INDEX' || seo.httpStatus !== 200 || !seo.sitemapEligible || seo.contentStatus !== 'READY') {
    blockers.push(`Approved survivor ${s} is not properly indexable! (Status: ${seo.httpStatus}, State: ${seo.state}, Content: ${seo.contentStatus})`);
  }
}

// 7. Check All Manifest Entries, REVIEW_REQUIRED Gatekeeper, & Strict Thin Page Gatekeeper
let indexCount = 0;
let holdCount = 0;
let draftCount = 0;
let reviewRequiredCount = 0;
let reviewRequiredPaths = [];
let unapprovedThinCount = 0;

for (const [pathUrl, record] of SEO_MANIFEST_MAP.entries()) {
  const seo = resolveSeo(pathUrl);

  // Check REVIEW_REQUIRED
  if (record.state === 'REVIEW_REQUIRED' || (seo.state === 'REVIEW_REQUIRED')) {
    reviewRequiredCount++;
    reviewRequiredPaths.push(pathUrl);
    blockers.push(`Unresolved migration decision: ${pathUrl} is marked REVIEW_REQUIRED!`);
  }

  if (seo.state === 'INDEX') {
    indexCount++;
    if (seo.httpStatus !== 200) {
      blockers.push(`INDEX route ${pathUrl} has non-200 status: ${seo.httpStatus}`);
    }
    if (!seo.canonicalIsSelf) {
      blockers.push(`INDEX route ${pathUrl} has non-self canonical: ${seo.canonical}`);
    }
    if (seo.contentStatus !== 'READY') {
      unapprovedThinCount++;
      blockers.push(`INDEX route ${pathUrl} has unapproved content status: ${seo.contentStatus}`);
    }
    if (REDIRECT_MAP.has(pathUrl)) {
      blockers.push(`INDEX route ${pathUrl} is also in Redirect registry!`);
    }
    if (GONE_PATHS.has(pathUrl)) {
      blockers.push(`INDEX route ${pathUrl} is also in GONE registry!`);
    }
  } else if (seo.state === 'HOLD_NOINDEX') {
    holdCount++;
    if (seo.sitemapEligible) {
      blockers.push(`HOLD_NOINDEX route ${pathUrl} is marked sitemapEligible!`);
    }
    if (seo.robots !== 'noindex,follow') {
      blockers.push(`HOLD_NOINDEX route ${pathUrl} does not have noindex,follow robots directive!`);
    }
  } else if (seo.state === 'DRAFT') {
    draftCount++;
    if (seo.sitemapEligible) {
      blockers.push(`DRAFT route ${pathUrl} is marked sitemapEligible!`);
    }
  }
}

if (indexCount !== 3) {
  blockers.push(`Active INDEX page count is ${indexCount}, expected exactly 3!`);
}

console.log(`Audited Routes Summary:`);
console.log(`- GONE (410): ${GONE_PATHS.size} paths (Legacy Baseline: ${legacyGoneSet.size})`);
console.log(`- MIGRATION REDIRECTS (301): ${REDIRECT_MAP.size} rules`);
console.log(`- SURVIVORS TOTAL: ${survivorDecisions.length} (REBUILD_INDEX: ${survivorCounts.REBUILD_INDEX}, NEW_REDIRECT: ${survivorCounts.NEW_REDIRECT}, EXISTING_REDIRECT: ${survivorCounts.EXISTING_REDIRECT}, HOLD_NOINDEX: ${survivorCounts.HOLD_NOINDEX})`);
console.log(`- ACTIVE INDEX (200, Approved READY Content): ${indexCount} pages`);
console.log(`- HOLD_NOINDEX (200, Safe Hold / Review): ${holdCount} pages`);
console.log(`- DRAFT / PLANNED / ARCHIVED (404/Private): ${draftCount} pages`);
console.log(`- REVIEW_REQUIRED COUNT: ${reviewRequiredCount}`);
if (reviewRequiredCount > 0) {
  console.log(`- REVIEW_REQUIRED PATHS:`, reviewRequiredPaths);
}
console.log(`- UNAPPROVED THIN INDEX PAGES: ${unapprovedThinCount}`);

if (blockers.length > 0) {
  console.error(`\n❌ CUTOVER BLOCKED! Found ${blockers.length} critical issues:`);
  for (const b of blockers) {
    console.error(`  - ${b}`);
  }
  process.exit(1);
} else {
  console.log(`\n🎉 ZERO CUTOVER BLOCKERS! Architecture is 100% compliant with authoritative survivor, GONE, and resolved legacy review specifications.`);
  process.exit(0);
}
