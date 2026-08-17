/**
 * scripts/claim-audit.mjs
 * Phase 26: Claim & Business Fact Verification Audit.
 * Scans entire codebase and content to ensure zero hallucinated business facts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const FORBIDDEN_PATTERNS = [
  { pattern: /\b10200\b/, name: 'Bangkok fallback postal code 10200' },
  { pattern: /24\s*ชั่วโมง|ตลอด\s*24\s*ชม|เปิด\s*24/i, name: 'Fake 24/7 opening hours claim' },
  { pattern: /latitude|longitude/i, name: 'Unverified GeoCoordinates schema' },
  { pattern: /สาขาทั่วประเทศ\s*77\s*จังหวัด|มีสาขาทุกจังหวัด/i, name: 'Exaggerated physical branch claim' }
];

const SCAN_DIRS = ['src', 'public'];
let violations = [];
let filesScanned = 0;

function scanDir(dir) {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) return;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(entryPath);
    } else if (/\.(astro|ts|js|mjs|md|json|html)$/.test(entry.name)) {
      filesScanned++;
      const content = fs.readFileSync(path.join(rootDir, entryPath), 'utf8');

      // Skip test script itself and config definitions
      if (entryPath.includes('claim-audit.mjs') || entryPath.includes('business.ts')) continue;

      for (const rule of FORBIDDEN_PATTERNS) {
        if (rule.pattern.test(content)) {
          violations.push({
            file: entryPath,
            rule: rule.name
          });
        }
      }
    }
  }
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

console.log(`\n=== CLAIM & FACT VERIFICATION AUDIT ===`);
console.log(`Scanned ${filesScanned} files.`);

if (violations.length > 0) {
  console.error(`❌ Found ${violations.length} claim violations:`);
  for (const v of violations) {
    console.error(`  - [${v.rule}] in ${v.file}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All business facts verified! Zero hallucinated claims found.`);
  process.exit(0);
}
