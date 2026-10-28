import { Helmet } from "react-helmet-async";
import type { RouteContent } from "@/lib/seo/keywordMap";
import { BASE_URL } from "@/lib/seo/keywordMap";

interface SeoHeadProps {
  route: RouteContent;
}

// Meta tags only. JSON-LD is emitted once per route by scripts/prerender.ts,
// so there is exactly one schema source and no duplicate blocks.
export function SeoHead({ route }: SeoHeadProps) {
  const url = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;

  return (
    <Helmet>
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={route.title} />
      <meta property="og:description" content={route.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={route.category === "guide" ? "article" : "website"} />
      <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={route.title} />
      <meta name="twitter:description" content={route.description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
      <meta
        name="robots"
        content={route.noindex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large"}
      />
    </Helmet>
  );
}
