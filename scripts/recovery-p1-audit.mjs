/** RECOVERY P1 — Historical Winner Rebuild + Core Money Authority Gate */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runContentHygieneAudit } from './content-hygiene-audit.mjs';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');

const restored = [
  '/รับซื้อเมืองศรีสะเกษ/','/รับซื้อกล้องมือสอง-บริก/','/รับซื้อกล้องถ่ายรูปจัง/',
  '/รับซื้อคอม-ศรีสะเกษ/','/รับซื้อโน๊ตบุ๊ค-บึงกาฬ/','/รับซื้อไอแพด-อุบล/',
  '/รับซื้อโน๊ตบุ๊ค-จังหวัด/','/รับซื้อเมืองอุดรธานี/','/รับซื้อกล้อง-fujifilm-ฟูจิฟิล์ม/',
  '/รับซื้อโน๊ตบุ๊ค-ศรีสะเ-2/','/รับซื้อคอม-สายไหม/'
];
const redirectExpected = new Map([
  ['/รับซื้อโทรศัพท์-อุบล/','/รับซื้อมือถือ-อุบล/'],
  ['/รับซื้อโน๊ตบุ๊ค-notebook/','/รับซื้อโน๊ตบุ๊ค/']
]);
const expectedFloor = { INDEX:63, REDIRECT:48 }; const expectedGone = 206;
const contentFileByPath = new Map(restored.map(p => [p, `src/content/pages/${p.slice(1,-1)}.md`]));
const authoritySources = {
  '/รับซื้อเมืองศรีสะเกษ/':['src/pages/รับซื้อแมคบุ๊ค.astro','src/pages/รับซื้อไอโฟน.astro','src/pages/รับซื้อไอแพด.astro'],
  '/รับซื้อเมืองอุดรธานี/':['src/pages/รับซื้อแมคบุ๊ค.astro','src/pages/รับซื้อไอโฟน.astro','src/pages/รับซื้อไอแพด.astro'],
  '/รับซื้อกล้องมือสอง-บริก/':['src/pages/รับซื้อกล้อง.astro'],
  '/รับซื้อกล้องถ่ายรูปจัง/':['src/pages/รับซื้อกล้อง.astro'],
  '/รับซื้อกล้อง-fujifilm-ฟูจิฟิล์ม/':['src/pages/รับซื้อกล้อง.astro'],
  '/รับซื้อคอม-ศรีสะเกษ/':['src/pages/รับซื้อคอม.astro'],
  '/รับซื้อคอม-สายไหม/':['src/pages/รับซื้อคอม.astro'],
  '/รับซื้อโน๊ตบุ๊ค-บึงกาฬ/':['src/pages/รับซื้อโน๊ตบุ๊ค.astro'],
  '/รับซื้อโน๊ตบุ๊ค-จังหวัด/':['src/pages/รับซื้อโน๊ตบุ๊ค.astro'],
  '/รับซื้อโน๊ตบุ๊ค-ศรีสะเ-2/':['src/pages/รับซื้อโน๊ตบุ๊ค.astro'],
  '/รับซื้อไอแพด-อุบล/':['src/pages/รับซื้อไอแพด.astro']
};

function parseExplicitRecords(text) {
  const map = new Map();
  const re = /\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?state:\s*['"]([A-Z_]+)['"][\s\S]*?\}/g;
  for (const m of text.matchAll(re)) map.set(m[1], m[2]);
  return map;
}
function parseMappedArray(text, name) {
  const re = new RegExp(`export const ${name}:[\\s\\S]*?= \\[([\\s\\S]*?)\\]\\.map\\(p => \\(\\{([\\s\\S]*?)\\}\\)\\);`);
  const m = text.match(re); if (!m) return [];
  const state = (m[2].match(/state:\s*'([A-Z_]+)'/) || [])[1];
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x => [x[1],state]);
}
function build() {
  const manifest=read('src/config/seo/manifest.ts'), planned=read('src/config/planned-pages.ts'), redirects=read('src/config/seo/redirects.ts'), gone=read('src/config/seo/gone.ts');
  const states=parseExplicitRecords(manifest);
  for (const [p,s] of parseExplicitRecords(planned)) states.set(p,s);
  for (const name of ['HOLD_NOINDEX_SURVIVORS','UNREVIEWED_LEGACY_PATHS']) for (const [p,s] of parseMappedArray(manifest,name)) states.set(p,s);
  const rules=[...redirects.matchAll(/\{\s*source:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'/g)].map(m=>({source:m[1],target:m[2]}));
  for (const r of rules) if (!states.has(r.source)) states.set(r.source,'REDIRECT');
  const gm=gone.match(/GONE_PATHS_RAW[^=]*= \[([\s\S]*?)\];/); const gonePaths=gm?[...gm[1].matchAll(/['"]([^'"]+)['"]/g)].map(m=>m[1]):[];
  for (const p of gonePaths) if (!states.has(p)) states.set(p,'GONE');
  return {states,rules,gonePaths};
}
function bodyOf(md) { return md.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '').replace(/\[[^\]]+\]\([^\)]+\)/g,' ').replace(/[^\p{L}\p{N}]+/gu,' ').toLowerCase().replace(/\s+/g,' ').trim(); }
function grams(s,n=4){ s=s.replace(/\s/g,''); const set=new Set(); for(let i=0;i<=s.length-n;i++) set.add(s.slice(i,i+n)); return set; }
function jaccard(a,b){ let inter=0; for(const x of a) if(b.has(x)) inter++; return inter/(a.size+b.size-inter || 1); }

const {states,rules,gonePaths}=build();
const blockers=[]; const counts={}; for(const s of states.values()) counts[s]=(counts[s]||0)+1;
for (const [s,n] of Object.entries(expectedFloor)) if ((counts[s]||0)<n) blockers.push(`Lifecycle ${s} regressed: ${counts[s]||0} < ${n}`);
if ((counts.GONE||0)!==expectedGone) blockers.push(`Lifecycle GONE changed: ${counts.GONE||0} != ${expectedGone}`);
for (const p of restored) {
  if (states.get(p)!=='INDEX') blockers.push(`Restored winner not INDEX: ${p} (${states.get(p)||'UNREGISTERED'})`);
  if (gonePaths.includes(p)) blockers.push(`Restored winner still in GONE registry: ${p}`);
  const f=contentFileByPath.get(p); if (!fs.existsSync(path.join(root,f))) blockers.push(`Missing recovered content file: ${f}`);
  else {
    const raw=read(f), body=bodyOf(raw);
    if (!/state:\s*["']INDEX["']/.test(raw) || !/contentStatus:\s*["']READY["']/.test(raw)) blockers.push(`Recovered content frontmatter not INDEX/READY: ${f}`);
    if (body.length < 1100) blockers.push(`Recovered content too short: ${f} (${body.length} normalized chars < 1100)`);
  }
}
for (const [src,target] of redirectExpected) {
  const r=rules.find(x=>x.source===src); if (!r) blockers.push(`Missing P1 duplicate consolidation: ${src}`); else if(r.target!==target) blockers.push(`Wrong P1 redirect: ${src} -> ${r.target}; expected ${target}`);
  if (states.get(target)!=='INDEX') blockers.push(`P1 redirect target not INDEX: ${target}`);
}
if (states.get('/เช็กราคาก่อนขาย/')!=='INDEX') blockers.push('/เช็กราคาก่อนขาย/ is not INDEX');
for (const [target,files] of Object.entries(authoritySources)) for (const f of files) if (!read(f).includes(`href="${target}"`)) blockers.push(`Missing authority link ${f} -> ${target}`);
for (const f of ['src/pages/รับซื้อโน๊ตบุ๊ค.astro','src/pages/รับซื้อคอม.astro','src/pages/รับซื้อแมคบุ๊ค.astro','src/pages/รับซื้อไอโฟน.astro','src/pages/รับซื้อไอแพด.astro','src/pages/รับซื้อกล้อง.astro']) if(!read(f).includes('href="/เช็กราคาก่อนขาย/"')) blockers.push(`Core money page missing guide link: ${f}`);

const bodies=restored.map(p=>[p,grams(bodyOf(read(contentFileByPath.get(p))))]); let maxSim={score:0,a:'',b:''};
for(let i=0;i<bodies.length;i++) for(let j=i+1;j<bodies.length;j++){ const score=jaccard(bodies[i][1],bodies[j][1]); if(score>maxSim.score)maxSim={score,a:bodies[i][0],b:bodies[j][0]}; }
if(maxSim.score>0.35) blockers.push(`Recovered-page differentiation too low: ${(maxSim.score*100).toFixed(1)}% similarity ${maxSim.a} vs ${maxSim.b}`);

const sources=new Set(); for(const r of rules){ if(sources.has(r.source))blockers.push(`Duplicate redirect source: ${r.source}`); sources.add(r.source); if(r.source===r.target)blockers.push(`Self redirect: ${r.source}`); if(states.get(r.target)!=='INDEX')blockers.push(`Redirect target not INDEX: ${r.source} -> ${r.target}`); }
for(const r of rules) if(sources.has(r.target)) blockers.push(`Redirect chain: ${r.source} -> ${r.target}`);
const hygiene=runContentHygieneAudit(); if(!hygiene.ok) blockers.push(`Content hygiene has ${hygiene.findings.length} finding(s)`);

console.log('\nRECOVERY P1 — HISTORICAL WINNER + MONEY AUTHORITY AUDIT');
console.log('Lifecycle:',JSON.stringify(counts));
console.log(`Restored exact winners: ${restored.length}; P1 consolidations: ${redirectExpected.size}; max recovered-page similarity: ${(maxSim.score*100).toFixed(1)}%`);
if(blockers.length){ console.error(`FAIL: ${blockers.length} blocker(s)`); blockers.forEach(x=>console.error(`- ${x}`)); process.exit(1); }
console.log('PASS: exact historical winners, duplicate consolidation, core authority links, guide support, differentiation and P0 safety are consistent.');
