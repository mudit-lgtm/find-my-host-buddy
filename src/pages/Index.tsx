import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { HowToSection } from "@/components/HowToSection";
import { TrustFactors } from "@/components/TrustFactors";
import { SEOContent } from "@/components/SEOContent";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Server, Globe, Wifi, Search, Shield, Activity } from "lucide-react";

const tools = [
  { title: "Hosting Checker", description: "Find out who hosts any website", icon: Server, href: "/" },
  { title: "DNS Lookup", description: "View DNS records for any domain", icon: Globe, href: "#", comingSoon: true },
  { title: "Is It Up or Down?", description: "Check if a website is online", icon: Activity, href: "#", comingSoon: true },
  { title: "What Is My IP", description: "Find your public IP address", icon: Wifi, href: "#", comingSoon: true },
  { title: "Reverse Image Search", description: "Search the web by image", icon: Search, href: "#", comingSoon: true },
  { title: "Port Checker", description: "Check if a port is open", icon: Shield, href: "#", comingSoon: true },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SchemaMarkup />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section
          id="hosting-checker"
          className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24 lg:py-32"
        >
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1]">
              Find out who is hosting{" "}
              <span className="text-primary">any website</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              Enter a domain or URL to instantly discover the hosting provider, IP address, server location, and more.
            </p>
            <div className="mt-8 w-full flex justify-center">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Trust Factors */}
        <TrustFactors />

        {/* How It Works */}
        <HowToSection />

        {/* Tools Grid */}
        <section id="tools" className="container max-w-5xl mx-auto px-4 py-16 border-t">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Free Webmaster Tools
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <div className="border-t">
          <FAQSection />
        </div>

        {/* SEO Content */}
        <SEOContent />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
