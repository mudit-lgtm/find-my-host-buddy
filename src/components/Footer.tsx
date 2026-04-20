import { Globe } from "lucide-react";

const toolLinks = [
  { label: "Hosting Checker", href: "/#hosting-checker" },
  { label: "DNS Lookup", href: "/#hosting-checker" },
  { label: "Is It Up or Down?", href: "/#tools" },
  { label: "What Is My IP", href: "/#tools" },
  { label: "Domain Compare", href: "/#compare" },
  { label: "Port Checker", href: "/#tools" },
];

const resourceLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Hosting Guide", href: "/#hosting-guide" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/#privacy-policy" },
  { label: "Terms of Service", href: "/#terms" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const externalLinks = [
  { label: "Hostinger — Best Hosting Deals", href: "/go/hostinger", rel: "nofollow sponsored noopener noreferrer" },
  { label: "ICANN — Domain Registration", href: "https://www.icann.org", rel: "noopener noreferrer" },
  { label: "Cloudflare — What is DNS?", href: "https://www.cloudflare.com/learning/dns/what-is-dns/", rel: "noopener noreferrer" },
  { label: "Google PageSpeed", href: "https://developers.google.com/speed/docs/insights/v5/about", rel: "noopener noreferrer" },
  { label: "Let's Encrypt — Free SSL", href: "https://letsencrypt.org/", rel: "noopener noreferrer" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 mt-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-display font-bold text-foreground mb-3">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
                <Globe className="h-3 w-3 text-white" />
              </div>
              <span className="text-gradient">Site Host Finder</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free hosting checker & DNS lookup tool.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Learn More</h3>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel={link.rel} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Site Host Finder. All rights reserved. Free website hosting checker & DNS lookup tool.</p>
        </div>
      </div>
    </footer>
  );
}