# SEO Rebuild staging CI (no deployment)

Run: https://github.com/noteroru2/werab-v2/actions/runs/42793441916
Source commit: edf8c564a46d642a0b98760309c180915c208b28

| Gate | Result |
|---|---|
| Refresh lockfile | success |
| npm ci | success |
| astro build | success |
| Worker entrypoint | success |
| astro check | success |
| SEO gate:predeploy | success |
| wrangler deploy --dry-run | success |

**No production deployment executed by this workflow.**
