import fs from 'node:fs';
const legacySafetyLog = JSON.parse(
  fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/safety-review-log.json', 'utf8')
);
console.log('redirectsList (length:', legacySafetyLog.redirectsList.length, '):');
for (const r of legacySafetyLog.redirectsList) console.log(' ', r);

console.log('\nrestoredList (length:', legacySafetyLog.restoredList.length, '):');
for (const r of legacySafetyLog.restoredList) console.log(' ', r);
