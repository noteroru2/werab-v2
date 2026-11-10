# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42793907334
Source commit: e0ceeb05ec220ef09ad1cc08be2936a814742a43

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

**No production deployment executed by this workflow.**
