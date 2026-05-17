// Generates dist/sitemap.xml and dist/robots-sitemap-line from keywordMap.
// Run via `postbuild` after prerender.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { ALL_ROUTES, BASE_URL } from "../src/lib/seo/keywordMap.ts";

const lastmod = new Date().toISOString().slice(0, 10);
const urls = ALL_ROUTES.map((r) => {
  const loc = `${BASE_URL}${r.path === "/" ? "/" : r.path}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(resolve("dist/sitemap.xml"), xml);
writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap: ${ALL_ROUTES.length} URLs`);
