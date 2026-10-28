// Postbuild prerender: renders every route in ALL_ROUTES through the real <App>
// with react-dom/server (SSR + StaticRouter), then clones dist/index.html into
// dist/<path>/index.html with per-route head tags and exactly ONE JSON-LD set.
// The static HTML equals what users see; src/main.tsx hydrates #root on load.
//
// Vercel serves the per-route index.html for Googlebot, ChatGPT, Perplexity, etc.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { tmpdir } from "os";
import { build } from "esbuild";
import { ALL_ROUTES, BASE_URL, type RouteContent } from "../src/lib/seo/keywordMap.ts";

const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

if (!existsSync(TEMPLATE_PATH)) {
  console.error("dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const template = readFileSync(TEMPLATE_PATH, "utf8");

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---------- JSON-LD (single source of truth: this file) ----------
// Exactly ONE schema set per route:
//   home          → WebApplication + Organization + WebSite (no SearchAction)
//   tool pages    → WebApplication + BreadcrumbList (Home > page) + FAQPage (visible FAQs)
//   guides/policy → WebPage only (no fabricated dates)
function buildSchemas(route: RouteContent, url: string): string {
  const blocks: unknown[] = [];

  if (route.category === "home" || route.category === "tool") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: route.h1,
      url,
      description: route.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
  }

  if (route.category === "tool") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: route.h1, item: url },
      ],
    });
    // FAQPage only when the same questions are visible on the page (they are:
    // ToolPage renders route.faqs as <details> elements).
    if (route.faqs.length) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: route.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }
  }

  if (route.category === "home") {
    blocks.push(
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Site Host Finder",
        url: `${BASE_URL}/`,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Site Host Finder",
        url: `${BASE_URL}/`,
      },
    );
  }

  if (route.category === "guide" || route.category === "policy") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.h1,
      url,
      description: route.description,
      inLanguage: "en",
    });
  }

  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("\n    ");
}

// ---------- SSR bundle ----------
// The app reads import.meta.env (Vite-injected), which is undefined under plain
// Node — so the SSR entry is bundled with esbuild and the env vars are inlined.
function loadEnvFile(): Record<string, string> {
  const env: Record<string, string> = {};
  try {
    const raw = readFileSync(resolve(".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // No .env — define stays empty; SSR still works for non-API components.
  }
  return env;
}

const env = loadEnvFile();
const SSR_BUNDLE = resolve(tmpdir(), "shf-ssr-bundle.mjs");

await build({
  entryPoints: [resolve("scripts/ssr-entry.tsx")],
  outfile: SSR_BUNDLE,
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  alias: { "@": resolve("src") },
  define: {
    "import.meta.env": JSON.stringify({ ...env, MODE: "production", DEV: false, PROD: true, SSR: true }),
    "process.env.NODE_ENV": '"production"',
  },
  loader: { ".css": "empty", ".svg": "empty", ".png": "empty", ".jpg": "empty" },
  logLevel: "warning",
});

const { renderRoute } = await import(SSR_BUNDLE);

// ---------- Head rewriting ----------
// Helmet tags from SeoHead replace the template's static SEO tags; JSON-LD is
// appended once. Non-SEO tags (icons, sitemap link, theme-color, AdSense) stay.
function stripTemplateSeoTags(html: string): string {
  return html
    .replace(/<title>[^<]*<\/title>/i, "")
    .replace(/<meta name="description"[^>]*>/i, "")
    .replace(/<link rel="canonical"[^>]*>/i, "")
    .replace(/<meta property="og:title"[^>]*>/i, "")
    .replace(/<meta property="og:description"[^>]*>/i, "")
    .replace(/<meta property="og:url"[^>]*>/i, "")
    .replace(/<meta property="og:type"[^>]*>/i, "")
    .replace(/<meta property="og:image"[^>]*>/i, "")
    .replace(/<meta name="twitter:card"[^>]*>/i, "")
    .replace(/<meta name="twitter:title"[^>]*>/i, "")
    .replace(/<meta name="twitter:description"[^>]*>/i, "")
    .replace(/<meta name="twitter:image"[^>]*>/i, "")
    .replace(/<meta name="robots"[^>]*>/i, "");
}

function rewriteForRoute(route: RouteContent): string {
  const url = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;
  const { body, head } = renderRoute(route.path);
  const schemas = buildSchemas(route, url);

  let html = stripTemplateSeoTags(template);
  html = html.replace(/<\/head>/i, `    ${head}\n    ${schemas}\n  </head>`);
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);

  if (!html.includes(`<div id="root">${body.slice(0, 40)}`)) {
    throw new Error(`prerender: SSR body not injected for ${route.path}`);
  }
  return html;
}

let written = 0;
for (const route of ALL_ROUTES) {
  const html = rewriteForRoute(route);
  if (route.path === "/") {
    writeFileSync(TEMPLATE_PATH, html, "utf8");
  } else {
    const outDir = resolve(DIST, route.path.replace(/^\//, ""));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), html, "utf8");
  }
  written++;
}
console.log(`prerender: SSR-rendered ${written} routes (static HTML = hydrated markup)`);
