/** RECOVERY P3 — Core Money Ranking + Trust / Proof / E-E-A-T Gate */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runContentHygieneAudit } from './content-hygiene-audit.mjs';

const __filename=fileURLToPath(import.meta.url);
const root=path.resolve(path.dirname(__filename),'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const exists=rel=>fs.existsSync(path.join(root,rel));
const blockers=[];
const warnings=[];

const corePages=[
  ['src/pages/รับซื้อโน๊ตบุ๊ค.astro','/รับซื้อโน๊ตบุ๊ค/'],
  ['src/pages/รับซื้อคอม.astro','/รับซื้อคอม/'],
  ['src/pages/รับซื้อแมคบุ๊ค.astro','/รับซื้อแมคบุ๊ค/'],
  ['src/pages/รับซื้อไอโฟน.astro','/รับซื้อไอโฟน/'],
  ['src/pages/รับซื้อไอแพด.astro','/รับซื้อไอแพด/'],
  ['src/pages/รับซื้อกล้อง.astro','/รับซื้อกล้อง/']
];
const trustPages=['/เกี่ยวกับเรา/','/ความน่าเชื่อถือ/'];
const expected={INDEX:86,HOLD_NOINDEX:31,DRAFT:29,REDIRECT:53,GONE:206};

function parseExplicit(text){const m=new Map(); const re=/\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?state:\s*['"]([A-Z_]+)['"][\s\S]*?\}/g; for(const x of text.matchAll(re))m.set(x[1],x[2]); return m;}
function parseMapped(text,name){const re=new RegExp(`export const ${name}:[\\s\\S]*?= \\[([\\s\\S]*?)\\]\\.map\\(p => \\(\\{([\\s\\S]*?)\\}\\)\\);`); const m=text.match(re); if(!m)return[]; const st=(m[2].match(/state:\s*'([A-Z_]+)'/)||[])[1]; return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>[x[1],st]);}
function build(){const mf=read('src/config/seo/manifest.ts'), pl=read('src/config/planned-pages.ts'), rd=read('src/config/seo/redirects.ts'), gn=read('src/config/seo/gone.ts'); const states=parseExplicit(mf); for(const [p,s] of parseExplicit(pl))states.set(p,s); for(const n of ['HOLD_NOINDEX_SURVIVORS','UNREVIEWED_LEGACY_PATHS'])for(const [p,s] of parseMapped(mf,n))states.set(p,s); const rules=[...rd.matchAll(/\{\s*source:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'/g)].map(m=>({source:m[1],target:m[2]})); for(const r of rules)if(!states.has(r.source))states.set(r.source,'REDIRECT'); const gm=gn.match(/GONE_PATHS_RAW[^=]*= \[([\s\S]*?)\];/); const gp=gm?[...gm[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>x[1]):[]; for(const p of gp)if(!states.has(p))states.set(p,'GONE'); return {states,rules,mf};}
const {states,rules,mf}=build();
const counts={}; for(const s of states.values())counts[s]=(counts[s]||0)+1;
for(const [k,v] of Object.entries(expected)) if((counts[k]||0)!==v) blockers.push(`Lifecycle ${k}: ${counts[k]||0} != ${v}`);
if(states.size!==405) blockers.push(`Controlled URL total ${states.size} != 405`);

for(const [file,url] of corePages){
  if(states.get(url)!=='INDEX') blockers.push(`Core money page not INDEX: ${url}`);
  if(!exists(file)){blockers.push(`Core page missing: ${file}`); continue;}
  const s=read(file);
  if(!s.includes("import CoreMoneyAuthority")) blockers.push(`Core authority import missing: ${file}`);
  if(!s.includes('<CoreMoneyAuthority')) blockers.push(`Core authority section missing: ${file}`);
  if(!s.includes('valuationFactors={[')) blockers.push(`Valuation factors missing: ${file}`);
  if(!s.includes('supportLinks={[')) blockers.push(`Topical support links missing: ${file}`);
}

const component=read('src/components/CoreMoneyAuthority.astro');
for(const needle of ['/เช็กราคาก่อนขาย/','/ความน่าเชื่อถือ/','/เกี่ยวกับเรา/','/contact/','contactPerson','ราคาสุดท้าย','Password, PIN, OTP']){
  if(!component.includes(needle)) blockers.push(`CoreMoneyAuthority missing trust signal: ${needle}`);
}
if(!component.includes('4 กันยายน 2026')) blockers.push('CoreMoneyAuthority review date missing');

for(const url of trustPages){
  if(states.get(url)!=='INDEX') blockers.push(`Trust page not INDEX: ${url}`);
  const i=mf.indexOf(`path: '${url}'`); const e=i>=0?mf.indexOf('\n  },',i):-1; const bl=i>=0&&e>i?mf.slice(i,e):'';
  if(!/contentStatus:\s*'READY'/.test(bl)) blockers.push(`Trust manifest not READY: ${url}`);
  if(!/primaryIntent:\s*'trust'/.test(bl)) blockers.push(`Trust intent missing: ${url}`);
}

const about=read('src/pages/เกี่ยวกับเรา.astro');
const trust=read('src/pages/ความน่าเชื่อถือ.astro');
for(const [name,s] of [['about',about],['trust',trust]]){
  if(s.length<3500) blockers.push(`${name} page too thin (${s.length} chars)`);
  for(const bad of ['100%','จ่ายสดทันที','รับรองและตรวจสอบว่าอุปกรณ์ทุกเครื่อง','ของหลุดจำนำ','รีวิว 5 ดาว','ลูกค้ากว่า']) if(s.includes(bad)) blockers.push(`${name} page contains unverifiable claim: ${bad}`);
}
for(const needle of ['contactPerson','getDisplayLine','getDisplayPhone']) if(!about.includes(needle) || !trust.includes(needle)) blockers.push(`Visible operator/contact evidence missing: ${needle}`);

const bar=read('src/components/TrustBar.astro');
for(const bad of ['ลบข้อมูลส่วนบุคคลมาตรฐาน','ตรวจสอบและชำระเงินทันที','ถูกต้องตามกฎหมาย','ของโจร','100%']) if(bar.includes(bad)) blockers.push(`TrustBar risky claim remains: ${bad}`);
for(const good of ['ประเมินจากข้อมูลจริง','ราคาออนไลน์เป็นเบื้องต้น','ไม่ต้องส่งรหัสผ่าน','ช่องทางติดต่อชัดเจน']) if(!bar.includes(good)) blockers.push(`TrustBar evidence-first copy missing: ${good}`);

const business=read('src/config/business.ts');
for(const bad of ['Data Privacy) อย่างปลอดภัยตามมาตรฐาน','นัดรับสะดวก รวดเร็ว ปลอดภัย']) if(business.includes(bad)) blockers.push(`Business value prop risky claim remains: ${bad}`);

const home=read('src/pages/index.astro');
if(!home.includes('<TrustBar />')) blockers.push('Homepage trust evidence bar missing');
const footer=read('src/components/Footer.astro');
for(const link of ['/เช็กราคาก่อนขาย/','/ความน่าเชื่อถือ/','/เกี่ยวกับเรา/','/terms/','/privacy-policy/','/contact/']) if(!footer.includes(link)) blockers.push(`Footer trust/navigation link missing: ${link}`);

// Core manifest records should point to the trust layer and valuation guide.
for(const [,url] of corePages){
  const i=mf.indexOf(`path: '${url}'`); const e=i>=0?mf.indexOf('\n  },',i):-1; const bl=i>=0&&e>i?mf.slice(i,e):'';
  for(const req of ['/เช็กราคาก่อนขาย/','/ความน่าเชื่อถือ/','/เกี่ยวกับเรา/']) if(!bl.includes(req)) blockers.push(`Core manifest authority link missing: ${url} -> ${req}`);
}

// No fake physical-branch schema/address introduced in P3.
const schema=read('src/lib/seo/schema.ts');
if(!schema.includes('knowsAbout: BUSINESS_FACTS.VERIFIED.acceptedCategories')) blockers.push('Organization expertise topics (knowsAbout) missing');
if(schema.includes("'@type': 'LocalBusiness'")) blockers.push('Unexpected LocalBusiness schema introduced without configured physical address');
if(/streetAddress\s*:/.test(schema)) warnings.push('Schema contains streetAddress field; verify it remains conditional before release');

const hygiene=runContentHygieneAudit();
if(!hygiene.ok) blockers.push(`Content hygiene ${hygiene.findings.length} finding(s)`);

console.log('\nRECOVERY P3 — CORE MONEY RANKING + TRUST / PROOF / E-E-A-T AUDIT');
console.log('Lifecycle:',JSON.stringify(counts));
console.log(`Core money pages enhanced: ${corePages.length}; trust pages promoted: ${trustPages.length}; redirects unchanged: ${rules.length}`);
if(warnings.length){console.log(`WARNINGS: ${warnings.length}`); warnings.forEach(x=>console.log('- '+x));}
if(blockers.length){console.error(`FAIL: ${blockers.length} blocker(s)`); blockers.forEach(x=>console.error('- '+x)); process.exit(1);}
console.log('PASS: core money-page authority, visible reviewer/process evidence, trust pages, conservative claims, internal trust links and prior hygiene remain consistent.');
