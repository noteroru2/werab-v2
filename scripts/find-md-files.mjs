import fs from 'node:fs';
import path from 'node:path';

const webuyDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai';

function findFile(dir, filename) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'dist' || f === '.astro') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      const res = findFile(full, filename);
      if (res) return res;
    } else if (f === filename) {
      return full;
    }
  }
  return null;
}

const filesToInspect = [
  '1090.md',
  '1199.md',
  '1209.md',
  '1216.md',
  '1230.md',
  '1340.md',
  '1352.md',
  '1362.md',
  '1477.md',
  '1480.md',
  '1482.md',
  '1494.md',
  '1498.md',
  '1500.md',
  '1502.md',
  '1504.md',
  '1508.md',
  '1511.md',
  '1515.md',
  '1517.md'
];

for (const file of filesToInspect) {
  const found = findFile(webuyDir, file);
  console.log(`\n==================================================`);
  console.log(`FILE: ${file} -> Found at: ${found || 'NOT FOUND'}`);
  if (found) {
    const content = fs.readFileSync(found, 'utf8');
    const lines = content.split('\n').slice(0, 20);
    console.log(lines.join('\n'));
  }
}
