# เรารับซื้อ.com V2 — Page Release Lifecycle & SOP

## 1. Page Lifecycle States

```
[ DRAFT / PLANNED ] (404)
        ↓  (Content created, under review)
[ HOLD_NOINDEX ] (200, noindex,follow)
        ↓  (Owner approves quality & claims)
[ INDEX ] (200, index,follow, sitemap included)
```

---

## 2. Standard Operating Procedure (SOP) to Release a Page

### Step 1: Create or Update Content
Create a Markdown file in `src/content/pages/<slug>.md` with required frontmatter:
```yaml
---
title: "รับซื้อ..."
description: "..."
h1: "..."
slug: "your-exact-slug"
pubDate: "YYYY-MM-DD"
pageType: "category" | "location" | "guide" | "model"
contentCluster: "notebook" | "pc" | "iphone" | "ipad" | "macbook" | "camera" | "audio" | "gaming" | "b2b"
primaryIntent: "buyback" | "local" | "price_check" | "guide"
state: "HOLD_NOINDEX"
contentStatus: "CONTENT_REQUIRED"
parent: "/รับซื้อ/"
author: "ทีมงานเรารับซื้อ"
reviewer: "คุณโน๊ต"
faqItems:
  - question: "..."
    answer: "..."
---
```

### Step 2: Register / Update SEO Manifest
In `src/config/seo/manifest.ts`:
- Ensure the route path is registered.
- Set initial `state: 'HOLD_NOINDEX'` while drafting.

### Step 3: Run Audit Tests
Run the automated gatekeeper audit:
```bash
npm run audit:release
```

### Step 4: Promote to INDEX
Once content quality, facts, and structure are verified:
1. In the markdown frontmatter: update `state: 'INDEX'` and `contentStatus: 'READY'`.
2. In `src/config/seo/manifest.ts`: update `state: 'INDEX'` and `contentStatus: 'READY'`.
3. Run the full QA suite:
   ```bash
   npm run qa
   ```
4. Verify the URL now automatically appears in `/sitemap.xml`.
