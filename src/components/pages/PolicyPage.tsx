import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import type { RouteContent } from "@/lib/seo/keywordMap";

export default function PolicyPage({ route }: { route: RouteContent }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SeoHead route={route} />
      <Header />
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{route.h1}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">{route.intro}</p>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: April 2026</p>

        {route.path === "/contact" && (
          <section className="mt-8 rounded-lg border bg-card p-6">
            <h2 className="font-display text-xl font-bold">Email us directly</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Every message goes to a monitored inbox and we reply within 24–48 hours.
            </p>
            <a
              href="mailto:contact@sitehostfinder.online?subject=Site%20Host%20Finder%20enquiry"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              contact@sitehostfinder.online
            </a>
          </section>
        )}



        <div className="mt-8 space-y-6">
          {route.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold mb-2">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {route.outbound.length > 0 && (
          <section className="mt-10 pt-6 border-t">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {route.outbound.map((o) => (
                <li key={o.href}>
                  <a href={o.href} target={o.href.startsWith("http") ? "_blank" : undefined} rel={o.rel || "noopener noreferrer"} className="text-primary hover:underline">
                    {o.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {route.related.length > 0 && (
          <section className="mt-8 pt-6 border-t">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">More</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {route.related.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="text-primary hover:underline">{r.label} →</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
