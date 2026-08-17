import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Read legacy snapshot data
const gonePaths = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/gone-paths.json'), 'utf8'));
const redirects = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/redirects.json'), 'utf8'));
const routes = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/routes.json'), 'utf8'));
const survivorDecisions = JSON.parse(fs.readFileSync(path.join(rootDir, 'migration/legacy/survivor-decisions.json'), 'utf8'));

// Build parity map
const allPaths = new Set();
for (const p of gonePaths) allPaths.add(p);
for (const r of redirects) allPaths.add(r.source);
for (const r of routes) allPaths.add(r);
for (const s of survivorDecisions) allPaths.add(s.path);

const rows = [
  'legacy_path,v2_state,v2_target,v2_http_status,action_reason'
];

for (const legacyPath of Array.from(allPaths).sort()) {
  let v2State = '404';
  let v2Target = '';
  let v2Status = '404';
  let reason = 'Legacy route';

  // Check GONE
  if (gonePaths.includes(legacyPath)) {
    v2State = 'GONE';
    v2Target = '';
    v2Status = '410';
    reason = 'Quarantined off-topic / spam legacy URL';
  } else {
    // Check Redirects
    const redir = redirects.find(r => r.source === legacyPath);
    if (redir) {
      v2State = 'REDIRECT';
      v2Target = redir.target;
      v2Status = '301';
      reason = 'Normalized 301 consolidation';
    } else {
      // Check Approved Survivors
      if (legacyPath === '/รับซื้อลำโพง-อุดรธานี/' || legacyPath === '/รับซื้อลำโพง-สารคาม/') {
        v2State = 'INDEX';
        v2Target = legacyPath;
        v2Status = '200';
        reason = 'Approved historical survivor preserved & rebuilt';
      } else {
        const survivor = survivorDecisions.find(s => s.path === legacyPath);
        if (survivor) {
          if (survivor.action === 'REBUILD_INDEX') {
            v2State = 'HOLD_NOINDEX';
            v2Target = legacyPath;
            v2Status = '200';
            reason = 'REBUILD_INDEX survivor candidate awaiting unique content';
          } else if (survivor.action === 'NEW_REDIRECT' || survivor.action === 'EXISTING_REDIRECT') {
            v2State = 'REDIRECT';
            v2Target = survivor.target || '/รับซื้อ/';
            v2Status = '301';
            reason = 'Survivor redirect consolidation';
          } else {
            v2State = 'HOLD_NOINDEX';
            v2Target = legacyPath;
            v2Status = '200';
            reason = 'Historical survivor in hold/review';
          }
        } else {
          v2State = '404';
          v2Target = '';
          v2Status = '404';
          reason = 'Unapproved legacy route';
        }
      }
    }
  }

  rows.push(`"${legacyPath}","${v2State}","${v2Target}","${v2Status}","${reason}"`);
}

const reportDir = path.join(rootDir, 'reports/seo');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'migration-parity.csv'), rows.join('\n'), 'utf8');
console.log(`Generated migration-parity.csv with ${rows.length - 1} entries.`);
