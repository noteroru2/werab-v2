/**
 * RECOVERY P4 artifact generator.
 * Pure Node.js: no project dependencies required.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const root=path.resolve(path.dirname(__filename),'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const write=(rel,data)=>{const p=path.join(root,rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,data,'utf8');};
const csvEscape=v=>{const s=String(v??'');return /[",\n\r]/.test(s)?`"${s.replaceAll('"','""')}"`:s;};
const toCsv=(headers,rows)=>'\ufeff'+[headers.join(','),...rows.map(r=>headers.map(h=>csvEscape(r[h])).join(','))].join('\n')+'\n';

function parseExplicit(text){const m=new Map(); const re=/\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?state:\s*['"]([A-Z_]+)['"][\s\S]*?\}/g; for(const x of text.matchAll(re))m.set(x[1],x[2]); return m;}
function parseMapped(text,name){const re=new RegExp(`export const ${name}:[\\s\\S]*?= \\[([\\s\\S]*?)\\]\\.map\\(p => \\(\\{([\\s\\S]*?)\\}\\)\\);`); const m=text.match(re); if(!m)return[]; const st=(m[2].match(/state:\s*'([A-Z_]+)'/)||[])[1]; return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>[x[1],st]);}
function buildState(){const mf=read('src/config/seo/manifest.ts'),pl=read('src/config/planned-pages.ts'),rd=read('src/config/seo/redirects.ts'),gn=read('src/config/seo/gone.ts');const states=parseExplicit(mf);for(const [p,s] of parseExplicit(pl))states.set(p,s);for(const n of ['HOLD_NOINDEX_SURVIVORS','UNREVIEWED_LEGACY_PATHS'])for(const [p,s] of parseMapped(mf,n))states.set(p,s);const rules=[...rd.matchAll(/\{\s*source:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'/g)].map(m=>({source:m[1],target:m[2]}));for(const r of rules)if(!states.has(r.source))states.set(r.source,'REDIRECT');const gm=gn.match(/GONE_PATHS_RAW[^=]*= \[([\s\S]*?)\];/);const gone=gm?[...gm[1].matchAll(/['"]([^'"]+)['"]/g)].map(x=>x[1]):[];for(const p of gone)if(!states.has(p))states.set(p,'GONE');return{states,rules,gone,mf};}
function recordBlock(mf,p){const marker=`path: '${p}'`;const i=mf.indexOf(marker);if(i<0)return'';const e=mf.indexOf('\n  },',i);return e>i?mf.slice(i,e):'';}
function field(block,name){const m=block.match(new RegExp(`${name}:\\s*['\"]([^'\"]+)['\"]`));return m?.[1]||'';}
function mdDates(){const map=new Map();const base=path.join(root,'src/content/pages');function walk(d){for(const ent of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,ent.name);if(ent.isDirectory())walk(p);else if(ent.isFile()&&ent.name.endsWith('.md')){const raw=fs.readFileSync(p,'utf8');const fm=(raw.match(/^---\s*\n([\s\S]*?)\n---/)||[])[1]||'';const slug=(fm.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)||[])[1];if(!slug)continue;const u=(fm.match(/^updatedDate:\s*["']?([^"'\n]+)["']?\s*$/m)||[])[1];const pub=(fm.match(/^pubDate:\s*["']?([^"'\n]+)["']?\s*$/m)||[])[1];const clean=slug.trim().replace(/^\/+|\/+$/g,'');map.set('/'+clean+'/',(u||pub||'').trim());}}}if(fs.existsSync(base))walk(base);return map;}

const site=(read('src/config/business.ts').match(/siteUrl:\s*'([^']+)'/)||[])[1];
if(!site)throw new Error('siteUrl not found');
const {states,rules,gone,mf}=buildState();
const dates=mdDates();
const index=[...states.entries()].filter(([,s])=>s==='INDEX').map(([p])=>p).sort((a,b)=>a.localeCompare(b,'th'));

const sitemapRows=index.map(p=>{const b=recordBlock(mf,p);const lm=dates.get(p)||field(b,'lastmod');return{path:p,url:site+p,lastmod:lm,lastmodSource:dates.has(p)?'CONTENT_FRONTMATTER':lm?'MANIFEST_SIGNIFICANT_UPDATE':'OMITTED_NO_VERIFIED_DATE',gscPriority:field(b,'gscPriority')||'normal'};});
write('reports/seo/p4-expected-sitemap.csv',toCsv(['path','url','lastmod','lastmodSource','gscPriority'],sitemapRows));

const equity=JSON.parse(read('reports/seo/url-equity-master.json'));
const eq=new Map(equity.map(r=>[r.path,r]));
const requestPaths=[
  ['/',1,'HOME_RELEASE','Release discovery and site-level recrawl'],
  ['/รับซื้อ/',2,'CORE_HUB','Primary commercial hub'],
  ['/รับซื้อโน๊ตบุ๊ค/',3,'CORE_MONEY','Notebook core ranking owner'],
  ['/รับซื้อคอม/',4,'CORE_MONEY','Computer core ranking owner'],
  ['/รับซื้อแมคบุ๊ค/',5,'CORE_MONEY','MacBook core ranking owner'],
  ['/รับซื้อไอโฟน/',6,'CORE_MONEY','iPhone core ranking owner'],
  ['/รับซื้อไอแพด/',7,'CORE_MONEY','iPad core ranking owner'],
  ['/รับซื้อกล้อง/',8,'CORE_MONEY','Camera core ranking owner'],
  ['/เช็กราคาก่อนขาย/',9,'VALUATION_HUB','Seller valuation support hub'],
  ['/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/',10,'HISTORICAL_WINNER','Historical notebook winner: highest measured IT click equity'],
  ['/รับซื้อคอม-อุดรธานี/',11,'HISTORICAL_WINNER','Historical computer winner'],
  ['/รับซื้อคอม-ขอนแก่น/',12,'HISTORICAL_WINNER','Historical computer winner'],
  ['/รับซื้อโทรศัพท์มือถือ-จ/',13,'HISTORICAL_WINNER','Historical mobile winner'],
  ['/รับซื้อโน๊ตบุ๊ค-บุรีรัม/',14,'HISTORICAL_WINNER','Historical notebook winner'],
  ['/รับซื้อมือถือ-อุบล/',15,'HISTORICAL_WINNER','Historical mobile winner']
];
const reqRows=requestPaths.map(([p,priority,role,reason])=>{const e=eq.get(p)||{};return{priority,path:p,url:site+p,role,requestMethod:'GSC_URL_INSPECTION_REQUEST_INDEXING',afterDeployOnly:'YES',historicalClicks90d:e.clicks90d??'',historicalImpressions90d:e.impressions90d??'',historicalPosition90d:e.position90d??'',reason};});
write('reports/seo/p4-index-request-priority.csv',toCsv(['priority','path','url','role','requestMethod','afterDeployOnly','historicalClicks90d','historicalImpressions90d','historicalPosition90d','reason'],reqRows));

const baselinePaths=[...new Set([
  '/', '/รับซื้อ/', '/รับซื้อโน๊ตบุ๊ค/','/รับซื้อคอม/','/รับซื้อแมคบุ๊ค/','/รับซื้อไอโฟน/','/รับซื้อไอแพด/','/รับซื้อกล้อง/','/เช็กราคาก่อนขาย/','/ความน่าเชื่อถือ/','/เกี่ยวกับเรา/',
  ...requestPaths.slice(9).map(x=>x[0]),
  '/รับซื้อโน๊ตบุ๊ค-asus/','/รับซื้อโน๊ตบุ๊ค-lenovo/','/รับซื้อกล้อง-sony/','/รับซื้อกล้อง-canon/','/รับซื้อ-macbook-air/','/รับซื้อ-iphone-13/','/สภาพสินค้า/แบตเสื่อม/','/สภาพสินค้า/จอแตก/'
])];
function roleFor(p){if(p==='/')return'HOME';if(p==='/รับซื้อ/')return'CORE_HUB';if(['/รับซื้อโน๊ตบุ๊ค/','/รับซื้อคอม/','/รับซื้อแมคบุ๊ค/','/รับซื้อไอโฟน/','/รับซื้อไอแพด/','/รับซื้อกล้อง/'].includes(p))return'CORE_MONEY';if(p==='/เช็กราคาก่อนขาย/')return'VALUATION_HUB';if(['/ความน่าเชื่อถือ/','/เกี่ยวกับเรา/'].includes(p))return'TRUST';if(p.startsWith('/สภาพสินค้า/'))return'CONDITION_SUPPORT';if(p.includes('asus')||p.includes('lenovo')||p.includes('sony')||p.includes('canon')||p.includes('macbook-air')||p.includes('iphone-13'))return'BRAND_SERIES_SUPPORT';return'HISTORICAL_WINNER';}
const baselineRows=baselinePaths.map(p=>{const e=eq.get(p)||{};return{path:p,url:site+p,role:roleFor(p),historicalWindowStart:e.windowStart||'',historicalWindowEnd:e.windowEnd||'',historicalClicks90d:e.clicks90d||'',historicalImpressions90d:e.impressions90d||'',historicalPosition90d:e.position90d||'',releaseBaselineDate:'TBD_AFTER_SUCCESSFUL_DEPLOY',currentClicks:'',currentImpressions:'',currentCtr:'',currentPosition:'',currentGscStatus:'REQUIRES_POST_DEPLOY_GSC_EXPORT',notes:e.metricWindow==='NO_HISTORICAL_METRICS'?'No historical metrics; start clean post-deploy observation series':'Historical metrics retained only; do not treat as current performance'};});
write('reports/seo/p4-gsc-observation-baseline.csv',toCsv(['path','url','role','historicalWindowStart','historicalWindowEnd','historicalClicks90d','historicalImpressions90d','historicalPosition90d','releaseBaselineDate','currentClicks','currentImpressions','currentCtr','currentPosition','currentGscStatus','notes'],baselineRows));

const checkpoints=[
{checkpoint:'D+0',focus:'Release/indexing',action:'Submit sitemap once after live gate passes; request indexing only priority queue URLs',decision:'No expansion'},
{checkpoint:'D+3',focus:'Discovery/crawl',action:'Inspect sitemap status and URL Inspection sample; record Google-selected canonical and last crawl',decision:'Fix technical blockers only'},
{checkpoint:'D+7',focus:'Impression recovery',action:'Compare page/query impressions for six core clusters and historical winners',decision:'Do not rewrite pages from 1-3 days of noise'},
{checkpoint:'D+14',focus:'Query→page ownership',action:'Review cannibalization, canonical selection, indexed/not-indexed reasons and winners',decision:'Targeted title/internal-link adjustments only if evidence is clear'},
{checkpoint:'D+28',focus:'Recovery decision',action:'Compare clicks, impressions, CTR and average position against release baseline and historical reference',decision:'Approve P5 expansion only if crawl/index stability and topic signals are healthy'}
];
write('reports/seo/p4-observation-checkpoints.csv',toCsv(['checkpoint','focus','action','decision'],checkpoints));

const summary={date:'2026-09-04',phase:'RECOVERY P4 — PRODUCTION RELEASE GATE + SITEMAP / INDEX REQUEST + GSC OBSERVATION BASELINE',releaseVersion:'recovery-p4-2026-09-04',controlledUrls:states.size,lifecycleCounts:Object.fromEntries([...states.values()].reduce((m,s)=>m.set(s,(m.get(s)||0)+1),new Map())),expectedSitemapUrls:index.length,redirectRules:rules.length,goneUrls:gone.length,indexRequestPriorityUrls:reqRows.length,gscBaselineRows:baselineRows.length,productionPreDeployVerdict:'NO_GO_PRODUCTION_PARITY_FAIL',indexRequestExecution:'NOT_EXECUTED_REQUIRES_GSC_ACCESS_AFTER_DEPLOY',gscCurrentBaseline:'NOT_AVAILABLE_IN_REPO_REQUIRES_POST_DEPLOY_EXPORT'};
write('reports/seo/p4-summary.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
