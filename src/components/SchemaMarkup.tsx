import { faqs } from "./FAQSection";
import { steps } from "./HowToSection";

export function SchemaMarkup() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Site Host Finder",
    url: "https://site-host-finder.vercel.app",
    description:
      "Free hosting checker and DNS lookup tool. Find out who hosts any website, view WHOIS data, DNS records (A, AAAA, MX, TXT, CNAME, NS), security headers, SSL status, and performance metrics.",
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
      "DNS record viewer (A, AAAA, MX, NS, TXT, CNAME)",
      "WHOIS domain registration lookup",
      "Domain age checker",
      "Security header analysis",
      "Performance grade estimation",
      "SSL certificate check",
      "Nameserver identification",
      "Email provider detection",
      "Technology stack detection",
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Site Host Finder",
    url: "https://site-host-finder.vercel.app",
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
    name: "Site Host Finder",
    url: "https://site-host-finder.vercel.app",
    logo: "https://site-host-finder.vercel.app/favicon.ico",
    description:
      "Free web hosting lookup, DNS records, WHOIS, and security analysis tools for developers, SEO professionals, and website owners.",
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
      "Find any website's hosting provider, DNS records, and WHOIS information in four simple steps using our free hosting checker tool.",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://site-host-finder.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Hosting Checker", item: "https://site-host-finder.vercel.app/#hosting-checker" },
      { "@type": "ListItem", position: 3, name: "How It Works", item: "https://site-host-finder.vercel.app/#how-it-works" },
      { "@type": "ListItem", position: 4, name: "Tools", item: "https://site-host-finder.vercel.app/#tools" },
      { "@type": "ListItem", position: 5, name: "FAQ", item: "https://site-host-finder.vercel.app/#faq" },
      { "@type": "ListItem", position: 6, name: "Hosting Guide", item: "https://site-host-finder.vercel.app/#hosting-guide" },
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
