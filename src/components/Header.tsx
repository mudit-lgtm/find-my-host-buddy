import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container max-w-5xl mx-auto flex h-14 items-center px-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
          <Globe className="h-5 w-5 text-primary" />
          HostingChecker
        </Link>
      </div>
    </header>
  );
}
