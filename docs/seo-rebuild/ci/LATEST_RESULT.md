# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42841816141
Source commit: 696d2569566de1ab4e0fd8be6d048a9080ff3587

| Gate | Result |
|---|---|
| Refresh lockfile | success |
| npm ci | success |
| astro build | success |
| Worker entrypoint | success |
| astro check | success |
| SEO gate:predeploy | success |
| wrangler deploy --dry-run | skipped |
| local Worker SSR + Preview noindex smoke | skipped |
| live Preview raw HTTP audit (86/53/206) | skipped |
| 7 page public-content/privacy guard | success |
| Batch 2 public photo casebook & privacy | success |
| Phase 3 intent, link graph, mobile LINE QA | failure |

**No production deployment executed by this workflow.**
