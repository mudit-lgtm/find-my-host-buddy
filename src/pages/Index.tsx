import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { HowToSection } from "@/components/HowToSection";
import { TrustFactors } from "@/components/TrustFactors";
import { SEOContent } from "@/components/SEOContent";
import { ToolCard } from "@/components/ToolCard";
import { CompareSection } from "@/components/CompareSection";
import { ToolDialog } from "@/components/ToolDialog";
import { Server, Globe, Activity, Wifi, Shield, ArrowRightLeft } from "lucide-react";

const tools = [
  { id: "hosting", title: "Hosting Checker", description: "Find out who hosts any website", icon: Server, href: "/#hosting-checker" },
  { id: "dns", title: "DNS Lookup", description: "View DNS records for any domain", icon: Globe, href: "/#hosting-checker" },
  { id: "updown", title: "Is It Up or Down?", description: "Check if a website is online", icon: Activity, popup: true },
  { id: "myip", title: "What Is My IP", description: "Find your public IP address", icon: Wifi, popup: true },
  { id: "port", title: "Port Checker", description: "Check if a port is open", icon: Shield, popup: true },
  { id: "compare", title: "Domain Compare", description: "Compare hosting of two domains side by side", icon: ArrowRightLeft, href: "#compare" },
];

const Index = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section
          id="hosting-checker"
          className="relative overflow-hidden hero-gradient py-16 md:py-24 lg:py-32"
        >
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1]">
              Find out who is hosting{" "}
              <span className="text-gradient">any website</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              Enter a domain or URL to instantly discover the hosting provider, IP address, server location, DNS records, and more.
            </p>
            <div className="mt-8 w-full flex justify-center">
              <SearchBar />
            </div>
            <a
              href="/go/hostinger"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-primary/20 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              🚀 Need fast hosting? <span className="font-semibold text-primary">Try Hostinger →</span>
            </a>
          </div>
        </section>

        {/* Trust Factors */}
        <TrustFactors />

        {/* How It Works */}
        <HowToSection />

        {/* Tools Grid */}
        <section id="tools" className="container max-w-5xl mx-auto px-4 py-16 border-t">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            <span className="text-gradient">Free Webmaster Tools</span>
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.popup ? undefined : tool.href || "/"}
                onClick={tool.popup ? () => setActiveTool(tool.id) : undefined}
              />
            ))}
          </div>
        </section>

        {/* Domain Compare */}
        <CompareSection />

        {/* FAQ */}
        <div className="border-t">
          <FAQSection />
        </div>

        {/* SEO Content */}
        <SEOContent />

        {/* Privacy Policy */}
        <section id="privacy-policy" className="container max-w-3xl mx-auto px-4 py-16 border-t">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Privacy Policy</h2>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            <p>Last updated: April 2026</p>
            <p>Site Host Finder ("we") operates the website https://site-host-finder.vercel.app. This page informs you of our policies regarding the collection, use, and disclosure of information.</p>
            <h3 className="font-display font-bold text-foreground">Information We Collect</h3>
            <p>We do not collect personal information. Domain lookups are processed in real-time and not stored. We use Google AdSense, which may use cookies to serve personalized ads. Google's use of advertising cookies enables it to serve ads based on your visits to this and other sites.</p>
            <h3 className="font-display font-bold text-foreground">Cookies</h3>
            <p>We use cookies for analytics (if enabled) and advertising through Google AdSense. You can opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</p>
            <h3 className="font-display font-bold text-foreground">Third-Party Services</h3>
            <p>We use Google AdSense for advertising. Third-party vendors, including Google, use cookies to serve ads. You may opt out at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutads.info</a>.</p>
            <h3 className="font-display font-bold text-foreground">Contact</h3>
            <p>For questions about this policy, contact us through the Contact section below.</p>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms" className="container max-w-3xl mx-auto px-4 py-16 border-t">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Terms of Service</h2>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            <p>Last updated: April 2026</p>
            <p>By accessing and using Site Host Finder, you accept and agree to be bound by these Terms of Service.</p>
            <h3 className="font-display font-bold text-foreground">Use of Service</h3>
            <p>Site Host Finder provides free hosting lookup, DNS records, and related web tools. The service is provided "as is" without warranties of any kind. You agree not to use the service for any unlawful purpose or to abuse our lookup infrastructure.</p>
            <h3 className="font-display font-bold text-foreground">Accuracy</h3>
            <p>While we strive for accuracy, hosting and DNS data may change at any time. We are not responsible for decisions made based on information provided by our tools.</p>
            <h3 className="font-display font-bold text-foreground">Intellectual Property</h3>
            <p>All content, design, and branding on Site Host Finder are our intellectual property. You may not reproduce, distribute, or create derivative works without permission.</p>
            <h3 className="font-display font-bold text-foreground">Limitation of Liability</h3>
            <p>Site Host Finder shall not be liable for any indirect, incidental, or consequential damages arising from the use of our service.</p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="container max-w-3xl mx-auto px-4 py-16 border-t">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">About Site Host Finder</h2>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            <p>Site Host Finder is a free, fast, and reliable tool built to help web developers, SEO professionals, and business owners find out who hosts any website. Our tool performs real-time DNS resolution, IP geolocation, and provider matching to deliver accurate results.</p>
            <p>We provide a comprehensive suite of webmaster tools including hosting lookup, DNS record viewer, domain comparison, website status checker, and more — all completely free with no signup required.</p>
            <p>Our database covers 500+ hosting providers worldwide, and we serve over 10,000 developers and webmasters. Whether you need to research a competitor's hosting, troubleshoot DNS issues, or compare hosting providers, Site Host Finder has you covered.</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container max-w-3xl mx-auto px-4 py-16 border-t">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Us</h2>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            <p>Have questions, feedback, or suggestions? We'd love to hear from you.</p>
            <p>📧 Email: <a href="mailto:contact@sitehostfinder.com" className="text-primary hover:underline">contact@sitehostfinder.com</a></p>
            <p>You can also reach us through our social media channels. We typically respond within 24-48 hours.</p>
            <p>For bug reports or feature requests, please include as much detail as possible so we can assist you effectively.</p>
          </div>
        </section>
      </main>

      {/* Tool Dialogs */}
      <ToolDialog
        toolId={activeTool}
        onClose={() => setActiveTool(null)}
      />

      <Footer />
    </div>
  );
};

export default Index;