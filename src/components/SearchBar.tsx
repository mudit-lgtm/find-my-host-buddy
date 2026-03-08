import { useState } from "react";
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

export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = extractDomain(query);
    if (domain) {
      navigate(`/results/${encodeURIComponent(domain)}`);
    }
  };

  const handleQuickCheck = (domain: string) => {
    navigate(`/results/${encodeURIComponent(domain)}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex w-full flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter a domain or URL (e.g. example.com)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 pr-4 text-base rounded-xl border-2 border-border bg-card shadow-sm focus-visible:ring-primary focus-visible:border-primary transition-colors"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-14 px-8 rounded-xl font-display font-semibold text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
        >
          Find Host
        </Button>
      </form>

      {/* Trust signals */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground">
        <span>✓ 100% Free</span>
        <span>✓ No Signup</span>
        <span>✓ Instant Results</span>
      </div>

      {/* Quick check buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <span className="text-xs text-muted-foreground mr-1 self-center">Try:</span>
        {quickDomains.map((domain) => (
          <button
            key={domain}
            type="button"
            onClick={() => handleQuickCheck(domain)}
            className="text-xs px-3 py-1.5 rounded-full border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {domain}
          </button>
        ))}
      </div>
    </div>
  );
}
