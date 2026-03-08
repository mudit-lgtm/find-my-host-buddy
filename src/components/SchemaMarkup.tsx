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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
