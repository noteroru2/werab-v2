# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42808612979
Source commit: e5ce371b90b7c777006924c513d6edbe0c401f9c

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

**No production deployment executed by this workflow.**
