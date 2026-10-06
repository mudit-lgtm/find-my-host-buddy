import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { TOOL_ROUTES, HOME_ROUTE } from "@/lib/seo/keywordMap";
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
        <section className="border-b">
          <div className="container mx-auto flex max-w-5xl flex-col items-center px-4 py-5 text-center sm:py-8">
            <h1 className="max-w-3xl font-display text-2xl font-bold leading-tight text-foreground sm:text-4xl">
              {HOME_ROUTE.h1}
            </h1>
            <div className="mt-4 flex w-full justify-center sm:mt-5">
              <SearchBar showExtras={false} />
            </div>
          </div>
        </section>

        <section aria-labelledby="what-this-shows" className="container mx-auto max-w-5xl px-4 py-5">
          <h2 id="what-this-shows" className="mb-3 text-center font-display text-sm font-semibold text-muted-foreground">
            What this shows
          </h2>
          <div className="grid grid-cols-2 border-y sm:grid-cols-4">
            {["Hosting provider", "Server IP", "Server location", "Network owner"].map((item) => (
              <div key={item} className="border-b px-3 py-3 text-center text-sm font-medium text-foreground last:border-b-0 even:border-l sm:border-b-0 sm:even:border-l-0 sm:[&:not(:first-child)]:border-l">
                {item}
              </div>
            ))}
          </div>
          <p id="speakable-intro" className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            {HOME_ROUTE.intro}
          </p>
        </section>

        <div className="border-t">
          <FAQSection />
        </div>

        <section className="container mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              <span className="text-gradient">More Free Website Tools</span>
            </h2>
            <p className="text-muted-foreground">Choose a focused checker for more website details.</p>
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
      </main>

      <Footer />
    </div>
  );
};

export default Index;
