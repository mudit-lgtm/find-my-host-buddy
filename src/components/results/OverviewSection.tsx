import { ResultCard } from "@/components/ResultCard";
import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Server, MapPin, Activity } from "lucide-react";
import type { HostingResult } from "@/lib/types";

export function OverviewSection({ data }: { data: HostingResult }) {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <div className="md:col-span-2 animate-fade-in animate-fade-in-delay-1">
        <ResultCard title="Hosting Provider" icon={Server} variant="hero">
          <p className="text-xl sm:text-2xl font-display font-bold text-foreground">{data.hostingProvider}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-xs sm:text-sm text-muted-foreground">IP: {data.ipAddress}</p>
            <CopyButton text={data.ipAddress} />
          </div>
        </ResultCard>
      </div>
      <div className="animate-fade-in animate-fade-in-delay-2">
        <ResultCard title="Server Location" icon={MapPin}>
          <p className="text-lg sm:text-xl font-display font-semibold text-foreground">
            {data.serverLocation.city}, {data.serverLocation.country}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-xs sm:text-sm text-muted-foreground">ISP: {data.serverLocation.isp}</p>
            <CopyButton text={data.serverLocation.isp} />
          </div>
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
  );
}
