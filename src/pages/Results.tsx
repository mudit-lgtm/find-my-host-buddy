import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { ResultsSummaryBanner } from "@/components/ResultsSummaryBanner";
import { ShareResults } from "@/components/ShareResults";
import { OverviewSection } from "@/components/results/OverviewSection";
import { SecurityPerformanceSection } from "@/components/results/SecurityPerformanceSection";
import { WhoisSection } from "@/components/results/WhoisSection";
import { DnsRecordsSection } from "@/components/results/DnsRecordsSection";
import type { HostingResult } from "@/lib/types";

async function fetchHostingData(domain: string): Promise<HostingResult> {
  const { data, error } = await supabase.functions.invoke("hosting-lookup", {
    body: { domain },
  });
  if (error) throw new Error(error.message || "Lookup failed");
  return data as HostingResult;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-3 sm:mb-4 pl-1">
      {children}
    </p>
  );
}

export default function Results() {
  const { domain } = useParams<{ domain: string }>();
  const decodedDomain = decodeURIComponent(domain || "");

  const { data, isLoading, error } = useQuery({
    queryKey: ["hosting", decodedDomain],
    queryFn: () => fetchHostingData(decodedDomain),
    enabled: !!decodedDomain,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Search header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-6 sm:py-10">
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {data?.favicon && (
                <img
                  src={data.favicon}
                  alt={`${decodedDomain} favicon`}
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )}
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Results for <span className="text-primary">{decodedDomain}</span>
              </h1>
            </div>
            <div className="w-full flex justify-center">
              <SearchBar defaultValue={decodedDomain} compact />
            </div>
            {data && (
              <div className="flex justify-center">
                <ShareResults data={data} />
              </div>
            )}
            {data && <ResultsSummaryBanner data={data} />}
          </div>
        </section>

        {/* Results */}
        <section className="container max-w-5xl mx-auto px-4 py-6 sm:py-10">
          {isLoading && <ResultsSkeleton />}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
              <p className="font-display font-semibold text-destructive">Lookup Failed</p>
              <p className="text-sm text-muted-foreground mt-1">{(error as Error).message}</p>
            </div>
          )}

          {data && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <SectionLabel>Overview</SectionLabel>
                <OverviewSection data={data} />
              </div>

              {data.whois && (
                <div>
                  <SectionLabel>Domain Registration (WHOIS)</SectionLabel>
                  <WhoisSection data={data} />
                </div>
              )}

              <div>
                <SectionLabel>Security & Performance</SectionLabel>
                <SecurityPerformanceSection data={data} />
              </div>

              <div>
                <SectionLabel>Technical Details</SectionLabel>
                <DnsRecordsSection data={data} />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
