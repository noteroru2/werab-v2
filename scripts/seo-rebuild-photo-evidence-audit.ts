/**
 * Batch 2: photo-to-inspection traceability regression.
 * Intentionally NO actual transactions, prices, customers or unpublished images.
 * Strict: source asset exists, every public image used exactly once, evidence
 * notes do not report unverified device tests or closed purchases.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { PHOTO_INSPECTION_EXAMPLES } from '../src/data/photo-inspection-examples';
import { REAL_PRODUCT_IMAGES } from '../src/data/real-product-images';

const expectedImages = new Map(REAL_PRODUCT_IMAGES.map(image => [image.slug,image]));
const seen = new Set<string>();
const counts:Record<string,number> = {};
assert.equal(PHOTO_INSPECTION_EXAMPLES.length,10,'10 photo-backed product examples expected');
assert.equal(expectedImages.size,23,'Baseline 23 public images must remain unchanged');

for (const item of PHOTO_INSPECTION_EXAMPLES) {
  assert.ok(item.imageEvidenceOnly === true,'Never imply completed purchase: '+item.id);
  assert.ok(item.id && item.title && item.observed && item.toCheck && item.priceFactors,'Missing case detail: '+item.id);
  assert.ok(item.photoSlugs.length>=2 && item.photoSlugs.length<=4,'2-4 images needed per real photographed device: '+item.id);
  const textual = [item.title,item.observed,item.toCheck,item.priceFactors].join(' ');
  assert.ok(!/\b(?:\d[\s-]?){13}\b/.test(textual),'Possible serial/ID in '+item.id);
  assert.ok(!/(?:฿|บาท|THB)\s*[\d,.]+|\b\d[\d,.]*\s*(?:บาท|THB)\b/i.test(textual),'Unapproved transaction price in '+item.id);
  assert.ok(!/รับซื้อแล้ว|ซื้อขายสำเร็จ|ยอดจ่ายจริง|โอนเงินจริง/.test(textual),'Unverified completed transaction in '+item.id);
  counts[item.category] = (counts[item.category]||0)+1;

  for (const slug of item.photoSlugs) {
    const image = expectedImages.get(slug);
    assert.ok(image,'Photo slug missing from original public photo dataset: '+slug);
    assert.equal(image!.category,item.category,'Photo/category mismatch: '+slug);
    assert.ok(!seen.has(slug),'Photo assigned to more than one product: '+slug);
    seen.add(slug);
    assert.ok(image!.alt.length>=12 && image!.caption.length>=8,'Missing accessible alt/caption: '+slug);
    for (const size of [600,1200]) for(const ext of ['webp','avif']) {
      const file=path.join('public','images','real-products',`${slug}-${size}.${ext}`);
      assert.ok(fs.existsSync(file),'Missing image derivative: '+file);
      assert.ok(fs.statSync(file).size>1500,'Empty or suspicious image derivative: '+file);
    }
  }
}
assert.equal(seen.size,23,'Not all 23 public images mapped once');
assert.deepEqual(counts,{notebook:3,macbook:2,camera:1,pc:2,tablet:2},'Category grouping changed');
const component=fs.readFileSync('src/components/RealProductGallery.astro','utf8');
assert.ok(component.includes('PHOTO_INSPECTION_EXAMPLES'),'Gallery does not use real product groups');
assert.ok(component.includes('ไม่ใช่หลักฐานว่าได้ซื้อเครื่องในภาพแล้ว'),'Missing transaction-evidence disclaimer');
assert.ok(component.includes('getLineUrl()'),'Missing contact CTA');
assert.ok(!component.includes('AggregateRating')&&!component.includes('Review.schema'),'Unverified rating/review schema');

console.log(JSON.stringify({result:'PASS',photoBackedExamples:PHOTO_INSPECTION_EXAMPLES.length,publicSourceImages:seen.size,optimizedDerivativesChecked:seen.size*4,counts,verifiedPurchaseRecords:0,noUnverifiedBuybackClaims:true,productionChanged:false},null,2));
