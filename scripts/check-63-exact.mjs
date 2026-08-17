import fs from 'node:fs';

const legacySafetyLog = JSON.parse(
  fs.readFileSync('c:/Users/User/Desktop/รวมโปรเจค/webuy-thai/docs/recovery/batch-1/safety-review-log.json', 'utf8')
);

// All 63 items: 8 in redirectsList + 55 in restoredList
const items8 = legacySafetyLog.redirectsList;
const items55 = legacySafetyLog.restoredList;

console.log('Items in redirectsList (8):');
items8.forEach(i => console.log('  ', i.path || i.slug, '->', i.target));

console.log('\nItems in restoredList (55):');
items55.forEach((i, idx) => console.log(`  ${idx+1}.`, i.slug));
