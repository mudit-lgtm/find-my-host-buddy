import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { HowToSection } from "@/components/HowToSection";
import { TrustFactors } from "@/components/TrustFactors";
import { SEOContent } from "@/components/SEOContent";
import { CompareSection } from "@/components/CompareSection";
import { IsItUpTool } from "@/components/tools/IsItUpTool";
import { WhatIsMyIPTool } from "@/components/tools/WhatIsMyIPTool";
import { PortCheckerTool } from "@/components/tools/PortCheckerTool";
import { AdsterraAd } from "@/components/AdsterraAd";
import { AdsterraNative } from "@/components/AdsterraNative";
import { StickyMobileAd } from "@/components/StickyMobileAd";
import {
  Server, Globe, Activity, Wifi, Shield, ArrowRightLeft,
  FileText, Lock, Info, Mail, ChevronDown,
} from "lucide-react";

const toolJumps = [
  { id: "hosting-checker", title: "Hosting Checker", icon: Server, gradient: "from-blue-500 to-cyan-500" },
  { id: "dns-lookup", title: "DNS Lookup", icon: Globe, gradient: "from-purple-500 to-pink-500" },
  { id: "website-down-checker", title: "Is It Up?", icon: Activity, gradient: "from-green-500 to-emerald-500" },
  { id: "ip-checker", title: "What Is My IP", icon: Wifi, gradient: "from-orange-500 to-amber-500" },
  { id: "port-checker", title: "Port Checker", icon: Shield, gradient: "from-rose-500 to-red-500" },
  { id: "compare", title: "Domain Compare", icon: ArrowRightLeft, gradient: "from-indigo-500 to-blue-500" },
];

function ToolSection({
  id, title, description, icon: Icon, gradient, children,
}: {
  id: string;
  title: string;
  description: string;
  icon: typeof Server;
  gradient: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="container max-w-3xl mx-auto px-4 py-12 border-t scroll-mt-20">
      <div className="flex items-start gap-4 mb-4">
        <div className={`shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {children && <div className="mt-6 rounded-xl border bg-card p-5">{children}</div>}
    </section>
  );
}

function PolicyDetails({
  id, title, icon: Icon, gradient, children,
}: {
  id: string;
  title: string;
  icon: typeof Lock;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="container max-w-3xl mx-auto px-4 py-6 border-t scroll-mt-20">
      <details className="group">
        <summary className="cursor-pointer list-none flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md`}>
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
          </div>
          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="prose prose-sm text-muted-foreground space-y-3 pt-4 pl-13">
          {children}
        </div>
      </details>
    </section>
  );
}

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section
          id="hosting-checker"
          className="relative overflow-hidden hero-gradient py-16 md:py-24 lg:py-28 scroll-mt-20"
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
              rel="nofollow sponsored noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-primary/20 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              🚀 Need fast hosting? <span className="font-semibold text-primary">Try Hostinger →</span>
            </a>

            {/* Adsterra Native banner below hero */}
            <div className="mt-8 w-full max-w-3xl">
              <AdsterraNative />
            </div>
          </div>
        </section>

        {/* Trust Factors */}
        <TrustFactors />

        {/* How It Works */}
        <HowToSection />

        {/* Tools quick-jump grid */}
        <section id="tools" className="container max-w-5xl mx-auto px-4 py-14 border-t scroll-mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            <span className="text-gradient">Free Webmaster Tools</span>
          </h2>
          <p className="text-muted-foreground mb-6">Jump to any tool — each works instantly with no signup.</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {toolJumps.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="group flex flex-col items-center text-center gap-2 rounded-xl border bg-card p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${t.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-foreground">{t.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Desktop leaderboard ad */}
        <div className="hidden md:flex justify-center py-6 border-t">
          <AdsterraAd adKey="996d0263af42d6d1053ccaacfb8d3788" width={728} height={90} />
        </div>

        {/* DNS Lookup */}
        <ToolSection
          id="dns-lookup"
          title="DNS Lookup — A, AAAA, MX, NS, TXT & CNAME Records"
          description="Resolve any domain instantly. View all DNS record types — useful for troubleshooting propagation, verifying nameserver changes, and auditing email setup."
          icon={Globe}
          gradient="from-purple-500 to-pink-500"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Use the main hosting checker above to view full DNS records for any domain.
          </p>
          <a href="#hosting-checker" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
            Run DNS Lookup ↑
          </a>
        </ToolSection>

        {/* Website Down Checker */}
        <ToolSection
          id="website-down-checker"
          title="Is It Up or Down? — Website Down Checker"
          description="Check if any website is currently online. Get real-time status code, response time, and reachability."
          icon={Activity}
          gradient="from-green-500 to-emerald-500"
        >
          <IsItUpTool />
        </ToolSection>

        {/* IP Checker */}
        <ToolSection
          id="ip-checker"
          title="What Is My IP — IP Address Checker"
          description="Instantly find your public IPv4 address. Useful for VPN verification, firewall whitelist, and network troubleshooting."
          icon={Wifi}
          gradient="from-orange-500 to-amber-500"
        >
          <WhatIsMyIPTool />
        </ToolSection>

        {/* Mobile rectangle ad */}
        <div className="md:hidden flex justify-center py-4 border-t">
          <AdsterraAd adKey="c381d2037f8267b10ad9cada54017de1" width={300} height={250} />
        </div>

        {/* Port Checker */}
        <ToolSection
          id="port-checker"
          title="Port Checker — Test Open TCP Ports"
          description="Test if a specific port is open on any host. Great for firewall debugging and verifying service availability."
          icon={Shield}
          gradient="from-rose-500 to-red-500"
        >
          <PortCheckerTool />
        </ToolSection>

        {/* Domain Compare */}
        <CompareSection />

        {/* Desktop rectangle ad before FAQ */}
        <div className="hidden md:flex justify-center py-6 border-t">
          <AdsterraAd adKey="c381d2037f8267b10ad9cada54017de1" width={300} height={250} />
        </div>

        {/* FAQ */}
        <div className="border-t">
          <FAQSection />
        </div>

        {/* Desktop banner */}
        <div className="hidden md:flex justify-center py-4 border-t">
          <AdsterraAd adKey="759ffd17453099550f27812f849cce0f" width={468} height={60} />
        </div>

        {/* SEO Content / Hosting Guide */}
        <SEOContent />

        {/* Policy collapsibles */}
        <PolicyDetails id="privacy-policy" title="Privacy Policy" icon={Lock} gradient="from-blue-500 to-cyan-500">
          <p>Last updated: April 2026</p>
          <p>Site Host Finder ("we") operates https://site-host-finder.vercel.app. This page explains our policies regarding the collection, use, and disclosure of information.</p>
          <h3 className="font-display font-bold text-foreground">Information We Collect</h3>
          <p>We do not collect personal information. Domain lookups are processed in real-time and not stored. We use Google AdSense and Adsterra, which may use cookies to serve personalized ads.</p>
          <h3 className="font-display font-bold text-foreground">Cookies</h3>
          <p>Cookies are used for analytics and advertising. You can opt out of personalized advertising via Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</p>
          <h3 className="font-display font-bold text-foreground">Third-Party Services</h3>
          <p>We use Google AdSense and Adsterra. Third-party vendors use cookies to serve ads. Opt out at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutads.info</a>.</p>
          <h3 className="font-display font-bold text-foreground">Contact</h3>
          <p>For questions about this policy, reach us via the Contact section below.</p>
        </PolicyDetails>

        <PolicyDetails id="terms" title="Terms of Service" icon={FileText} gradient="from-purple-500 to-violet-500">
          <p>Last updated: April 2026</p>
          <p>By accessing Site Host Finder, you accept these Terms of Service.</p>
          <h3 className="font-display font-bold text-foreground">Use of Service</h3>
          <p>Site Host Finder provides free hosting lookup, DNS records, and related web tools "as is" without warranties. Do not use for unlawful purposes or to abuse our infrastructure.</p>
          <h3 className="font-display font-bold text-foreground">Accuracy</h3>
          <p>Hosting and DNS data may change at any time. We are not responsible for decisions made based on tool output.</p>
          <h3 className="font-display font-bold text-foreground">Intellectual Property</h3>
          <p>All content, design, and branding are our intellectual property. Do not reproduce without permission.</p>
          <h3 className="font-display font-bold text-foreground">Limitation of Liability</h3>
          <p>Site Host Finder is not liable for indirect, incidental, or consequential damages.</p>
        </PolicyDetails>

        <PolicyDetails id="about" title="About Site Host Finder" icon={Info} gradient="from-green-500 to-emerald-500">
          <p>Site Host Finder is a free, fast tool built to help web developers, SEO professionals, and business owners find out who hosts any website. We perform real-time DNS resolution, IP geolocation, and provider matching for accurate results.</p>
          <p>Our suite includes hosting lookup, DNS viewer, domain comparison, status checker, and more — all free with no signup required.</p>
          <p>Our database covers 500+ hosting providers and serves over 10,000 developers worldwide.</p>
        </PolicyDetails>

        <PolicyDetails id="contact" title="Contact Us" icon={Mail} gradient="from-orange-500 to-amber-500">
          <p>Questions, feedback, or suggestions? We'd love to hear from you.</p>
          <p>📧 Email: <a href="mailto:contact@sitehostfinder.com" className="text-primary hover:underline">contact@sitehostfinder.com</a></p>
          <p>We typically respond within 24-48 hours. For bug reports include as much detail as possible.</p>
        </PolicyDetails>
      </main>

      <Footer />
      <StickyMobileAd />
    </div>
  );
};

export default Index;
