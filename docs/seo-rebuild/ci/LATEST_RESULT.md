# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42809268988
Source commit: b1305f588550735a750848a3f05d98b9bd239ce3

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
| 7 page public-content/privacy guard | success |

**No production deployment executed by this workflow.**
