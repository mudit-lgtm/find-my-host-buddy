interface PerformanceGaugeProps {
  ttfb: number;
  grade: string;
  contentLength: number;
}

const gradeConfig: Record<string, { color: string; bg: string; border: string }> = {
  Excellent: { color: "text-green-600", bg: "bg-green-500", border: "border-green-500" },
  Good: { color: "text-emerald-600", bg: "bg-emerald-500", border: "border-emerald-500" },
  Average: { color: "text-yellow-600", bg: "bg-yellow-500", border: "border-yellow-500" },
  Slow: { color: "text-destructive", bg: "bg-destructive", border: "border-destructive" },
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "Unknown";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function PerformanceGauge({ ttfb, grade, contentLength }: PerformanceGaugeProps) {
  const config = gradeConfig[grade] || gradeConfig.Slow;
  const score = Math.max(0, Math.min(100, Math.round(100 - (ttfb / 20))));
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4 sm:gap-5">
      {/* Circular gauge - responsive */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-muted" />
          <circle
            cx="50" cy="50" r="40" fill="none" strokeWidth="8"
            strokeLinecap="round"
            className={config.bg.replace("bg-", "stroke-")}
            style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset, transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-base sm:text-lg font-display font-black ${config.color}`}>{score}</span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <div>
          <span className={`text-sm font-semibold ${config.color}`}>{grade}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          TTFB: <span className="font-mono font-medium text-foreground">{ttfb}ms</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Page size: <span className="font-mono font-medium text-foreground">{formatBytes(contentLength)}</span>
        </p>
      </div>
    </div>
  );
}
