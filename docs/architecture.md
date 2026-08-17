# เรารับซื้อ.com V2 — System Architecture

## 1. Executive Overview
- **Domain Identity**: `https://xn--c3c3a0aa6cvaf8b9dze.com/`
- **Display Domain**: `เรารับซื้อ.com`
- **Positioning**: General Buyback Authority (*"ก่อนขาย เช็กราคา เข้าใจสภาพ แล้วค่อยตัดสินใจ"*)
- **Framework**: Astro 5 (Standalone Node.js Server SSR + Content Collections)
- **Deployment Mode**: Standalone Server with Middleware-driven URL resolution.

---

## 2. Core Architectural Pillars

### 2.1 Single Central SEO Manifest (`src/config/seo/manifest.ts`)
The entire URL universe of the website is maintained in a central manifest with explicit states:
- `INDEX`: Public, indexable (HTTP 200, `index,follow`, self-canonical, sitemap eligible).
- `HOLD_NOINDEX`: Live preview / hold (HTTP 200, `noindex,follow`, self-canonical, excluded from sitemap).
- `REDIRECT`: Permanent alias / consolidation (HTTP 301, redirect to canonical target, excluded from sitemap).
- `GONE`: Quarantined spam/off-topic legacy paths (HTTP 410 Gone, excluded from sitemap).
- `DRAFT` / `REVIEW_REQUIRED`: Planned architecture / pending review (HTTP 404, excluded from sitemap).

### 2.2 Central SEO Resolver (`src/lib/seo/resolve.ts`)
Every URL request passes through `resolveSeo(url)` which normalizes the path and returns a deterministic `ResolvedSeo` object:
1. GONE Check (HTTP 410) -> O(1) Set lookup from 208 authoritative quarantined paths.
2. Redirect Check (HTTP 301) -> O(1) Map lookup from 46 normalized direct redirect rules.
3. Manifest Registry Check -> Resolves page metadata, canonical, and robots directives.
4. Fallback (HTTP 404) -> Returns clean 404 for unknown or unreleased draft routes.

### 2.3 HTTP Migration Middleware (`src/middleware.ts`)
The Astro middleware layer intercepts requests before route resolution:
- Normalizes URL paths (handles percent-encoded Thai characters and enforces trailing slashes).
- Executes 301 permanent redirects directly with HTTP status 301.
- Intercepts 410 GONE paths and serves a lightweight, branded HTTP 410 Gone response.
- Passes resolved SEO context to pages and components via `context.locals.seo`.

---

## 3. Directory Structure

```
werab-v2/
├── docs/                      # Architecture, Migration, and Release Documentation
├── migration/
│   └── legacy/                # Read-only snapshot of legacy migration evidence
├── reports/
│   └── seo/                   # Recovery queue & migration parity reports
├── scripts/                   # Automated QA, Audit, and Validation scripts
├── src/
│   ├── components/            # Reusable UI components (Header, Footer, FAQ, etc.)
│   ├── config/
│   │   ├── business.ts        # Single source of truth for verified business facts
│   │   ├── planned-pages.ts   # Planned architecture in DRAFT state
│   │   └── seo/               # Manifest, GONE paths, redirects, and type definitions
│   ├── content/
│   │   └── pages/             # Markdown content collection for approved pages
│   ├── layouts/
│   │   └── BaseLayout.astro   # Global SEO, Meta, OpenGraph & Schema layout
│   ├── lib/
│   │   └── seo/               # Normalizer, Resolver, Schema generator, Internal linking
│   ├── pages/                 # Core Hubs, Category Pages, API routes, and 404 handler
│   └── styles/
│       └── global.css         # Modern design tokens and typography
```

---

## 4. Verification & QA Suite
All changes are validated using automated test scripts:
- `npm run check`: Validates TypeScript and Astro components.
- `npm run build`: Validates production bundle compilation.
- `npm run qa`: Executes the complete test suite (Claims, Schema, Redirects, HTTP Status, Sitemap, Internal Links, Release Gatekeeper, Cutover Readiness).
