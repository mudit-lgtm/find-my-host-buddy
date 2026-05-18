## Goals

1. Stop ranking the same intent on 5 URLs — collapse hosting-* duplicates into one master tool on the home page.
2. Home page = master hosting checker only. Other tools are icon cards that link to their own prerendered pages (not embedded again).
3. Policies move off the home page into their own routes; AdSense policy pages live in footer only, never in header.
4. Every prerendered page gets unique, keyword-targeted meta + AEO/GEO copy + table + unique FAQ + correct schema + internal/outbound links + cloaked Hostinger link.
5. Verify all of it: prerender HTML is what Vercel serves to Googlebot, deep links don't 404, sitemap parses, audit script runs pre-publish.

---

## 1. Route consolidation (the "5 URLs, 1 intent" mistake)

Collapse these five into ONE canonical tool, served at the home page:

```
/                                       ← master "Host Checker" (canonical)
/tools/hosting-checker      ┐
/tools/find-website-host    │  → 301 to /
/tools/where-is-website-hosted │
/tools/who-is-hosting       │
/tools/hosting-lookup       ┘
```

Implementation:

- Remove those 5 entries from `TOOL_ROUTES` in `src/lib/seo/keywordMap.ts`.
- Rewrite the home route entry to absorb all the keyword variants (host checker, find website host, where is website hosted, who is hosting, hosting lookup) into one keyword-rich page with a table of supported provider types and an FAQ that covers the merged intents.
- Add 301 redirects in `vercel.json` for the 5 old paths → `/`.
- Sitemap auto-drops them (driven by `ALL_ROUTES`).

Tools that DO deserve their own page (distinct intent + distinct widget):

```
/tools/dns-lookup             DNS records (A/AAAA/MX/NS/TXT/CNAME)
/tools/website-down-checker   Up/down probe
/tools/ip-checker             What's my IP + IP→host
/tools/port-checker           TCP port scan
/tools/domain-compare         Side-by-side hosting compare
```

New tool pages to add (driven by GSC keywords with non-trivial impressions):

```
/tools/whois-lookup           "whois lookup", "domain whois", "who owns this domain"
/tools/ssl-checker            "ssl checker", "check ssl certificate", "https checker"
/tools/http-headers           "http header checker", "response headers"
/tools/reverse-ip-lookup      "reverse ip lookup", "sites on same server"
/tools/cms-detector           "what cms is this site using", "detect wordpress"
```

(All five reuse existing edge functions / public APIs; no new backend required for prerender + UI shell.)

---

## 2. Home page restructure

Remove from home:

- DNS Lookup section (duplicate)
- Is It Up section (duplicate)
- What Is My IP section (duplicate)
- Port Checker section (duplicate)
- Domain Compare section (duplicate)
- All four `PolicyDetails` blocks (privacy, terms, about, contact)

Keep on home:

- Hero with SearchBar (the master Host Checker)
- TrustFactors / HowTo
- A single icon grid linking out to `/tools/...` pages (not anchors)
- New "Why use Site Host Finder" comparison table
- Unique, keyword-rich, professional copy (not the current generic AEO blob)
- FAQ unique to the home "host checker" intent
- Footer + Hostinger CTA preserved

---

## 3. Policy pages

`PolicyPage` route shells already exist (`/privacy`, `/terms`, `/disclaimer`, `/about`, `/contact`). Move the actual long-form content out of `src/pages/Index.tsx` into `src/lib/seo/keywordMap.ts` so `PolicyPage` renders it. Header drops policy links entirely; Footer keeps them under "Legal".

---

## 4. SEO content rewrite for every page

For every route in `keywordMap.ts` (home, tools, guides, policies):

- Unique `<title>` ≤ 60c with the page's top GSC keyword.
- Unique `description` ≤ 155c.
- AEO intro paragraph (one direct answer in the first 60 words).
- GEO targeting: copy mentions Global / US English; pricing in USD; "worldwide" framing (per the chosen geo).
- At least one HTML table (provider examples, record types, port numbers, etc.) — added to `RouteContent` as a `tables` field and rendered by `ToolPage`/`GuidePage`/`PolicyPage` + emitted as static HTML by `scripts/prerender.ts`.
- Unique FAQ block (no repeat questions across pages) → `FAQPage` JSON-LD.
- Contextual inbound links to 3–5 other internal pages.
- Contextual outbound link to one authority source (Cloudflare/ICANN/MDN/Let's Encrypt).
- One cloaked affiliate link to `/go/hostinger` in body copy (not just footer).
- Correct `schemaType`: `SoftwareApplication` for tools, `Article` + `HowTo` for guides, `WebPage` for policies. Breadcrumb + FAQ schemas always emitted.

Guides get the same treatment plus an explicit "Recommended tool" callout linking to the matching `/tools/*` page and to `/go/hostinger`.

---

## 5. Navigation + footer cleanup

Header:

- Home
- Tools dropdown — all tool pages
- Guides dropdown — all guide pages
- About, Contact (no policy links)

Footer (4-column compact):

- Tools | Guides | Company (About, Contact) | Legal (Privacy, Terms, Disclaimer)
- Single line for Hostinger affiliate disclosure.
- Drop the "Resources" column and the gradient logo block from current layout — collapse into a slim brand row above the grid.

---

## 6. Prerender + Vercel hardening

`scripts/prerender.ts`:

- Render the home page's full static body too (currently skipped).
- Render `<table>` blocks from `RouteContent.tables`.
- Add `<meta name="robots" content="index,follow,max-image-preview:large">`.
- Add `<link rel="alternate" hreflang="x-default">`.
- Emit per-page unique `og:image` URL parameter (fallback to sitewide).

`vercel.json`:

- Keep `cleanUrls: true`.
- Add 301s for the 5 collapsed URLs → `/`.
- Add explicit rewrite that prefers the directory's `index.html` (the `/((?!.*\\.).*)` rewrite currently sends every clean URL to `/index.html`, which BREAKS prerender — Vercel never serves `/tools/dns-lookup/index.html` because the rewrite intercepts first). Replace with a rewrite that only fires when no file exists:
  ```json
  "rewrites": [
    { "source": "/((?!.*\\.|tools/|guides/|privacy|terms|disclaimer|about|contact|go/).*)", "destination": "/index.html" }
  ]
  ```
  This is the single most important fix — without it the prerendered HTML is invisible to crawlers.

`public/robots.txt`: keep, ensure sitemap line points at `https://site-host-finder.vercel.app/sitemap.xml`.

---

## 7. Verification scripts (new)

`scripts/verify-prerender.ts` — fetches every route from the live URL with `User-Agent: Googlebot/2.1` and asserts:

- HTTP 200
- `<h1>` matches `RouteContent.h1`
- At least one FAQ `<details>` present (when route has FAQs)
- All expected JSON-LD `@type` blocks present (Primary + Breadcrumb + FAQPage when applicable)
- Canonical matches expected URL
Outputs a table; non-zero exit on failure.

Wire as `bun run seo:verify` and document running it after each Vercel deploy.

`scripts/seo-audit.ts` — extend existing audit to also check: presence of `<table>`, at least one internal link, at least one outbound link, and one `/go/hostinger` link in body.

---

## 8. Sitemap fix

`scripts/generate-sitemap.ts` already uses real paths from `ALL_ROUTES`. After consolidation it will drop the 5 dead URLs automatically. Verify XML validates; ship the regenerated file under `public/sitemap.xml` and `dist/sitemap.xml`.

---

## Deliverables checklist

```
[ ] keywordMap.ts: drop 5 dup routes, add 5 new tool routes, add tables + unique FAQs everywhere, move policy content here
[ ] vercel.json:   add 301s, fix the catch-all rewrite that's currently shadowing prerendered HTML
[ ] Index.tsx:     master Host Checker only; remove duplicate tool embeds + policy blocks; add table + unique FAQ
[ ] Header/Footer: per spec above
[ ] ToolPage/GuidePage/PolicyPage: render tables[]; render policy long-form
[ ] scripts/prerender.ts:    home body, tables, robots meta
[ ] scripts/seo-audit.ts:    extended checks
[ ] scripts/verify-prerender.ts: new Googlebot verifier
[ ] package.json:  add `seo:verify` script
[ ] sitemap regenerated, robots verified
```

---

## Question before I build

Confirm two things so I don't have to come back and redo work:

1. **Collapse target**: should the 5 hosting-* URLs 301 to `/` (home is the master tool), or to `/tools/hosting-checker` (keep tools section clean, home stays a landing page)? My plan above assumes **home is master**, which is what you said. Confirm. CONFIRM
2. **New tools to add** from your keyword data — confirm the 5 picks (`whois-lookup`, `ssl-checker`, `http-headers`, `reverse-ip-lookup`, `cms-detector`) or tell me to swap any. CONFIRM