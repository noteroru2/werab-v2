import fs from 'node:fs';
const legacySafetyLog = JSON.parse(
  fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/safety-review-log.json', 'utf8')
);

console.log('Restored list slugs:');
legacySafetyLog.restoredList.forEach((r, i) => {
  console.log(`${i + 1}. /${r.slug}/ (${r.file})`);
});
