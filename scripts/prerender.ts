// Postbuild prerender: for every route in keywordMap, clone dist/index.html into
// dist/<path>/index.html with title/description/canonical/og/JSON-LD rewritten.
// Run via: tsx scripts/prerender.ts (wired as `postbuild` in package.json).
//
// This gives Vercel a real static HTML file per route — Googlebot, ChatGPT,
// Perplexity, LinkedIn, Slack, and X all see fully-rendered, unique-per-URL HTML
// without executing JavaScript.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

// Load route data (compiled-on-the-fly via tsx).
import { ALL_ROUTES, BASE_URL, type RouteContent } from "../src/lib/seo/keywordMap.ts";

const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

if (!existsSync(TEMPLATE_PATH)) {
  console.error("dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const template = readFileSync(TEMPLATE_PATH, "utf8");

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildSchemas(route: RouteContent, url: string) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      ...(route.category !== "home" ? [{ "@type": "ListItem", position: 2, name: route.h1, item: url }] : []),
    ],
  };
  const primary: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": route.schemaType || "WebPage",
    name: route.h1,
    headline: route.h1,
    description: route.description,
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
  };
  if (route.schemaType === "SoftwareApplication") {
    Object.assign(primary, {
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      areaServed: "Worldwide",
    });
  }
  if (route.schemaType === "Article") {
    Object.assign(primary, {
      author: { "@type": "Organization", name: "Site Host Finder" },
      publisher: { "@type": "Organization", name: "Site Host Finder", logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` } },
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().slice(0, 10),
    });
  }
  if (route.schemaType === "HowTo") {
    Object.assign(primary, {
      step: route.sections.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.heading, text: s.body })),
    });
  }
  const blocks = [primary, breadcrumb];
  if (route.faqs.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: route.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("\n    ");
}

function renderStaticBody(route: RouteContent): string {
  // Minimal HTML for crawlers — replaced by React on hydration.
  const sections = route.sections
    .map((s) => `<section><h2>${escapeHtml(s.heading)}</h2><p>${escapeHtml(s.body)}</p></section>`)
    .join("");
  const faqs = route.faqs.length
    ? `<section><h2>Frequently Asked Questions</h2>${route.faqs.map((f) => `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join("")}</section>`
    : "";
  const related = route.related.length
    ? `<nav aria-label="Related"><h2>Related</h2><ul>${route.related.map((r) => `<li><a href="${r.href}">${escapeHtml(r.label)}</a></li>`).join("")}</ul></nav>`
    : "";
  const outbound = route.outbound.length
    ? `<nav aria-label="References"><ul>${route.outbound.map((o) => `<li><a href="${o.href}"${o.rel ? ` rel="${o.rel}"` : ""}${o.href.startsWith("http") ? ' target="_blank"' : ""}>${escapeHtml(o.label)}</a></li>`).join("")}</ul></nav>`
    : "";
  return `<main><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.intro)}</p>${sections}${faqs}${related}${outbound}</main>`;
}

function rewriteForRoute(route: RouteContent): string {
  const url = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  // meta description
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  // canonical
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`);
  // og:title / og:description / og:url
  html = html.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);

  // Inject per-route JSON-LD just before </head> (don't strip existing — they're sitewide schemas).
  const schemas = buildSchemas(route, url);
  html = html.replace(/<\/head>/i, `    ${schemas}\n  </head>`);

  // Inject prerendered body into #root so crawlers see full content.
  // React's hydrateRoot replaces this on the client.
  if (route.category !== "home") {
    const staticBody = renderStaticBody(route);
    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${staticBody}</div>`);
  }

  return html;
}

let written = 0;
for (const route of ALL_ROUTES) {
  if (route.path === "/") continue; // homepage already at dist/index.html
  const outDir = resolve(DIST, route.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "index.html");
  writeFileSync(outPath, rewriteForRoute(route), "utf8");
  written++;
}

// Also rewrite the homepage to set proper meta + schemas (overwrites the Vite default).
writeFileSync(TEMPLATE_PATH, rewriteForRoute(ALL_ROUTES[0]), "utf8");

console.log(`prerender: wrote ${written + 1} HTML files (1 home + ${written} routes)`);
