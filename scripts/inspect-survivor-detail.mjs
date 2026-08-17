import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const decisions = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/survivor-decisions.json'), 'utf8'));

console.log(`Total decisions: ${decisions.length}`);

const counts = {};
for (const d of decisions) {
  counts[d.decision] = (counts[d.decision] || 0) + 1;
}
console.log('Decision breakdown in survivor-decisions.json:', counts);

// Check paths
for (const d of decisions) {
  console.log(`- [${d.decision}] ${d.path} ${d.target ? '-> ' + d.target : ''}`);
}
