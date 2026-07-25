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
import { highlightKeywords } from "@/lib/seo/highlightKeywords";
import { ChevronRight, Sparkles } from "lucide-react";

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
  const keyPoints = route.keyPoints && route.keyPoints.length > 0
    ? route.keyPoints
    : route.faqs.slice(0, 4).map((f) => f.q);

  // Short 1-line description for the hero (first sentence of intro).
  const heroDescription = route.intro.match(/^[^.!?]+[.!?]/)?.[0] || route.intro;

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

        {/* HERO — H1 + 1-line desc + TOOL (tool is the focal point) */}
        <section className="container max-w-3xl mx-auto px-4 pt-6 pb-8 md:pt-10 md:pb-10">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">
            {route.h1}
          </h1>
          <p id="speakable-intro" className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>


          {/* THE TOOL — prominent card */}
          <div className="mt-6 md:mt-8 rounded-2xl border-2 border-primary/20 bg-card p-5 sm:p-6 md:p-8 shadow-lg shadow-primary/5">
            {renderToolWidget(route.toolComponent)}
          </div>

          {/* AEO quick-answer chip — directly below the tool */}
          {route.quickAnswer && (
            <div
              id="quick-answer"
              className="mt-4 mx-auto max-w-2xl rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 text-sm flex gap-3 items-start"
            >
              <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="leading-relaxed text-foreground">
                <span className="font-semibold text-primary">Quick answer: </span>
                {highlightKeywords(route.quickAnswer, route.keywords)}
              </p>
            </div>
          )}

          {route.geoNote && (
            <p className="mt-2 text-center text-xs text-muted-foreground italic">🌐 {route.geoNote}</p>
          )}
        </section>

        <div className="container max-w-3xl mx-auto px-4">
          <AdsterraNative />
        </div>

        {/* KEY POINTS — what the page covers */}
        {keyPoints.length > 0 && (
          <section className="container max-w-3xl mx-auto px-4 py-6">
            <aside
              aria-label="What this page covers"
              className="rounded-xl border bg-muted/30 p-4 sm:p-5"
            >
              <p className="font-display font-semibold text-foreground text-sm sm:text-base mb-3">
                What this page covers
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm font-medium text-foreground/90">
                {keyPoints.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span aria-hidden className="text-primary mt-0.5 font-bold">›</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        )}

        {/* LONG-FORM CONTENT */}
        <section className="container max-w-3xl mx-auto px-4 py-8 space-y-10">
          {route.sections.map((s) => {
            const sentences = s.body.match(/[^.!?]+[.!?]+(\s|$)/g)?.map((x) => x.trim()).filter(Boolean) || [s.body];
            const chunks: string[] = [];
            for (let i = 0; i < sentences.length; i += 2) {
              chunks.push(sentences.slice(i, i + 2).join(" "));
            }
            return (
              <article key={s.heading}>
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-3 text-foreground border-b-2 border-primary/30 pb-2 inline-block">
                  {s.heading}
                </h2>
                {chunks.map((c, i) => (
                  <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                    {highlightKeywords(c, route.keywords)}
                  </p>
                ))}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm sm:text-base text-foreground/90">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 pl-1">
                        <span aria-hidden className="text-primary mt-1 font-bold">•</span>
                        <span>{highlightKeywords(b, route.keywords)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}

          {route.tables?.map((t) => <RouteTable key={t.caption} table={t} />)}

          {route.useCases && route.useCases.length > 0 && (
            <article>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-4 border-b-2 border-primary/30 pb-2 inline-block">
                Real-world use cases
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {route.useCases.map((u) => (
                  <div key={u.title} className="rounded-lg border bg-card p-4 hover:border-primary/40 transition">
                    <h3 className="font-display font-semibold text-foreground text-sm sm:text-base mb-2">{u.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{u.body}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {route.troubleshooting && route.troubleshooting.length > 0 && (
            <article>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-4 border-b-2 border-primary/30 pb-2 inline-block">
                Troubleshooting
              </h2>
              <div className="space-y-3">
                {route.troubleshooting.map((t) => (
                  <div key={t.problem} className="rounded-lg border-l-4 border-orange-400 bg-orange-50/40 dark:bg-orange-950/10 p-3 sm:p-4">
                    <p className="font-display font-semibold text-foreground text-sm mb-1">{t.problem}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.solution}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {route.commonErrors && route.commonErrors.length > 0 && (
            <article id="common-errors">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-4 border-b-2 border-primary/30 pb-2 inline-block">
                Common mistakes &amp; how to fix them
              </h2>
              <dl className="space-y-3">
                {route.commonErrors.map((e) => (
                  <div key={e.mistake} className="rounded-lg border bg-card p-3 sm:p-4">
                    <dt className="font-display font-semibold text-foreground text-sm mb-1">❌ {e.mistake}</dt>
                    <dd className="text-xs sm:text-sm text-muted-foreground leading-relaxed">✅ {e.fix}</dd>
                  </div>
                ))}
              </dl>
            </article>
          )}

          <p className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-3 italic">
            Need faster, more affordable hosting? <a href="/go/hostinger" rel="nofollow sponsored noopener noreferrer" className="text-primary font-semibold hover:underline">Try Hostinger from $2.99/month →</a>
          </p>
        </section>

        {route.faqs.length > 0 && (
          <section id="faq" className="container max-w-3xl mx-auto px-4 py-10 border-t">

            <h2 className="font-display text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {route.faqs.map((f) => (
                <details key={f.q} className="group rounded-lg border bg-card p-4">
                  <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between items-start gap-3 text-sm sm:text-base">
                    <span>{f.q}</span>
                    <ChevronRight className="h-4 w-4 mt-1 shrink-0 transition-transform group-open:rotate-90" />
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
