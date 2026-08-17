import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Read authoritative raw 208 GONE paths from ../webuy-thai/src/config/gone-paths.ts
const legacyGoneTs = fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/src/config/gone-paths.ts', 'utf8');
const rawGoneMatches = legacyGoneTs.match(/"([^"]+)":?/g);
const rawGonePaths = [];
if (rawGoneMatches) {
  for (const m of rawGoneMatches) {
    const clean = m.replace(/"/g, '').trim();
    if (clean.startsWith('/')) {
      rawGonePaths.push(clean);
    }
  }
}
console.log(`Authoritative raw legacy GONE count: ${rawGonePaths.length}`);

// 2. Read authoritative raw 34 redirects from ../webuy-thai/public/_redirects
const legacyRedirectsFile = fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/public/_redirects', 'utf8');
const rawRedirects = [];
for (const line of legacyRedirectsFile.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    let src = decodeURI(parts[0]);
    let tgt = decodeURI(parts[1]);
    if (!src.endsWith('/')) src += '/';
    if (!tgt.endsWith('/')) tgt += '/';
    rawRedirects.push({ source: src, target: tgt, status: 301 });
  }
}
console.log(`Authoritative raw legacy redirects count: ${rawRedirects.length}`);

// 3. Ensure directories exist
const rawDir = path.join(rootDir, 'migration/legacy/raw');
const approvedDir = path.join(rootDir, 'migration/approved');
if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir, { recursive: true });
if (!fs.existsSync(approvedDir)) fs.mkdirSync(approvedDir, { recursive: true });

// 4. Save raw files
fs.writeFileSync(path.join(rawDir, 'gone-paths.json'), JSON.stringify(rawGonePaths, null, 2), 'utf8');
fs.writeFileSync(path.join(rawDir, 'redirects.json'), JSON.stringify(rawRedirects, null, 2), 'utf8');

// Copy survivor decisions to approved
const approvedSurvivors = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/legacy/survivor-decisions.json'), 'utf8')
);
fs.writeFileSync(path.join(approvedDir, 'survivor-decisions.json'), JSON.stringify(approvedSurvivors, null, 2), 'utf8');

console.log('Saved immutable raw legacy snapshots and approved survivor decisions.');
