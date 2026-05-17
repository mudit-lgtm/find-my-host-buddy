## Goal

Make every route on `site-host-finder.vercel.app` return fully-rendered HTML to Google, ChatGPT, Perplexity, LinkedIn, X, Slack, etc. — without leaving the current Vite + React Router stack. Build dedicated keyword-targeted pages from the GSC data you shared, wire them into nav, sitemap, and schema, and ship a pre-publish SEO audit.

---

## 1. Static prerendering with react-snap (Vercel-compatible)

- Install `react-snap` + `react-helmet-async` (already considered).
- Switch `ReactDOM.render` → `ReactDOM.hydrateRoot` only when prerendered markup exists (react-snap convention).
- Wrap `App` in `<HelmetProvider>` in `src/main.tsx`.
- Add `postbuild: "react-snap"` in `package.json` and a `reactSnap` config block listing every route (homepage, 10 tool pages, 4 guides, 5 policy pages). Each route gets a real `dist/<route>/index.html` with full HTML + JSON-LD baked in.
- Update `vercel.json`:
  - Keep the `/go/hostinger` 302 redirect.
  - Add `cleanUrls: true` and `trailingSlash: false` so `/tools/dns-lookup` serves `dist/tools/dns-lookup/index.html` directly (no SPA fallback for those URLs → no deep-link 404, no JS required for crawlers).
  - Keep SPA fallback only for dynamic `/results/:domain`.
- Exclude `/results/*` and `/go/*` from prerender + sitemap (already noindex).

## 2. New routes (each = its own URL, unique meta, schema, FAQ, content)

Keywords mapped from the GSC export you pasted.

### Tool pages (in header + footer nav)
```
/tools/hosting-checker          → "host checker", "hosting checker", "hostchecker"
/tools/find-website-host        → "find website host", "find my host", "find host of website"
/tools/where-is-website-hosted  → "where is my website hosted", "where is this site hosted"
/tools/who-is-hosting           → "who hosts this site", "who is hosting this website"
/tools/hosting-lookup           → "hosting lookup", "web hosting lookup", "domain hosting lookup"
/tools/dns-lookup               → DNS records (A, AAAA, MX, NS, TXT)
/tools/ip-checker               → "ip host checker", "what is my ip"
/tools/website-down-checker     → "is it up", "site down"
/tools/port-checker             → open port check
/tools/domain-compare           → side-by-side two domains
```

Each tool page reuses the existing edge functions (`hosting-lookup`, `site-status`). Same UI primitives, different copy, different H1, different FAQ, different JSON-LD `SoftwareApplication` + `FAQPage` + `BreadcrumbList`.

### Guide pages (in header "Learn" dropdown + footer)
```
/guides/what-is-web-hosting
/guides/shared-vs-vps-vs-cloud-hosting
/guides/how-to-find-where-a-website-is-hosted   (HowTo schema)
/guides/best-web-hosting-for-beginners          (affiliate-heavy, cloaked /go/hostinger CTAs)
```

### Policy pages (footer only — NOT header, per your spec)
```
/privacy   /terms   /disclaimer   /about   /contact
```

## 3. SEO / AEO / GEO content per page

Every new page ships with:

- **Unique `<title>` ≤60 chars** built around the page's primary keyword.
- **Unique meta description ≤155 chars** with secondary keyword + benefit.
- **Single H1** = primary keyword phrased naturally.
- **H2/H3 cluster** covering related queries from GSC (e.g. the hosting-checker page covers "host check", "check website hosting", "domain host check").
- **AEO block**: "What is X?", "How does X work?", "Why use X?" — short, direct, answer-engine-friendly paragraphs (40–60 words each) placed near the top.
- **GEO**: target Global / US per your choice. Schema gets `inLanguage: "en"`, `areaServed: "Worldwide"`; copy uses USD examples and US-centric provider names (AWS, Cloudflare, GoDaddy, Bluehost, Hostinger US).
- **Contextual inbound links**: each tool page links to 2–3 related tools + 1–2 guides using keyword-rich anchor text.
- **Contextual outbound links**: 2–3 authoritative refs per page (ICANN, IANA, Cloudflare Learning, RFCs, Hostinger blog) with `rel="noopener"`. Hostinger links route through `/go/hostinger` (cloaked affiliate).
- **Unique FAQ**: 4–6 questions per page drawn from real GSC long-tails (e.g. "how do I find out who my website host is", "how to check which hosting a website is using") — NOT the same generic FAQ everywhere.
- **JSON-LD per page**: `WebPage` + `BreadcrumbList` + `FAQPage` + (tool pages) `SoftwareApplication` + (guides) `Article`/`HowTo`.

## 4. Sitemap + robots

- Replace the static `public/sitemap.xml` with a generator script (`scripts/generate-sitemap.ts`) wired to `predev`/`prebuild`. Emits one `<url>` per real route (no more `#hash` URLs, which is what caused your GSC submission error — search engines treat hashes as the same page).
- `lastmod` = build date; tool pages weekly/0.9; guides monthly/0.7; policy monthly/0.3.
- `robots.txt`: keep `Disallow: /results/` and `/go/`. Re-confirm `Sitemap:` line is correct. Add `Allow: /tools/` and `/guides/` explicitly.

## 5. Header + Footer navigation

- **Header**: existing "Tools" dropdown expanded to all 10 tools; new "Learn" dropdown for 4 guides; keep FAQ link.
- **Footer**: 4 columns — Tools (10) · Learn (4) · Company (About, Contact) · Legal (Privacy, Terms, Disclaimer) · plus the existing external/affiliate column.
- Every tool page also gets an in-body "Related tools" grid (3–4 cards) → internal link juice flows.
- Homepage gets a new "All tools" section linking to each `/tools/*` page with descriptive anchor text.

## 6. Pre-publish SEO audit script

`scripts/seo-audit.ts` (run via `npm run seo:audit`):

- Crawls `dist/` after build.
- For each prerendered HTML file checks: `<title>` present + ≤60c + unique, meta description present + ≤155c + unique, exactly one `<h1>`, canonical present + matches URL, og:title/description/url/type/image present, at least one valid JSON-LD block parses, no `noindex` (except `/results/*`).
- Outputs `seo-audit-report.json` + a pass/fail console table. Non-zero exit on failure so CI/Vercel build fails before a bad deploy.

## 7. Verification checklist (after deploy)

1. `curl -A "Googlebot" https://site-host-finder.vercel.app/tools/dns-lookup` → returns full HTML with H1 + FAQ visible in source (no JS execution).
2. Google Rich Results Test on 3 sample URLs (home, one tool, one guide) → FAQPage + Breadcrumb + SoftwareApplication all pass.
3. GSC URL Inspection on a tool page → "URL is on Google" or "Eligible" with no soft-404.
4. Resubmit sitemap in GSC — submission error gone (no more hash URLs).
5. LinkedIn Post Inspector / X Card Validator on 2 routes → unique preview per page.

---

## Technical details

**Files to create**
- `scripts/generate-sitemap.ts`, `scripts/seo-audit.ts`
- `src/pages/tools/HostingChecker.tsx`, `FindWebsiteHost.tsx`, `WhereIsWebsiteHosted.tsx`, `WhoIsHosting.tsx`, `HostingLookup.tsx`, `DnsLookup.tsx`, `IpChecker.tsx`, `WebsiteDownChecker.tsx`, `PortChecker.tsx`, `DomainCompare.tsx`
- `src/pages/guides/WhatIsWebHosting.tsx`, `SharedVsVpsVsCloud.tsx`, `HowToFindHost.tsx`, `BestHostingForBeginners.tsx`
- `src/pages/policy/Privacy.tsx`, `Terms.tsx`, `Disclaimer.tsx`, `About.tsx`, `Contact.tsx`
- `src/components/SeoHead.tsx` (Helmet wrapper that takes `{title, description, canonical, schema[]}` and emits everything consistently)
- `src/lib/seo/keywordMap.ts` (single source of truth for title/desc/keywords/FAQ per route — feeds both pages and audit script)

**Files to edit**
- `package.json` — add `react-snap`, `react-helmet-async`, `postbuild`, `predev`, `prebuild`, `seo:audit`, `reactSnap` config block
- `src/main.tsx` — `hydrateRoot` + `HelmetProvider`
- `src/App.tsx` — register all new routes
- `vercel.json` — `cleanUrls`, keep redirect, no SPA rewrite for prerendered paths
- `src/components/Header.tsx`, `Footer.tsx` — new nav structure
- `public/robots.txt` — confirm allows
- Delete static `public/sitemap.xml` (replaced by generator output)

**Caveats**
- react-snap uses Puppeteer at build time; first Vercel build will be ~1 min slower. Cached after.
- Dynamic `/results/:domain` stays SPA-only and `noindex` — that's correct, no change.
- Cloaked `/go/hostinger` 302 stays; all affiliate CTAs across new pages route through it.
