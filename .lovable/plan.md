## Goal

Clear the reported structured-data warnings, make the footer professional and balanced, refine every tool page's metadata and AEO content, and harden the build-time SEO validators. Tool-site strategy only — no blog pages.

## 1. Fix structured-data errors

**Speakable selectors (`index.html`)** — `#speakable-intro`, `#faq`, `#how-it-works` do not exist in the served DOM, so the validator reports "no matches".
- Add the matching IDs to the real rendered markup: `id="speakable-intro"` on the homepage intro paragraph, `id="faq"` on the FAQ section wrapper (`FAQSection.tsx`), `id="how-it-works"` on the HowTo section wrapper (`HowToSection.tsx`).
- Mirror the same IDs in the prerendered static HTML (`scripts/prerender.ts`) so crawlers hitting the static file also match, and keep the selector list limited to IDs that exist on the homepage.

**`areaServed` on `SoftwareApplication`** — not a valid property for that type. Remove it from both `src/components/SeoHead.tsx` and `scripts/prerender.ts`. Geographic signalling stays in the on-page GEO note plus the `Organization`/`WebSite` schema, which do support `areaServed`.

## 2. Footer rebuild

- Remove the "Sponsored by Hostinger" wording entirely (the cloaked `/go/hostinger` referral link stays in page bodies).
- Rebuild `src/components/Footer.tsx` as four equal-width, equal-height columns with consistent heading style, uniform spacing, and truncation-free labels: Tools, Guides, Company, Legal.
- Keep the AdSense policy pages (Privacy, Terms, Disclaimer) in the footer only, never in the header.
- Bottom bar: brand mark, copyright, and a short neutral tagline — balanced left/right on desktop, stacked and centered on mobile.

## 3. CTR-focused title and description rewrite (all 20 routes)

In `src/lib/seo/keywordMap.ts`, rewrite `title` (50–60 chars) and `description` (145–160 chars) for every tool, guide, and policy route so the primary Search Console keyword leads, followed by a benefit and an action cue. Examples of the pattern:
- `CMS Detector — Find What CMS Any Website Uses` / description leading with "Check what CMS any site uses in seconds…"
- `Host Checker — Find Who Is Hosting Any Website`
- `DNS Lookup — Check A, MX, NS & TXT Records Free`

All titles and descriptions stay unique; the audit script enforces this.

## 4. AEO blocks on every tool page

Extend `RouteContent` with three new optional fields and populate them for all 10 tool routes:
- `keyTakeaways: string[]` — 3–5 scannable bullets directly under the hero, above the long content.
- `commonErrors: { mistake: string; fix: string }[]` — 4–6 entries rendered as a definition list.
- `summary: string` — a closing "Final summary" paragraph.

Render them in `src/components/pages/ToolPage.tsx` (keeping the existing utility-first order: H1 → one-line description → tool → quick answer → key takeaways → content) and emit them in `scripts/prerender.ts` so the static HTML carries the same blocks with semantic `section`/`dl` markup.

## 5. Extend `scripts/seo-audit.ts`

Add assertions that fail the build on:
- any occurrence of `site-host-finder.vercel.app` in built HTML, sitemap, or robots;
- canonical/og:url not self-referencing the new domain;
- tool-page body word count below a floor (thin-content guard);
- missing `keyTakeaways`, `commonErrors`, or `summary` markup on tool routes;
- duplicate titles or descriptions (already present — keep).

## 6. New build-time structured-data & file validator

Add `scripts/validate-seo-assets.ts`, run after prerender alongside the audit:
- parses `dist/sitemap.xml` as XML, verifies well-formedness, one entry per route, no duplicates, no redirected URLs, and that every `<loc>` uses `https://sitehostfinder.online`;
- parses `dist/robots.txt`, checks the `Sitemap:` directive matches the new domain and that no `Disallow: /` blanket rule exists;
- extracts every JSON-LD block from every generated HTML file, `JSON.parse`s it (syntax check), and validates required properties for `FAQPage` (unique non-empty question/answer pairs), `BreadcrumbList` (sequential positions, absolute `item` URLs), and `SoftwareApplication` (name, offers, applicationCategory — and asserts no `areaServed`).

Wire it into the existing postbuild chain in `package.json` so a broken sitemap, robots file, or schema block fails the build before deploy.

## Note on the sitemap fetch failure

`https://sitehostfinder.online/sitemap.xml` could not be fetched externally — that is a live-deployment/DNS question, not a code defect. The new validator confirms the file is generated correctly and served from `dist/`; after the next deploy I can re-fetch the live URL to confirm it resolves, and if it still fails the fix is on the domain/Vercel side (domain assignment or DNS), which I will report rather than guess at.

## Technical details

- Files touched: `index.html`, `src/components/Footer.tsx`, `src/components/FAQSection.tsx`, `src/components/HowToSection.tsx`, `src/components/SeoHead.tsx`, `src/components/pages/ToolPage.tsx`, `src/lib/seo/keywordMap.ts`, `src/lib/seo/toolContent.json`, `scripts/prerender.ts`, `scripts/seo-audit.ts`, new `scripts/validate-seo-assets.ts`, `package.json`.
- Verification: full `vite build` + prerender + audit + new validator, then a Googlebot-UA fetch pass over the generated files to confirm H1, FAQ HTML, key takeaways, and JSON-LD are present on every route.
