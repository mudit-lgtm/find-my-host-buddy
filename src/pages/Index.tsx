import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-28">
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1]">
              Find out who is hosting{" "}
              <span className="text-primary">any website</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl">
              Enter a domain or URL to instantly discover the hosting provider, IP address, server location, and more.
            </p>
            <div className="mt-8 w-full flex justify-center">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="container max-w-5xl mx-auto px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Free Webmaster Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="container max-w-5xl mx-auto px-4 py-16 border-t">
          <div className="prose prose-sm max-w-3xl text-muted-foreground">
            <h2 className="font-display text-xl font-bold text-foreground">What is a Hosting Checker?</h2>
            <p>
              A hosting checker is a tool that identifies the web hosting provider of any website. Simply enter a domain name and our tool performs DNS lookups, IP resolution, and provider identification to reveal detailed hosting information including the hosting company, server IP address, and physical server location.
            </p>
            <h2 className="font-display text-xl font-bold text-foreground mt-6">How Does It Work?</h2>
            <p>
              Our hosting checker resolves the domain's DNS records to find its IP address, then uses IP geolocation and nameserver analysis to identify the hosting provider. We cross-reference nameservers and IP ranges against a database of hundreds of known hosting companies to give you accurate results.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
