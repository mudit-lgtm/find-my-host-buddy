// Pre-publish SEO audit. Crawls dist/, validates title/desc/canonical/h1/JSON-LD on every prerendered page.
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { ALL_ROUTES, BASE_URL } from "../src/lib/seo/keywordMap.ts";

const issues: { path: string; problem: string }[] = [];
const titles = new Set<string>();
const descs = new Set<string>();

for (const r of ALL_ROUTES) {
  const file = r.path === "/" ? "dist/index.html" : `dist${r.path}/index.html`;
  const full = resolve(file);
  if (!existsSync(full)) { issues.push({ path: r.path, problem: `missing ${file}` }); continue; }
  const html = readFileSync(full, "utf8");

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? "";
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const jsonLdBlocks = html.match(/<script type="application\/ld\+json">/g)?.length ?? 0;

  if (!title) issues.push({ path: r.path, problem: "missing <title>" });
  if (title.length > 60) issues.push({ path: r.path, problem: `title >60c (${title.length})` });
  if (titles.has(title)) issues.push({ path: r.path, problem: "duplicate title" });
  titles.add(title);

  if (!desc) issues.push({ path: r.path, problem: "missing description" });
  if (desc.length > 160) issues.push({ path: r.path, problem: `description >160c (${desc.length})` });
  if (descs.has(desc)) issues.push({ path: r.path, problem: "duplicate description" });
  descs.add(desc);

  const expectedCanonical = `${BASE_URL}${r.path === "/" ? "/" : r.path}`;
  if (canonical !== expectedCanonical) issues.push({ path: r.path, problem: `canonical mismatch: ${canonical}` });

  if (h1Count < 1) issues.push({ path: r.path, problem: "no <h1>" });
  if (jsonLdBlocks < 1) issues.push({ path: r.path, problem: "no JSON-LD" });
}

if (issues.length === 0) {
  console.log(`\n✅ SEO audit passed — ${ALL_ROUTES.length} routes validated\n`);
  process.exit(0);
}

console.error(`\n❌ SEO audit failed — ${issues.length} issue(s):\n`);
for (const i of issues) console.error(`  [${i.path}] ${i.problem}`);
process.exit(1);
