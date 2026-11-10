# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42803210481
Source commit: b2d2ad798aa37e383d18c9125673535a11e59141

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
