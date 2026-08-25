import { Globe } from "lucide-react";
import { TOOL_ROUTES, GUIDE_ROUTES } from "@/lib/seo/keywordMap";

const toolLinks = [
  { label: "Host Checker", href: "/" },
  ...TOOL_ROUTES.map((r) => ({ label: r.h1.split(" — ")[0].replace(/\(.*\)/, "").trim(), href: r.path })),
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

// Max 3 resource links — no full guide/blog category dump.
const resourceLinks = GUIDE_ROUTES.slice(0, 3).map((r) => ({
  label: r.h1.split(" — ")[0].replace(/\(.*\)/, "").trim(),
  href: r.path,
}));

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="min-w-0">
      <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="block text-sm leading-snug text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-14">
        <div className="mb-10 max-w-md">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
              <Globe className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            <span className="text-gradient">Site Host Finder</span>
          </a>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Free host checker, DNS, WHOIS, SSL and CMS detection tools for developers, SEOs and
            agencies worldwide. No signup, unlimited lookups.
          </p>
        </div>

        <div className="grid gap-8 sm:gap-10 grid-cols-2 lg:grid-cols-4">
          <Column title="Tools" links={toolLinks} />
          <Column title="Company" links={companyLinks} />
          <Column title="Resources" links={resourceLinks} />
          <Column title="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Site Host Finder. All rights reserved.</p>
          <p>Free hosting, DNS &amp; WHOIS lookup tools — accurate worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
