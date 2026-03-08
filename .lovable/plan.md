

# SEO & UX Overhaul Plan

## Problems Identified
1. **No SEO meta tags** — `index.html` still says "Lovable App" with generic descriptions
2. **No structured data** — missing JSON-LD schemas (WebApplication, FAQPage, HowTo)
3. **No hash-based navigation** — SPA has no internal anchor links for Google to crawl sections
4. **No FAQ section** with expandable Q&A
5. **No HowTo section** explaining step-by-step usage
6. **Thin SEO content** — only 2 short paragraphs, no outbound links
7. **Header has no nav links** — just a logo
8. **Footer is minimal** — no sitemap links, no contextual links
9. **Mobile UX issues** — search bar layout breaks on small screens, no mobile nav
10. **Hero could be more engaging** — lacks trust signals or visual appeal

## Changes

### 1. `index.html` — SEO Meta Tags
- Title: "Hosting Checker — Find Out Who Hosts Any Website | Free Tool"
- Description targeting top keywords: "who is hosting", "hosting checker", "who hosts this website"
- Proper OG tags, canonical URL placeholder, Twitter card

### 2. Hash-Based Navigation (SPA-friendly)
- Add sections on Index page with IDs: `#hosting-checker`, `#how-it-works`, `#faq`, `#hosting-guide`, `#tools`
- Header nav links point to these hash anchors
- Smooth scroll behavior
- Google can detect these as distinct content sections

### 3. New Component: `FAQSection.tsx`
- 8-10 SEO-rich FAQ items using Accordion component (already installed)
- Questions drawn from keyword data: "How do I find out who hosts a website?", "What is a hosting checker?", "How to find hosting provider of a website?", etc.
- **FAQPage JSON-LD schema** injected via `<script type="application/ld+json">`

### 4. New Component: `HowToSection.tsx`
- Step-by-step "How to Check Who Hosts a Website" (3-4 steps)
- **HowTo JSON-LD schema** for rich snippets in Google

### 5. New Component: `SEOContent.tsx`
- Replace thin content with 4-5 rich paragraphs covering:
  - What is web hosting / hosting provider
  - Why check who hosts a website
  - Types of hosting (shared, VPS, dedicated, cloud)
  - Contextual outbound links to authoritative sources:
    - ICANN (domain registration)
    - Cloudflare (CDN/DNS explanation)
    - Wikipedia (web hosting article)
    - Google Developers (site performance)
    - W3Techs (hosting market share data)

### 6. New Component: `SchemaMarkup.tsx`
- WebApplication schema (name, description, url, applicationCategory)
- FAQPage schema (generated from FAQ data)
- HowTo schema (generated from steps data)
- Organization schema (HostingChecker branding)

### 7. Header Redesign
- Add nav links: Tools, How It Works, FAQ, Guide
- All link to hash sections (`/#tools`, `/#how-it-works`, `/#faq`, `/#hosting-guide`)
- Mobile hamburger menu using Sheet component

### 8. Footer Redesign
- 3-column layout: Tools links, Resources links, About
- Contextual outbound links (ICANN, Cloudflare docs, etc.)
- Internal hash navigation links

### 9. Hero & Search Bar UX Improvements
- Larger, more padded hero with subtle background pattern
- Trust signals below search: "✓ Free · ✓ No signup · ✓ Instant results"
- Popular domains quick-check buttons (google.com, shopify.com, etc.)
- Mobile: stack search input and button vertically, full-width
- Increase touch targets for mobile

### 10. Mobile Responsiveness Fixes
- SearchBar: vertical stack on mobile (`flex-col sm:flex-row`)
- Tool cards: single column on mobile
- Results page: single column grid on mobile
- Proper padding and font sizes for small screens
- Header hamburger menu for mobile nav

### Files to Create
- `src/components/FAQSection.tsx`
- `src/components/HowToSection.tsx`
- `src/components/SEOContent.tsx`
- `src/components/SchemaMarkup.tsx`

### Files to Edit
- `index.html` — meta tags, title, description
- `src/components/Header.tsx` — nav links + mobile menu
- `src/components/Footer.tsx` — 3-column layout with links
- `src/components/SearchBar.tsx` — mobile-friendly layout
- `src/pages/Index.tsx` — add all new sections with hash IDs, trust signals, quick-check buttons
- `src/index.css` — smooth scroll behavior (`scroll-behavior: smooth`)

