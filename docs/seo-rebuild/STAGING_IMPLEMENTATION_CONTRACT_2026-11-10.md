# Staging implementation contract — WE BUY SEO Rebuild 2026

Status: READY TO IMPLEMENT IN ISOLATED BRANCH, **NOT** READY FOR PRODUCTION OR CLOUDFLARE PREVIEW.

## 1. Route ownership (preserve current URLs)
| Owner URL | One primary intent | Parent | Supporting nodes | Stage priority |
|---|---|---|---|---|
| / | รับซื้อสินค้าไอทีมือสอง | root | /รับซื้อ/, /เช็กราคาก่อนขาย/ | P0 |
| /รับซื้อ/ | Catalog of eligible categories | / | all money pages | P0 |
| /รับซื้อโน๊ตบุ๊ค/ | รับซื้อโน๊ตบุ๊ค, Gaming Notebook | /รับซื้อ/ | ASUS/Lenovo/Acer/Dell + battery/display guides | P0 |
| /รับซื้อคอม/ | รับซื้อคอมมือสอง, Gaming PC | /รับซื้อ/ | /รับซื้อคอมประกอบ/, /รับซื้อซากคอมพิวเตอร์/ | P0 |
| /รับซื้อแมคบุ๊ค/ | รับซื้อ MacBook | /รับซื้อ/ | MacBook Air/Pro | P0 |
| /รับซื้อไอโฟน/ | รับซื้อ iPhone | /รับซื้อ/ | iPhone 13/14/15 | P0 |
| /รับซื้อไอแพด/ | รับซื้อ iPad | /รับซื้อ/ | iPad Air/Pro | P0 |
| /รับซื้อกล้อง/ | รับซื้อกล้องและเลนส์ | /รับซื้อ/ | Sony/Canon/Nikon/Fujifilm | P0 |
| /รับซื้อลำโพง/ | รับซื้อลำโพงมือสอง | /รับซื้อ/ | location pages where genuinely unique | P1 |
| /รับซื้อ-server/ | รับซื้อ Server มือสององค์กร | /รับซื้อ/ | verified B2B process | P1 |
| /รับซื้อเครื่องเกม/ | รับซื้อเครื่องเกม | /รับซื้อ/ | model guides as draft only | P1 |

Existing path spelling/encoding must remain stable. The homepage and /รับซื้อ/ must not compete for identical head terms; homepage describes whole brand/trust; /รับซื้อ/ acts as navigational service directory.

## 2. Universal page template requirements
- A single useful H1 explicitly matching a selling intent (not only keyword repetition).
- First screen: item types, geographic service model, simple intake checklist, contact CTA.
- Unique diagnosis: meaningful specs/conditions and evidence-specific content; no city-name swaps.
- Sourcing: real product photos and model specifications with rights and private data removed.
- Buyer transparency: initial chat estimate differs from confirmed inspected price; no unsupported 24/7 or guaranteed highest-price claims.
- Anti-duplicate: one canonical; no duplicate owner among category/brand/model/guide pages; owner route links to children and siblings in natural context.
- Accessibility: meaningful alt, proper link names, responsive sizes, contrast, no overlaid CTA occluding main content.
- Measurement: unique page URL, GA/GSC acquisition and event for LINE click; do not transmit customer chats or identifiers.

## 3. Genuine remote service vs local pages
- Verified storefront is in Ubon Ratchathani; do not imply other storefronts.
- Outside Ubon: customer may send model/spec/condition/photos for initial assessment; appointments or delivery are arranged case-by-case.
- Each existing location page must have its own valid service specifics (transport/inspection), not a new /province/ template generated blindly.
- Keep questionable truncated URLs intact during the migration review; change only if supported by indexing/equity evidence and approved 301 mapping.

## 4. Price and case study model
- Public content must contain only owner-approved quote/range, review timestamp, technical factors and clear uncertainty.
- Use AMPHON System/PriceBook as a candidate data source, not direct unaudited public feed.
- Remove customer name/contact details, serial numbers, IMEI, shipping label, EXIF and any personal information.
- Reserve /ผลงานรับซื้อ/ and /รุ่น/ as DRAFT pending unique evidence and QA.

## 5. Functional architecture
1. Keep existing `src/config/seo/manifest.ts` authoritative for INDEX / DRAFT / 301 / 410 decisions.
2. Keep existing `src/config/seo/redirects.ts` and `gone.ts` unchanged in this phase.
3. Build category template improvements on the isolated branch, one owner at a time, after baseline screenshot/HTML comparisons.
4. Keep brand pages distinct by actual accepted models/specs and trade-in factors.
5. Observe site performance metrics (LCP, CLS, INP) using production CrUX / field data where possible, not fabricated lab scores.
6. Technical gates: every critical page live 200, self canonical, indexable/intentional noindex, XML sitemap coherent, robots not blocking indexable routes, no link to redirection chain.
7. CI: run `npm ci` and `npm run gate:predeploy` in an isolated environment, followed by Cloudflare-runtime-specific checks only after the hosting topology is established.

## 6. Preview isolation (do not skip)
- Determine whether Cloudflare is DNS/CDN proxy to Node SSR or executes Pages/Workers SSR. Current project uses Astro 5 and `@astrojs/node`.
- Before any branch preview configure access protection and preview-only noindex (meta + X-Robots-Tag; preferably HTTP authentication), disable production-index submissions, no canonical to staging, no real payments or privileged production writes.
- Cloudflare preview deploy, production deploy, PR to main and merge are **not authorized as part of the current audit** without explicit runtime evidence and owner review.
- Never publish GSC drilldown exports publicly.

## 7. Migration stop conditions
- Any loss of existing 86 indexable sitemap URLs without an approved row-level migration decision.
- Any 301/410 rule change without live target verification and a traffic/backlink check.
- Unexplained Google coverage decline, new noindex or robots block, redirect chain, 500 errors.
- Build/QA failed, Cloudflare runtime unknown, preview indexable, or customer data in output.
