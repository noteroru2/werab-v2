import fs from 'node:fs';
const legacySafetyLog = JSON.parse(
  fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/safety-review-log.json', 'utf8')
);
console.log('Keys in legacy safety review log:', Object.keys(legacySafetyLog));
if (legacySafetyLog.summary) console.log('Summary:', legacySafetyLog.summary);
if (legacySafetyLog.actions) {
  console.log('Actions count:', legacySafetyLog.actions.length);
  for (const a of legacySafetyLog.actions.filter(x => x.action !== 'KEEP_GONE')) {
    console.log(a);
  }
}
