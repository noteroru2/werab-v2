# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42841592054
Source commit: d064726b2da119e7ea3567c80bb04a4cebc41dd2

| Gate | Result |
|---|---|
| Refresh lockfile | success |
| npm ci | success |
| astro build | success |
| Worker entrypoint | success |
| astro check | success |
| SEO gate:predeploy | failure |
| wrangler deploy --dry-run | skipped |
| local Worker SSR + Preview noindex smoke | skipped |
| live Preview raw HTTP audit (86/53/206) | skipped |
| 7 page public-content/privacy guard | skipped |
| Batch 2 public photo casebook & privacy | skipped |
| Phase 3 intent, link graph, mobile LINE QA | skipped |

**No production deployment executed by this workflow.**
