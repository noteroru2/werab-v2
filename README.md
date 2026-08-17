# เรารับซื้อ.com V2 (`werab-v2`)

> **Clean Architecture Re-Platform & SEO Search Equity Engine**  
> **Status:** `STRUCTURE_READY_CONTENT_PENDING`

## Core Mission
This project rebuilds the underlying web architecture of **เรารับซื้อ.com** (`https://xn--c3c3a0aa6cvaf8b9dze.com/`) to establish a clean, high-performance, maintainable Astro platform while strictly protecting years of historical URL equity, search traffic, and migration decisions from the legacy repository.

## Architecture Highlights
- **Single Authoritative SEO Resolver**: Centralized state management for all routes (`INDEX`, `HOLD_NOINDEX`, `REDIRECT`, `GONE`, `DRAFT`, `REVIEW_REQUIRED`).
- **HTTP Migration Precedence**: Native HTTP status handling (`200`, `301`, `410`, `404`) through Astro server middleware.
- **Cluster-Aware Internal Links**: Smart internal linking engine avoiding link dumps and invalid destinations.
- **Verified Business Facts**: Single source of truth for commercial and contact facts, preventing hallucinated branches or fake local hours.
- **Strict Auditing Suite**: Comprehensive automated gates for cutover safety, sitemaps, schemas, claims, and redirect loops.

## Commands
```bash
# Development
npm run dev

# Production Build & Verification
npm run build
npm run check
npm run qa

# Audits
npm run audit:redirects
npm run audit:sitemap
npm run audit:schema
npm run audit:links
npm run audit:claim
npm run audit:http
npm run audit:cutover
```
