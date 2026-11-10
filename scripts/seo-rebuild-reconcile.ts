/**
 * SEO Rebuild — read-only historical migration reconciliation.
 * Usage: npx tsx scripts/seo-rebuild-reconcile.ts --input /path/to/gsc-url-ledger.csv --output /path/to/reconciled.csv
 * Required CSV columns: "URL" and "GSC reason" (or "url" and "reason").
 * This script never changes redirects, manifest, deploy config or production.
 */
import fs from 'node:fs';
import { normalizePath } from '../src/lib/seo/normalize';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest';
import { REDIRECT_MAP } from '../src/config/seo/redirects';
import { GONE_PATHS_RAW } from '../src/config/seo/gone';
import { resolveSeo } from '../src/lib/seo/resolve';

function csvParse(source: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = '', quote = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (c === '"' && source[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quote = false;
      else cell += c;
    } else if (c === '"') quote = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  return rows;
}
const esc = (s: unknown) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
function flag(args: string[], name: string): string {
  const i = args.indexOf(name); return i < 0 ? '' : args[i + 1] ?? '';
}
const args = process.argv.slice(2), inFile = flag(args,'--input'), outFile = flag(args,'--output');
if (!inFile || !outFile) { console.error('Provide --input and --output'); process.exit(2); }
const rows = csvParse(fs.readFileSync(inFile,'utf8').replace(/^\uFEFF/,''));
const head = rows.shift() || [];
const urlCol = head.findIndex(h => ['url','page'].includes(h.trim().toLowerCase()));
const reasonCol = head.findIndex(h => ['gsc reason','reason','status'].includes(h.trim().toLowerCase()));
if (urlCol < 0) throw new Error('Input CSV needs URL column');
const gone = new Set(GONE_PATHS_RAW.map(normalizePath));
const count: Record<string,number> = {};
const output = [['URL','GSC reason','Path','Current registry state','Registry target','Manifest state','Provisional action','Google live index status','Traffic/backlink check','Live HTTP status','Reviewer decision','Notes']];
const seenPaths = new Set<string>();
let duplicates = 0;
for (const row of rows) {
  const raw = row[urlCol] ?? '';
  let path = '', state = '', target = '', manifestState = '';
  try {
    const u = new URL(raw);
    if (!['https:', 'http:'].includes(u.protocol)) throw new Error('invalid_protocol');
    const allowedHosts = new Set(['xn--c3c3a0aa6cvaf8b9dze.com','www.xn--c3c3a0aa6cvaf8b9dze.com']);
    if (!allowedHosts.has(u.hostname.toLowerCase())) throw new Error('foreign_host');
    path = normalizePath(decodeURI(u.pathname));
    if (seenPaths.has(path)) duplicates++;
    seenPaths.add(path);
    const red = REDIRECT_MAP.get(path);
    const man = SEO_MANIFEST_MAP.get(path);
    manifestState = man?.state ?? '';
    state = red ? '301' : gone.has(path) ? '410' : man?.state === 'INDEX' ? 'INDEX' : 'UNKNOWN_OR_LEGACY';
    target = red?.target ?? '';
    // resolveSeo is read-only; detect mismatches between resolver and registry
    const resolved = resolveSeo(path);
    if (red && resolved.httpStatus !== 301) state += '_RESOLVER_MISMATCH';
    if (gone.has(path) && resolved.httpStatus !== 410) state += '_RESOLVER_MISMATCH';
  } catch { state = 'MALFORMED_URL'; }
  const action = state.startsWith('INDEX') ? 'P0_INSPECT_LIVE_GOOGLE_PRESERVE' :
    state.startsWith('301') ? 'VERIFY_TARGET_200_RELEVANCE_AND_LINKS' :
    state.startsWith('410') ? 'REVIEW_HISTORIC_EQUITY_BEFORE_CHANGE' :
    state === 'MALFORMED_URL' ? 'MANUAL_REVIEW' : 'REVIEW_OLD_URL_SEARCH_EQUITY';
  count[state] = (count[state] || 0) + 1;
  const notes = state === 'MALFORMED_URL' ? 'Inspect input host, protocol and path' : 'GSC exclusion reason is historical; no live HTTP or current Google index verification';
  output.push([raw, reasonCol>=0?row[reasonCol]:'',path,state,target,manifestState,action,'NOT_VERIFIED','NOT_VERIFIED','NOT_VERIFIED','PENDING_OWNER_REVIEW',notes]);
}
fs.writeFileSync(outFile, output.map(row=>row.map(esc).join(',')).join('\n')+'\n','utf8');
console.log(JSON.stringify({inputRows:rows.length,distinctPaths:seenPaths.size,duplicatePathRows:duplicates,outputRows:output.length-1,states:count,productionChanged:false,output:outFile},null,2));
