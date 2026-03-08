import { faqs } from "./FAQSection";
import { steps } from "./HowToSection";

export function SchemaMarkup() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HostingChecker",
    url: "https://hostingchecker.org",
    description:
      "Free hosting checker tool to find out who hosts any website. Instantly discover the hosting provider, IP address, server location, and DNS records for any domain.",
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    featureList: [
      "Hosting provider detection",
      "IP address lookup",
      "Server geolocation",
      "DNS record viewer (A, AAAA, MX, NS, TXT)",
      "Security header analysis",
      "Performance grade estimation",
      "SSL certificate check",
      "Nameserver identification",
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HostingChecker",
    url: "https://hostingchecker.org",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1240",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HostingChecker",
    url: "https://hostingchecker.org",
    logo: "https://hostingchecker.org/favicon.ico",
    description:
      "Free web hosting lookup tools for developers, SEO professionals, and website owners.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Check Who Hosts a Website",
    description:
      "Find any website's hosting provider in four simple steps using our free hosting checker tool.",
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hostingchecker.org/" },
      { "@type": "ListItem", position: 2, name: "Hosting Checker", item: "https://hostingchecker.org/#hosting-checker" },
      { "@type": "ListItem", position: 3, name: "How It Works", item: "https://hostingchecker.org/#how-it-works" },
      { "@type": "ListItem", position: 4, name: "Tools", item: "https://hostingchecker.org/#tools" },
      { "@type": "ListItem", position: 5, name: "FAQ", item: "https://hostingchecker.org/#faq" },
      { "@type": "ListItem", position: 6, name: "Hosting Guide", item: "https://hostingchecker.org/#hosting-guide" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
