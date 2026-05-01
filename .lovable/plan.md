# Polish UI, Add Per-Tool Anchors, Integrate Adsterra & Lock Down /results

## Goals (no SEO content removed)

1. Make the long page feel **graceful & scannable** — wrap dense sections in icon boxes, highlight cards, and collapsible "Read more" panels (content stays in DOM for SEO).
2. Add **individual hash anchors** for each tool (`#dns-lookup`, `#website-down-checker`, `#ip-checker`, `#port-checker`) so each is indexed separately.
3. Update **header + footer nav** with all 6 tool anchors.
4. Integrate **Adsterra ads** (banners + native + popunder + social bar) optimized for mobile and desktop, placed near Hostinger CTAs to maximize affiliate + ad revenue.
5. Stop `/results/<domain>` URLs from being indexed (keep all current indexed URLs intact).

---

## 1. Visual Polish — "Graceful, Not Lengthy"

**Strategy:** Keep all text in the DOM (Google still sees it) but visually compress with icon cards, gradient highlight boxes, two-column layouts, and a "Show more" toggle on the long Hosting Guide.

### `src/components/SEOContent.tsx` (Hosting Guide)

- Convert the 10 H3 sections into a **2-column grid of gradient icon cards** (each card = one topic with icon + heading + paragraph).
- Wrap the second half (after "Domain Registration vs. Web Hosting") in a `<details>` element styled as a "Read full hosting guide ↓" button. Content stays in initial HTML — `<details>` keeps it crawlable and unhidden.
- Add lucide icons per topic (Server, Shield, Zap, Globe, Database, etc.).

### `src/components/FAQSection.tsx`

- Already an accordion ✅ — just add a colorful left-border accent per item and a "Popular" badge on the top 3 questions.

### `src/pages/Index.tsx` (Privacy/Terms/About/Contact)

- Wrap each long policy section in a `<details>` collapsible with a gradient icon header. Content stays in DOM and crawlable.
- Use a 2-column "info card" grid for About + Contact instead of long paragraphs.

### `src/components/HowToSection.tsx`

- Already clean ✅ — minor: add gradient backgrounds to step icon containers (matching brand blue→purple→cyan).

### `src/components/TrustFactors.tsx`

- Already clean ✅ — no changes.

---

## 2. Per-Tool Hash Anchors (for individual indexing)

### `src/pages/Index.tsx`

- Split the single `#tools` section into **6 individually-anchored mini-sections** stacked vertically, each with its own `<h2>`, icon header, and short SEO paragraph:
  - `#hosting-checker` (already exists — hero)
  - `#dns-lookup` (new — DNS records explainer + link to checker)
  - `#website-down-checker` (new — embeds the IsItUp inline form, not just dialog)
  - `#ip-checker` (new — embeds WhatIsMyIP inline)
  - `#port-checker` (new — embeds PortChecker inline)
  - `#compare` (already exists)
- Keep the existing `#tools` overview grid above as a quick-jump menu linking to the 6 anchors.
- Inline tool forms reuse logic from `ToolDialog.tsx` (extract `IsItUpTool`, `WhatIsMyIPTool`, `PortCheckerTool` into `src/components/tools/` so they render both inline and in dialogs).

### `index.html` static SEO block

- Add matching `<section id="dns-lookup">`, `#website-down-checker`, `#ip-checker`, `#port-checker` blocks with H2 + 1-paragraph descriptions so crawlers see them in raw HTML.

### `public/sitemap.xml`

- Add the 4 new hash URLs (keep all existing entries intact).

---

## 3. Header + Footer Nav

### `src/components/Header.tsx`

- Replace flat nav with a **"Tools ▾" dropdown** (using existing `navigation-menu` UI primitive) listing all 6 tool anchors. Keep top-level links: Tools (dropdown), How It Works, FAQ, Guide, Compare.
- Mobile sheet: render the 6 tool anchors as a grouped section under "Tools".

### `src/components/Footer.tsx`

- Update `toolLinks` array to use the 6 dedicated anchors:
  - Hosting Checker → `/#hosting-checker`
  - DNS Lookup → `/#dns-lookup`
  - Website Down Checker → `/#website-down-checker`
  - IP Checker → `/#ip-checker`
  - Port Checker → `/#port-checker`
  - Domain Compare → `/#compare`

---

## 4. Adsterra Ad Integration

**Placement strategy** (mobile-first, near high-engagement zones):


| Slot                    | Ad                                              | Where                                                                                                                         |
| ----------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Popunder                | `faa7aff7…js`                                   | `<head>` of `index.html` (fires once per session)                                                                             |
| Social bar              | `c1f34409…js`                                   | `<head>` of `index.html`                                                                                                      |
| Native banner container | `5bad8e8d…` invoke + `<div id="container-...">` | Below hero search bar in `Index.tsx` AND on `Results.tsx` below summary banner                                                |
| 468×60 banner           | `759ffd17…`                                     | Mobile-hidden, desktop-only — top of Hosting Guide section                                                                    |
| 300×250 rectangle       | `c381d2037…`                                    | Inside FAQ section sidebar (desktop) / between FAQ items 5 & 6 (mobile)                                                       |
| 160×600 skyscraper      | `2755c8659…`                                    | Desktop-only, fixed sidebar on Results page (right side, sticky)                                                              |
| 160×300 small           | `caed3321…`                                     | Desktop-only, between tool sections                                                                                           |
| 320×50 mobile banner    | `f3104055…`                                     | **Sticky bottom on mobile only** (max revenue from mobile users)                                                              |
| 728×90 leaderboard      | `996d0263…`                                     | Desktop-only, below Hostinger CTA in hero AND above footer                                                                    |
| Direct link             | `kpskzs0ast?key=…`                              | Wrap "Try Hostinger" CTA secondary button as an alt monetization (every other click, or as a "More hosting deals" link below) |


### Implementation

- Create `src/components/AdsterraAd.tsx` — reusable component that injects the `atOptions` script + invoke script into a unique container by key/format/size. Uses `useEffect` to inject scripts once and clean up.
- Create `src/components/AdsterraNative.tsx` — for the native banner with fixed `id="container-..."`.
- Create `src/components/StickyMobileAd.tsx` — fixed-bottom 320×50 wrapper using `useIsMobile` hook (already exists).
- Create `src/components/AdsterraSidebar.tsx` — sticky 160×600 for Results page desktop.
- Add popunder + social bar scripts directly in `index.html` `<head>` (they're page-level, not inline).
- Each ad component renders nothing on initial SSR/static HTML (avoids polluting the SEO crawler view).

---

## 5. Block /results/* from Indexing

### `src/pages/Results.tsx`

- Add a `<Helmet>`-style meta injection on mount: dynamically set `<meta name="robots" content="noindex, follow">` and update `<link rel="canonical">` to point to `/`. Use a small effect that mutates `document.head` (no react-helmet dep needed).
- Remove document title bloat.

### `public/robots.txt`

- Add `Disallow: /results/` under `User-agent: *` and the specific bot blocks (still allow `/`, `/#*`, `/go/hostinger`).

### `public/sitemap.xml`

- Confirm no `/results/*` entries (currently none ✅).

---

## 6. Files Changed Summary


| File                                         | Change                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `index.html`                                 | Add Adsterra popunder + social bar in `<head>`; add 4 new static `<section>` blocks for new tool anchors |
| `public/robots.txt`                          | Add `Disallow: /results/`                                                                                |
| `public/sitemap.xml`                         | Add 4 new tool-anchor URLs                                                                               |
| `src/components/Header.tsx`                  | Tools dropdown with 6 anchors                                                                            |
| `src/components/Footer.tsx`                  | Update toolLinks to 6 dedicated anchors                                                                  |
| `src/components/SEOContent.tsx`              | 2-col gradient icon cards + collapsible second half                                                      |
| `src/components/FAQSection.tsx`              | Colored accent + "Popular" badges                                                                        |
| `src/components/HowToSection.tsx`            | Gradient icon backgrounds                                                                                |
| `src/pages/Index.tsx`                        | Split tools into 6 anchored sections with inline forms; collapsible policy sections                      |
| `src/pages/Results.tsx`                      | noindex meta + canonical to `/`; add sidebar ad slot                                                     |
| `src/components/ToolDialog.tsx`              | Extract tool components for reuse inline                                                                 |
| `src/components/tools/IsItUp.tsx` (new)      | Reusable component                                                                                       |
| `src/components/tools/WhatIsMyIP.tsx` (new)  | Reusable component                                                                                       |
| `src/components/tools/PortChecker.tsx` (new) | Reusable component                                                                                       |
| `src/components/AdsterraAd.tsx` (new)        | Reusable iframe ad                                                                                       |
| `src/components/AdsterraNative.tsx` (new)    | Native banner                                                                                            |
| `src/components/StickyMobileAd.tsx` (new)    | 320×50 sticky mobile bottom                                                                              |
| `src/components/AdsterraSidebar.tsx` (new)   | 160×600 desktop sidebar                                                                                  |


---

## What's Preserved (no breaking changes)

- ✅ All indexed URLs: `/`, `/#hosting-checker`, `/#how-it-works`, `/#tools`, `/#why-trust-us` remain valid (sections kept with same IDs)
- ✅ All JSON-LD schemas in `<head>` untouched
- ✅ All SEO copy in `index.html` static block + `SEOContent.tsx` + `FAQSection.tsx` kept verbatim — only visual presentation changes
- ✅ AdSense script untouched (runs alongside Adsterra)
- ✅ Hostinger affiliate `/go/hostinger` cloaked link untouched
- ✅ Google Analytics tag untouched
- the actual work of this website site hosting checker should work properly