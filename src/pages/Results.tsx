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

  const showHostingerCTA = data && (
    data.performance?.grade === "C" ||
    data.performance?.grade === "D" ||
    data.performance?.grade === "F" ||
    data.securityGrade === "C" ||
    data.securityGrade === "D" ||
    data.securityGrade === "F"
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Search header */}
        <section className="hero-gradient py-6 sm:py-10">
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
                Results for <span className="text-gradient">{decodedDomain}</span>
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

              {/* Hostinger recommendation */}
              {showHostingerCTA ? (
                <div className="rounded-xl border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 p-6 text-center">
                  <p className="font-display font-bold text-foreground text-lg mb-1">⚡ Upgrade Your Hosting</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your site's performance or security could be improved. Switch to a faster, more secure hosting provider.
                  </p>
                  <a
                    href="/go/hostinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-display font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  >
                    🚀 Try Hostinger — Fast & Affordable →
                  </a>
                </div>
              ) : (
                <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5 p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Looking for reliable hosting?</p>
                  <a
                    href="/go/hostinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Try Hostinger — Fast & Affordable Hosting →
                  </a>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}