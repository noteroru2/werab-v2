import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. Authoritative 13 REBUILD_INDEX
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

// 2. Authoritative 10 NEW_REDIRECT
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

// 3. Authoritative 11 EXISTING_REDIRECT
const EXISTING_REDIRECT = [
  { path: '/รับซื้อ-macbook-จังหวัดกาฬสินธ/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-จังหวัดนครราชส/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-จังหวัดบุรีรัม/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-จังหวัดสุรินทร/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-จังหวัดนครพนม/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-จังหวัดมุกดาหา/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อ-macbook-จังหวัดร้อยเอ็/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/legacy-รับซื้อกล้อง-ยโสธร-815/', target: '/รับซื้อกล้อง-ยโสธร/' },
  { path: '/legacy-รับซื้อไอโฟน-มหาสารคาม-851/', target: '/รับซื้อไอโฟน-มหาสารคาม/' },
  { path: '/รับซื้อ-macbook/', target: '/รับซื้อแมคบุ๊ค/' },
  { path: '/รับซื้อแมคบุ๊ค-macbook-ยโสธร/', target: '/รับซื้อแมคบุ๊ค/' }
];

// 4. Authoritative 29 HOLD_NOINDEX
const HOLD_NOINDEX = [
  '/ขายโน๊ตบุ๊ค-ขอนแก่น/',
  '/ร้านรับซื้อโน๊ตบุ๊คอุบ-2/',
  '/รับซื้อกล้อง-canon-2/',
  '/รับซื้อกล้อง-sony-a6400/',
  '/รับซื้อกล้อง-sony-rx100/',
  '/รับซื้อกล้อง-sony-a7/',
  '/รับซื้อกล้องมือสองอุบล/',
  '/รับซื้อกล้องมือสองขอนแ/',
  '/รับซื้อกล้องมือสองอุดร/',
  '/รับซื้อกล้องมือสองนครร/',
  '/รับซื้อกล้องมือสองบุรี/',
  '/รับซื้อกล้องมือสองศรี/',
  '/รับซื้อกล้องมือสองกาฬ/',
  '/รับซื้อกล้องมือสองมหา/',
  '/รับซื้อกล้องมือสองยโสธ/',
  '/รับซื้อกล้องมือสองมุกด/',
  '/รับซื้อกล้องมือสองบึง/',
  '/รับซื้อกล้องมือสองหนอ/',
  '/รับซื้อกล้องนครราชสีมา/',
  '/รับซื้อกล้องเลนส์/',
  '/ร้านรับซื้อโน๊ตบุ๊คในอ/',
  '/รับซื้อกล้อง-รับซื้อเลน/',
  '/buy-camera-ubon/',
  '/buy-camera-nongkai/',
  '/รับซื้อไอโฟน-15-iphone-15/',
  '/รับซื้อไอโฟน-iphone-อุบล/',
  '/รับซื้อกล้อง-canon/',
  '/รับซื้อกล้อง-nikon-รับซื้อกล/',
  '/รับซื้อกล้อง-ใกล้ฉัน/'
];

console.log('REBUILD_INDEX:', REBUILD_INDEX.length);
console.log('NEW_REDIRECT:', NEW_REDIRECT.length);
console.log('EXISTING_REDIRECT:', EXISTING_REDIRECT.length);
console.log('HOLD_NOINDEX:', HOLD_NOINDEX.length);
console.log('TOTAL:', REBUILD_INDEX.length + NEW_REDIRECT.length + EXISTING_REDIRECT.length + HOLD_NOINDEX.length);

const decisionsArray = [];
for (const p of REBUILD_INDEX) {
  decisionsArray.push({
    path: p,
    slug: p.replace(/^\/|\/$/g, ''),
    decision: 'REBUILD_INDEX'
  });
}
for (const r of NEW_REDIRECT) {
  decisionsArray.push({
    path: r.path,
    slug: r.path.replace(/^\/|\/$/g, ''),
    decision: 'NEW_REDIRECT',
    target: r.target
  });
}
for (const r of EXISTING_REDIRECT) {
  decisionsArray.push({
    path: r.path,
    slug: r.path.replace(/^\/|\/$/g, ''),
    decision: 'EXISTING_REDIRECT',
    target: r.target
  });
}
for (const p of HOLD_NOINDEX) {
  decisionsArray.push({
    path: p,
    slug: p.replace(/^\/|\/$/g, ''),
    decision: 'HOLD_NOINDEX'
  });
}

fs.writeFileSync(
  path.join(rootDir, 'migration/legacy/survivor-decisions.json'),
  JSON.stringify(decisionsArray, null, 2),
  'utf8'
);
console.log('Saved migration/legacy/survivor-decisions.json');
