import { ResultCard } from "@/components/ResultCard";
import { FileText } from "lucide-react";
import type { HostingResult } from "@/lib/types";

function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function WhoisSection({ data }: { data: HostingResult }) {
  const w = data.whois;
  if (!w || w.registrar === "Unknown" && !w.createdDate && !w.expiryDate) return null;

  return (
    <div className="animate-fade-in animate-fade-in-delay-6">
      <ResultCard title="WHOIS Information" icon={FileText} variant="hero">
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoRow label="Registrar" value={w.registrar} />
          <InfoRow label="Domain Age" value={w.domainAge || "N/A"} />
          <InfoRow label="Created" value={formatDate(w.createdDate)} />
          <InfoRow label="Expires" value={formatDate(w.expiryDate)} />
          <InfoRow label="Last Updated" value={formatDate(w.updatedDate)} />
          {w.registrant && <InfoRow label="Registrant" value={w.registrant} />}
        </div>
      </ResultCard>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-display font-semibold text-foreground truncate">{value}</span>
    </div>
  );
}
