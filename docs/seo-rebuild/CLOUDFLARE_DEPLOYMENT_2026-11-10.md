# Cloudflare Workers — verified dashboard configuration and migration plan
Date: 2026-11-10. **Branch only. Production/main unchanged.**

## What user verified in Cloudflare dashboard

| Cloudflare setting | Verified value |
|---|---|
| Worker | werab-v2 |
| Repository | noteroru2/werab-v2 |
| Production branch | main |
| Non-production branch builds | Disable builds |
| Build command | npm run build |
| Production deploy command | npx wrangler deploy |
| Legacy version command | npx wrangler versions upload |
| Root directory | / |
| Build variables and secrets | No build variables shown |
| Preview migration banner | Set up Worker Previews |

Do not echo/share the dashboard's build API token identifier.

## Root cause of failed branch builds

User-supplied Cloudflare build log: `npm ci` succeeded, `astro build` succeeded with `@astrojs/node` SSR, then `npx wrangler versions upload` failed because it could not find a Worker script entry point or assets configuration. The committed Astro 5 project currently has Node standalone adapter and lacks root Wrangler configuration. This is a **post-build Worker upload failure**, not an Astro compile error.

## Staging migration draft — do not deploy yet

1. Retain Astro major version 5 and use matching `@astrojs/cloudflare@^12`. Do not use the latest Cloudflare adapter if it targets Astro 6+.
2. Add compatible Wrangler 4 (at least v4.135.0 for Worker Previews) as **local dev dependency**.
3. Run this only on the staging branch in an environment with npm registry connectivity:
   ```sh
   npm uninstall @astrojs/node
   npm install @astrojs/cloudflare@^12
   npm install -D wrangler@^4.159.0
   ```
   These commands regenerate both `package.json` and `package-lock.json`; commit both. Never change only package.json because Cloudflare runs `npm clean-install`/ci.
4. Update `astro.config.mjs` to `adapter: cloudflare()` and maintain SSR, site URL, trailing slash, directory build output.
5. Use the **candidate** `wrangler.jsonc` from `docs/seo-rebuild/wrangler-preview.CANDIDATE.jsonc`, copied to repository root **only after local build checks**; confirm generated entrypoint `dist/_worker.js/index.js` exists.
6. Run `npm ci`, `npm run build`, `npm run check`, `npm run gate:predeploy`, and `npx wrangler deploy --dry-run` (no network deployment) on isolated staging checkout. Inspect Node API compatibility.
7. Only then switch the Cloudflare banner **Set up Worker Previews**; this switch is not reversible. Confirm Preview command `npx wrangler preview`, Preview Runtime var `SEO_PREVIEW=1` and separate resources/bindings.
8. Keep production branch `main`, production deploy command and active deployment unchanged. Enable preview builds only after safety and QA checks. Protect preview access with Cloudflare Access / private hostname, separately from noindex.
9. After preview URL is available, inspect meta robots, X-Robots-Tag, sitemap, redirects 301, gone 410, canonical, and 86 survivor content routes.

## Important preview caveat

`SEO_PREVIEW` is a **Runtime variable** under `previews.vars`; build-time `import.meta.env` alone is not sufficient. This branch now checks `Astro.locals.runtime.env.SEO_PREVIEW`/middleware context as well. No Preview has been created; until adapter migration and isolated env tested, this is not evidence of effective noindex.

## What not to change right now

- Do NOT change Production branch `main`, or Production Deploy command `npx wrangler deploy`.
- Do NOT run `wrangler deploy` from this feature branch; the wrong command can publish to Production.
- Do NOT simply set `--assets=dist` against a Node standalone SSR build; it cannot serve SSR on Workers.
- Do NOT convert `versions upload` to `preview` before completing Worker Previews setup and checking runtime isolation.
- Do NOT expose production API token values or customer data.
- Do NOT change any 301/410 or sitemap survivor URLs without row-level migration approval.

## Sources
- https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
- https://developers.cloudflare.com/workers/previews/compare-workflows/
- https://developers.cloudflare.com/workers/previews/configuration/
- https://v5.docs.astro.build/en/guides/deploy/cloudflare/

Current blockers: no npm installation/build environment with network access from connector tools, no authenticated Cloudflare management connection, no preview execution or verification; production remains untouched.
