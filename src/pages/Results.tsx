import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResultCard } from "@/components/ResultCard";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { ResultsSummaryBanner } from "@/components/ResultsSummaryBanner";
import { SecurityGradeGauge } from "@/components/SecurityGradeGauge";
import { PerformanceGauge } from "@/components/PerformanceGauge";
import { TechBadgeGroup } from "@/components/TechBadge";
import { ShareResults } from "@/components/ShareResults";
import { Server, MapPin, Globe, Activity, Shield, Gauge, Code2, Mail, Camera } from "lucide-react";
import type { HostingResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

async function fetchHostingData(domain: string): Promise<HostingResult> {
  const { data, error } = await supabase.functions.invoke("hosting-lookup", {
    body: { domain },
  });
  if (error) throw new Error(error.message || "Lookup failed");
  return data as HostingResult;
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
            {/* Domain title */}
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

            {/* Compact search */}
            <div className="w-full flex justify-center">
              <SearchBar defaultValue={decodedDomain} compact />
            </div>

            {/* Share buttons */}
            {data && (
              <div className="flex justify-center">
                <ShareResults data={data} />
              </div>
            )}

            {/* Summary banner */}
            {data && <ResultsSummaryBanner data={data} />}
          </div>
        </section>

        {/* Results grid */}
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
              {/* Overview */}
              <div>
                <SectionLabel>Overview</SectionLabel>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <div className="md:col-span-2 animate-fade-in animate-fade-in-delay-1">
                    <ResultCard title="Hosting Provider" icon={Server} variant="hero">
                      <p className="text-xl sm:text-2xl font-display font-bold text-foreground">{data.hostingProvider}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">IP: {data.ipAddress}</p>
                    </ResultCard>
                  </div>
                  <div className="animate-fade-in animate-fade-in-delay-2">
                    <ResultCard title="Server Location" icon={MapPin}>
                      <p className="text-lg sm:text-xl font-display font-semibold text-foreground">
                        {data.serverLocation.city}, {data.serverLocation.country}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">ISP: {data.serverLocation.isp}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Org: {data.serverLocation.org}</p>
                    </ResultCard>
                  </div>
                  <div className="animate-fade-in animate-fade-in-delay-3">
                    <ResultCard title="Site Status" icon={Activity}>
                      <div className="flex items-center gap-2">
                        <Badge variant={data.siteStatus.isUp ? "default" : "destructive"} className="text-xs sm:text-sm">
                          {data.siteStatus.isUp ? "Online" : "Offline"}
                        </Badge>
                        {data.siteStatus.statusCode > 0 && (
                          <span className="text-xs sm:text-sm text-muted-foreground">HTTP {data.siteStatus.statusCode}</span>
                        )}
                      </div>
                      {data.siteStatus.responseTime > 0 && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                          Response time: {data.siteStatus.responseTime}ms
                        </p>
                      )}
                    </ResultCard>
                  </div>
                </div>
              </div>

              {/* Security & Performance */}
              <div>
                <SectionLabel>Security & Performance</SectionLabel>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <div className="animate-fade-in animate-fade-in-delay-4">
                    <ResultCard title="Performance" icon={Gauge} accentColor="bg-emerald-500">
                      <PerformanceGauge
                        ttfb={data.performance.ttfb}
                        grade={data.performance.grade}
                        contentLength={data.performance.contentLength}
                      />
                    </ResultCard>
                  </div>
                  <div className="animate-fade-in animate-fade-in-delay-5">
                    <ResultCard title="Security Analysis" icon={Shield} accentColor="bg-primary">
                      <SecurityGradeGauge
                        grade={data.securityGrade}
                        headers={data.securityHeaders}
                        ssl={data.ssl}
                      />
                    </ResultCard>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <SectionLabel>Technical Details</SectionLabel>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <div className="md:col-span-2 animate-fade-in animate-fade-in-delay-6">
                    <ResultCard title="Technologies Detected" icon={Code2}>
                      <TechBadgeGroup technologies={data.technologies} />
                    </ResultCard>
                  </div>
                  <div className="animate-fade-in animate-fade-in-delay-7">
                    <ResultCard title="Email Provider" icon={Mail}>
                      <p className="text-lg sm:text-xl font-display font-semibold text-foreground">{data.emailProvider}</p>
                      {data.dns.mx.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-muted-foreground mb-1">MX Records</p>
                          {data.dns.mx.map((mx) => (
                            <p key={mx} className="text-muted-foreground font-mono text-xs truncate">{mx}</p>
                          ))}
                        </div>
                      )}
                    </ResultCard>
                  </div>
                  <div className="animate-fade-in animate-fade-in-delay-7">
                    <ResultCard title="DNS Records" icon={Globe}>
                      <div className="space-y-3 text-sm">
                        {data.dns.ns.length > 0 && (
                          <div>
                            <p className="font-medium text-foreground mb-1 text-xs sm:text-sm">Nameservers</p>
                            {data.dns.ns.map((ns) => (
                              <p key={ns} className="text-muted-foreground font-mono text-xs truncate">{ns}</p>
                            ))}
                          </div>
                        )}
                        {data.dns.a.length > 0 && (
                          <div>
                            <p className="font-medium text-foreground mb-1 text-xs sm:text-sm">A Records</p>
                            {data.dns.a.map((a) => (
                              <p key={a} className="text-muted-foreground font-mono text-xs">{a}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </ResultCard>
                  </div>
                  <div className="md:col-span-2 animate-fade-in animate-fade-in-delay-8">
                    <ResultCard title="Site Preview" icon={Camera}>
                      <div className="rounded-lg overflow-hidden border border-border bg-muted max-h-64 sm:max-h-80">
                        <img
                          src={data.screenshot}
                          alt={`Screenshot of ${data.domain}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <a
                        href={`https://${data.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-2 inline-block"
                      >
                        Visit site →
                      </a>
                    </ResultCard>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-3 sm:mb-4 pl-1">
      {children}
    </p>
  );
}
