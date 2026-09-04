/**
 * RECOVERY P0 — Foundation Regression Gate
 * Pure Node.js static audit. P1+ releases may add/promote URLs, so P0 lifecycle
 * counts are treated as minimum/foundation invariants rather than frozen totals.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runContentHygieneAudit } from './content-hygiene-audit.mjs';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '..');
const read = rel => fs.readFileSync(path.join(rootDir, rel), 'utf8');
const baseline = JSON.parse(read('reports/seo/p0-release-baseline.json'));

function parseExplicitRecords(text) {
  const map = new Map();
  const re = /\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?state:\s*['"]([A-Z_]+)['"][\s\S]*?\}/g;
  for (const m of text.matchAll(re)) map.set(m[1], m[2]);
  return map;
}
function parseMappedArray(text, name) {
  const re = new RegExp(`export const ${name}:[\\s\\S]*?= \\[([\\s\\S]*?)\\]\\.map\\(p => \\(\\{([\\s\\S]*?)\\}\\)\\);`);
  const m = text.match(re);
  if (!m) return [];
  const state = (m[2].match(/state:\s*'([A-Z_]+)'/) || [])[1];
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x => [x[1], state]);
}
function buildStateMap() {
  const manifest = read('src/config/seo/manifest.ts');
  const planned = read('src/config/planned-pages.ts');
  const redirects = read('src/config/seo/redirects.ts');
  const gone = read('src/config/seo/gone.ts');
  const states = parseExplicitRecords(manifest);
  for (const [p,s] of parseExplicitRecords(planned)) states.set(p,s);
  for (const name of ['HOLD_NOINDEX_SURVIVORS','UNREVIEWED_LEGACY_PATHS']) {
    for (const [p,s] of parseMappedArray(manifest,name)) states.set(p,s);
  }
  const rules = [...redirects.matchAll(/\{\s*source:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'/g)].map(m => ({ source:m[1], target:m[2] }));
  for (const r of rules) if (!states.has(r.source)) states.set(r.source,'REDIRECT');
  const g = gone.match(/GONE_PATHS_RAW[^=]*= \[([\s\S]*?)\];/);
  const gonePaths = g ? [...g[1].matchAll(/['"]([^'"]+)['"]/g)].map(m=>m[1]) : [];
  for (const p of gonePaths) if (!states.has(p)) states.set(p,'GONE');
  return { states, rules, gonePaths };
}

const { states, rules, gonePaths } = buildStateMap();
const blockers = [];
const counts = {};
for (const state of states.values()) counts[state] = (counts[state] || 0) + 1;

if ((counts.INDEX || 0) < baseline.expectedLifecycleCounts.INDEX) blockers.push(`INDEX count regressed below P0 floor: ${counts.INDEX || 0} < ${baseline.expectedLifecycleCounts.INDEX}`);
if ((counts.REDIRECT || 0) < baseline.expectedLifecycleCounts.REDIRECT) blockers.push(`REDIRECT count regressed below P0 floor: ${counts.REDIRECT || 0} < ${baseline.expectedLifecycleCounts.REDIRECT}`);
if (gonePaths.length !== baseline.goneCount) blockers.push(`GONE raw count ${gonePaths.length} != P0 baseline ${baseline.goneCount}`);

const sources = new Set();
for (const r of rules) {
  if (sources.has(r.source)) blockers.push(`Duplicate redirect source: ${r.source}`);
  sources.add(r.source);
  if (r.source === r.target) blockers.push(`Self redirect: ${r.source}`);
  if (states.get(r.target) !== 'INDEX') blockers.push(`Redirect target is not INDEX: ${r.source} -> ${r.target} (${states.get(r.target) || 'UNREGISTERED'})`);
}
for (const r of rules) if (sources.has(r.target)) blockers.push(`Redirect chain detected: ${r.source} -> ${r.target}`);
for (const p of baseline.promotedRedirectTargets) if (states.get(p) !== 'INDEX') blockers.push(`P0 promoted target not INDEX: ${p}`);
for (const [source,target] of Object.entries(baseline.p0HistoricalRedirects)) {
  const rule = rules.find(r => r.source === source);
  if (!rule) blockers.push(`Missing P0 historical redirect: ${source}`);
  else if (rule.target !== target) blockers.push(`Wrong P0 target: ${source} -> ${rule.target}; expected ${target}`);
}
const hygiene = runContentHygieneAudit();
if (!hygiene.ok) blockers.push(`Content hygiene gate has ${hygiene.findings.length} finding(s)`);

console.log('\nRECOVERY P0 — FOUNDATION REGRESSION AUDIT');
console.log('Lifecycle:', JSON.stringify(counts));
console.log(`Redirect rules: ${rules.length}; GONE: ${gonePaths.length}; Total controlled URLs: ${states.size}`);
if (blockers.length) {
  console.error(`FAIL: ${blockers.length} blocker(s)`);
  blockers.forEach(b => console.error(`- ${b}`));
  process.exit(1);
}
console.log('PASS: P0 redirect safety, GONE quarantine, promoted targets and content-hygiene foundation remain intact.');
