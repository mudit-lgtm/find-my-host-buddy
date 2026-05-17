import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { IsItUpTool } from "@/components/tools/IsItUpTool";
import { WhatIsMyIPTool } from "@/components/tools/WhatIsMyIPTool";
import { PortCheckerTool } from "@/components/tools/PortCheckerTool";
import { CompareSection } from "@/components/CompareSection";
import { StickyMobileAd } from "@/components/StickyMobileAd";
import { AdsterraNative } from "@/components/AdsterraNative";
import type { RouteContent } from "@/lib/seo/keywordMap";
import { ChevronRight } from "lucide-react";

function renderToolWidget(kind: RouteContent["toolComponent"]) {
  switch (kind) {
    case "IsItUp":
      return <IsItUpTool />;
    case "IpChecker":
      return <WhatIsMyIPTool />;
    case "PortChecker":
      return <PortCheckerTool />;
    case "DomainCompare":
      return <CompareSection />;
    default:
      // hosting-checker, find-website-host, where-is-hosted, who-is-hosting,
      // hosting-lookup, dns-lookup all use the main SearchBar -> /results/:domain
      return (
        <div className="flex flex-col items-center text-center">
          <SearchBar />
          <p className="mt-3 text-xs text-muted-foreground">
            Free · No signup · Unlimited lookups
          </p>
        </div>
      );
  }
}

export default function ToolPage({ route }: { route: RouteContent }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SeoHead route={route} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container max-w-5xl mx-auto px-4 pt-4 text-xs text-muted-foreground">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li><ChevronRight className="h-3 w-3 inline" /></li>
            <li><a href="/" className="hover:text-foreground">Tools</a></li>
            <li><ChevronRight className="h-3 w-3 inline" /></li>
            <li className="text-foreground" aria-current="page">{route.h1}</li>
          </ol>
        </nav>

        {/* Hero + tool */}
        <section className="container max-w-3xl mx-auto px-4 py-10 md:py-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">
            {route.h1}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            {route.intro}
          </p>
          <div className="mt-8 rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
            {renderToolWidget(route.toolComponent)}
          </div>
        </section>

        {/* Native ad */}
        <div className="container max-w-3xl mx-auto px-4">
          <AdsterraNative />
        </div>

        {/* AEO sections */}
        <section className="container max-w-3xl mx-auto px-4 py-10 space-y-8">
          {route.sections.map((s) => (
            <article key={s.heading}>
              <h2 className="font-display text-xl md:text-2xl font-bold mb-3">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
        </section>

        {/* FAQ */}
        {route.faqs.length > 0 && (
          <section className="container max-w-3xl mx-auto px-4 py-10 border-t">
            <h2 className="font-display text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {route.faqs.map((f) => (
                <details key={f.q} className="group rounded-lg border bg-card p-4">
                  <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between items-center">
                    {f.q}
                    <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related tools — inbound link juice */}
        {route.related.length > 0 && (
          <section className="container max-w-3xl mx-auto px-4 py-10 border-t">
            <h2 className="font-display text-xl font-bold mb-4">Related tools & guides</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {route.related.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="block rounded-lg border bg-card p-3 hover:border-primary transition text-sm font-medium text-foreground">
                    {r.label} <ChevronRight className="inline h-3 w-3 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Outbound authority links */}
        {route.outbound.length > 0 && (
          <section className="container max-w-3xl mx-auto px-4 py-8 border-t">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Learn more</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {route.outbound.map((o) => (
                <li key={o.href}>
                  <a
                    href={o.href}
                    target={o.href.startsWith("http") ? "_blank" : undefined}
                    rel={o.rel || "noopener noreferrer"}
                    className="text-primary hover:underline"
                  >
                    {o.label} {o.href.startsWith("http") && "↗"}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
      <StickyMobileAd />
    </div>
  );
}
