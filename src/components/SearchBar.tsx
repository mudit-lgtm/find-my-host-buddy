import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function extractDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, "");
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.split("?")[0];
  return cleaned;
}

const quickDomains = ["google.com", "shopify.com", "github.com", "wordpress.com"];

interface SearchBarProps {
  defaultValue?: string;
  compact?: boolean;
  /** Optional results view filter — appended as ?view=… so each tool shows only its slice. */
  view?: "dns" | "whois" | "ssl" | "headers" | "ip" | "tech";
}

export function SearchBar({ defaultValue = "", compact = false, view }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const go = (domain: string) => {
    const qs = view ? `?view=${view}` : "";
    navigate(`/results/${encodeURIComponent(domain)}${qs}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = extractDomain(query);
    if (domain) go(domain);
  };

  const handleQuickCheck = (domain: string) => go(domain);


  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex w-full flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={compact ? "Try another domain…" : "Enter a domain or URL (e.g. example.com)"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${compact ? "h-11 text-sm pl-10" : "h-12 sm:h-14 text-sm sm:text-base pl-11 sm:pl-12"} pr-4 rounded-xl border-2 border-border bg-card shadow-sm focus-visible:ring-primary focus-visible:border-primary transition-colors`}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className={`${compact ? "h-11 px-5 text-sm" : "h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base"} rounded-xl font-display font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto`}
        >
          Find Host
        </Button>
      </form>

      {!compact && (
        <>
          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            <span>✓ 100% Free</span>
            <span>✓ No Signup</span>
            <span>✓ Instant Results</span>
          </div>

          {/* Quick check buttons */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            <span className="text-xs text-muted-foreground mr-1 self-center">Try:</span>
            {quickDomains.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => handleQuickCheck(domain)}
                className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {domain}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
