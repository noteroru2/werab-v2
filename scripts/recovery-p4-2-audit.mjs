/** RECOVERY P4.2 — Codex UX + SEO Recovery integration audit. Pure Node.js. */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=r=>fs.readFileSync(path.join(root,r),'utf8');
const blockers=[];
const norm=s=>String(s).replace(/\r\n/g,'\n').replace(/\r/g,'\n');
const sha=s=>crypto.createHash('sha256').update(norm(s)).digest('hex');
const baseline=JSON.parse(read('reports/content/recovery-approved-copy-baseline.json'));
const galleryRoutes=['/รับซื้อโน๊ตบุ๊ค/','/รับซื้อคอม/','/รับซื้อแมคบุ๊ค/','/รับซื้อไอแพด/','/รับซื้อกล้อง/'];
for(const route of galleryRoutes){
  const rec=baseline.pages?.[route];
  if(!rec){blockers.push(`Missing recovery baseline row ${route}`);continue;}
  const src=read(rec.astroFile);
  if(!src.includes('<RealProductGallery')) blockers.push(`RealProductGallery missing from ${route}`);
  if(sha(src)!==rec.astroFileSha256) blockers.push(`Normalized source hash mismatch ${route}`);
  if(rec.approvalBasis!=='CODEX_REAL_PRODUCT_GALLERY_REVIEWED') blockers.push(`Gallery approval basis missing ${route}`);
}
const gallery=read('src/components/RealProductGallery.astro');
if(gallery.includes('commercial-container')) blockers.push('RealProductGallery depends on homepage-scoped commercial-container');
if(!gallery.includes('<div class="container">')) blockers.push('RealProductGallery is missing global container wrapper');
if(!gallery.includes('.real-gallery-heading .section-main-h2')) blockers.push('RealProductGallery heading styles are not self-contained');
const data=read('src/data/real-product-images.ts');
const slugs=[...data.matchAll(/slug:\s*'([^']+)'/g)].map(m=>m[1]);
if(slugs.length!==23) blockers.push(`Real product image records ${slugs.length} != 23`);
if(new Set(slugs).size!==slugs.length) blockers.push('Duplicate real-product image slugs');
for(const slug of slugs) for(const size of [600,1200]) for(const ext of ['avif','webp']) {
  const f=path.join(root,'public/images/real-products',`${slug}-${size}.${ext}`);
  if(!fs.existsSync(f)) blockers.push(`Missing optimized image ${slug}-${size}.${ext}`);
}
const llms=read('src/pages/llms.txt.ts');
if(llms.includes('/ราคากลางรับซื้อ/')) blockers.push('llms.txt exposes HOLD_NOINDEX price guide');
for(const risky of ['มาตรฐานการล้างข้อมูล','ถูกต้องตามกฎหมาย','ไม่รับซื้อของโจรทุกกรณี']) if(llms.includes(risky)) blockers.push(`llms risky claim: ${risky}`);
const schema=read('src/lib/seo/schema.ts');
if(!schema.includes("'@id': `${pageUrl}#webpage`")) blockers.push('Article mainEntityOfPage is not linked to WebPage #webpage ID');
const steps=read('src/components/ProcessSteps.astro');
if(steps.includes('ชำระเงินทันที')) blockers.push('Immediate-payment claim still present');
const layout=read('src/layouts/BaseLayout.astro');
for(const marker of ['og:image','twitter:image','skip-link']) if(!layout.includes(marker)) blockers.push(`BaseLayout integration marker missing: ${marker}`);
const header=read('src/components/Header.astro');
for(const marker of ['Escape','focusableSelector','mobile-nav-open']) if(!header.includes(marker)) blockers.push(`Mobile navigation accessibility marker missing: ${marker}`);
console.log('\nRECOVERY P4.2 — CODEX UX + SEO RECOVERY INTEGRATION AUDIT');
console.log(`Real-product records: ${slugs.length}; optimized derivatives expected: ${slugs.length*4}; protected gallery pages: ${galleryRoutes.length}`);
if(blockers.length){console.error(`FAIL: ${blockers.length} blocker(s)`);for(const b of blockers)console.error('- '+b);process.exit(1);}
console.log('PASS: Codex UX/gallery integration preserves Recovery controls and verified-trust constraints.');
