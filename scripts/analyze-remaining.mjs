import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const currentDecisions = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/survivor-decisions.json'), 'utf8'));

// Authoritative REBUILD_INDEX (13)
const REBUILD_INDEX = new Set([
  '/รับซื้อลำโพง-อุดรธานี/',
  '/รับซื้อลำโพง-สารคาม/',
  '/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/',
  '/รับซื้อลำโพง-ยโสธร/',
  '/รับซื้อไอแพด-ยโสธร-ipad/',
  '/รับซื้อ-server/',
  '/รับซื้อไอโฟน-ขอนแก่น/',
  '/รับซื้อไอโฟน-จังหวัดอุด/',
  '/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/',
  '/รับซื้อไอโฟน-ยโสธร/',
  '/รับซื้อกล้องมือสองสุร/',
  '/buy-camera-mahasarakam/',
  '/รับซื้อกล้องมือสองมุก/'
]);

// Authoritative NEW_REDIRECT (10)
const NEW_REDIRECT = new Set([
  '/รับซื้อกล้องถ่ายรูป/',
  '/รับซื้อกล้อง-รับซื้อกล้/',
  '/รับซื้อกล้อง-ให้ราคาสูง/',
  '/รับซื้อแม็คบุ๊ค-macbook/',
  '/รับซื้อแมคบุ๊ค-macbook/',
  '/รับซื้อ-macbook-แม็คบุ๊ค/',
  '/รับซื้อ-macbook-แม็คบุ๊ค-ใกล้ฉั/',
  '/รับซื้อ-notebook-ใกล้ฉัน/',
  '/รับซื้อไอโฟนใกล้ฉัน/',
  '/buy-camera-surin/'
]);

console.log('\n--- 40 REMAINING PATHS ---');
let existingRedirects = [];
let holdNoindex = [];

for (const d of currentDecisions) {
  if (REBUILD_INDEX.has(d.path) || NEW_REDIRECT.has(d.path)) continue;

  if (d.decision === 'EXISTING_REDIRECT' || d.decision === 'NEW_REDIRECT' || d.target) {
    existingRedirects.push(d);
  } else {
    holdNoindex.push(d);
  }
}

console.log(`Existing Redirects (${existingRedirects.length}):`);
for (const r of existingRedirects) {
  console.log(`  ${r.path} -> ${r.target || '/รับซื้อ/'} (${r.decision})`);
}

console.log(`\nHold Noindex (${holdNoindex.length}):`);
for (const h of holdNoindex) {
  console.log(`  ${h.path} (${h.decision})`);
}
