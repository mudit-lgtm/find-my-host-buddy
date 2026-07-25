// One-click pre-publish SEO asset validation: sitemap.xml + robots.txt syntax,
// coverage against the route table, and JSON-LD parse checks in dist/.
// Run: `bun run seo:validate` (part of `bun run seo:review`).

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { ALL_ROUTES, BASE_URL } from "../src/lib/seo/keywordMap.ts";

const issues: string[] = [];
const ok: string[] = [];

function read(p: string): string | null {
  const full = resolve(p);
  return existsSync(full) ? readFileSync(full, "utf8") : null;
}

// ---------- sitemap.xml ----------
for (const file of ["public/sitemap.xml", "dist/sitemap.xml"]) {
  const xml = read(file);
  if (!xml) {
    if (file.startsWith("dist")) continue; // dist only exists after a build
    issues.push(`${file}: missing`);
    continue;
  }
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    issues.push(`${file}: missing/!invalid XML declaration (breaks "Sitemap could not be read")`);
  }
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    issues.push(`${file}: missing sitemap namespace`);
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) issues.push(`${file}: no <loc> entries`);
  for (const loc of locs) {
    if (!loc.startsWith(BASE_URL)) issues.push(`${file}: <loc> not on ${BASE_URL} → ${loc}`);
    if (/&(?!amp;|lt;|gt;|quot;|apos;)/.test(loc)) issues.push(`${file}: unescaped & in ${loc}`);
  }
  if (new Set(locs).size !== locs.length) issues.push(`${file}: duplicate <loc> entries`);
  for (const r of ALL_ROUTES) {
    const expected = `${BASE_URL}${r.path === "/" ? "/" : r.path}`;
    if (!locs.includes(expected)) issues.push(`${file}: route not listed → ${expected}`);
  }
  if (!issues.some((i) => i.startsWith(file))) ok.push(`${file}: ${locs.length} URLs valid`);
}

// ---------- robots.txt ----------
const robots = read("public/robots.txt");
if (!robots) {
  issues.push("public/robots.txt: missing");
} else {
  if (!/^user-agent:/im.test(robots)) issues.push("robots.txt: no User-agent block");
  if (/^\s*disallow:\s*\/\s*$/im.test(robots)) issues.push("robots.txt: blanket 'Disallow: /' blocks the whole site");
  const sitemapLine = robots.match(/^sitemap:\s*(\S+)/im);
  if (!sitemapLine) issues.push("robots.txt: no Sitemap: directive");
  else if (sitemapLine[1] !== `${BASE_URL}/sitemap.xml`) {
    issues.push(`robots.txt: Sitemap points to ${sitemapLine[1]} (expected ${BASE_URL}/sitemap.xml)`);
  }
  for (const r of ALL_ROUTES) {
    const dis = [...robots.matchAll(/^disallow:\s*(\S+)/gim)].map((m) => m[1]);
    const blocked = dis.find((d) => d !== "/" && r.path !== "/" && r.path.startsWith(d));
    if (blocked) issues.push(`robots.txt: indexable route ${r.path} blocked by "Disallow: ${blocked}"`);
  }
  if (!issues.some((i) => i.startsWith("robots"))) ok.push("robots.txt: valid");
}

// ---------- JSON-LD in prerendered HTML ----------
let checkedPages = 0;
for (const r of ALL_ROUTES) {
  const file = r.path === "/" ? "dist/index.html" : `dist${r.path}/index.html`;
  const html = read(file);
  if (!html) continue;
  checkedPages++;
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) issues.push(`${file}: no JSON-LD blocks`);
  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed["@context"] || !parsed["@type"]) issues.push(`${file}: JSON-LD missing @context/@type`);
      if (JSON.stringify(parsed).includes('"areaServed"') && parsed["@type"] === "SoftwareApplication") {
        issues.push(`${file}: areaServed is not valid on SoftwareApplication`);
      }
      const speakable = parsed.speakable;
      if (speakable?.cssSelector) {
        for (const sel of speakable.cssSelector as string[]) {
          if (!html.includes(`id="${sel.replace("#", "")}"`)) {
            issues.push(`${file}: speakable selector ${sel} has no matching element`);
          }
        }
      }
    } catch (e) {
      issues.push(`${file}: invalid JSON-LD (${(e as Error).message})`);
    }
  }
  if (html.includes("site-host-finder.vercel.app")) issues.push(`${file}: stale old-domain reference`);
}
if (checkedPages) ok.push(`JSON-LD + speakable valid on ${checkedPages} prerendered pages`);

console.log("\n=== SEO pre-publish asset validation ===");
for (const line of ok) console.log(`  ✅ ${line}`);
if (issues.length === 0) {
  console.log("\n✅ Sitemap, robots.txt and structured data all valid\n");
  process.exit(0);
}
console.error(`\n❌ ${issues.length} issue(s):`);
for (const i of issues) console.error(`  • ${i}`);
process.exit(1);
