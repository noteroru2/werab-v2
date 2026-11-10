/**
 * Phase 3: data-backed internal link, conversion and responsive-style release gate.
 * Reads source only, never deploys or modifies any SEO URL registry.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CORE_INTENT_BRIDGES, type CoreSeoTopic } from '../src/data/core-intent-bridges';
import { SEO_MANIFEST_MAP } from '../src/config/seo/manifest';
import { REDIRECT_MAP } from '../src/config/seo/redirects';
import { GONE_PATHS_RAW } from '../src/config/seo/gone';
import { normalizePath } from '../src/lib/seo/normalize';

const pages:Record<CoreSeoTopic,string> = {
  home:'src/pages/index.astro',
  notebook:'src/pages/รับซื้อโน๊ตบุ๊ค.astro',
  pc:'src/pages/รับซื้อคอม.astro',
  macbook:'src/pages/รับซื้อแมคบุ๊ค.astro',
  iphone:'src/pages/รับซื้อไอโฟน.astro',
  ipad:'src/pages/รับซื้อไอแพด.astro',
  camera:'src/pages/รับซื้อกล้อง.astro'
};
const expectedCategories=['/รับซื้อโน๊ตบุ๊ค/','/รับซื้อคอม/','/รับซื้อแมคบุ๊ค/','/รับซื้อไอโฟน/','/รับซื้อไอแพด/','/รับซื้อกล้อง/'];
const forbidden=new Set(GONE_PATHS_RAW.map(normalizePath));
let links=0;const unique=new Set<string>();
for (const [topic,filename] of Object.entries(pages) as [CoreSeoTopic,string][]) {
  const content=fs.readFileSync(filename,'utf8');
  assert.ok(content.includes('FieldInspectionCases'), filename+' lost its existing inspection component');
  const config=CORE_INTENT_BRIDGES[topic];
  assert.ok(config && config.heading && config.intro && config.intake, 'Incomplete intent bridge: '+topic);
  assert.ok(config.links.length>=2 && config.related.length>=2,'Not enough natural contextual links: '+topic);
  const targets=[...config.links,...config.related];
  assert.ok(targets.length<=10,'Excessive links on '+topic+' (avoid link stuffing)');
  const local=new Set<string>();
  for (const link of targets) {
    assert.ok(/^\/[^?#]*\/$/.test(link.href),'Only existing local paths allowed: '+link.href);
    assert.ok(!local.has(link.href),'Duplicate link per page: '+topic+' '+link.href);
    local.add(link.href);
    assert.ok(link.label.length>5 && link.why.length>8, 'Anchor lacks meaningful context: '+link.href);
    const path=normalizePath(link.href);
    const record=SEO_MANIFEST_MAP.get(path);
    assert.ok(record && record.state==='INDEX', 'Not approved INDEX: '+topic+' -> '+path);
    assert.ok(!REDIRECT_MAP.has(path) && !forbidden.has(path), 'Redirect/Gone link: '+topic+' -> '+path);
    unique.add(path);links++;
  }
}
for(const path of expectedCategories) assert.ok(CORE_INTENT_BRIDGES.home.related.some(l=>l.href===path),'Homepage missing category '+path);
const field=fs.readFileSync('src/components/FieldInspectionCases.astro','utf8');
assert.ok(field.includes("import Phase3IntentBridge from './Phase3IntentBridge.astro';"),'Phase3 component import missing');
assert.ok(field.includes('<Phase3IntentBridge topic={topic} />'), 'Phase3 component not rendered');
const nav=fs.readFileSync('src/components/Phase3IntentBridge.astro','utf8');
assert.ok(nav.includes('getLineUrl()'), 'Missing verified LINE contact');
assert.ok(nav.includes('aria-label'), 'Missing accessible links');
assert.ok(nav.includes('ร้านหลักอยู่ที่อุบลราชธานี') || nav.includes('หน้าร้านหลักอยู่ที่อุบลราชธานี'), 'Remote service claims not grounded');
assert.ok(!/ราคาสูงที่สุด|มีสาขาทั่วประเทศ|มีสาขาทุกจังหวัด|รับประกันรับซื้อ/.test(nav), 'Unverified claim');
const mobile=fs.readFileSync('src/components/MobileContactBar.astro','utf8');
assert.ok(mobile.includes('ส่งรูปเช็กราคา'), 'Main mobile contact action is not a photo quote');
assert.ok(mobile.includes('getLineUrl()') && mobile.includes('getPhoneUrl()'), 'Lost contact paths');
assert.ok(/min-height:\s*(?:48|5[0-9])px/.test(mobile), 'Mobile tap target may be too small');
assert.ok(mobile.includes('env(safe-area-inset-bottom)'), 'Mobile safe area missing');
assert.ok(mobile.includes('minmax(0,'), 'Mobile grid lacks minimum width constraint');
const stats={result:'PASS',ownerPages:Object.keys(pages).length,internalLinks:links,uniqueDestinations:unique.size,renderedOnExistingSevenPages:true,mobileLineAction:true,allTargetsIndexable:true,redirectsChanged:false,goneChanged:false};
console.log(JSON.stringify(stats,null,2));
