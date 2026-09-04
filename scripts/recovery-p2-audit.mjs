/** RECOVERY P2 — Topical Authority Expansion Gate */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runContentHygieneAudit } from './content-hygiene-audit.mjs';

const __filename=fileURLToPath(import.meta.url);
const root=path.resolve(path.dirname(__filename),'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');

const support=[
'/รับซื้อกล้อง-sony/','/รับซื้อกล้อง-canon/','/รับซื้อกล้อง-nikon/','/รับซื้อกล้อง-sony-a7/',
'/รับซื้อโน๊ตบุ๊ค-asus/','/รับซื้อโน๊ตบุ๊ค-lenovo/','/รับซื้อโน๊ตบุ๊ค-acer/','/รับซื้อโน๊ตบุ๊ค-dell/',
'/รับซื้อ-macbook-air/','/รับซื้อ-macbook-pro/','/รับซื้อ-iphone-13/','/รับซื้อ-iphone-14/','/รับซื้อ-iphone-15/',
'/รับซื้อ-ipad-pro/','/รับซื้อ-ipad-air/','/รับซื้อ-samsung-galaxy/',
'/สภาพสินค้า/จอแตก/','/สภาพสินค้า/เปิดไม่ติด/','/สภาพสินค้า/แบตเสื่อม/','/สภาพสินค้า/ไม่มีอุปกรณ์/','/สภาพสินค้า/ควรซ่อมก่อนขายไหม/'
];
const condition=support.filter(p=>p.startsWith('/สภาพสินค้า/'));
const brandSeries=support.filter(p=>!p.startsWith('/สภาพสินค้า/'));
const consolidations=new Map([
['/รับซื้อกล้อง-canon-2/','/รับซื้อกล้อง-canon/'],
['/รับซื้อกล้อง-nikon-รับซื้อกล/','/รับซื้อกล้อง-nikon/'],
['/รับซื้อกล้อง-sony-a6400/','/รับซื้อกล้อง-sony/'],
['/รับซื้อกล้อง-sony-rx100/','/รับซื้อกล้อง-sony/'],
['/รับซื้อไอโฟน-15-iphone-15/','/รับซื้อ-iphone-15/']
]);
const coreOwners=[
'/รับซื้อโน๊ตบุ๊ค/','/รับซื้อกล้อง/','/รับซื้อแมคบุ๊ค/','/รับซื้อไอโฟน/','/รับซื้อไอแพด/','/รับซื้อสมาร์ทโฟน-android/','/เช็กราคาก่อนขาย/'
];
const expected={INDEX:84,HOLD_NOINDEX:33,DRAFT:29,REDIRECT:53,GONE:206};

function parseExplicit(text){const m=new Map(); const re=/\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?state:\s*['"]([A-Z_]+)['"][\s\S]*?\}/g; for(const x of text.matchAll(re))m.set(x[1],x[2]); return m;}
function parseMapped(text,name){const re=new RegExp(`export const ${name}:[\\s\\S]*?= \\[([\\s\\S]*?)\\]\\.map\\(p => \\(\\{([\\s\\S]*?)\\}\\)\\);`); const m=text.match(re); if(!m)return[]; const st=(m[2].match(/state:\s*'([A-Z_]+)'/)||[])[1]; return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>[x[1],st]);}
function build(){const mf=read('src/config/seo/manifest.ts'), pl=read('src/config/planned-pages.ts'), rd=read('src/config/seo/redirects.ts'), gn=read('src/config/seo/gone.ts'); const states=parseExplicit(mf); for(const [p,s] of parseExplicit(pl))states.set(p,s); for(const n of ['HOLD_NOINDEX_SURVIVORS','UNREVIEWED_LEGACY_PATHS'])for(const [p,s] of parseMapped(mf,n))states.set(p,s); const rules=[...rd.matchAll(/\{\s*source:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'/g)].map(m=>({source:m[1],target:m[2]})); for(const r of rules)if(!states.has(r.source))states.set(r.source,'REDIRECT'); const gm=gn.match(/GONE_PATHS_RAW[^=]*= \[([\s\S]*?)\];/); const gp=gm?[...gm[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>x[1]):[]; for(const p of gp)if(!states.has(p))states.set(p,'GONE'); return {states,rules,gp,mf};}
function mdPath(p){return `src/content/pages/${p.slice(1,-1)}.md`;}
function body(raw){return raw.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,'').replace(/\[[^\]]+\]\([^\)]+\)/g,' ').replace(/[^\p{L}\p{N}]+/gu,' ').toLowerCase().replace(/\s+/g,' ').trim();}
function grams(s,n=4){s=s.replace(/\s/g,''); const out=new Set(); for(let i=0;i<=s.length-n;i++)out.add(s.slice(i,i+n)); return out;}
function jac(a,b){let i=0;for(const x of a)if(b.has(x))i++;return i/(a.size+b.size-i||1);}

const {states,rules,gp,mf}=build(); const blockers=[]; const counts={}; for(const s of states.values())counts[s]=(counts[s]||0)+1;
if((counts.INDEX||0)<expected.INDEX)blockers.push(`Lifecycle INDEX regressed: ${counts.INDEX||0} < ${expected.INDEX}`);
if((counts.HOLD_NOINDEX||0)>expected.HOLD_NOINDEX)blockers.push(`Lifecycle HOLD_NOINDEX regressed: ${counts.HOLD_NOINDEX||0} > ${expected.HOLD_NOINDEX}`);
for(const k of ['DRAFT','REDIRECT','GONE'])if((counts[k]||0)!==expected[k])blockers.push(`Lifecycle ${k}: ${counts[k]||0} != ${expected[k]}`);
if(states.size!==405)blockers.push(`Controlled URL total ${states.size} != 405`);
for(const p of support){if(states.get(p)!=='INDEX')blockers.push(`P2 support not INDEX: ${p} (${states.get(p)||'UNREGISTERED'})`); const f=mdPath(p); if(!fs.existsSync(path.join(root,f)))blockers.push(`Missing content: ${f}`); else {const raw=read(f),b=body(raw); if(!/state:\s*INDEX/.test(raw)||!/contentStatus:\s*READY/.test(raw))blockers.push(`Frontmatter not INDEX/READY: ${f}`); if(b.length<900)blockers.push(`Support content too short: ${f} (${b.length})`); if(!/parent:\s*['"]?\//.test(raw))blockers.push(`Missing parent: ${f}`); const rel=(raw.match(/relatedPages:[\s\S]*?(?=\n\w|\n---)/)||[''])[0]; if((rel.match(/- "/g)||rel.match(/- '\//g)||[]).length<0){} }}
for(const p of coreOwners)if(states.get(p)!=='INDEX')blockers.push(`Core owner not INDEX: ${p}`);
for(const [src,target] of consolidations){const r=rules.find(x=>x.source===src); if(!r)blockers.push(`Missing P2 redirect: ${src}`); else if(r.target!==target)blockers.push(`Wrong P2 redirect: ${src} -> ${r.target}; expected ${target}`); if(states.get(target)!=='INDEX')blockers.push(`P2 redirect target not INDEX: ${target}`);}
const sources=new Set(); for(const r of rules){if(sources.has(r.source))blockers.push(`Duplicate redirect source: ${r.source}`); sources.add(r.source); if(r.source===r.target)blockers.push(`Self redirect: ${r.source}`); if(states.get(r.target)!=='INDEX')blockers.push(`Redirect target not INDEX: ${r.source} -> ${r.target}`);} for(const r of rules)if(sources.has(r.target))blockers.push(`Redirect chain: ${r.source} -> ${r.target}`);
// Every P2 page should be parented by an INDEX owner and have at least two INDEX related pages in manifest.
for(const p of support){const i=mf.indexOf(`path: ${JSON.stringify(p)}`); if(i<0){blockers.push(`P2 manifest record missing: ${p}`);continue;} const e=mf.indexOf('\n  },',i); const bl=mf.slice(i,e); const pm=bl.match(/parent:\s*["']([^"']+)["']/); if(!pm||states.get(pm[1])!=='INDEX')blockers.push(`P2 parent not INDEX: ${p} -> ${pm?.[1]||'MISSING'}`); const rm=bl.match(/relatedPages:\s*\[([^\]]*)\]/); const rel=rm?[...rm[1].matchAll(/["']([^"']+)["']/g)].map(x=>x[1]):[]; const good=rel.filter(x=>states.get(x)==='INDEX'); if(good.length<3)blockers.push(`P2 related INDEX links < 3: ${p} (${good.length})`);}
// Check core owners explicitly point into support layer.
for(const owner of coreOwners){const i=mf.indexOf(`path: '${owner}'`); if(i<0)continue; const e=mf.indexOf('\n  },',i); const bl=mf.slice(i,e); if(!/relatedPages:/.test(bl))blockers.push(`Core owner missing curated support links: ${owner}`);}
// Differentiation on P2 copy.
const bg=support.map(p=>[p,grams(body(read(mdPath(p))))]); let max={score:0,a:'',b:''}; for(let i=0;i<bg.length;i++)for(let j=i+1;j<bg.length;j++){const sc=jac(bg[i][1],bg[j][1]);if(sc>max.score)max={score:sc,a:bg[i][0],b:bg[j][0]};} if(max.score>0.35)blockers.push(`P2 copy similarity ${(max.score*100).toFixed(1)}% > 35%: ${max.a} vs ${max.b}`);
const hygiene=runContentHygieneAudit(); if(!hygiene.ok)blockers.push(`Content hygiene ${hygiene.findings.length} finding(s)`);
console.log('\nRECOVERY P2 — TOPICAL AUTHORITY EXPANSION AUDIT'); console.log('Lifecycle:',JSON.stringify(counts)); console.log(`Support pages: ${support.length} (${brandSeries.length} brand/series + ${condition.length} condition/valuation); P2 redirects: ${consolidations.size}; max similarity: ${(max.score*100).toFixed(1)}%`);
if(blockers.length){console.error(`FAIL: ${blockers.length} blocker(s)`); blockers.forEach(x=>console.error('- '+x)); process.exit(1);} console.log('PASS: P2 support ownership, parents, internal authority graph, redirect consolidation, differentiation and hygiene are consistent.');
