import { Helmet } from "react-helmet-async";
import type { RouteContent } from "@/lib/seo/keywordMap";
import { BASE_URL } from "@/lib/seo/keywordMap";

interface SeoHeadProps {
  route: RouteContent;
}

export function SeoHead({ route }: SeoHeadProps) {
  const url = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      ...(route.category !== "home"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name:
                route.category === "tool"
                  ? "Tools"
                  : route.category === "guide"
                    ? "Guides"
                    : "About",
              item: `${BASE_URL}/`,
            },
            { "@type": "ListItem", position: 3, name: route.h1, item: url },
          ]
        : []),
    ],
  };

  const faqSchema =
    route.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: route.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const primarySchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": route.schemaType || "WebPage",
    name: route.h1,
    headline: route.h1,
    description: route.description,
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(route.schemaType === "SoftwareApplication" && {
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      areaServed: "Worldwide",
    }),
    ...(route.schemaType === "Article" && {
      author: { "@type": "Organization", name: "Site Host Finder" },
      publisher: {
        "@type": "Organization",
        name: "Site Host Finder",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
      },
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().slice(0, 10),
    }),
    ...(route.schemaType === "HowTo" && {
      step: route.sections.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.heading,
        text: s.body,
      })),
    }),
  };

  return (
    <Helmet>
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      <meta name="keywords" content={route.keywords.join(", ")} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={route.title} />
      <meta property="og:description" content={route.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={route.category === "guide" ? "article" : "website"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={route.title} />
      <meta name="twitter:description" content={route.description} />
      <script type="application/ld+json">{JSON.stringify(primarySchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
}
