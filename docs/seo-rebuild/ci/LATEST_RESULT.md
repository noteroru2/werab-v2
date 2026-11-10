# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42843498241
Source commit: 3ec4b1380c800107ed0227f5c0359f2e62921a71

| Gate | Result |
|---|---|
| Refresh lockfile | success |
| npm ci | success |
| astro build | success |
| Worker entrypoint | success |
| astro check | success |
| SEO gate:predeploy | success |
| wrangler deploy --dry-run | success |
| local Worker SSR + Preview noindex smoke | failure |
| live Preview raw HTTP audit (86/53/206) | skipped |
| 7 page public-content/privacy guard | success |
| Batch 2 public photo casebook & privacy | success |
| Phase 3 intent, link graph, mobile LINE QA | success |
| Phase 3 Chromium setup | success |
| Phase 3 mobile visual/browser tests (within local Worker runtime) | failure |

**No production deployment executed by this workflow.**
