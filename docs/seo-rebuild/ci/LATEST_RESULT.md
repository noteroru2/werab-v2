# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42809549178
Source commit: 98993eb58170d134d523fafd0e509042a63863c3

| Gate | Result |
|---|---|
| Refresh lockfile | success |
| npm ci | success |
| astro build | success |
| Worker entrypoint | success |
| astro check | failure |
| SEO gate:predeploy | skipped |
| wrangler deploy --dry-run | skipped |
| local Worker SSR + Preview noindex smoke | skipped |
| live Preview raw HTTP audit (86/53/206) | skipped |
| 7 page public-content/privacy guard | skipped |

**No production deployment executed by this workflow.**
