import { Shield, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SecurityGradeGaugeProps {
  grade: string;
  headers: {
    hsts: boolean;
    xFrameOptions: boolean;
    csp: boolean;
    xContentType: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
  };
  ssl: { issuer: string; protocol: string };
}

const gradeColors: Record<string, string> = {
  "A+": "bg-green-500/15 text-green-700 border-green-500/30",
  A: "bg-green-500/15 text-green-700 border-green-500/30",
  B: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  C: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  D: "bg-orange-500/15 text-orange-700 border-orange-500/30",
  F: "bg-destructive/15 text-destructive border-destructive/30",
};

const headerLabels: Record<string, string> = {
  hsts: "Strict-Transport-Security",
  xFrameOptions: "X-Frame-Options",
  csp: "Content-Security-Policy",
  xContentType: "X-Content-Type-Options",
  referrerPolicy: "Referrer-Policy",
  permissionsPolicy: "Permissions-Policy",
};

export function SecurityGradeGauge({ grade, headers, ssl }: SecurityGradeGaugeProps) {
  const colorClass = gradeColors[grade] || gradeColors.F;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${colorClass}`}>
          <span className="text-2xl font-display font-black">{grade}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Security Grade</p>
          <p className="text-xs text-muted-foreground">
            {ssl.protocol !== "None" ? `${ssl.protocol} Secured` : "No SSL detected"}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        {Object.entries(headers).map(([key, present]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            {present ? (
              <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-destructive shrink-0" />
            )}
            <span className={`font-mono ${present ? "text-foreground" : "text-muted-foreground"}`}>
              {headerLabels[key] || key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
