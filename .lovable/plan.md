## Goal

Make every tool page feel like a **utility page**, not a blog post. Tool comes first, content supports it. Highlight keywords. Ship complete, valid schemas. Guarantee Google can crawl and index every page with its own meta.

---

## 1. Hero restructure (tool-first)

Reorder `ToolPage.tsx` so above-the-fold matches utility-site convention:

```text
[H1 — exact keyword]
[1-line description — 15–20 words, keyword in first 8 words]
[THE TOOL — search bar / widget, prominent card]
[Quick answer chip — 1 sentence AEO snippet, inline under tool]
─────────────────────────────
[What this page covers — bullets]
[Long-form sections, tables, use cases, troubleshooting]
[FAQ]
[Related tools]
```

Changes:

- Drop the big "Quick answer" + "GEO note" + "What this page covers" stack between intro and tool. Move them **below** the tool.
- Shrink intro to 1 line; full intro paragraph moves into first content section.
- Tool card gets stronger visual weight (border, shadow, larger padding) so it reads as the page's purpose.

## 2. Keyword & key-point highlighting

Right now body text is a flat gray wall. Add visual emphasis:

- **Bold** primary keyword + 2–3 LSI keywords per section automatically (via a small `highlightKeywords()` helper that wraps matches from `route.keywords` in `<strong>`).
- Key points and bullets get colored marker, larger font on mobile, and `font-medium` text.
- Quick-answer box restyled as inline highlight chip directly under the tool (not a giant card up top).
- Section H2s get an accent underline so the page scans like documentation.
- Troubleshooting & use-case cards already use cards — keep, but tighten spacing.

## 3. Complete schema set per page type

Audit current `SeoHead` + prerender output, then ensure each route emits the right combination. Target matrix:


| Page type    | Schemas emitted                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------- |
| Home         | `WebSite` + `Organization` + `SearchAction` + `BreadcrumbList` + `FAQPage`                     |
| Tool pages   | `SoftwareApplication` + `WebPage` + `BreadcrumbList` + `FAQPage` + `HowTo` (where steps exist) |
| Guides       | `Article` + `BreadcrumbList` + `FAQPage`                                                       |
| Policy pages | `WebPage` + `BreadcrumbList`                                                                   |
| Compare      | `SoftwareApplication` + `BreadcrumbList` + `FAQPage`                                           |


Fixes:

- Add `Organization` + `WebSite` (with `potentialAction` SearchAction) sitewide in `index.html`.
- Tool pages currently emit only one primary schema — extend to emit **both** `SoftwareApplication` and `WebPage` (Google accepts multiple).
- Validate all schemas have required fields (`@context`, `@type`, `name`, `url`, `description`, plus type-specific required props) — no missing `image`/`logo` warnings.
- Ensure `BreadcrumbList` URLs are absolute and match canonical.

## 4. Sitemap (complete + accurate)

Rewrite `scripts/generate-sitemap.ts` to source entries **from `ALL_ROUTES**` in `keywordMap.ts` (single source of truth) instead of a hardcoded list. Output:

- `/` priority 1.0, weekly
- All tool pages priority 0.9, weekly
- All guides priority 0.7, monthly
- Policy pages priority 0.3, yearly
- `lastmod` = today's ISO date
- Skip `/results/*`, `/go/*`, `/404`

## 5. robots.txt audit

Current file disallows `/results/` and `/go/` (correct). Verify:

- `Sitemap:` line points at canonical domain
- No accidental `Disallow: /` block
- Add explicit `Allow: /tools/`, `/guides/`, `/about`, `/privacy`, `/terms`, `/disclaimer` for clarity
- Keep Googlebot/Bingbot blocks targeted (no `noindex` headers needed)

## 6. Crawlable HTML guarantee

The prerender already writes per-route `dist/<path>/index.html`. Verify that each pre render works with vercel hosting

- Each prerendered file contains H1, intro, sections, FAQ, JSON-LD **in the static HTML** (no JS required to render).
- Hidden `#seo-prerender` div is readable by Googlebot (Google reads `hidden` content; it's not cloaking since it matches rendered React content).
- `scripts/verify-prerender.ts` extended to also assert each schema type is present per the matrix above, and that meta title/description/canonical are unique per route.
- Run audit script as part of `build` so a broken page fails CI.

## 7. Verification

After build:

1. `bun run build` → runs prerender + sitemap.
2. `bun run scripts/verify-prerender.ts` → asserts H1, FAQ HTML, all required schemas, unique meta per route, Googlebot UA fetch returns full content.
3. `bun run scripts/seo-audit.ts` → asserts word count ≥ 1500, internal links, affiliate link, table presence.
4. Manual: view-source on 2–3 tool pages to confirm HTML-only render.

---

## Technical details

**Files to edit**

- `src/components/pages/ToolPage.tsx` — reorder hero, add `highlightKeywords()`, restyle quick-answer
- `src/components/SeoHead.tsx` — emit multiple schemas per page, add WebPage alongside SoftwareApplication
- `index.html` — add sitewide `Organization` + `WebSite`+SearchAction JSON-LD
- `scripts/generate-sitemap.ts` — source from `ALL_ROUTES`, proper priorities
- `scripts/prerender.ts` — match new schema set
- `scripts/verify-prerender.ts` — assert schema matrix + unique meta
- `public/robots.txt` — add explicit `Allow` lines, verify Sitemap directive
- `src/lib/seo/keywordMap.ts` — no content changes; just confirm `ALL_ROUTES` export covers every public page

**New helper**

- `src/lib/seo/highlightKeywords.tsx` — small util that takes a string + keyword list and returns React nodes with `<strong>` around matches (case-insensitive, first occurrence per keyword to avoid spam).

**No changes to**

- Tool logic, edge functions, results view routing (already correct from prior turn)
- `toolContent.json` content (already 1500+ words and approved)