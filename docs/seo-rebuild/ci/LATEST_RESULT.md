# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42820384131
Source commit: 775ce161203434c420f05a47f73d6fa91eb700f2

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
