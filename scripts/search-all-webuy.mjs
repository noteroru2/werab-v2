import fs from 'node:fs';
import path from 'node:path';

const webuyDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai';

const targetIds = [
  '100-อันดับ-กล้อง-fujifilm-ในตลาดมือ',
  '10-อันดับ-กล้อง-fujifilm-ในตลาดมือ',
  '1090',
  '1199',
  '1209',
  '1216',
  '1230',
  '1340',
  '1352',
  '1362',
  '1477',
  '1480',
  '1482',
  '1494',
  '1498',
  '1500',
  '1502',
  '1504',
  '1508',
  '1511',
  '1515',
  '1517'
];

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'dist' || f === '.astro') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk(webuyDir);
console.log(`Searching across ${allFiles.length} files in webuy-thai...\n`);

for (const id of targetIds) {
  console.log(`=== SEARCHING: "${id}" ===`);
  let matches = [];
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(id)) {
      matches.push(path.relative(webuyDir, file));
    }
  }
  if (matches.length > 0) {
    console.log(`  Found in: ${matches.join(', ')}`);
  } else {
    console.log(`  No references found.`);
  }
}
