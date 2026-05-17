import { Globe, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { TOOL_ROUTES, GUIDE_ROUTES } from "@/lib/seo/keywordMap";

const toolLinks = TOOL_ROUTES.map((r) => ({ label: r.h1.split(" — ")[0], href: r.path }));
const guideLinks = GUIDE_ROUTES.map((r) => ({ label: r.h1, href: r.path }));

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <span className="text-gradient">Site Host Finder</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          <a href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Home</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1 outline-none">
              Tools <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 max-h-[70vh] overflow-y-auto">
              {toolLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a href={link.href}>{link.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1 outline-none">
              Learn <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {guideLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a href={link.href}>{link.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="/about" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">About</a>
          <a href="/contact" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Contact</a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetTitle className="font-display">Navigation</SheetTitle>
            <div className="mt-6 space-y-6">
              <div>
                <p className="px-3 text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tools</p>
                <nav className="flex flex-col gap-1">
                  {toolLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted">{link.label}</a>
                  ))}
                </nav>
              </div>
              <div>
                <p className="px-3 text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">Learn</p>
                <nav className="flex flex-col gap-1">
                  {guideLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted">{link.label}</a>
                  ))}
                </nav>
              </div>
              <div>
                <p className="px-3 text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2">Company</p>
                <nav className="flex flex-col gap-1">
                  <a href="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted">About</a>
                  <a href="/contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted">Contact</a>
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
