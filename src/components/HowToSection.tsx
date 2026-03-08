import { Globe, Search, MousePointerClick, FileText } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Enter the Domain or URL",
    description:
      "Type or paste any website address into the search bar above. You can enter a full URL (https://example.com/page) or just the domain name (example.com) — we'll extract the domain automatically.",
  },
  {
    icon: MousePointerClick,
    title: "Click \"Find Host\"",
    description:
      "Hit the \"Find Host\" button or press Enter to start the lookup. Our tool performs real-time DNS resolution, IP geolocation, and provider matching in seconds.",
  },
  {
    icon: Search,
    title: "Review the Results",
    description:
      "Instantly see the hosting provider, server IP address, physical server location, nameservers, and DNS records. All data is fetched live for maximum accuracy.",
  },
  {
    icon: FileText,
    title: "Use the Information",
    description:
      "Use the hosting details to compare providers, research competitors, troubleshoot DNS issues, or verify your own website's hosting configuration.",
  },
];

export function HowToSection() {
  return (
    <section id="how-it-works" className="container max-w-5xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        How to Check Who Hosts a Website
      </h2>
      <p className="text-muted-foreground mb-10">
        Find any website's hosting provider in four simple steps.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <step.icon className="h-5 w-5" />
            </div>
            <span className="absolute top-4 right-4 font-display text-3xl font-bold text-muted/60">
              {i + 1}
            </span>
            <h3 className="font-display font-semibold text-foreground mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { steps };
