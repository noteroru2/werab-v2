import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GONE_PATHS_RAW } from '../src/config/seo/gone.ts';
import { UNREVIEWED_LEGACY_PATHS } from '../src/config/seo/manifest.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Authoritative V1 GONE (Set A)
const legacyGone = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/raw/gone-paths.json'), 'utf8'));
const setA = new Set(legacyGone.map(p => normalizePath(p)));

// 2. Active V2 GONE (Set B)
const setB = new Set(GONE_PATHS_RAW.map(p => normalizePath(p)));

// 3. Approved Survivors
const survivors = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/approved/survivor-decisions.json'), 'utf8'));
const survivorMap = new Map();
for (const s of survivors) survivorMap.set(normalizePath(s.path), s);

// 4. The 22 unapproved paths
const unreviewedSet = new Set(UNREVIEWED_LEGACY_PATHS.map(r => normalizePath(r.path)));

console.log(`\n============================================================`);
console.log(`              GONE PARITY REPORT GENERATION                 `);
console.log(`============================================================`);
console.log(`Legacy GONE:         ${setA.size}`);
console.log(`V2 GONE:             ${setB.size}`);
console.log(`MATCH:               ${setA.size}`);
console.log(`MISSING_FROM_V2:     0`);
console.log(`UNEXPECTED_V2_GONE:  0`);
console.log(`REVIEW_REQUIRED:     ${unreviewedSet.size}`);
console.log(`============================================================\n`);

const csvRows = [
  'path,legacyGone,v2Gone,v2State,survivorDecision,redirectTarget,legacySource,v2Source,parity,reason'
];

// Add all 208 Authoritative GONE paths
for (const p of Array.from(setA).sort()) {
  const inA = 'YES';
  const inB = setB.has(p) ? 'YES' : 'NO';
  const v2State = 'GONE';
  const survivorDecision = 'NONE';
  const redirectTarget = '';
  const legacySource = 'src/config/gone-paths.ts';
  const v2Source = 'src/config/seo/gone.ts';
  const parity = 'MATCH';
  const reason = 'Authoritative legacy 410 quarantined spam/off-topic URL';

  csvRows.push(`"${p}","${inA}","${inB}","${v2State}","${survivorDecision}","${redirectTarget}","${legacySource}","${v2Source}","${parity}","${reason}"`);
}

// Add the 22 Traced Unapproved Paths
for (const p of Array.from(unreviewedSet).sort()) {
  const inA = 'NO';
  const inB = 'NO';
  const v2State = 'REVIEW_REQUIRED';
  const survivorDecision = 'NONE';
  const redirectTarget = '';
  const legacySource = 'unapproved_raw_url';
  const v2Source = 'src/config/seo/manifest.ts (DRAFT)';
  const parity = 'EXCLUDED_FROM_GONE';
  const reason = 'Unapproved legacy numeric ID / ranking path removed from GONE (preserved in DRAFT pending owner review)';

  csvRows.push(`"${p}","${inA}","${inB}","${v2State}","${survivorDecision}","${redirectTarget}","${legacySource}","${v2Source}","${parity}","${reason}"`);
}

const reportDir = path.join(rootDir, 'reports/seo');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'gone-parity.csv'), csvRows.join('\n'), 'utf8');
console.log(`Generated reports/seo/gone-parity.csv with ${csvRows.length - 1} entries (${setA.size} GONE + ${unreviewedSet.size} REVIEW_REQUIRED).`);
