# เรารับซื้อ.com V2 — Migration & Provenance Documentation

## 1. Migration Overview
- **Source Repository**: `../webuy-thai` (Read-only reference)
- **Source Git Commit**: `7da9221024b666870a9e0ad67f16f460fa9c63dd`
- **Target Repository**: `werab-v2`

---

## 2. Legacy Route Snapshot Summary
Extracted and preserved in `migration/legacy/`:

| Dataset | File | Count | Description |
|---|---|---|---|
| **Authoritative GONE** | `gone-paths.json` | 208 | Off-topic liquor, pawn ticket, gambling, and damaged URLs returning HTTP 410 |
| **Direct Redirects** | `redirects.json` | 46 | Normalized 301 rules for English aliases, near-me variants, and typos |
| **Survivor Decisions** | `survivor-decisions.json` | 63 | Historical URLs analyzed in Batch 1 / Batch 1.5 safety reviews |
| **Legacy Route Registry** | `routes.json` | 654 | Raw historical WordPress and Netlify post routes |
| **Master Inventory** | `route-inventory.csv` | 947 | Comprehensive unified inventory of all historical and candidate URLs |

---

## 3. Approved Survivor Pages
The following historical survivor URLs have approved, high-quality content and are live with `state = 'INDEX'` and `contentStatus = 'READY'`:
1. `/รับซื้อลำโพง-อุดรธานี/` (`src/content/pages/รับซื้อลำโพง-อุดรธานี.md`)
2. `/รับซื้อลำโพง-สารคาม/` (`src/content/pages/รับซื้อลำโพง-สารคาม.md`) — Note: Exact historical slug `/รับซื้อลำโพง-สารคาม/` is preserved to maintain existing Google Search Console equity.

---

## 4. Survivor Candidates in HOLD_NOINDEX Queue
Other historical survivors are preserved in `src/config/seo/manifest.ts` under `state: 'HOLD_NOINDEX'` and `contentStatus: 'CONTENT_REQUIRED'`. They will only be released to `INDEX` once unique, verified content is written and approved by the owner.
