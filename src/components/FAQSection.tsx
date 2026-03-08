import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I find out who hosts a website?",
    answer:
      "Enter the website's domain name or URL into our hosting checker tool above. We'll instantly resolve the domain's DNS records, identify the IP address, and match it against our database of hundreds of known hosting providers to tell you exactly who hosts the site.",
  },
  {
    question: "What is a hosting checker?",
    answer:
      "A hosting checker is a free online tool that identifies the web hosting provider behind any website. It works by performing DNS lookups, analyzing nameservers, and cross-referencing IP address ranges with known hosting companies like AWS, GoDaddy, Cloudflare, and hundreds more.",
  },
  {
    question: "How to find the hosting provider of a website?",
    answer:
      "The easiest way is to use our free hosting checker tool. Simply paste the website URL or domain name, click \"Find Host,\" and we'll show you the hosting provider, IP address, server location, and DNS records — all in seconds.",
  },
  {
    question: "Is this hosting checker tool free to use?",
    answer:
      "Yes, our hosting checker is 100% free with no signup required. You can check unlimited domains and get instant results including hosting provider, IP address, server location, and DNS records.",
  },
  {
    question: "What information does the hosting checker show?",
    answer:
      "Our tool shows the hosting provider name, server IP address, physical server location (country and city), nameservers, and key DNS records including A, AAAA, MX, NS, and TXT records.",
  },
  {
    question: "Can I check who hosts a competitor's website?",
    answer:
      "Absolutely. Our hosting checker works with any publicly accessible domain. It's commonly used by web developers, SEO professionals, and business owners to research competitor hosting setups, compare performance, and make informed hosting decisions.",
  },
  {
    question: "How accurate is the hosting checker?",
    answer:
      "Our hosting checker uses real-time DNS resolution and IP geolocation data, cross-referenced against an extensive database of hosting providers. Results are highly accurate, though websites using CDNs like Cloudflare may show the CDN provider rather than the origin hosting company.",
  },
  {
    question: "What is the difference between a hosting provider and a domain registrar?",
    answer:
      "A domain registrar (like Namecheap or GoDaddy) is where you purchase and manage your domain name. A hosting provider is the company that stores your website files on a server and makes them accessible online. They can be the same company, but often are different. Learn more about domain registration at ICANN (icann.org).",
  },
  {
    question: "Why does my website show Cloudflare as the host?",
    answer:
      "If your website uses Cloudflare's CDN (Content Delivery Network), DNS queries resolve to Cloudflare's servers rather than your origin hosting server. This is by design — Cloudflare acts as a reverse proxy to improve performance and security. Your actual hosting provider is behind Cloudflare's network.",
  },
  {
    question: "Can I check the hosting of any website in the world?",
    answer:
      "Yes, our tool works with any publicly accessible domain worldwide. Simply enter the domain name and we'll identify the hosting provider regardless of the country or region the website is hosted in.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="container max-w-3xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-muted-foreground mb-8">
        Common questions about checking website hosting providers.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-display font-semibold text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export { faqs };
