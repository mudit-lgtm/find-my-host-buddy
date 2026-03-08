import { Server, MapPin, Shield, Gauge } from "lucide-react";
import type { HostingResult } from "@/lib/types";

interface ResultsSummaryBannerProps {
  data: HostingResult;
}

const securityGradeColors: Record<string, string> = {
  "A+": "text-green-600",
  A: "text-green-600",
  B: "text-emerald-600",
  C: "text-yellow-600",
  D: "text-orange-600",
  F: "text-destructive",
};

const perfGradeColors: Record<string, string> = {
  Excellent: "text-green-600",
  Good: "text-emerald-600",
  Average: "text-yellow-600",
  Slow: "text-destructive",
};

export function ResultsSummaryBanner({ data }: ResultsSummaryBannerProps) {
  const secColor = securityGradeColors[data.securityGrade] || "text-foreground";
  const perfColor = perfGradeColors[data.performance.grade] || "text-foreground";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mx-auto animate-fade-in">
      <SummaryItem icon={Server} label="Provider" value={data.hostingProvider} />
      <SummaryItem icon={MapPin} label="Location" value={`${data.serverLocation.city}, ${data.serverLocation.country}`} />
      <SummaryItem icon={Shield} label="Security" value={data.securityGrade} valueClass={secColor} />
      <SummaryItem icon={Gauge} label="Speed" value={data.performance.grade} valueClass={perfColor} />
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value, valueClass = "" }: { icon: typeof Server; label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className={`text-xs sm:text-sm font-display font-bold truncate ${valueClass || "text-foreground"}`}>{value}</p>
      </div>
    </div>
  );
}
