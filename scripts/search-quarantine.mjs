import fs from 'node:fs';
import path from 'node:path';

const webuyDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai';

const targetPaths = [
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

// Check moved-files.json
const movedFiles = JSON.parse(fs.readFileSync(path.join(webuyDir, 'docs/recovery/batch-1/moved-files.json'), 'utf8'));
console.log(`Total entries in moved-files.json: ${movedFiles.length}`);

// Check quarantine-details.json
const quarantineDetails = JSON.parse(fs.readFileSync(path.join(webuyDir, 'docs/recovery/batch-1/quarantine-details.json'), 'utf8'));
console.log(`Total entries in quarantine-details.json: ${quarantineDetails.length}`);

for (const t of targetPaths) {
  console.log(`\n=== ID / SLUG: ${t} ===`);
  const moved = movedFiles.find(m => m.file === `${t}.md` || m.slug === t);
  if (moved) {
    console.log(`  [IN moved-files.json] file: ${moved.file}, slug: ${moved.slug}, title: ${moved.title}, reason: ${moved.reason}`);
  }

  const quar = quarantineDetails.find(q => q.file === `${t}.md` || q.slug === t);
  if (quar) {
    console.log(`  [IN quarantine-details.json] file: ${quar.file}, slug: ${quar.slug}, title: ${quar.title}, category: ${quar.category}, reason: ${quar.reason}`);
  }

  if (!moved && !quar) {
    console.log(`  [NOT FOUND IN BATCH 1 MOVED OR QUARANTINE]`);
  }
}
