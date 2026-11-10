# GSC Historical URL Reconciliation — 10 November 2026

**SCOPE: AUDIT / NO PRODUCTION CHANGE / NO MAIN MERGE**

## Evidence
- User GSC drilldowns exported 10 Nov 2026: **1,476 rows**, **1,472 distinct paths** (1,000 historical 404 and 476 Crawled–Not Indexed).
- Public sitemap (same audit): **86 entries**.
- GitHub registry (branch baseline): **53 redirects (301)** and **206 gone (410)**. These are *configured*, not all independently verified with a live HTTP probe.
- Exclusion samples are historical Google reports and do **not** prove current endpoint HTTP or current index status.

## Exact-match reconciliation
| GSC category | Current sitemap | Existing 301 | Existing 410 | Unmapped | Total |
|---|---:|---:|---:|---:|---:|
| Historical 404 | 21 | 3 | 25 | 951 | 1,000 |
| Crawled–Not Indexed | 7 | 9 | 19 | 441 | 476 |
| **Total** | **28** | **12** | **44** | **1,392** | **1,476** |

No migration state is recommended merely from an Excluded reason. **0 new redirects approved**, **0 new 410 approved**.

The 12 existing 301 entries target present sitemap pages according to the current sitemap inventory; current live redirect HTTP still requires verification. Four historical paths appear in both samples (double-counting); deduplicate before adding actions.

### P0 (do now, safe)
1. Preserve all 86 sitemap URLs during staging design, with no bulk URL renaming.
2. Inspect 28 sitemap URLs found in historic exclusion samples; check live 200/canonical, Google URL Inspection status, crawl timestamp and internal references.
3. Confirm 12 existing 301 locations actually respond 301 and resolve in a single hop to relevant 200 pages.
4. Scan **all configured** 53 redirects and 206 gone paths for collisions, cycles, accidental 410 on valuable search pages, and redirect target policy.
5. Prioritize 1,392 unmapped historical URLs by 2026 clicks, 28/90-day query association, backlinks, local service capability and content value before any migration recommendation.
6. Maintain all legacy 410 statuses unless owner explicitly approves corrections backed by evidence; 404 and 410 may be intentional for unrelated old topics.

### Quality rules and staging architecture
- Do not automatically redirect all missing URLs to the homepage.
- No invented local physical branches, guaranteed prices or unrealistic claims such as blanket nationwide doorstep pickup.
- Keep core paths: `/`, `/รับซื้อ/`, `/รับซื้อโน๊ตบุ๊ค/`, `/รับซื้อคอม/`, `/รับซื้อแมคบุ๊ค/`, `/รับซื้อไอโฟน/`, `/รับซื้อไอแพด/`, `/รับซื้อกล้อง/`, `/รับซื้อลำโพง/`.
- New model and component pages may be DRAFT only until the factual information, photos, unique intent and content are approved.
- Cloudflare setup is **unverified**. Current repo uses `@astrojs/node` standalone. Do not deploy preview before checking whether Cloudflare proxies Node or runs SSR directly.
- Preview/staging must not be indexable; verify auth + robots/X-Robots-Tag, isolated analytics, and separate secrets.

## Next required evidence
- Google URL Inspection for 28 current sitemap survivors (especially homepage and money pages).
- GSC Search Analytics 90/180 days on high-value historical pages and backlink/referring domains.
- Cloudflare project/build settings (Worker vs Pages vs DNS/CDN proxy) and preview-branch automation.
- CI build/audit results; no test was falsely claimed as executed.

## Artifacts created locally
- `werab_migration_reconciled_1476_2026-11-10.csv`: 1,476 annotated GSC rows, decision columns left pending
- `werab_priority_review_2026-11-10.csv`: prioritized first 110 rows
- `werab_migration_summary_2026-11-10.json`: audit aggregate
These may be attached to the project separately. They contain GSC evidence; do not publish them on the open web.
