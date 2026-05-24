// Fetches every prerendered route from the live URL with a Googlebot UA and
// asserts the HTML contains the expected H1, FAQ markup, and JSON-LD schemas.
// Run after each deploy: `bun run seo:verify` (set SITE_URL to override default).

import { ALL_ROUTES, BASE_URL } from "../src/lib/seo/keywordMap.ts";

const SITE = process.env.SITE_URL || BASE_URL;
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

interface Result { path: string; ok: boolean; problems: string[] }

async function check(route: typeof ALL_ROUTES[number]): Promise<Result> {
  const url = `${SITE}${route.path === "/" ? "/" : route.path}`;
  const problems: string[] = [];
  let html = "";
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (res.status !== 200) problems.push(`status ${res.status}`);
    html = await res.text();
  } catch (e) {
    return { path: route.path, ok: false, problems: [`fetch failed: ${(e as Error).message}`] };
  }

  if (!html.includes(`<h1>${route.h1.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>`)
      && !html.includes(route.h1)) {
    problems.push("H1 missing");
  }
  if (route.faqs.length && !/<details>\s*<summary>/i.test(html)) {
    problems.push("FAQ <details> missing");
  }
  if (!html.includes(`"@type":"${route.schemaType || "WebPage"}"`)) {
    problems.push(`primary JSON-LD (${route.schemaType}) missing`);
  }
  if (!html.includes(`"@type":"BreadcrumbList"`)) problems.push("BreadcrumbList JSON-LD missing");
  if (route.faqs.length && !html.includes(`"@type":"FAQPage"`)) problems.push("FAQPage JSON-LD missing");
  // Tool pages must emit a WebPage schema alongside SoftwareApplication.
  if (route.schemaType === "SoftwareApplication" && route.category === "tool"
      && !html.includes(`"@type":"WebPage"`)) {
    problems.push("WebPage JSON-LD missing (required alongside SoftwareApplication)");
  }
  // Unique meta per route.
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || titleMatch[1].trim() !== route.title) {
    problems.push(`title mismatch (expected "${route.title}")`);
  }
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  if (!descMatch || descMatch[1] !== route.description) {
    problems.push("description mismatch");
  }

  const expectedCanonical = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;
  if (!html.includes(`href="${expectedCanonical}"`)) problems.push(`canonical missing: ${expectedCanonical}`);

  return { path: route.path, ok: problems.length === 0, problems };
}


const results = await Promise.all(ALL_ROUTES.map(check));
const failed = results.filter((r) => !r.ok);

console.log(`\nverify-prerender against ${SITE} — ${ALL_ROUTES.length} routes\n`);
for (const r of results) {
  console.log(`  ${r.ok ? "✅" : "❌"} ${r.path}${r.problems.length ? "  →  " + r.problems.join("; ") : ""}`);
}
if (failed.length) {
  console.error(`\n❌ ${failed.length} route(s) failed verification\n`);
  process.exit(1);
}
console.log(`\n✅ all routes verified\n`);
