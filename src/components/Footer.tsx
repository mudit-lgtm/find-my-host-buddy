import { Globe } from "lucide-react";
import { TOOL_ROUTES, GUIDE_ROUTES } from "@/lib/seo/keywordMap";

const toolLinks = TOOL_ROUTES.map((r) => ({ label: r.h1.split(" — ")[0], href: r.path }));
const guideLinks = GUIDE_ROUTES.map((r) => ({ label: r.h1.split(" — ")[0].replace(/\(.*\)/, "").trim(), href: r.path }));

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const externalLinks = [
  { label: "Hostinger — Hosting Deals", href: "/go/hostinger", rel: "nofollow sponsored noopener noreferrer" },
  { label: "ICANN — Domain Registration", href: "https://www.icann.org", rel: "noopener noreferrer" },
  { label: "Cloudflare — What is DNS?", href: "https://www.cloudflare.com/learning/dns/what-is-dns/", rel: "noopener noreferrer" },
  { label: "Let's Encrypt — Free SSL", href: "https://letsencrypt.org/", rel: "noopener noreferrer" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string; rel?: string }[] }) {
  return (
    <div>
      <h3 className="font-display font-semibold text-foreground mb-3 text-sm">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.rel}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}{l.href.startsWith("http") ? " ↗" : ""}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 mt-auto">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-display font-bold text-foreground mb-3">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
                <Globe className="h-3 w-3 text-white" />
              </div>
              <span className="text-gradient">Site Host Finder</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free hosting checker, DNS lookup, and web tools — no signup, no limits.
            </p>
          </div>

          <Column title="Tools" links={toolLinks} />
          <Column title="Learn" links={guideLinks} />
          <Column title="Company" links={companyLinks} />
          <Column title="Legal" links={policyLinks} />
          <Column title="Resources" links={externalLinks} />
        </div>

        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Site Host Finder. All rights reserved. Free hosting checker & DNS lookup.</p>
        </div>
      </div>
    </footer>
  );
}
