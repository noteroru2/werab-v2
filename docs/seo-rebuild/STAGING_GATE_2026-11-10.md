# SEO Rebuild — Staging Gate / 2026-11-10

Status: **IN PROGRESS / NO PRODUCTION CHANGES / DO NOT MERGE**

## Verified baseline
- GSC Coverage export (2026-11-10): 18 indexed; 2,244 not indexed; 1,381 reported not-found; 476 crawled-not-indexed.
- GSC Drilldown supplied by owner: 1,000 example URLs from 404 and 476 crawled-not-indexed (1,476 rows). Historical statuses are **not live HTTP responses**.
- Public sitemap: 86 entries; all 86 sampled as rendered pages with self-canonical and no extracted noindex.
- 28 sitemap URLs appear in exclusion examples; Google data may lag current production.
- Owner confirms: primary storefront Ubon Ratchathani; elsewhere preliminary remote evaluation and appointment/shipping where actually offered. Never suggest physical branches elsewhere.
- Approval: branch/staging work ONLY; no production, no main merge.

## Technical findings from source
- Astro 5 SSR with Node standalone adapter (NOT automatically Cloudflare Pages compatible).
- Dynamic sitemap includes only INDEX and manifest-eligible routes.
- Existing centralized SEO manifest; redirect registry; legacy gone registry marked as 206 HTTP 410 paths.
- Existing CI audit scripts and migration/authority controls. Do not bypass them.
- Existing notes in business facts may overstate national onsite service, and location pages must be reviewed against owner confirmed service model.

## Architecture freeze — intent ownership
- / — broad used IT buyback primary entity.
- /รับซื้อ/ — service category directory, not duplicate home keyword target.
- /รับซื้อโน๊ตบุ๊ค/ — notebook.
- /รับซื้อคอม/ — desktop and gaming PC.
- /รับซื้อแมคบุ๊ค/ — MacBook.
- /รับซื้อไอโฟน/ — iPhone.
- /รับซื้อไอแพด/ — iPad.
- /รับซื้อกล้อง/ — cameras and lenses.
- /รับซื้อลำโพง/ — speakers.
- Subcategory, brands, model, condition, area pages retain existing paths while verified; no mass slug renames.
- New model/condition directories remain DRAFT until unique content and user intent are validated.

## Safeguards and gates
1. Export Git commit SHA and current release baseline. Audit historical URL equity before 301/410 decisions.
2. Run `npx tsx scripts/seo-rebuild-reconcile.ts --input path/to/gsc-drilldown.csv --output path/to/migration-reconciled.csv` with the GSC CSV converted from owner export. Inspect registry matches and every candidate for change.
3. Combine sitemap, redirects, gone registry, GSC, inbound links, and live HTTP tests. Never equate GSC '404' with current 404.
4. Determine whether Cloudflare uses Workers, Pages, or proxy to Node SSR BEFORE preview deploy. Current Node standalone adapter does NOT validate direct Cloudflare Pages deployment compatibility.
5. Preview deployment must be isolated, blocked from indexing, and have no access to production secrets/write endpoints. Validate robots/X-Robots-Tag, auth/edge protection, canonical behavior, external link navigation and analytics isolation.
6. Only publish exact verified business location and legitimate remote/shipping arrangements. No synthetic reviews, fake local branches, published private cost data, or PII.
7. Run all `npm run gate:predeploy` audits + regression E2E (routing, SEO resolver, sitemap, redirects, structured data, assets, mobile CTA), Cloudflare-specific runtime QA.
8. Request explicit owner permission before main merge, redirect changes, or production deploy.

## Open blockers
- URL Inspection sample for 28 sitemap survivors and top 404 pages (current Google-selected canonical/index state).
- Historic Search Analytics/top backlinks per legacy URL. Zero clicks alone does not imply no SEO value.
- Cloudflare deploy linkage/env and build settings: unverified.
- Actual CI run/build: not yet executed in GitHub environment.
