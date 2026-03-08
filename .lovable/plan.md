

# Enhance Home Page: More SEO Content, Trust Factors, Expanded FAQ & Schemas

## Current State
The home page already has FAQ (10 items), HowTo (4 steps), SEO guide content, FAQPage + HowTo + WebApplication + Organization schemas, and contextual outbound links. The user wants these expanded and a new Trust Factors section added.

## Plan

### 1. New Trust Factors Section (`src/components/TrustFactors.tsx`)
Create a visually appealing section between the hero and HowTo with trust signals:
- "100% Free — No Signup" with Lock icon
- "Real-Time DNS Data" with Zap icon
- "500+ Hosting Providers" with Database icon
- "Used by 10,000+ Developers" with Users icon
- Displayed as a horizontal strip (4 cols desktop, 2x2 mobile) with icons, bold stat, and subtitle
- Add `id="why-trust-us"` for hash navigation

### 2. Expand FAQ to 15 Items (`src/components/FAQSection.tsx`)
Add 5 new keyword-rich questions:
- "How do I check if a website uses Cloudflare?"
- "What are nameservers and why do they matter?"
- "How do I find the IP address of a website?"
- "Can I find out what CMS a website is using?"
- "What is reverse DNS lookup?"

### 3. Expand SEO Content (`src/components/SEOContent.tsx`)
Add 3 new sections with contextual outbound links:
- **"How to Switch Hosting Providers"** — link to hosting migration guides
- **"Website Security and SSL Certificates"** — link to Let's Encrypt, SSL Labs
- **"CDN vs Hosting: What's the Difference?"** — link to Cloudflare CDN docs, AWS CloudFront
- **"Server Response Time and SEO"** — link to Google Web Vitals docs

### 4. Update Schema Markup (`src/components/SchemaMarkup.tsx`)
- FAQ schema auto-updates (already reads from `faqs` array)
- Add `SoftwareApplication` schema with `aggregateRating`
- Add `BreadcrumbList` schema for site navigation
- Enhance `WebApplication` schema with `featureList` and `screenshot` properties

### 5. Update Header & Footer Navigation
- **Header** (`src/components/Header.tsx`): Add "Trust" nav link pointing to `/#why-trust-us`
- **Footer** (`src/components/Footer.tsx`): Add more external resource links (Let's Encrypt, SSL Labs, Google Web Vitals)

### 6. Update Index Page (`src/pages/Index.tsx`)
- Import and render `TrustFactors` between hero and HowToSection
- Order: Hero → Trust Factors → HowTo → Tools → FAQ → SEO Content

### Files to Edit
- **Create**: `src/components/TrustFactors.tsx`
- **Edit**: `src/components/FAQSection.tsx`, `src/components/SEOContent.tsx`, `src/components/SchemaMarkup.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/pages/Index.tsx`

