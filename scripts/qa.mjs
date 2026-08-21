/**
 * scripts/qa.mjs
 * Master QA Test Runner.
 * Executes the complete test suite in sequence and produces a unified pass/fail report.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const AUDIT_SCRIPTS = [
  { name: 'Claim & Fact Verification Audit', script: 'scripts/claim-audit.mjs' },
  { name: 'GONE (HTTP 410) Parity Audit', script: 'scripts/gone-parity-audit.mjs' },
  { name: 'Survivor Decision Parity Audit', script: 'scripts/survivor-decision-parity-audit.mjs' },
  { name: 'Schema Structured Data Audit', script: 'scripts/schema-audit.mjs' },
  { name: 'Redirect Safety Audit', script: 'scripts/redirect-audit.mjs' },
  { name: 'HTTP Status & Routing Audit', script: 'scripts/http-status-audit.mjs' },
  { name: 'Sitemap & Indexability Audit', script: 'scripts/sitemap-audit.mjs' },
  { name: 'Cluster Linking & Internal Link Audit', script: 'scripts/internal-link-audit.mjs' },
  { name: 'Index Release Gatekeeper Audit', script: 'scripts/index-release-audit.mjs' },
  { name: 'E2 Local Master Map ↔ Runtime Parity Audit', script: 'scripts/e2-parity-audit.mjs' },
  { name: 'Local Content Differentiation Audit', script: 'scripts/local-differentiation-audit.mjs' },
  { name: 'Content Copy Normalizer Mutation Audit', script: 'scripts/content-copy-mutation-audit.mjs' },
  { name: 'Cutover Blocker Readiness Audit', script: 'scripts/cutover-audit.mjs' }
];

console.log(`============================================================`);
console.log(`         เรารับซื้อ.com V2 — MASTER QA TEST SUITE            `);
console.log(`============================================================\n`);

let passedCount = 0;
let failedCount = 0;

for (const item of AUDIT_SCRIPTS) {
  process.stdout.write(`▶ Running: ${item.name}... `);
  try {
    execSync(`npx tsx ${item.script}`, {
      cwd: rootDir,
      stdio: 'pipe',
      encoding: 'utf8'
    });
    console.log(`\x1b[32mPASSED\x1b[0m`);
    passedCount++;
  } catch (err) {
    console.log(`\x1b[31mFAILED\x1b[0m`);
    console.error(`\nError details for ${item.name}:`);
    if (err.stdout) console.log(err.stdout);
    if (err.stderr) console.error(err.stderr);
    failedCount++;
  }
}

console.log(`\n============================================================`);
console.log(`QA SUMMARY: ${passedCount} Passed, ${failedCount} Failed`);
console.log(`============================================================\n`);

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log(`🎉 ALL AUDITS PASSED WITH ZERO ERRORS!`);
  process.exit(0);
}
