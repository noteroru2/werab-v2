# Worker Preview build trigger — 2026-11-10

Owner confirmed Cloudflare **Preview Builds enabled** for Worker `werab-v2`.

This documentation-only commit intentionally triggers a build of the non-production branch `seo-rebuild/staging-2026-11-10`, following successful isolated CI (8/8 checks). This action DOES NOT merge into `main`, update the production deployment, modify redirect/Gone rules, or call `wrangler deploy`.

Cloudflare should be configured with:
- Production branch: `main`
- Preview command: `npx wrangler preview`
- Preview environment variable `SEO_PREVIEW=1`
- Separate preview protection / Access policy

## Required verification after Cloudflare creates preview
1. Confirm a **Preview** environment appears in the Worker environment selector, distinct from **Production**.
2. Obtain actual Preview URL from Cloudflare; do not assume a hostname.
3. Verify response status, `X-Robots-Tag: noindex`, HTML meta robots, and access protection.
4. Verify `/robots.txt` does not advertise the production sitemap.
5. Check 200 for major categories, 301 for legacy aliases, and 410 for approved gone URLs.
6. Check internal links, mobile LINE CTA, media rendering, and baseline content parity.
7. Only start design/content rebuild after those gates pass.

**STOP** if a non-production branch build alters the Production active deployment. Do not roll out preview to Production.
