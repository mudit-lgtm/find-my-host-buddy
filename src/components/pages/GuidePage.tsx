import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import type { RouteContent } from "@/lib/seo/keywordMap";
import { ChevronRight } from "lucide-react";

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

export default function GuidePage({ route }: { route: RouteContent }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SeoHead route={route} />
      <Header />
      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="container max-w-3xl mx-auto px-4 pt-4 text-xs text-muted-foreground">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li><ChevronRight className="h-3 w-3 inline" /></li>
            <li><a href="/" className="hover:text-foreground">Guides</a></li>
            <li><ChevronRight className="h-3 w-3 inline" /></li>
            <li className="text-foreground" aria-current="page">{route.h1}</li>
          </ol>
        </nav>

        {route.path === "/guides/how-to-find-where-a-website-is-hosted" && (
          <div className="container max-w-3xl mx-auto px-4 pt-6">
            <a
              href="/"
              className="block rounded-xl border border-primary/30 bg-primary/5 p-4 text-center font-display font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              Skip the guide — use the free Host Checker to find any site's host in seconds →
            </a>
          </div>
        )}

        <article className="container max-w-3xl mx-auto px-4 py-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{route.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{route.intro}</p>

          <div className="mt-8 space-y-6">
            {route.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl md:text-2xl font-bold mb-3">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </section>
            ))}
            {route.tables?.map((t) => <RouteTable key={t.caption} table={t} />)}
            <aside className="rounded-lg border bg-gradient-to-r from-primary/5 to-transparent p-4 text-sm">
              <strong className="font-display text-foreground">Recommended host:</strong>{" "}
              <a href="/go/hostinger" rel="nofollow sponsored noopener noreferrer" className="text-primary font-semibold hover:underline">
                Hostinger from $2.99/month →
              </a>
              {" — "}or try our free <a href="/" className="text-primary hover:underline">host checker</a> to see what a competitor is using.
            </aside>
          </div>

          {route.faqs.length > 0 && (
            <section className="mt-12 pt-8 border-t">
              <h2 className="font-display text-2xl font-bold mb-6">FAQs</h2>
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
            <section className="mt-12 pt-8 border-t">
              <h2 className="font-display text-xl font-bold mb-4">Related</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {route.related.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} className="block rounded-lg border bg-card p-3 hover:border-primary transition text-sm font-medium">
                      {r.label} <ChevronRight className="inline h-3 w-3 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {route.outbound.length > 0 && (
            <section className="mt-10 pt-6 border-t">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">References</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {route.outbound.map((o) => (
                  <li key={o.href}>
                    <a href={o.href} target={o.href.startsWith("http") ? "_blank" : undefined} rel={o.rel || "noopener noreferrer"} className="text-primary hover:underline">
                      {o.label} {o.href.startsWith("http") && "↗"}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
