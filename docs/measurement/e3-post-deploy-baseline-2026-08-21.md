# PHASE E3.0 — POST-DEPLOY INDEXING & MEASUREMENT BASELINE

**Deployment Timestamp:** `2026-08-21T17:44:24+07:00`  
**Milestone SHA:** `3d6ad53719b2486a996fa285b70e80cf351ee916`  
**Production SHA:** `3d6ad53719b2486a996fa285b70e80cf351ee916`  
**Milestone Git Tag:** `v2-e2-recovery-complete`  
**Production Canonical Origin:** `https://xn--c3c3a0aa6cvaf8b9dze.com`  
**Status:** `BASELINE_LOCKED`

---

## 1. Locked Production Architectural Baseline

| Metric / Component | Verified Production State | Requirement / Rule |
| :--- | :--- | :--- |
| **Total Active INDEX Pages** | **46** | 100% self-canonical, Punycode origin |
| **Core E1 Pages** | **11** | Hubs, Money, Scrap, Server |
| **Historical E2 Local Winners** | **35** | 0 orphans, depth $\le$ 3 |
| **E2 HOLD_NOINDEX Pages** | **0** | All approved candidates released |
| **E2 DRAFT (Isolated)** | **1** | `/รับซื้อไอแพด-ขอนแก่น-ipad/` (HTTP 404) |
| **Total Sitemap URLs** | **46** | `https://xn--c3c3a0aa6cvaf8b9dze.com/sitemap.xml` |
| **Authoritative GONE (410)** | **206** | Fast drop of unrecoverable URLs |
| **Active 301 Permanent Redirects** | **44** | 1-hop, loop-free equity consolidation |
| **Content Copy Fidelity** | **44 / 44 PASS_EXACT** | 100% exact text hash match |
| **Content Copy Mutation Rigor** | **10 / 10 PASS** | Strict normalizer verification |
| **Local Differentiation Quality** | **45 / 45 Pairs PASS** | Max 3-gram: 24.12%, 0 clones |
| **Crawl Graph Structure** | **0 Orphans, 33 Depth $\le$ 2** | Depth 3 strictly limited to 2 districts |
| **Production Smokes & Verification** | **PASS** | Standalone Node runtime verified |

---

## 2. Google Search Console (GSC) Sitemap Submission Checklist

**Production Sitemap Target:**  
`https://xn--c3c3a0aa6cvaf8b9dze.com/sitemap.xml`

### Owner Action Protocol:
1. Access Google Search Console for property `https://xn--c3c3a0aa6cvaf8b9dze.com/` (or Domain property `xn--c3c3a0aa6cvaf8b9dze.com`).
2. Navigate to **Indexing** $\rightarrow$ **Sitemaps**.
3. Under "Add a new sitemap", submit: `sitemap.xml`.
4. Record submission details below when completed:

| Submission Field | Owner Record / Observation |
| :--- | :--- |
| **Submission Date** | `[Pending Owner Action / Confirm]` |
| **Sitemap Status** | `[Success / Pending]` |
| **Discovered URLs Count** | `[Expected: 46]` |
| **Last Read Timestamp** | `[Pending]` |
| **Notes / Messages** | `[No errors expected]` |

---

## 3. Priority URL Inspection Set (14 Key URLs)

These 14 pages represent the Core commercial architecture and the Final E2 releases. Use the GSC **URL Inspection Tool** to inspect live index status and optionally click "Request Indexing" during initial rollout.

| # | Priority Route | Category / Role | GSC Status | User Canonical | Google Canonical | Last Crawl | Indexing State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `/` | Homepage Master Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/` | Pending | Pending | Pending |
| 2 | `/รับซื้อ/` | Master Buyback Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อ/` | Pending | Pending | Pending |
| 3 | `/รับซื้อโน๊ตบุ๊ค/` | Notebook Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อโน๊ตบุ๊ค/` | Pending | Pending | Pending |
| 4 | `/รับซื้อคอม/` | Computer Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อคอม/` | Pending | Pending | Pending |
| 5 | `/รับซื้อแมคบุ๊ค/` | MacBook Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อแมคบุ๊ค/` | Pending | Pending | Pending |
| 6 | `/รับซื้อไอโฟน/` | iPhone Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อไอโฟน/` | Pending | Pending | Pending |
| 7 | `/รับซื้อไอแพด/` | iPad Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อไอแพด/` | Pending | Pending | Pending |
| 8 | `/รับซื้อกล้อง/` | Camera Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อกล้อง/` | Pending | Pending | Pending |
| 9 | `/รับซื้อลำโพง/` | Speaker Category Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อลำโพง/` | Pending | Pending | Pending |
| 10 | `/รับซื้อซากคอมพิวเตอร์/` | Scrap / Defective Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อซากคอมพิวเตอร์/` | Pending | Pending | Pending |
| 11 | `/รับซื้อ-server/` | Server / Enterprise Hub | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อ-server/` | Pending | Pending | Pending |
| 12 | `/รับซื้อกล้องมือสองสุร/` | Final E2: Camera Surin | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อกล้องมือสองสุร/` | Pending | Pending | Pending |
| 13 | `/รับซื้อลำโพง-ยโสธร/` | Final E2: Speaker Yasothon | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อลำโพง-ยโสธร/` | Pending | Pending | Pending |
| 14 | `/รับซื้อไอแพด-ยโสธร-ipad/` | Final E2: iPad Yasothon | Pending | `https://xn--c3c3a0aa6cvaf8b9dze.com/รับซื้อไอแพด-ยโสธร-ipad/` | Pending | Pending | Pending |

---

## 4. Historical Winner Watchlist (35 Released E2 Local Pages)

All 35 released Historical E2 Winner pages are tracked below.  
*Rule:* Default Action during observation windows is strictly **`MONITOR`**. No page edits or structural shifts are allowed without verified multi-week GSC query evidence.

| # | Route | Product Family | Province / District | Release Phase | GSC Index Status | Post-Deploy Clicks | Post-Deploy Imp | Primary Target Query | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `/รับซื้อลำโพง-อุดรธานี/` | Speaker | Udon Thani | Survivor E1 | Pending | 0 | 0 | รับซื้อลำโพง อุดรธานี | MONITOR |
| 2 | `/รับซื้อลำโพง-สารคาม/` | Speaker | Maha Sarakham | Survivor E1 | Pending | 0 | 0 | รับซื้อลำโพง สารคาม | MONITOR |
| 3 | `/รับซื้อโน๊ตบุ๊คอุบล-notebook-laptop-จ/` | Notebook | Ubon Ratchathani | Batch 1 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค อุบล | MONITOR |
| 4 | `/รับซื้อคอม-อุดรธานี/` | Computer | Udon Thani | Batch 1 | Pending | 0 | 0 | รับซื้อคอม อุดรธานี | MONITOR |
| 5 | `/รับซื้อคอม-ขอนแก่น/` | Computer | Khon Kaen | Batch 1 | Pending | 0 | 0 | รับซื้อคอม ขอนแก่น | MONITOR |
| 6 | `/รับซื้อโน๊ตบุ๊ค-บุรีรัม/` | Notebook | Buriram | Batch 1 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค บุรีรัมย์ | MONITOR |
| 7 | `/รับซื้อโน๊ตบุ๊ค-เลย/` | Notebook | Loei | Batch 1 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค เลย | MONITOR |
| 8 | `/รับซื้อโทรศัพท์มือถือ-จ/` | Mobile | Udon Thani | Batch 2 | Pending | 0 | 0 | รับซื้อโทรศัพท์มือถือ อุดรธานี | MONITOR |
| 9 | `/รับซื้อมือถือ-อุบล/` | Mobile | Ubon Ratchathani | Batch 2 | Pending | 0 | 0 | รับซื้อมือถือ อุบล | MONITOR |
| 10 | `/รับซื้อโน๊ตบุ๊ค-ชัยภูมิ/` | Notebook | Chaiyaphum | Batch 2 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค ชัยภูมิ | MONITOR |
| 11 | `/รับซื้อไอโฟน-มหาสารคาม/` | iPhone | Maha Sarakham | Batch 2 | Pending | 0 | 0 | รับซื้อไอโฟน มหาสารคาม | MONITOR |
| 12 | `/รับซื้อโน๊ตบุ๊ค-สกลนคร/` | Notebook | Sakon Nakhon | Batch 2 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค สกลนคร | MONITOR |
| 13 | `/รับซื้อโน๊ตบุ๊ค-นครพนม/` | Notebook | Nakhon Phanom | Batch 3 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค นครพนม | MONITOR |
| 14 | `/รับซื้อโน๊ตบุ๊ค-นครราชส/` | Notebook | Nakhon Ratchasima | Batch 3 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค โคราช | MONITOR |
| 15 | `/รับซื้อเมืองขอนแก่น/` | MacBook | Khon Kaen | Batch 3 | Pending | 0 | 0 | รับซื้อ macbook ขอนแก่น | MONITOR |
| 16 | `/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/` | Notebook | Yasothon | Batch 3 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค ยโสธร | MONITOR |
| 17 | `/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/` | Notebook | Khon Kaen | Batch 3 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค ขอนแก่น | MONITOR |
| 18 | `/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/` | Notebook | Khon Kaen (Phon) | Batch 4 | Pending | 0 | 0 | รับซื้อ notebook อำเภอพล | MONITOR |
| 19 | `/รับซื้อโทรศัพท์-มือถือ-ย/` | Mobile | Yasothon | Batch 4 | Pending | 0 | 0 | รับซื้อโทรศัพท์ มือถือ ยโสธร | MONITOR |
| 20 | `/รับซื้อโน๊ตบุ๊ค-กาฬสินธ/` | Notebook | Kalasin | Batch 4 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค กาฬสินธุ์ | MONITOR |
| 21 | `/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/` | Notebook | Khon Kaen (Chum Phae) | Batch 4 | Pending | 0 | 0 | รับซื้อ notebook ชุมแพ | MONITOR |
| 22 | `/รับซื้อโน๊ตบุ๊ค-ร้อยเอ็/` | Notebook | Roi Et | Batch 5 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค ร้อยเอ็ด | MONITOR |
| 23 | `/รับซื้อโน๊ตบุ๊ค-หนองบัว/` | Notebook | Nong Bua Lamphu | Batch 5 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค หนองบัวลำภู | MONITOR |
| 24 | `/รับซื้อโน๊ตบุ๊ค-อุดรธาน/` | Notebook | Udon Thani | Batch 5 | Pending | 0 | 0 | รับซื้อโน๊ตบุ๊ค อุดรธานี | MONITOR |
| 25 | `/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/` | Speaker | Roi Et | Batch 5 | Pending | 0 | 0 | รับซื้อลำโพง ร้อยเอ็ด | MONITOR |
| 26 | `/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/` | iPhone | Roi Et | Batch 5 | Pending | 0 | 0 | รับซื้อไอโฟน ร้อยเอ็ด | MONITOR |
| 27 | `/รับซื้อกล้องมือสองมุก/` | Camera | Mukdahan | Batch 5 | Pending | 0 | 0 | รับซื้อกล้อง มุกดาหาร | MONITOR |
| 28 | `/รับซื้อคอม-สารคาม/` | Computer | Maha Sarakham | Batch 6 | Pending | 0 | 0 | รับซื้อคอม สารคาม | MONITOR |
| 29 | `/รับซื้อmacbook-อุดรธานี/` | MacBook | Udon Thani | Batch 6 | Pending | 0 | 0 | รับซื้อ macbook อุดรธานี | MONITOR |
| 30 | `/รับซื้อกล้องอุบล-กล้องcanon-niko/` | Camera | Udon Ratchathani | Batch 6 | Pending | 0 | 0 | รับซื้อกล้อง อุบล | MONITOR |
| 31 | `/รับซื้อกล้อง-ยโสธร/` | Camera | Yasothon | Batch 6 | Pending | 0 | 0 | รับซื้อกล้อง ยโสธร | MONITOR |
| 32 | `/รับซื้อกล้องถ่ายรูป-ศรี/` | Camera | Sisaket | Batch 6 | Pending | 0 | 0 | รับซื้อกล้อง ศรีสะเกษ | MONITOR |
| 33 | `/รับซื้อกล้องมือสองสุร/` | Camera | Surin | Final E2 | Pending | 0 | 0 | รับซื้อกล้อง สุรินทร์ | MONITOR |
| 34 | `/รับซื้อลำโพง-ยโสธร/` | Speaker | Yasothon | Final E2 | Pending | 0 | 0 | รับซื้อลำโพง ยโสธร | MONITOR |
| 35 | `/รับซื้อไอแพด-ยโสธร-ipad/` | iPad | Yasothon | Final E2 | Pending | 0 | 0 | รับซื้อ ipad ยโสธร | MONITOR |

---

## 5. Query $\rightarrow$ Page Ownership Watch & Multi-Product Geo Clusters

To prevent internal keyword cannibalization and ensure proper search equity allocation, the following geo clusters must be monitored using **Query $\times$ Page** reporting:

### Cluster 1: Yasothon (5 Distinct Product Winners)
*   **Notebook:** `/รับซื้อโน๊ตบุ๊ค-notebook-ยโสธร/` $\longrightarrow$ Intent: Laptop / Notebook buyback
*   **Mobile:** `/รับซื้อโทรศัพท์-มือถือ-ย/` $\longrightarrow$ Intent: Smartphone / Android buyback
*   **Camera:** `/รับซื้อกล้อง-ยโสธร/` $\longrightarrow$ Intent: Mirrorless / DSLR / Lens buyback
*   **Speaker:** `/รับซื้อลำโพง-ยโสธร/` $\longrightarrow$ Intent: Bluetooth / Marshall / JBL speaker buyback
*   **iPad:** `/รับซื้อไอแพด-ยโสธร-ipad/` $\longrightarrow$ Intent: iPad / Tablet buyback

### Cluster 2: Udon Thani (4 Distinct Product Winners)
*   **Notebook:** `/รับซื้อโน๊ตบุ๊ค-อุดรธาน/`
*   **Computer:** `/รับซื้อคอม-อุดรธานี/`
*   **MacBook:** `/รับซื้อmacbook-อุดรธานี/`
*   **Speaker:** `/รับซื้อลำโพง-อุดรธานี/`
*   **Mobile:** `/รับซื้อโทรศัพท์มือถือ-จ/`

### Cluster 3: Roi Et (3 Distinct Product Winners)
*   **Notebook:** `/รับซื้อโน๊ตบุ๊ค-ร้อยเอ็/`
*   **iPhone:** `/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/`
*   **Speaker:** `/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/`

### Cluster 4: Maha Sarakham (3 Distinct Product Winners)
*   **Computer:** `/รับซื้อคอม-สารคาม/`
*   **iPhone:** `/รับซื้อไอโฟน-มหาสารคาม/`
*   **Speaker:** `/รับซื้อลำโพง-สารคาม/`

### Cluster 5: Khon Kaen Hierarchy (Province vs District Architecture)
*   **Notebook (Province Master):** `/รับซื้อโน๊ตบุ๊ค-ขอนแก่น/` (Links to districts Phon & Chum Phae)
*   **Notebook (Phon District):** `/รับซื้อ-notebook-อำเภอพล-ขอนแก่น/` (Depth 3, localized intent)
*   **Notebook (Chum Phae District):** `/รับซื้อ-notebook-ชุมแพ-ขอนแก่น/` (Depth 3, localized intent)
*   **Computer:** `/รับซื้อคอม-ขอนแก่น/`
*   **MacBook:** `/รับซื้อเมืองขอนแก่น/`

---

## 6. Migration Redirect Recovery Watch

Track migration equity flow from old URLs to target destinations. Redirects must remain permanently intact.

| Source Legacy URL | HTTP | Destination URL | Status / Expectation |
| :--- | :--- | :--- | :--- |
| `/รับซื้อ-macbook/` | 301 | `/รับซื้อแมคบุ๊ค/` | Consolidating generic MacBook intent to master hub |
| `/buy-camera-surin/` | 301 | `/รับซื้อกล้องมือสองสุร/` | Transferring historical Surin camera equity |
| `/rab-sue-com/` | 301 | `/รับซื้อคอม/` | Consolidating historical PC equity |
| `/รับซื้อ-ใกล้ฉัน/` | 301 | `/รับซื้อ/` | Consolidating local search equity to main hub |
| `/ติดต่อเรา/` | 301 | `/contact/` | Preserving contact signal |

---

## 7. Index Coverage Classification Framework

Track all 46 sitemap URLs using GSC Index Coverage categories:

1.  **INDEXED (Submitted and Indexed):** Goal state for all 46 URLs.
2.  **CRAWLED_NOT_INDEXED:** Expected temporary transition state during Google rollout. *Rule: Do not trigger immediate rewrite.*
3.  **DISCOVERED_NOT_INDEXED:** Waiting in crawl queue. Normal for fresh sitemaps.
4.  **DUPLICATE_GOOGLE_SELECTED_DIFFERENT_CANONICAL:** Warning condition. Check for canonical mismatch.
5.  **BLOCKED (by robots.txt / noindex):** Error condition if found on any of the 46 URLs.
6.  **NOT_FOUND (404):** Error condition if found on any of the 46 URLs.

---

## 8. Planned Measurement Windows

All future comparisons use the post-rebuild deployment boundary: **`2026-08-21T17:44:24+07:00`**.

| Checkpoint Window | Scheduled Date | Measurement Focus | Action Threshold |
| :--- | :--- | :--- | :--- |
| **T+7 Days** | `2026-08-28` | Sitemap processing, initial crawl discovery, zero 500/404 errors | Verify crawl pickup |
| **T+14 Days** | `2026-09-04` | Indexation penetration across 35 E2 winners, initial impressions | Monitor index rate |
| **T+28 Days** | `2026-09-18` | Query $\times$ Page mapping, ranking stabilization, click trends | First mature review |
| **T+42 Days** | `2026-10-02` | Multi-month trend comparison against pre-rebuild historical baseline | Long-term evaluation |

---

## 9. Early Warning Protocol (Issue Severity Levels)

| Severity | Event / Condition | Immediate Action |
| :--- | :--- | :--- |
| **P0 (Critical Blocker)** | • Production route returns 500 or unexpected 404<br>• Canonical tag drops Punycode hostname<br>• Sitemap loses an INDEX page<br>• `robots.txt` blocks `/`<br>• Active 301 redirect breaks or loops | Immediate technical fix required; owner notified. |
| **P1 (Indexation Threat)** | • Previously indexed winner becomes de-indexed<br>• Google persistently selects wrong canonical<br>• High-value search query splits incorrectly across competing pages | Investigate on-page schema/links; propose review. |
| **P2 (Normal Fluctuation)** | • Impressions fluctuate in first 14 days<br>• "Crawled - currently not indexed" status during rollout | **DO NOT MODIFY.** Maintain observation window. |

---

## 10. Strict Isolation Directives

*   **iPad Khon Kaen Isolation:** `/รับซื้อไอแพด-ขอนแก่น-ipad/` must strictly remain in **`DRAFT`** (HTTP 404, 0 sitemap entries, 0 parent links) until distinct verified evidence is provided.
*   **Clean Repository Integrity:** Working tree must remain clean; no code or content modifications are permitted during monitoring phases.
