import { Globe } from "lucide-react";

const toolLinks = [
  { label: "Hosting Checker", href: "/#hosting-checker" },
  { label: "DNS Lookup", href: "#" },
  { label: "Is It Up or Down?", href: "#" },
  { label: "What Is My IP", href: "#" },
  { label: "Port Checker", href: "#" },
];

const resourceLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Hosting Guide", href: "/#hosting-guide" },
];

const externalLinks = [
  { label: "ICANN — Domain Registration", href: "https://www.icann.org", rel: "noopener noreferrer" },
  { label: "Cloudflare — What is DNS?", href: "https://www.cloudflare.com/learning/dns/what-is-dns/", rel: "noopener noreferrer" },
  { label: "W3Techs — Hosting Stats", href: "https://w3techs.com/technologies/overview/web_hosting", rel: "noopener noreferrer" },
  { label: "Google PageSpeed", href: "https://developers.google.com/speed/docs/insights/v5/about", rel: "noopener noreferrer" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 mt-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-foreground mb-3">
              <Globe className="h-4 w-4 text-primary" />
              HostingChecker
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free hosting lookup tool. Find out who hosts any website instantly.
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
          <p>© {new Date().getFullYear()} HostingChecker. All rights reserved. Free website hosting checker tool.</p>
        </div>
      </div>
    </footer>
  );
}
