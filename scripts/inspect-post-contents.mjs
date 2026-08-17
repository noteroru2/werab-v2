import fs from 'node:fs';
import path from 'node:path';

const webuyDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai';

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
  console.log(`\n==================================================`);
  console.log(`FILE: ${file}`);
  let filePath = path.join(webuyDir, 'src/content/posts', file);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(webuyDir, 'src/content/quarantine/off-topic', file);
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(webuyDir, 'src/content/quarantine', file);
  }

  if (fs.existsSync(filePath)) {
    console.log(`Path: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(content.slice(0, 500));
  } else {
    console.log(`NOT FOUND in posts or quarantine!`);
  }
}
