import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResultCard } from "@/components/ResultCard";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { Server, MapPin, Globe, Activity, Mail, Shield } from "lucide-react";
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
        <section className="bg-gradient-to-b from-primary/5 to-background py-10">
          <div className="container max-w-5xl mx-auto px-4 flex flex-col items-center">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Hosting results for <span className="text-primary">{decodedDomain}</span>
            </h1>
            <SearchBar defaultValue={decodedDomain} />
          </div>
        </section>

        <section className="container max-w-5xl mx-auto px-4 py-10">
          {isLoading && <ResultsSkeleton />}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
              <p className="font-display font-semibold text-destructive">Lookup Failed</p>
              <p className="text-sm text-muted-foreground mt-1">{(error as Error).message}</p>
            </div>
          )}

          {data && (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Hosting Provider */}
              <ResultCard title="Hosting Provider" icon={Server}>
                <p className="text-2xl font-display font-bold text-foreground">{data.hostingProvider}</p>
                <p className="text-sm text-muted-foreground mt-1">IP: {data.ipAddress}</p>
              </ResultCard>

              {/* Server Location */}
              <ResultCard title="Server Location" icon={MapPin}>
                <p className="text-xl font-display font-semibold text-foreground">
                  {data.serverLocation.city}, {data.serverLocation.country}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ISP: {data.serverLocation.isp}
                </p>
                <p className="text-sm text-muted-foreground">
                  Org: {data.serverLocation.org}
                </p>
              </ResultCard>

              {/* Site Status */}
              <ResultCard title="Site Status" icon={Activity}>
                <div className="flex items-center gap-2">
                  <Badge variant={data.siteStatus.isUp ? "default" : "destructive"} className="text-sm">
                    {data.siteStatus.isUp ? "Online" : "Offline"}
                  </Badge>
                  {data.siteStatus.statusCode > 0 && (
                    <span className="text-sm text-muted-foreground">
                      HTTP {data.siteStatus.statusCode}
                    </span>
                  )}
                </div>
                {data.siteStatus.responseTime > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Response time: {data.siteStatus.responseTime}ms
                  </p>
                )}
              </ResultCard>

              {/* DNS Records */}
              <ResultCard title="DNS Records" icon={Globe}>
                <div className="space-y-3 text-sm">
                  {data.dns.ns.length > 0 && (
                    <div>
                      <p className="font-medium text-foreground mb-1">Nameservers</p>
                      {data.dns.ns.map((ns) => (
                        <p key={ns} className="text-muted-foreground font-mono text-xs">{ns}</p>
                      ))}
                    </div>
                  )}
                  {data.dns.a.length > 0 && (
                    <div>
                      <p className="font-medium text-foreground mb-1">A Records</p>
                      {data.dns.a.map((a) => (
                        <p key={a} className="text-muted-foreground font-mono text-xs">{a}</p>
                      ))}
                    </div>
                  )}
                  {data.dns.mx.length > 0 && (
                    <div>
                      <p className="font-medium text-foreground mb-1">MX Records</p>
                      {data.dns.mx.map((mx) => (
                        <p key={mx} className="text-muted-foreground font-mono text-xs">{mx}</p>
                      ))}
                    </div>
                  )}
                </div>
              </ResultCard>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
