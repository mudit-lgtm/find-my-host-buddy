import { ResultCard } from "@/components/ResultCard";
import { PerformanceGauge } from "@/components/PerformanceGauge";
import { SecurityGradeGauge } from "@/components/SecurityGradeGauge";
import { Gauge, Shield } from "lucide-react";
import type { HostingResult } from "@/lib/types";

export function SecurityPerformanceSection({ data }: { data: HostingResult }) {
  return (
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
  );
}
