/**
 * scripts/survivor-decision-parity-audit.mjs
 * Compares the authoritative imported owner-approved survivor decision snapshot
 * against the active V2 SEO manifest.
 *
 * Fails on:
 * - missing survivor
 * - decision mismatch
 * - redirect target mismatch
 * - unexpected REBUILD_INDEX substitution
 * - duplicate path
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSeo } from '../src/lib/seo/resolve.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log(`\n============================================================`);
console.log(`       SURVIVOR DECISION PARITY & RECOVERY AUDIT            `);
console.log(`============================================================\n`);

const survivorDecisions = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/legacy/survivor-decisions.json'), 'utf8')
);

console.log(`Loaded ${survivorDecisions.length} authoritative survivor decisions.`);

let errors = [];
let checkedCount = 0;

const seenPaths = new Set();
const groupCounts = {
  REBUILD_INDEX: 0,
  NEW_REDIRECT: 0,
  EXISTING_REDIRECT: 0,
  HOLD_NOINDEX: 0
};

for (const item of survivorDecisions) {
  checkedCount++;
  const normPath = normalizePath(item.path);

  // Check duplicate
  if (seenPaths.has(normPath)) {
    errors.push(`Duplicate survivor path in decisions dataset: ${normPath}`);
  }
  seenPaths.add(normPath);

  groupCounts[item.decision] = (groupCounts[item.decision] || 0) + 1;

  const seo = resolveSeo(normPath);

  if (item.decision === 'REBUILD_INDEX') {
    // Must be either INDEX (if READY) or HOLD_NOINDEX (if CONTENT_REQUIRED)
    if (seo.state !== 'INDEX' && seo.state !== 'HOLD_NOINDEX') {
      errors.push(`REBUILD_INDEX survivor ${normPath} resolved to invalid state: ${seo.state}`);
    }
    if (seo.httpStatus !== 200) {
      errors.push(`REBUILD_INDEX survivor ${normPath} returned HTTP status ${seo.httpStatus}, expected 200`);
    }
    if (seo.state === 'INDEX' && seo.contentStatus !== 'READY') {
      errors.push(`REBUILD_INDEX survivor ${normPath} is INDEX but contentStatus is '${seo.contentStatus}' (expected READY)`);
    }
    if (seo.state === 'HOLD_NOINDEX' && seo.contentStatus !== 'CONTENT_REQUIRED') {
      errors.push(`REBUILD_INDEX survivor ${normPath} is HOLD_NOINDEX but contentStatus is '${seo.contentStatus}' (expected CONTENT_REQUIRED)`);
    }
  } else if (item.decision === 'NEW_REDIRECT' || item.decision === 'EXISTING_REDIRECT') {
    if (seo.state !== 'REDIRECT' || seo.httpStatus !== 301) {
      errors.push(`Redirect survivor ${normPath} (${item.decision}) resolved to state: ${seo.state}, status: ${seo.httpStatus}`);
    }
    if (item.target) {
      const normExpectedTarget = normalizePath(item.target);
      if (normalizePath(seo.redirectTo || '') !== normExpectedTarget) {
        errors.push(`Redirect survivor ${normPath} target mismatch: got '${seo.redirectTo}', expected '${normExpectedTarget}'`);
      }
    }
  } else if (item.decision === 'HOLD_NOINDEX') {
    if (seo.state !== 'HOLD_NOINDEX' || seo.httpStatus !== 200) {
      errors.push(`HOLD_NOINDEX survivor ${normPath} resolved to state: ${seo.state}, status: ${seo.httpStatus}`);
    }
    if (seo.sitemapEligible) {
      errors.push(`HOLD_NOINDEX survivor ${normPath} is marked sitemapEligible!`);
    }
  } else {
    errors.push(`Unknown decision '${item.decision}' for survivor ${normPath}`);
  }
}

console.log(`\nSurvivor Group Breakdown:`);
console.log(`- REBUILD_INDEX: ${groupCounts.REBUILD_INDEX} (Expected: 13)`);
console.log(`- NEW_REDIRECT: ${groupCounts.NEW_REDIRECT} (Expected: 10)`);
console.log(`- EXISTING_REDIRECT: ${groupCounts.EXISTING_REDIRECT} (Expected: 11)`);
console.log(`- HOLD_NOINDEX: ${groupCounts.HOLD_NOINDEX} (Expected: 29)`);
console.log(`- TOTAL: ${checkedCount} (Expected: 63)\n`);

if (groupCounts.REBUILD_INDEX !== 13) errors.push(`REBUILD_INDEX count is ${groupCounts.REBUILD_INDEX}, expected 13`);
if (groupCounts.NEW_REDIRECT !== 10) errors.push(`NEW_REDIRECT count is ${groupCounts.NEW_REDIRECT}, expected 10`);
if (groupCounts.EXISTING_REDIRECT !== 11) errors.push(`EXISTING_REDIRECT count is ${groupCounts.EXISTING_REDIRECT}, expected 11`);
if (groupCounts.HOLD_NOINDEX !== 29) errors.push(`HOLD_NOINDEX count is ${groupCounts.HOLD_NOINDEX}, expected 29`);
if (checkedCount !== 63) errors.push(`Total survivor count is ${checkedCount}, expected 63`);

if (errors.length > 0) {
  console.error(`❌ SURVIVOR PARITY AUDIT FAILED with ${errors.length} errors:`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log(`✅ ALL 63 SURVIVOR DECISIONS MATCH THE V2 MANIFEST 100% PERFECTLY!`);
  process.exit(0);
}
