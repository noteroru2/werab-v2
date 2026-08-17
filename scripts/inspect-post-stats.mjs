import fs from 'node:fs';

const webuyDir = 'c:/Users/User/Desktop/รวมโปรเจค/webuy-thai';

const postStats = fs.readFileSync(`${webuyDir}/post_stats.csv`, 'utf8');
const lines = postStats.split('\n');
console.log('Header:', lines[0]);

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

for (const id of targetIds) {
  const matches = lines.filter(l => l.includes(id));
  if (matches.length > 0) {
    console.log(`\nMatch for "${id}":`);
    matches.forEach(m => console.log('  ', m));
  } else {
    console.log(`\nNo match in post_stats.csv for "${id}"`);
  }
}
