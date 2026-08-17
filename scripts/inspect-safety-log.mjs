import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Let's inspect the original 63 survivors from legacy repo before any edits
const legacySafetyLog = JSON.parse(
  fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/safety-review-log.json', 'utf8')
);

console.log('Total entries in legacy safety review log:', legacySafetyLog.length);
// Find survivors (entries where action is NOT GONE/410)
const survivorsInLegacy = legacySafetyLog.filter(entry => entry.action !== 'GONE' && entry.action !== 'KEEP_GONE');
console.log('Survivors in safety-review-log:', survivorsInLegacy.length);

for (const s of survivorsInLegacy) {
  console.log(`[${s.action || s.decision}] ${s.path || s.file} ${s.target ? '-> ' + s.target : ''}`);
}
