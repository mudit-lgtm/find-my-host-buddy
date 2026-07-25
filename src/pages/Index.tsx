import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { HowToSection } from "@/components/HowToSection";
import { TrustFactors } from "@/components/TrustFactors";
import { SEOContent } from "@/components/SEOContent";
import { AdsterraAd } from "@/components/AdsterraAd";
import { AdsterraNative } from "@/components/AdsterraNative";
import { StickyMobileAd } from "@/components/StickyMobileAd";
import { TOOL_ROUTES } from "@/lib/seo/keywordMap";
import {
  Server, Globe, Activity, Wifi, Shield, ArrowRightLeft,
  Lock, FileSearch, Code2, Network, ChevronRight,
} from "lucide-react";

// Map each tool route to an icon + gradient so the home grid stays visual.
const TOOL_META: Record<string, { icon: typeof Server; gradient: string; blurb: string }> = {
  "/tools/dns-lookup":          { icon: Globe,         gradient: "from-purple-500 to-pink-500",   blurb: "A, AAAA, MX, NS, TXT & CNAME" },
  "/tools/whois-lookup":        { icon: FileSearch,    gradient: "from-amber-500 to-orange-500",  blurb: "Owner, registrar, age & expiry" },
  "/tools/ip-checker":          { icon: Wifi,          gradient: "from-orange-500 to-amber-500",  blurb: "Your IP + any IP host lookup" },
  "/tools/ssl-checker":         { icon: Lock,          gradient: "from-emerald-500 to-teal-500",  blurb: "HTTPS issuer, expiry & TLS" },
  "/tools/http-headers":        { icon: Code2,         gradient: "from-cyan-500 to-blue-500",     blurb: "Headers, status, security" },
  "/tools/reverse-ip-lookup":   { icon: Network,       gradient: "from-violet-500 to-purple-500", blurb: "Sites on the same server" },
  "/tools/cms-detector":        { icon: Server,        gradient: "from-indigo-500 to-blue-500",   blurb: "WordPress, Shopify, Wix…" },
  "/tools/website-down-checker":{ icon: Activity,      gradient: "from-green-500 to-emerald-500", blurb: "Is it up or down right now" },
  "/tools/port-checker":        { icon: Shield,        gradient: "from-rose-500 to-red-500",      blurb: "Test open TCP ports" },
  "/tools/domain-compare":      { icon: ArrowRightLeft,gradient: "from-indigo-500 to-blue-500",   blurb: "Side-by-side compare" },
};

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero — master Host Checker */}
        <section className="relative overflow-hidden hero-gradient py-16 md:py-24 lg:py-28">
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1]">
              Find out who is hosting{" "}
              <span className="text-gradient">any website</span>
            </h1>
            <p id="speakable-intro" className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              Free host checker — paste a domain to instantly find the hosting provider, IP, server location, DNS records &amp; WHOIS.
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

            <div className="mt-8 w-full max-w-3xl">
              <AdsterraNative />
            </div>
          </div>
        </section>

        <TrustFactors />
        <HowToSection />

        {/* Tools grid — every card links to its own dedicated /tools/* page */}
        <section className="container max-w-6xl mx-auto px-4 py-14 border-t">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              <span className="text-gradient">Free Webmaster Tools</span>
            </h2>
            <p className="text-muted-foreground">Each tool has its own focused page and result view — no signup, instant.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_ROUTES.map((r) => {
              const m = TOOL_META[r.path];
              if (!m) return null;
              const Icon = m.icon;
              return (
                <a
                  key={r.path}
                  href={r.path}
                  className="group flex items-start gap-3 rounded-xl border bg-card p-4 hover:shadow-lg hover:border-primary/40 transition-all"
                >
                  <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${m.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-foreground text-sm leading-tight">
                      {r.h1.split(" — ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.blurb}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground self-center" />
                </a>
              );
            })}
          </div>
        </section>

        <div className="hidden md:flex justify-center py-6 border-t">
          <AdsterraAd adKey="996d0263af42d6d1053ccaacfb8d3788" width={728} height={90} />
        </div>

        <div className="border-t">
          <FAQSection />
        </div>

        <div className="hidden md:flex justify-center py-4 border-t">
          <AdsterraAd adKey="759ffd17453099550f27812f849cce0f" width={468} height={60} />
        </div>

        <SEOContent />
      </main>

      <Footer />
      <StickyMobileAd />
    </div>
  );
};

export default Index;
