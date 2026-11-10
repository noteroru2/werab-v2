/**
 * Release safety gate: inspect PRODUCTION-MODE Cloudflare Worker locally.
 * No remote writes or deployment. This must run WITHOUT SEO_PREVIEW=1.
 */
import assert from 'node:assert/strict';
const root=process.argv[2]||'http://127.0.0.1:8789';
assert.ok(/^http:\/\/(127\.0\.0\.1|localhost):8789$/.test(root),'Local production-mode Worker only');
const site='https://xn--c3c3a0aa6cvaf8b9dze.com';
const paths=['/','/รับซื้อโน๊ตบุ๊ค/','/รับซื้อคอม/','/รับซื้อแมคบุ๊ค/','/รับซื้อไอโฟน/','/รับซื้อไอแพด/','/รับซื้อกล้อง/'];
const tests=[];
async function request(path){return await fetch(root+path,{redirect:'manual',signal:AbortSignal.timeout(12000)});}
for(const path of paths){
 const response=await request(path),html=await response.text();
 const robots=(html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)||[])[1];
 const canonical=(html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)||[])[1];
 assert.equal(response.status,200,'Production-mode response '+path);
 assert.ok(robots && robots.includes('index')&&!robots.includes('noindex'),'Page was accidentally noindexed: '+path+' '+robots);
 assert.ok(!(response.headers.get('x-robots-tag')||'').includes('noindex'),'Preview X-Robots leaked: '+path);
 assert.equal(canonical,site+path,'Wrong canonical '+path);
 assert.ok(html.includes('LINE')&&html.includes('ส่งรูปเช็กราคา'),'LINE action missing '+path);
 tests.push(path);
}
const robots=await request('/robots.txt'),body=await robots.text();
assert.equal(robots.status,200);
assert.ok(body.includes('Sitemap: '+site+'/sitemap.xml'),'Production robots has no sitemap');
assert.ok(!(robots.headers.get('x-robots-tag')||'').includes('noindex'),'Production robots noindex header');
const xml=await request('/sitemap.xml'),x=await xml.text();
assert.equal(xml.status,200);
assert.equal((x.match(/<loc>/g)||[]).length,86,'Sitemap must preserve 86 URLs');
const alias=await request('/รับซื้อ-macbook/');
assert.equal(alias.status,301,'Existing 301 route broken');
const gone=await request('/รับซื้อเหล้ารีเจนซี่/');
assert.equal(gone.status,410,'Existing 410 route broken');
console.log(JSON.stringify({result:'PASS',mode:'production',previewEnvUnset:true,indexablePages:tests.length,sitemapCount:86,robotsSitemap:true,redirect301:true,gone410:true,productionDeployed:false},null,2));
