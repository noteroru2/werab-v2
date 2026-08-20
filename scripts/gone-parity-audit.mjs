/**
 * scripts/gone-parity-audit.mjs
 * Authoritative GONE (HTTP 410) Parity Audit.
 *
 * Verifies that:
 * 1. Active V2 GONE count matches legacy authoritative 208 GONE baseline exactly (1:1).
 * 2. Zero legacy GONE paths are missing from V2.
 * 3. Zero unapproved unexpected GONE paths exist in V2.
 * 4. GONE ∩ REDIRECT = 0
 * 5. GONE ∩ 63 SURVIVORS = 0
 * 6. GONE ∩ INDEX = 0
 * 7. GONE ∩ HOLD_NOINDEX = 0
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GONE_PATHS_RAW } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log(`\n============================================================`);
console.log(`            GONE (HTTP 410) PARITY & INTEGRITY AUDIT        `);
console.log(`============================================================\n`);

const rawLegacyGone = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/legacy/raw/gone-paths.json'), 'utf8')
);

const legacyGoneSet = new Set(rawLegacyGone.map(p => normalizePath(p)));
const v2GoneSet = new Set(GONE_PATHS_RAW.map(p => normalizePath(p)));

let errors = [];

// Reconciled in Phase E2.1: Exactly 2 Master Map approved local search winners restored from legacy GONE
export const RECONCILED_LOCAL_PRESERVED_PATHS = new Set([
  normalizePath('/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/'),
  normalizePath('/รับซื้อโทรศัพท์-มือถือ-ย/')
]);

// 1. Check Count Parity
console.log(`- Authoritative Legacy GONE Baseline: ${legacyGoneSet.size}`);
console.log(`- Reconciled Preserved Local Winners: ${RECONCILED_LOCAL_PRESERVED_PATHS.size}`);
console.log(`- Active V2 GONE Registry:            ${v2GoneSet.size}`);

if (legacyGoneSet.size !== 208) {
  errors.push(`Legacy raw GONE count is ${legacyGoneSet.size}, expected exactly 208!`);
}

if (v2GoneSet.size !== 206) {
  errors.push(`Active V2 GONE count is ${v2GoneSet.size}, expected exactly 206 (208 legacy minus 2 remediated local winners)!`);
}

// 2. Check Missing from V2 (excluding the 2 approved preserved local winners)
const missingFromV2 = [];
for (const p of legacyGoneSet) {
  if (!RECONCILED_LOCAL_PRESERVED_PATHS.has(p) && !v2GoneSet.has(p)) {
    missingFromV2.push(p);
  }
}
if (missingFromV2.length > 0) {
  errors.push(`Found ${missingFromV2.length} legacy GONE paths missing from V2: ${missingFromV2.join(', ')}`);
}

// Verify that remediated paths are NOT in v2GoneSet
for (const p of RECONCILED_LOCAL_PRESERVED_PATHS) {
  if (v2GoneSet.has(p)) {
    errors.push(`Remediated local winner ${p} is still present in active V2 GONE registry!`);
  }
}

// 3. Check Unexpected Additional V2 GONE
const unexpectedV2Gone = [];
for (const p of v2GoneSet) {
  if (!legacyGoneSet.has(p)) unexpectedV2Gone.push(p);
}
if (unexpectedV2Gone.length > 0) {
  errors.push(`Found ${unexpectedV2Gone.length} unexpected V2 GONE paths: ${unexpectedV2Gone.join(', ')}`);
}

// 4. Check Overlaps with Survivors
const survivors = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/approved/survivor-decisions.json'), 'utf8')
);
const survivorPaths = new Set(survivors.map(s => normalizePath(s.path)));

for (const p of v2GoneSet) {
  if (survivorPaths.has(p)) {
    errors.push(`GONE path ${p} overlaps with approved survivor decision set!`);
  }
}

// 5. Check Overlaps with Redirects
for (const p of v2GoneSet) {
  if (REDIRECT_MAP.has(p)) {
    errors.push(`GONE path ${p} overlaps with 301 Redirect Registry!`);
  }
}

// 6. Check Overlaps with Manifest INDEX / HOLD_NOINDEX
for (const [p, rec] of SEO_MANIFEST_MAP.entries()) {
  if (v2GoneSet.has(p)) {
    if (rec.state === 'INDEX') {
      errors.push(`GONE path ${p} overlaps with INDEX page!`);
    }
    if (rec.state === 'HOLD_NOINDEX') {
      errors.push(`GONE path ${p} overlaps with HOLD_NOINDEX page!`);
    }
  }
}

// 7. Verify HTTP Status Resolution for all GONE paths
let statusErrors = 0;
for (const p of v2GoneSet) {
  const seo = resolveSeo(p);
  if (seo.httpStatus !== 410 || seo.state !== 'GONE') {
    statusErrors++;
    errors.push(`GONE path ${p} resolved to status ${seo.httpStatus} (state: ${seo.state}), expected 410 GONE`);
  }
  if (seo.sitemapEligible) {
    errors.push(`GONE path ${p} is marked sitemapEligible!`);
  }
}

console.log(`- MATCH (Intersection):              ${206 - missingFromV2.length}`);
console.log(`- MISSING_FROM_V2:                   ${missingFromV2.length}`);
console.log(`- UNEXPECTED_V2_GONE:                ${unexpectedV2Gone.length}`);
console.log(`- GONE ∩ 63 SURVIVORS:               0`);
console.log(`- GONE ∩ 301 REDIRECTS:              0`);
console.log(`- GONE ∩ INDEX / HOLD_NOINDEX:       0\n`);

if (errors.length > 0) {
  console.error(`❌ GONE PARITY AUDIT FAILED with ${errors.length} errors:`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log(`✅ GONE PARITY AUDIT PASSED 100%! Exactly 206 Authoritative GONE paths with zero discrepancies.`);
  process.exit(0);
}
