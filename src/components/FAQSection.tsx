import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I check who hosts a website?",
    answer:
      "Type the domain into the checker above and press Check Host. We find the server's IP address and network owner, then match them against 500+ known hosting providers — the result appears in seconds.",
  },
  {
    question: "Can I find the host of a site behind Cloudflare?",
    answer:
      "The result shows Cloudflare because its proxy answers all traffic and hides the origin server by design. The full report's mail and verification records often hint at the real hosting company.",
  },
  {
    question: "Is this website hosting checker free?",
    answer:
      "Yes — completely free, with unlimited lookups and no signup or API key required.",
  },
  {
    question: "How accurate is the host lookup?",
    answer:
      "Very accurate for sites not behind a CDN, since we use live resolution and IP ownership data. CDN-fronted sites report the CDN itself, because the origin is intentionally hidden.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="container max-w-3xl mx-auto px-4 py-14">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
        Host checker FAQ
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-l-2 border-l-transparent data-[state=open]:border-l-primary pl-3 transition-colors"
          >
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
