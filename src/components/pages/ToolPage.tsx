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

const VIEW_MAP: Record<string, "dns" | "whois" | "ssl" | "headers" | "ip" | "tech" | undefined> = {
  DnsLookup: "dns",
  WhoisLookup: "whois",
  SslChecker: "ssl",
  HttpHeaders: "headers",
  ReverseIpLookup: "ip",
  CmsDetector: "tech",
  Hosting: undefined,
};




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
    default: {
      // DnsLookup, WhoisLookup, SslChecker, HttpHeaders, ReverseIpLookup, CmsDetector,
      // and the master Hosting checker share one search engine but each navigates
      // to /results/:domain?view=<tool> so the results page shows only that slice.
      const view = kind ? VIEW_MAP[kind] : undefined;
      return (
        <div className="flex flex-col items-center text-center">
          <SearchBar view={view} />
          <p className="mt-3 text-xs text-muted-foreground">
            Free · No signup · Unlimited lookups
          </p>
        </div>
      );
    }
  }
}


function RouteTable({ table }: { table: NonNullable<RouteContent["tables"]>[number] }) {
  return (
    <figure className="my-6 overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-sm">
        <caption className="caption-top text-left px-4 py-3 font-semibold text-foreground border-b">
          {table.caption}
        </caption>
        <thead className="bg-muted/40">
          <tr>
            {table.headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-2 text-left font-display font-semibold text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export default function ToolPage({ route }: { route: RouteContent }) {
  // Mobile-AEO helper: surface the first 3 FAQ questions as quick-scan bullets.
  const keyPoints = route.faqs.slice(0, 3).map((f) => f.q);

  return (
    <div className="flex min-h-screen flex-col">
      <SeoHead route={route} />
      <Header />

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="container max-w-5xl mx-auto px-4 pt-4 text-xs text-muted-foreground">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li><ChevronRight className="h-3 w-3 inline" /></li>
            <li><a href="/" className="hover:text-foreground">Tools</a></li>
            <li><ChevronRight className="h-3 w-3 inline" /></li>
            <li className="text-foreground" aria-current="page">{route.h1}</li>
          </ol>
        </nav>

        <section className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">
            {route.h1}
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            {route.intro}
          </p>

          {keyPoints.length > 0 && (
            <aside
              aria-label="Quick answers"
              className="mt-5 mx-auto max-w-2xl rounded-xl border bg-muted/30 p-4 text-sm"
            >
              <p className="font-display font-semibold text-foreground mb-2">In short</p>
              <ul className="space-y-1.5 text-muted-foreground">
                {keyPoints.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span aria-hidden className="text-primary mt-0.5">›</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="mt-6 rounded-2xl border bg-card p-4 sm:p-5 md:p-6 shadow-sm">
            {renderToolWidget(route.toolComponent)}
          </div>
        </section>

        <div className="container max-w-3xl mx-auto px-4">
          <AdsterraNative />
        </div>

        <section className="container max-w-3xl mx-auto px-4 py-10 space-y-6">
          {route.sections.map((s) => (
            <article key={s.heading}>
              <h2 className="font-display text-xl md:text-2xl font-bold mb-3">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
          {route.tables?.map((t) => <RouteTable key={t.caption} table={t} />)}
          <p className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-3 italic">
            Need faster, more affordable hosting? <a href="/go/hostinger" rel="nofollow sponsored noopener noreferrer" className="text-primary font-semibold hover:underline">Try Hostinger from $2.99/month →</a>
          </p>
        </section>

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
