import { Globe } from "lucide-react";
import { TOOL_ROUTES, GUIDE_ROUTES } from "@/lib/seo/keywordMap";

const toolLinks = TOOL_ROUTES.map((r) => ({ label: r.h1.split(" — ")[0], href: r.path }));
const guideLinks = GUIDE_ROUTES.map((r) => ({ label: r.h1.split(" — ")[0].replace(/\(.*\)/, "").trim(), href: r.path }));

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string; rel?: string }[] }) {
  return (
    <div>
      <h3 className="font-display font-semibold text-foreground mb-3 text-sm">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} rel={l.rel} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Tools" links={toolLinks} />
          <Column title="Learn" links={guideLinks} />
          <Column title="Company" links={companyLinks} />
          <Column title="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-bold text-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
              <Globe className="h-3 w-3 text-white" />
            </div>
            <span className="text-gradient">Site Host Finder</span>
          </div>
          <p>
            © {new Date().getFullYear()} · Free host checker, DNS &amp; WHOIS tools ·{" "}
            <a href="/go/hostinger" rel="nofollow sponsored noopener noreferrer" className="text-primary hover:underline">
              Sponsored by Hostinger
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
