/** RECOVERY P4.1 — release-gate reconciliation audit. Pure Node.js. */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const blockers = [];
const normalizeEol = s => s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const sha256 = s => crypto.createHash('sha256').update(normalizeEol(String(s))).digest('hex');

function parseExplicit(text) {
  const m = new Map();
  const re = /\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?state:\s*['"]([A-Z_]+)['"][\s\S]*?\}/g;
  for (const x of text.matchAll(re)) m.set(x[1], x[2]);
  return m;
}
function parseMapped(text, name) {
  const re = new RegExp(`export const ${name}:[\\s\\S]*?= \\[([\\s\\S]*?)\\]\\.map\\(p => \\(\\{([\\s\\S]*?)\\}\\)\\);`);
  const m = text.match(re);
  if (!m) return [];
  const st = (m[2].match(/state:\s*'([A-Z_]+)'/) || [])[1];
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x => [x[1], st]);
}
function buildState() {
  const mf = read('src/config/seo/manifest.ts');
  const pl = read('src/config/planned-pages.ts');
  const rd = read('src/config/seo/redirects.ts');
  const gn = read('src/config/seo/gone.ts');
  const states = parseExplicit(mf);
  for (const [p,s] of parseExplicit(pl)) states.set(p,s);
  for (const n of ['HOLD_NOINDEX_SURVIVORS','UNREVIEWED_LEGACY_PATHS']) {
    for (const [p,s] of parseMapped(mf,n)) states.set(p,s);
  }
  const rules = [...rd.matchAll(/\{\s*source:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'/g)].map(m => ({source:m[1],target:m[2]}));
  for (const r of rules) states.set(r.source, 'REDIRECT');
  const gm = gn.match(/GONE_PATHS_RAW[^=]*= \[([\s\S]*?)\];/);
  const gone = gm ? [...gm[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>x[1]) : [];
  for (const p of gone) states.set(p,'GONE');
  return {states,rules,gone,mf};
}

const {states,rules,gone,mf} = buildState();
const counts = {};
for (const s of states.values()) counts[s] = (counts[s] || 0) + 1;
const expected = {INDEX:86,HOLD_NOINDEX:31,DRAFT:29,REDIRECT:53,GONE:206};
for (const [k,v] of Object.entries(expected)) if ((counts[k]||0)!==v) blockers.push(`Lifecycle ${k}: ${counts[k]||0} != ${v}`);
if (states.size !== 405) blockers.push(`Controlled URLs ${states.size} != 405`);

// Utility-policy links are intentionally crawlable noindex pages, not topical INDEX targets.
for (const p of ['/terms/','/privacy-policy/']) {
  if (states.get(p) !== 'HOLD_NOINDEX') blockers.push(`Utility policy ${p} must remain HOLD_NOINDEX`);
  const marker = `path: '${p}'`;
  const i = mf.indexOf(marker);
  const e = i >= 0 ? mf.indexOf('\n  },', i) : -1;
  const block = i >= 0 && e > i ? mf.slice(i,e) : '';
  if (!block.includes("pageType: 'policy'") || !block.includes("primaryIntent: 'policy'")) blockers.push(`Utility policy ${p} is missing policy classification`);
}
const linkAudit = read('scripts/internal-link-audit.mjs');
for (const p of ['/terms/','/privacy-policy/']) if (!linkAudit.includes(`'${p}'`)) blockers.push(`Internal-link utility allowlist missing ${p}`);
if (!linkAudit.includes('ALLOWED_NOINDEX_UTILITY_LINKS')) blockers.push('Internal-link audit utility allowlist guard missing');

// Exact-hash approval for the 17 intentional P1/P3 recovery rewrites.
const recoveryBaseline = JSON.parse(read('reports/content/recovery-approved-copy-baseline.json'));
const pages = recoveryBaseline.pages || {};
if (Object.keys(pages).length !== 17) blockers.push(`Recovery copy baseline rows ${Object.keys(pages).length} != 17`);
for (const [p,rec] of Object.entries(pages)) {
  const file = path.join(root, rec.astroFile || '');
  if (!fs.existsSync(file)) { blockers.push(`Recovery baseline source missing: ${p} -> ${rec.astroFile}`); continue; }
  const hash = sha256(fs.readFileSync(file, 'utf8'));
  if (hash !== rec.astroFileSha256) blockers.push(`Recovery baseline hash mismatch: ${p}`);
}
const copyAudit = read('scripts/content-copy-audit.mjs');
if (!copyAudit.includes('RECOVERY_APPROVED_BASELINE') || !copyAudit.includes('PASS_RECOVERY_BASELINE')) blockers.push('Content-copy audit does not enforce recovery-approved exact-hash baseline');

// P2 survivor dispositions must be explicit, not silently drift from the original migration snapshot.
const recs = JSON.parse(read('migration/approved/survivor-reconciliations.json'));
if (recs.length !== 7) blockers.push(`Survivor reconciliations ${recs.length} != 7`);
const redirectMap = new Map(rules.map(r => [r.source,r.target]));
for (const r of recs) {
  if (r.originalDecision !== 'HOLD_NOINDEX') blockers.push(`Reconciliation originalDecision must be HOLD_NOINDEX: ${r.path}`);
  if (r.effectiveDisposition === 'INDEX') {
    if (states.get(r.path) !== 'INDEX') blockers.push(`Reconciled INDEX path not INDEX: ${r.path}`);
  } else if (r.effectiveDisposition === 'REDIRECT') {
    if (states.get(r.path) !== 'REDIRECT') blockers.push(`Reconciled REDIRECT path not REDIRECT: ${r.path}`);
    if (redirectMap.get(r.path) !== r.target) blockers.push(`Reconciled redirect target mismatch: ${r.path}`);
  } else blockers.push(`Unknown reconciliation disposition: ${r.path} -> ${r.effectiveDisposition}`);
}

const cutover = read('scripts/cutover-audit.mjs');
if (cutover.includes('REDIRECT_MAP.size !== 46')) blockers.push('Cutover audit still contains stale 46-redirect baseline');
if (cutover.includes('APPROVED_INDEX_PAGES.length')) blockers.push('Cutover audit still derives total INDEX count from the pre-recovery core-only array');
if (!cutover.includes('survivor-reconciliations.json')) blockers.push('Cutover audit does not consume survivor reconciliation registry');

console.log('\nRECOVERY P4.1 — RELEASE-GATE RECONCILIATION AUDIT');
console.log('Lifecycle:', JSON.stringify(counts));
console.log(`Utility noindex policies: 2; recovery copy SHA pins: ${Object.keys(pages).length}; survivor reconciliations: ${recs.length}`);
if (blockers.length) {
  console.error(`FAIL: ${blockers.length} blocker(s)`);
  for (const b of blockers) console.error('- ' + b);
  process.exit(1);
}
console.log('PASS: stale release-gate assumptions are reconciled without weakening URL, copy, or survivor safety controls.');
