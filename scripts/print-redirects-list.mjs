import fs from 'node:fs';

const legacySafetyLog = JSON.parse(
  fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/safety-review-log.json', 'utf8')
);

console.log(JSON.stringify(legacySafetyLog.redirectsList, null, 2));
