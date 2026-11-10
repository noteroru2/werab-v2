/**
 * Read-only, live Cloudflare Worker Preview regression audit.
 * Uses real HTTP status and headers, no browser inference.
 * Only staging hostname is accepted; no writes, no production requests.
 * node run: npx tsx scripts/seo-rebuild-preview-live-audit.ts
 */
import fs from 'node:fs';
import { RAW_REDIRECT_RULES } from '../src/config/seo/redirects';
import { GONE_PATHS_RAW } from '../src/config/seo/gone';
import { normalizePath } from '../src/lib/seo/normalize';

const preview = 'https://seo-rebuild-staging-2026-11-10-werab-v2.noteroru2.workers.dev';
const production = 'https://xn--c3c3a0aa6cvaf8b9dze.com';
if (!preview.includes('staging-2026-11-10-werab-v2.') || !preview.endsWith('.workers.dev')) throw new Error('Unsafe preview origin');

interface Result { path: string; type: string; status: number|string; ok: boolean; detail: string; }
const results: Result[] = [];
const timeout = 12000;
const accessId = process.env.CF_ACCESS_CLIENT_ID || '';
const accessSecret = process.env.CF_ACCESS_CLIENT_SECRET || '';
const accessHeaders = accessId && accessSecret ? { 'CF-Access-Client-Id': accessId, 'CF-Access-Client-Secret': accessSecret } : {};


function pathFrom(url: string): string { return normalizePath(decodeURI(new URL(url).pathname)); }
async function get(path: string): Promise<{status:number; headers:Headers; body:string}> {
  const u = new URL(path, preview);
  if (u.origin !== preview) throw new Error('Refusing off-staging request');
  const res = await fetch(u, {redirect:'manual', headers:accessHeaders, signal:AbortSignal.timeout(timeout)});
  return {status:res.status, headers:res.headers, body:await res.text()};
}
function add(path:string,type:string,status:number|string,ok:boolean,detail:string) {
  results.push({path,type,status,ok,detail});
}
async function batch(items: Array<{path:string; type:string; target?:string}>, limit=8) {
  for(let i=0;i<items.length;i+=limit) {
    await Promise.all(items.slice(i,i+limit).map(async item=>{
      try {
        const r=await get(item.path);
        if(item.type==='page') {
          const canonical=r.body.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]??'';
          const robots=r.body.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)/i)?.[1]??'';
          const header=r.headers.get('x-robots-tag')??'';
          const ok=r.status===200 && canonical===production+item.path && /noindex/i.test(robots) && /noindex/i.test(header);
          add(item.path,item.type,r.status,ok,'canonical='+canonical+'; robots='+robots+'; X-Robots-Tag='+header);
        } else if(item.type==='redirect') {
          const loc=r.headers.get('location')??'';
          const target=loc?pathFrom(new URL(loc,preview).href):'';
          const ok=r.status===301 && target===item.target;
          add(item.path,item.type,r.status,ok,'target='+target+'; expected='+item.target);
        } else if(item.type==='gone') {
          add(item.path,item.type,r.status,r.status===410,'expected=410');
        }
      } catch(e) {add(item.path,item.type,'ERROR',false,String(e));}
    }));
  }
}
// Cloudflare Access may intentionally block public crawls after owner enables Preview-only sign-in.
// Without an Access service token, verify that the public preview is protected and
// leave complete live 349-route verification to the authenticated run or local CI.
const publicProbe = await fetch(preview+'/', {redirect:'manual',signal:AbortSignal.timeout(timeout)});
const accessLocation = publicProbe.headers.get('location') || '';
const hasAccessGate = [401,403].includes(publicProbe.status) ||
  ([301,302,303,307,308].includes(publicProbe.status) && /cloudflareaccess\\.com|\\/cdn-cgi\\/access/i.test(accessLocation));
if(hasAccessGate && !(accessId && accessSecret)) {
  const summary={preview,checkedAt:new Date().toISOString(),mode:'ACCESS_PROTECTED_UNAUTHENTICATED',status:publicProbe.status,authenticatedRouteChecks:'NOT_RUN',productionTouched:false};
  fs.mkdirSync('artifacts/seo-rebuild',{recursive:true});
  fs.writeFileSync('artifacts/seo-rebuild/preview-live-audit.json',JSON.stringify({summary,results:[]},null,2));
  console.log(JSON.stringify(summary,null,2));
  process.exit(0);
}
if(hasAccessGate && accessId && accessSecret) {
  const authProbe=await get('/');
  if(authProbe.status!==200) throw new Error('Cloudflare Access service token not authorized for Preview');
}
const robots=await get('/robots.txt');
add('/robots.txt','robots',robots.status,robots.status===200 && (robots.headers.get('content-type')??'').includes('text/plain') &&
 !robots.body.includes('Sitemap: '+production), 'content-type='+robots.headers.get('content-type')+'; prod sitemap suppressed='+!robots.body.includes('Sitemap: '+production));

const sm=await get('/sitemap.xml');
const locs=[...sm.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const paths=[...new Set(locs.map(x=>pathFrom(x)))];
add('/sitemap.xml','sitemap',sm.status,sm.status===200 && paths.length===86 && locs.length===86,'entries='+locs.length+' unique='+paths.length);
await batch(paths.map(path=>({path,type:'page'})));
await batch(RAW_REDIRECT_RULES.map(rule=>({path:normalizePath(rule.source),target:normalizePath(rule.target),type:'redirect'})));
await batch(GONE_PATHS_RAW.map(path=>({path:normalizePath(path),type:'gone'})));
const home=await get('/');
add('/','cta',home.status,home.body.includes('https://line.me/R/ti/p/@webuy'),'LINE @webuy link on homepage');
const notFound=await get('/__audit_random_missing_20261110__/');
add('/__audit_random_missing_20261110__/','404',notFound.status,notFound.status===404,'Unknown URL should return 404');
fs.mkdirSync('artifacts/seo-rebuild',{recursive:true});
const counts:Record<string,{ok:number;total:number}>={};
for(const r of results){counts[r.type]??={ok:0,total:0};counts[r.type].total++;if(r.ok) counts[r.type].ok++;}
const failing=results.filter(r=>!r.ok);
const summary={preview,checkedAt:new Date().toISOString(),overall:results.length,passed:results.length-failing.length,failed:failing.length,counts,failures:failing};
fs.writeFileSync('artifacts/seo-rebuild/preview-live-audit.json',JSON.stringify({summary,results},null,2));
console.log(JSON.stringify(summary,null,2));
if(failing.length)process.exitCode=1;
