import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { ResultCard } from "@/components/ResultCard";
import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Server, MapPin, Globe, Activity, ArrowRightLeft } from "lucide-react";
import type { HostingResult } from "@/lib/types";

async function fetchHostingData(domain: string): Promise<HostingResult> {
  const { data, error } = await supabase.functions.invoke("hosting-lookup", {
    body: { domain },
  });
  if (error) throw new Error(error.message || "Lookup failed");
  return data as HostingResult;
}

function extractDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, "");
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.split("?")[0];
  return cleaned;
}

function CompareRow({ label, valueA, valueB }: { label: string; valueA: string; valueB: string }) {
  const same = valueA === valueB;
  return (
    <div className="grid grid-cols-[1fr_2fr_2fr] gap-2 sm:gap-4 py-2 border-b border-border last:border-0 items-start">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1 min-w-0">
        <span className={`text-sm font-mono truncate ${same ? "text-muted-foreground" : "text-foreground font-semibold"}`}>{valueA || "—"}</span>
        {valueA && <CopyButton text={valueA} className="shrink-0 opacity-0 hover:opacity-100" />}
      </div>
      <div className="flex items-center gap-1 min-w-0">
        <span className={`text-sm font-mono truncate ${same ? "text-muted-foreground" : "text-foreground font-semibold"}`}>{valueB || "—"}</span>
        {valueB && <CopyButton text={valueB} className="shrink-0 opacity-0 hover:opacity-100" />}
      </div>
    </div>
  );
}

export default function Compare() {
  const [domainA, setDomainA] = useState("");
  const [domainB, setDomainB] = useState("");
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");

  const queryA = useQuery({
    queryKey: ["hosting", searchA],
    queryFn: () => fetchHostingData(searchA),
    enabled: !!searchA,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const queryB = useQuery({
    queryKey: ["hosting", searchB],
    queryFn: () => fetchHostingData(searchB),
    enabled: !!searchB,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    const a = extractDomain(domainA);
    const b = extractDomain(domainB);
    if (a) setSearchA(a);
    if (b) setSearchB(b);
  };

  const a = queryA.data;
  const b = queryB.data;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-10 sm:py-16">
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Compare <span className="text-primary">Domain Hosting</span>
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Enter two domains to compare their hosting providers, server locations, DNS records, and more side by side.
            </p>
            <form onSubmit={handleCompare} className="w-full max-w-3xl flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
              <Input
                placeholder="First domain (e.g. google.com)"
                value={domainA}
                onChange={(e) => setDomainA(e.target.value)}
                className="h-12 rounded-xl border-2 text-sm pl-4"
              />
              <Input
                placeholder="Second domain (e.g. github.com)"
                value={domainB}
                onChange={(e) => setDomainB(e.target.value)}
                className="h-12 rounded-xl border-2 text-sm pl-4"
              />
              <Button type="submit" size="lg" className="h-12 px-6 rounded-xl font-display font-semibold shrink-0">
                <Search className="h-4 w-4 mr-2" />
                Compare
              </Button>
            </form>
          </div>
        </section>

        <section className="container max-w-5xl mx-auto px-4 py-6 sm:py-10">
          {(queryA.isLoading || queryB.isLoading) && <ResultsSkeleton />}

          {(queryA.error || queryB.error) && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center mb-6">
              <p className="font-display font-semibold text-destructive">Lookup Failed</p>
              <p className="text-sm text-muted-foreground mt-1">
                {(queryA.error as Error)?.message || (queryB.error as Error)?.message}
              </p>
            </div>
          )}

          {a && b && (
            <div className="space-y-6">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_2fr_2fr] gap-2 sm:gap-4 pb-3 border-b-2 border-primary/20">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Field</span>
                <div className="flex items-center gap-2">
                  {a.favicon && <img src={a.favicon} alt="" className="h-5 w-5 rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                  <span className="font-display font-bold text-foreground text-sm truncate">{a.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  {b.favicon && <img src={b.favicon} alt="" className="h-5 w-5 rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                  <span className="font-display font-bold text-foreground text-sm truncate">{b.domain}</span>
                </div>
              </div>

              <CompareRow label="Hosting Provider" valueA={a.hostingProvider} valueB={b.hostingProvider} />
              <CompareRow label="IP Address" valueA={a.ipAddress} valueB={b.ipAddress} />
              <CompareRow label="Server Location" valueA={`${a.serverLocation.city}, ${a.serverLocation.country}`} valueB={`${b.serverLocation.city}, ${b.serverLocation.country}`} />
              <CompareRow label="ISP" valueA={a.serverLocation.isp} valueB={b.serverLocation.isp} />
              <CompareRow label="Status" valueA={a.siteStatus.isUp ? "Online" : "Offline"} valueB={b.siteStatus.isUp ? "Online" : "Offline"} />
              <CompareRow label="Response Time" valueA={`${a.siteStatus.responseTime}ms`} valueB={`${b.siteStatus.responseTime}ms`} />
              <CompareRow label="SSL Issuer" valueA={a.ssl?.issuer || "N/A"} valueB={b.ssl?.issuer || "N/A"} />
              <CompareRow label="Security Grade" valueA={a.securityGrade} valueB={b.securityGrade} />
              <CompareRow label="Performance Grade" valueA={a.performance?.grade || "N/A"} valueB={b.performance?.grade || "N/A"} />
              <CompareRow label="TTFB" valueA={`${a.performance?.ttfb || 0}ms`} valueB={`${b.performance?.ttfb || 0}ms`} />
              <CompareRow label="Email Provider" valueA={a.emailProvider} valueB={b.emailProvider} />
              <CompareRow label="Nameservers" valueA={a.dns.ns.join(", ")} valueB={b.dns.ns.join(", ")} />
              {(a.whois || b.whois) && (
                <>
                  <CompareRow label="Registrar" valueA={a.whois?.registrar || "N/A"} valueB={b.whois?.registrar || "N/A"} />
                  <CompareRow label="Domain Age" valueA={a.whois?.domainAge || "N/A"} valueB={b.whois?.domainAge || "N/A"} />
                </>
              )}

              {/* Recommendation */}
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
                <p className="text-sm text-muted-foreground mb-2">Looking for reliable hosting?</p>
                <a
                  href="https://www.hostinger.com/in?REFERRALCODE=YIIMADRASPUW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Try Hostinger — Fast & Affordable Hosting →
                </a>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
