# Batch 2 — ภาพสินค้าและกรณีตรวจประเมินจากภาพจริง
Date: 2026-11-10 | Repo: noteroru2/werab-v2
Branch: seo-rebuild/staging-2026-11-10
Status: **STAGING CONTENT — NOT A PROVEN COMPLETED-BUYBACK CASEBOOK**

## What actually shipped to the staging branch

- Reused 23 **previously public** real-product photographs from `src/data/real-product-images.ts`. No new private photos were uploaded.
- Grouped photos by 10 specific machines/sets in `src/data/photo-inspection-examples.ts`. No seller names, chat data, order amounts, receipts or internal purchase-cost figures.
- Reworked existing `RealProductGallery.astro` to show one cover per product, supplementary photos on demand, `สิ่งที่ภาพแสดงได้`, `สิ่งที่ต้องตรวจเพิ่มก่อนเสนอราคา`, and `เหตุผลที่ใช้พิจารณาราคา`.
- Included truthful language: photo-led assessment examples ≠ evidence of completed purchases or actual device diagnostic outcomes.
- Used responsive AVIF/WebP derivatives, lazy loading, descriptive alt, mobile layouts, and existing approved LINE contact.
- The homepage and 5 category pages already using RealProductGallery automatically display the new evidence-led groups. iPhone currently has **zero source photographs**, so none were fabricated.

## Photo dataset: 10 examples / 23 photos

| Category | Photo evidence group | Photos | Proof available | Still unverified |
|---|---|---:|---|---|
| Notebook | Acer Swift SF314-42 | 2 | Front/back/ports photos | Actual CPU/RAM/SSD, battery, completed buyback |
| Notebook | Lenovo 82V7 | 2 | Front/angle photos | Full variant and condition, completed buyback |
| Notebook | MSI Thin A15 | 2 | Body and keyboard photos; original caption states RTX4060 RAM16 | GPU diagnostic, heat, warranty, completed buyback |
| MacBook | Air M1 | 2 | Front/back photos; original caption states 8/256 | Battery Cycle and account state, completed buyback |
| MacBook | Air M3 | 2 | Body plus previously redacted system screen | Account/battery status, completed buyback |
| Camera | Insta360 X5 | 2 | Camera and box photos | Lens/testing and completed buyback |
| PC | Black desktop / GeForce RTX | 4 | Case and internal component photos | Exact CPU/GPU/PSU, completed buyback |
| PC | White desktop / GeForce RTX | 3 | Case and GPU photos | Exact specs, completed buyback |
| iPad | iPad Pro M1 | 2 | Tablet with box/screen | Capacity and account state, completed buyback |
| iPad | iPad Gen 10 | 2 | Device and previously redacted system screen | Battery/capacity and completed buyback |
| **Total** | **10 photographed products/sets** | **23** | Existing public images | **0 confirmed completed purchases** |

The term “real product” reflects existing public inventory photos and captions in the repository. It is NOT evidence of an AMPHON accounting entry or confirmed buyback amount. `scripts/optimize-real-product-images.mjs` contains redaction regions for the M3 and iPad Gen 10 system screenshots, but the resulting bitmaps should receive a human visual privacy review before any new production release.

## Owner-approved completed purchase case: REQUIRED fields

To upgrade one item from an illustrative photo inspection to a confirmed actual buyback case, review it privately against a matching historical purchase record. Do **not** place raw receipts, customer chat, serial numbers, IMEI, exact street address or bank details into GitHub.

Required for release:
- Internal transaction match (private only), transaction month, product model/specs actually verified and general condition.
- Photos rights and full visual privacy/redaction review (customer, address label, phone/IMEI/serial/QR/EXIF removed).
- Receipt/proof matched by admin; written owner approval to publish a **completed purchase claim**.
- Specific result/price only if owner separately approves the public amount; do not imply guaranteed current quote.
- Service channel stated truthfully (Ubon shop, online quote, and delivery/appointment when applicable).
- Explicit separate approval for public case photos, not simply approval to use internal historical data.

Suggested private schema: `internal_case_ref`, `transaction_month`, `item_model`, `verified_specs`, `item_condition`, `included_accessories`, `redacted_public_photo_ids`, `owner_approved_public_narrative`, `approved_buy_price_optional`, `privacy_review_date`, `approved_by`, `approval_time`. Internal references are for back-office verification only and must NOT be serialized to the public website.

## Test plan and gates
- New `scripts/seo-rebuild-photo-evidence-audit.ts` ensures exactly 10 groups, each of the 23 public slugs appears once, all 92 600/1200 AVIF/WebP files exist and are nonempty, labels have useful alt, no unapproved amounts or claims.
- Existing `npm run gate:predeploy` retains all original approved-content hashes and 86 INDEX / 53 REDIRECT / 206 GONE.
- Added local raw HTTP 349-route regression against `wrangler dev` even after Preview is locked by Cloudflare Access.
- Live Preview test without an authenticated Access service token may only confirm **Access protection**, not the 349 underlying responses. Do not present that as a remote route pass.
- No route / redirect / sitemap changes, no main merge, no production deployment.

## Next proof gaps
1. iPhone: no previously approved real photos among the 23 assets. Obtain sanitized photos first.
2. Actual completed buyback records: none linked/verified. Owner-approved anonymized evidence is required for any 'รับซื้อจริงแล้ว' price or outcome.
3. Image privacy: manual pixel-level review of original optimized assets should be done before transferring any new assets or expanding case studies.
4. If owner wishes to expose private inventory/CRM data on staging, require Access and explicit API read-only gateway with redaction; no direct client-side connection or secrets.
