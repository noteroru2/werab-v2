# SEO Rebuild Batch 1 — Review / Access Gate
Date: 2026-11-10
Branch: `seo-rebuild/staging-2026-11-10`
Status: STAGING ONLY — **NOT FOR PRODUCTION**, Access still needs owner-side configuration.

## Batch 1 content change
New shared component: `src/components/FieldInspectionCases.astro`.
Applied to 7 existing paths:
- `/` — cross-category examples, customer intake, links to primary service categories
- `/รับซื้อโน๊ตบุ๊ค/` — GTX 1650 vs RTX 3050 4GB/6GB; battery/charger diagnostics
- `/รับซื้อคอม/` — components of i5-12400 + RX 6500 XT / i3-13100F + RX 6600, hardware condition
- `/รับซื้อแมคบุ๊ค/` — M1/ M3, missing chargers, Find My/MDM
- `/รับซื้อไอโฟน/` — storage, Battery Health, Face ID, parts history
- `/รับซื้อไอแพด/` — iPad Pro 2017 vs M1, Wi-Fi/Cellular, Remote Management
- `/รับซื้อกล้อง/` — lens/body separate, approximate shutter count, Leica Q charger/condition

No private customer identifiers, secret ledger cost, personal contact, guaranteed buyback quote or unverified exact transaction claims added. Examples are explicitly described as **illustrative assessment scenarios**, not completed sales. Existing images remain unchanged; no new private images uploaded.

## Legacy URL safety
- No changes to `src/config/seo/manifest.ts`, `redirects.ts`, `gone.ts`.
- Existing 86 sitemap URLs / 53 redirects / 206 gone rules must remain unchanged.
- The immutable owner-approved copy hash baselines remain unchanged. Staging CI uses `SEO_REBUILD_STAGING=1` to permit *only* the exact new component import and insertion on 7 named pages, verified by SHA-256 reconstitution of the original page.
- Production/mains branch gate still rejects those page changes until owner explicitly approves the release package.

## REQUIRED: Protect Preview via Cloudflare Access (Owner-side dashboard action)
Official docs: https://developers.cloudflare.com/workers/configuration/cloudflare-access/

1. Cloudflare Dashboard → Workers & Pages → `werab-v2` → **Access** tab.
2. Click **Protect this Worker behind Access**.
3. Select **Previews only**. DO NOT select All traffic; production must remain public.
4. Authentication policy: permit only explicit owner/team email addresses. Avoid broad email-domain allowlists where unnecessary. If One-time PIN/email verification is offered, enable the supported identity option.
5. Apply Access. Never share OTPs or sign-in credentials with ChatGPT.
6. Verify in a fresh private/incognito browser: the exact Preview URL must redirect to Cloudflare Access sign-in or return HTTP 403/401, never display site to an unauthenticated visitor.
7. Confirm production `https://xn--c3c3a0aa6cvaf8b9dze.com/` stays publicly accessible.

Preview URL: https://seo-rebuild-staging-2026-11-10-werab-v2.noteroru2.workers.dev/

**As of this document, Cloudflare Access has NOT been applied or verified.** Meta `noindex` is not authentication. Do not connect a private AMPHON back-office database or publish unreviewed case photos until Access is verified.

## Regression and protected QA
- `npm run gate:predeploy` run with `SEO_REBUILD_STAGING=1` on Branch only.
- `node scripts/seo-rebuild-content-batch1-audit.mjs` checks all 7 pages and basic disclosure/sensitive patterns.
- `npx tsx scripts/seo-rebuild-preview-live-audit.ts` audits raw HTTP 86+53+206 when public (or Access service token configured).
- After Access is applied, unauthenticated live crawler cannot read pages; the audit records `ACCESS_PROTECTED_UNAUTHENTICATED` rather than claiming 349 checks. For authenticated live regression, configure a dedicated least-privilege Cloudflare Access Service Token with Access policy and store ID/secret only as GitHub Actions secrets `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET`. Do not paste tokens into GitHub source or chat.
- Do not merge into main or deploy to Production without explicit approval and production-parity review.
