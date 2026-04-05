import { faqs } from "./FAQSection";
import { steps } from "./HowToSection";

export function SchemaMarkup() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Site Host Finder",
    url: "https://site-host-finder.vercel.app",
    description:
      "Free hosting checker and DNS lookup tool. Find website host, check hosting provider, view DNS records, WHOIS data, IP address, server location, domain age, and website status instantly.",
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    featureList: [
      "Find website host and hosting provider",
      "IP address lookup and server location",
      "DNS record viewer (A, AAAA, MX, NS, TXT, CNAME)",
      "WHOIS domain registration and domain age lookup",
      "Website hosting checker and web host checker",
      "Security header analysis and SSL check",
      "Performance grade and TTFB estimation",
      "Email provider and MX record detection",
      "Technology stack detection",
      "Domain hosting comparison tool",
      "Host finder by IP address",
      "Nameserver identification",
      "Free hosting checker online",
    ],
    keywords: "find website host, host finder, hosting checker, web host checker, website hosting checker, host checker, check website hosting, hosting lookup, where is my website hosted, find hosting provider, hosting finder, who hosts this site, DNS lookup, check host, web hosting search, hosting provider checker, domain host check, hosting check, find hosting, website host finder, web hosting finder, site host checker, hosting checker tool, free hosting checker, domain compare",
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
      "Free web hosting lookup, DNS records, WHOIS, domain comparison, and security analysis tools. Find website host, check hosting provider, and view DNS records instantly.",
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
    name: "How to Find Website Host — Check Who Hosts Any Website",
    description:
      "Find any website's hosting provider, DNS records, WHOIS information, and IP address in four simple steps using our free hosting checker tool.",
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
      { "@type": "ListItem", position: 5, name: "Domain Compare", item: "https://site-host-finder.vercel.app/compare" },
      { "@type": "ListItem", position: 6, name: "FAQ", item: "https://site-host-finder.vercel.app/#faq" },
      { "@type": "ListItem", position: 7, name: "Hosting Guide", item: "https://site-host-finder.vercel.app/#hosting-guide" },
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
