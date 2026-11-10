# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42806048734
Source commit: 7f7cdb3c4069f3d8b07fd3c7b3263f589d1e31f4

| Gate | Result |
|---|---|
| Refresh lockfile | success |
| npm ci | success |
| astro build | success |
| Worker entrypoint | success |
| astro check | success |
| SEO gate:predeploy | success |
| wrangler deploy --dry-run | success |
| local Worker SSR + Preview noindex smoke | success |
| live Preview raw HTTP audit (86/53/206) | success |

**No production deployment executed by this workflow.**
