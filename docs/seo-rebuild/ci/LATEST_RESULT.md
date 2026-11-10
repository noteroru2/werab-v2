# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42841167633
Source commit: 50e83689263d0ffaa2fb33f3527e945d28f8efe1

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

**No production deployment executed by this workflow.**
