/**
 * Phase 3 browser verification against an isolated localhost Cloudflare Worker.
 * No production requests, no LINE clicks, no private data transmission.
 * Lab timing values are diagnostic only; NOT production Core Web Vitals.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const origin = 'http://127.0.0.1:8787';
const routes = [
  ['/', 'home'],
  ['/รับซื้อโน๊ตบุ๊ค/', 'notebook'],
  ['/รับซื้อคอม/', 'pc'],
  ['/รับซื้อแมคบุ๊ค/', 'macbook'],
  ['/รับซื้อไอโฟน/', 'iphone'],
  ['/รับซื้อไอแพด/', 'ipad'],
  ['/รับซื้อกล้อง/', 'camera']
];
const outputDir = 'artifacts/seo-rebuild/phase3-mobile';
fs.mkdirSync(outputDir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const rows=[];
try {
  for (const width of [320,390]) {
    const context=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,javaScriptEnabled:true,reducedMotion:'reduce'});
    const page=await context.newPage();
    for(const [path,slug] of routes) {
      const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:35000});
      assert.equal(response?.status(),200,'Page HTTP 200 '+path);
      await page.locator('.seo-path-bridge').waitFor({state:'visible',timeout:12000});
      const info=await page.evaluate(()=>{
        const root=document.documentElement;
        const bar=document.querySelector('.mobile-contact-bar');
        const line=bar?.querySelector('a.btn-line');
        const phone=bar?.querySelector('a.btn-phone');
        const barRect=bar?.getBoundingClientRect();
        const lineRect=line?.getBoundingClientRect();
        const phoneRect=phone?.getBoundingClientRect();
        const nav=performance.getEntriesByType('navigation')[0];
        return {
          h1: document.querySelectorAll('h1').length,
          bridgeLinks: document.querySelectorAll('.seo-path-grid a[href^="/"]').length,
          scrollWidth:Math.max(root.scrollWidth,document.body.scrollWidth),
          viewportWidth:window.innerWidth,
          barPosition:bar?getComputedStyle(bar).position:'',
          barVisible:bar?getComputedStyle(bar).display!=='none':false,
          barBottom:barRect?.bottom??0,
          lineWidth:lineRect?.width??0,
          phoneWidth:phoneRect?.width??0,
          lineHeight:lineRect?.height??0,
          phoneHeight:phoneRect?.height??0,
          lineHref:line?.getAttribute('href')??'',
          lineText:line?.textContent??'',
          navDomContentLoadedMs:nav?Math.round(nav.domContentLoadedEventEnd):null
        };
      });
      assert.equal(info.h1,1,'Exactly one H1 '+path+' at '+width+'px');
      assert.ok(info.bridgeLinks>=4,'Intent pathways not visible on '+path);
      if (info.scrollWidth>info.viewportWidth+2) {
        const overflowing=await page.evaluate(()=>{
          return [...document.querySelectorAll('body *')].map(el=>{
            const r=el.getBoundingClientRect();
            const style=getComputedStyle(el);
            return {tag:el.tagName,cls:String(el.className).slice(0,90),right:Math.round(r.right),left:Math.round(r.left),width:Math.round(r.width),scrollWidth:el.scrollWidth,display:style.display,overflowX:style.overflowX,text:(el.textContent||'').trim().slice(0,50)};
          }).filter(x=>x.right>innerWidth+2 && x.display!=='none').slice(0,30);
        });
        console.error('MOBILE_OVERFLOW_DIAGNOSTIC '+JSON.stringify({path,width,documentWidth:info.scrollWidth,overflowing}));
      }
      assert.ok(info.scrollWidth<=info.viewportWidth+2,'Horizontal overflow on '+path+' at '+width+'px: '+info.scrollWidth);
      assert.ok(info.barVisible && info.barPosition==='fixed','Sticky contact bar missing '+path);
      assert.ok(Math.abs(info.barBottom-844)<=2,'Sticky bar not anchored to bottom '+path);
      assert.ok(info.lineWidth>info.phoneWidth,'LINE contact not primary '+path);
      assert.ok(info.lineHeight>=44 && info.phoneHeight>=44,'Contact tap target too small '+path);
      assert.ok(info.lineText.includes('ส่งรูปเช็กราคา'),'LINE action unclear '+path);
      assert.ok(info.lineHref.includes('line.me'),'LINE target invalid '+path);
      if(width===390 && ['home','notebook','camera','iphone'].includes(slug)){
        await page.screenshot({path:`${outputDir}/${slug}-390.png`,fullPage:false});
      }
      rows.push({width,path,...info});
    }
    await context.close();
  }

  const page=await browser.newPage({viewport:{width:1024,height:768}});
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.mobile-contact-bar').evaluate(el=>getComputedStyle(el).display),'none','Mobile bar visible at desktop width');
  await page.close();
} finally { await browser.close(); }
fs.writeFileSync(`${outputDir}/metrics.json`,JSON.stringify({
  result:'PASS',routes:routes.length,mobileViewports:[320,390],pagesChecked:rows.length,
  labMeasurementsOnly:true,productionCWVClaim:false,rows
},null,2));
console.log(JSON.stringify({result:'PASS',routes:routes.length,mobileViewports:[320,390],pageVisits:rows.length,desktopCheck:true,productionTouched:false},null,2));
