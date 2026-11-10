# Live Registry Verification — 10 November 2026

**Audit-only**. No production, branch merge, redirect or 410 registry edits were made.

## Scope and verified results

| Registry group | Configured entries | Live requests checked | Result | Remaining technical limitation |
|---|---:|---:|---|---|
| Existing redirects | 53 | 53 | 53 resolved to their exact configured final URL and rendered a matching target page | Raw first-hop HTTP code (301 vs 302) not exposed by follow-redirect fetch |
| Gone routes | 206 | 206 | **206 returned HTTP 410** from live fetch | May still require traffic/backlink evaluation before business decision |
| Main public sitemap routes | 86 | 86 (prior public crawl) | Fetched page content; self-canonical; no meta noindex observed | Not Google URL Inspection and not a raw live response-code proof for every page |

Method: live uncached public site requests to the present domain through TinyFish fetch; redirected final URLs compared to `src/config/seo/redirects.ts`; gone initial fetch error status 410 compared to `src/config/seo/gone.ts`. The connector was not given edit credentials; this was read-only.

## Decisions
- KEEP all 53 existing redirect mappings for now; investigate HTTP 301 raw code during isolated staging runtime QA.
- KEEP all 206 current Gone decisions pending traffic/backlink and relevancy checks; no mass restoration.
- A legacy URL can be in GSC 404 but *now* return 410 because GSC coverage labels lag or group 410 under Not Found.
- Current GSC drilldown includes 12 existing redirect sources, 44 gone paths, 28 current sitemap URLs, 1,392 unmapped rows.
- No new redirects and no de-index/invalidation actions approved.

## Preview protections introduced on staging-only branch
- `SEO_PREVIEW=1` enables meta robots `noindex,nofollow,noarchive` on rendered pages.
- `SEO_PREVIEW=1` adds `X-Robots-Tag: noindex, nofollow, noarchive` to middleware page responses and static assets.
- `SEO_PREVIEW=1` prevents preview robots.txt from publishing the production sitemap location.
- Must independently protect preview with authentication; robots and noindex alone are not access control.
- Never set `SEO_PREVIEW=1` in production, and never deploy branch until Cloudflare proxy/Pages/Workers topology and explicit per-environment settings are verified.
- **Build, check, QA, preview behavior, production status and Cloudflare deployment have NOT been executed or confirmed.**

## Required next step
Run the full existing `npm run gate:predeploy` on an isolated checkout of the staging branch, then preview response-code/noindex tests using authenticated staging host and its own safe environment.
