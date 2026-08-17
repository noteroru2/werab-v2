import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GONE_PATHS } from '../src/config/seo/gone.ts';
import { REDIRECT_MAP } from '../src/config/seo/redirects.ts';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest.ts';
import { normalizePath } from '../src/lib/seo/normalize.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const survivors = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'migration/approved/survivor-decisions.json'), 'utf8')
);

const survivorPaths = new Set(survivors.map(s => normalizePath(s.path)));
const redirectSources = new Set(Array.from(REDIRECT_MAP.keys()));
const indexPaths = new Set();
const holdNoindexPaths = new Set();

for (const [p, rec] of SEO_MANIFEST_MAP.entries()) {
  if (rec.state === 'INDEX') indexPaths.add(p);
  if (rec.state === 'HOLD_NOINDEX') holdNoindexPaths.add(p);
}

console.log(`\n=== OVERLAP VERIFICATION ===`);
console.log(`GONE count: ${GONE_PATHS.size}`);
console.log(`REDIRECT sources: ${redirectSources.size}`);
console.log(`SURVIVORS count: ${survivorPaths.size}`);
console.log(`INDEX pages: ${indexPaths.size}`);
console.log(`HOLD_NOINDEX pages: ${holdNoindexPaths.size}`);

function checkIntersection(nameA, setA, nameB, setB) {
  const overlap = [];
  for (const item of setA) {
    if (setB.has(item)) overlap.push(item);
  }
  console.log(`${nameA} ∩ ${nameB}: ${overlap.length}`);
  if (overlap.length > 0) {
    console.error(`  Overlap items:`, overlap);
  }
  return overlap.length;
}

let totalOverlaps = 0;
totalOverlaps += checkIntersection('GONE', GONE_PATHS, 'REDIRECT', redirectSources);
totalOverlaps += checkIntersection('GONE', GONE_PATHS, '63 SURVIVORS', survivorPaths);
totalOverlaps += checkIntersection('GONE', GONE_PATHS, 'INDEX', indexPaths);
totalOverlaps += checkIntersection('GONE', GONE_PATHS, 'HOLD_NOINDEX', holdNoindexPaths);
totalOverlaps += checkIntersection('Redirect source', redirectSources, 'INDEX', indexPaths);

console.log(`\nTotal Overlaps: ${totalOverlaps}`);
if (totalOverlaps === 0) {
  console.log('✅ ALL OVERLAPS ARE ZERO!');
  process.exit(0);
} else {
  console.error('❌ OVERLAPS FOUND!');
  process.exit(1);
}
