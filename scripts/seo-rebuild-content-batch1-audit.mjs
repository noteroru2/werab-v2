/**
 * Content Batch 1 quality + disclosure guard.
 * Inspects only new public technical examples, not private back-office exports.
 * This does NOT certify uploaded image metadata or Cloudflare Access status.
 */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const pages = {
 home: 'src/pages/index.astro',
 notebook: 'src/pages/รับซื้อโน๊ตบุ๊ค.astro',
 pc: 'src/pages/รับซื้อคอม.astro',
 macbook: 'src/pages/รับซื้อแมคบุ๊ค.astro',
 iphone: 'src/pages/รับซื้อไอโฟน.astro',
 ipad: 'src/pages/รับซื้อไอแพด.astro',
 camera: 'src/pages/รับซื้อกล้อง.astro'
};
const src=fs.readFileSync('src/components/FieldInspectionCases.astro','utf8');
let checked=0;
for(const [topic, path] of Object.entries(pages)) {
 const html=fs.readFileSync(path,'utf8');
 assert.ok(html.includes("import FieldInspectionCases from '../components/FieldInspectionCases.astro';"), 'Missing import '+path);
 assert.ok(html.includes('<FieldInspectionCases topic="'+topic+'" />'), 'Missing content block '+path);
 assert.equal(html.split('<FieldInspectionCases topic="'+topic+'" />').length-1,1,'Duplicate component '+path);
 assert.ok(new RegExp('(?:^|\\n)\\s*'+topic+':\\s*\\{').test(src), 'No content config for '+topic);
 checked++;
}
assert.ok(src.includes('getLineUrl()'),'No first-party LINE CTA');
assert.ok(src.includes('ไม่ใช่ผลการซื้อขาย'),'Missing disclosure of illustrative examples');
assert.ok(!/\b\d{13}\b/.test(src),'Possible Thai ID/13 digit identifier in public component');
assert.ok(!/(?:\bsk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN .* PRIVATE KEY-----)/.test(src),'Potential secret');
assert.ok(!/฿\s*\d/.test(src),'Price should not be published from unreviewed sample');
console.log(JSON.stringify({result:'PASS',publicPages:checked,examplesSource:'public-safe illustrative scenarios',privateRecordsPublished:false,productionChanged:false},null,2));
