import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Authoritative REBUILD_INDEX (13)
const REBUILD_INDEX = [
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
];

// Authoritative NEW_REDIRECT (10)
const NEW_REDIRECT = [
  { path: '/รับซื้อกล้องถ่ายรูป/', target: '/รับซื้อกล้อง/' },
  { path: '/รับซื้อกล้อง-รับซื้อกล้/', target: '/รับซื้อกล้อง/' },
  { path: '/รับซื้อกล้อง-ให้ราคาสูง/', target: '/รับซื้อกล้อง/' },
  { path: '/รับซื้อแม็คบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อแมคบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-แม็คบุ๊ค/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-แม็คบุ๊ค-ใกล้ฉั/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-notebook-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/' },
  { path: '/รับซื้อไอโฟนใกล้ฉัน/', target: '/รับซื้อไอโฟน/' },
  { path: '/buy-camera-surin/', target: '/รับซื้อกล้องมือสองสุร/' }
];

const currentDecisions = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/survivor-decisions.json'), 'utf8'));

console.log(`Current decisions count: ${currentDecisions.length}`);

// Let's identify the 63 paths from currentDecisions
const all63Paths = currentDecisions.map(d => d.path);
console.log('All 63 paths:', all63Paths);

const rebuildSet = new Set(REBUILD_INDEX);
const newRedirSet = new Set(NEW_REDIRECT.map(r => r.path));

console.log(`Rebuild count: ${rebuildSet.size}, New redirect count: ${newRedirSet.size}`);

// Check remaining paths
const remainingPaths = all63Paths.filter(p => !rebuildSet.has(p) && !newRedirSet.has(p));
console.log(`Remaining paths count: ${remainingPaths.length} (Expected 11 + 29 = 40)`);

// In remaining 40, which are redirects and which are hold_noindex?
