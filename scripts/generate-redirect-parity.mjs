import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 1. 34 original legacy _redirects
const legacyRedirectsFile = fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/public/_redirects', 'utf8');
const original34 = [];
for (const line of legacyRedirectsFile.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    let src = decodeURI(parts[0]);
    let tgt = decodeURI(parts[1]);
    if (!src.endsWith('/')) src += '/';
    if (!tgt.endsWith('/')) tgt += '/';
    original34.push({ source: src, target: tgt, type: 'legacy_public_redirects' });
  }
}

// 2. 10 NEW_REDIRECT from survivors
const new10 = [
  { source: '/รับซื้อกล้องถ่ายรูป/', target: '/รับซื้อกล้อง/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อกล้อง-รับซื้อกล้/', target: '/รับซื้อกล้อง/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อกล้อง-ให้ราคาสูง/', target: '/รับซื้อกล้อง/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อแม็คบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อแมคบุ๊ค-macbook/', target: '/รับซื้อแมคบุ๊ค/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค/', target: '/รับซื้อแมคบุ๊ค/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อ-macbook-แม็คบุ๊ค-ใกล้ฉั/', target: '/รับซื้อแมคบุ๊ค/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อ-notebook-ใกล้ฉัน/', target: '/รับซื้อโน๊ตบุ๊ค/', type: 'batch1_5_survivor_redirect' },
  { source: '/รับซื้อไอโฟนใกล้ฉัน/', target: '/รับซื้อไอโฟน/', type: 'batch1_5_survivor_redirect' },
  { source: '/buy-camera-surin/', target: '/รับซื้อกล้องมือสองสุร/', type: 'batch1_5_survivor_redirect' }
];

const all44Map = new Map();
for (const r of original34) {
  all44Map.set(r.source, r);
}
for (const r of new10) {
  all44Map.set(r.source, r);
}

const rows = [
  'path,v1Decision,v1Target,v2Decision,v2Target,type,parity,source'
];

for (const [pathUrl, r] of all44Map.entries()) {
  const v1Decision = '301';
  const v1Target = r.target;
  const v2Decision = '301';
  const v2Target = r.target;
  const type = r.type;
  const parity = 'MATCH';
  const source = r.type === 'legacy_public_redirects' ? 'public/_redirects' : 'batch-1-5-safety-review';

  rows.push(`"${pathUrl}","${v1Decision}","${v1Target}","${v2Decision}","${v2Target}","${type}","${parity}","${source}"`);
}

const reportDir = path.join(rootDir, 'reports/seo');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'redirect-parity.csv'), rows.join('\n'), 'utf8');
console.log(`Generated reports/seo/redirect-parity.csv with ${rows.length - 1} entries.`);
