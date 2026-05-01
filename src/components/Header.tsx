import { Globe, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const toolLinks = [
  { label: "Hosting Checker", href: "/#hosting-checker" },
  { label: "DNS Lookup", href: "/#dns-lookup" },
  { label: "Website Down Checker", href: "/#website-down-checker" },
  { label: "IP Checker", href: "/#ip-checker" },
  { label: "Port Checker", href: "/#port-checker" },
  { label: "Domain Compare", href: "/#compare" },
];

const mainLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Guide", href: "/#hosting-guide" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <span className="text-gradient">Site Host Finder</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1 outline-none">
              Tools <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {toolLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a href={link.href}>{link.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {mainLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 overflow-y-auto">
            <SheetTitle className="font-display">Navigation</SheetTitle>
            <div className="mt-6">
              <p className="px-3 text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tools</p>
              <nav className="flex flex-col gap-1 mb-4">
                {toolLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <p className="px-3 text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">Resources</p>
              <nav className="flex flex-col gap-1">
                {mainLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
