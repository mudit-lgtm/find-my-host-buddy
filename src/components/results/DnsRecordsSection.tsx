import { ResultCard } from "@/components/ResultCard";
import { CopyButton } from "@/components/CopyButton";
import { TechBadgeGroup } from "@/components/TechBadge";
import { Globe, Code2, Mail, Camera } from "lucide-react";
import type { HostingResult } from "@/lib/types";

function DnsBlock({ label, records }: { label: string; records: string[] }) {
  if (!records || records.length === 0) return null;
  return (
    <div>
      <p className="font-medium text-foreground mb-1 text-xs sm:text-sm">{label}</p>
      {records.map((r, i) => (
        <div key={`${r}-${i}`} className="flex items-center gap-1 group">
          <p className="text-muted-foreground font-mono text-xs truncate flex-1">{r}</p>
          <CopyButton text={r} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
}

export function DnsRecordsSection({ data }: { data: HostingResult }) {
  const allDnsText = [
    ...data.dns.ns.map(r => `NS: ${r}`),
    ...data.dns.a.map(r => `A: ${r}`),
    ...data.dns.aaaa.map(r => `AAAA: ${r}`),
    ...data.dns.cname.map(r => `CNAME: ${r}`),
    ...data.dns.mx.map(r => `MX: ${r}`),
    ...data.dns.txt.map(r => `TXT: ${r}`),
  ].join("\n");

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {/* Technologies */}
      <div className="md:col-span-2 animate-fade-in animate-fade-in-delay-6">
        <ResultCard title="Technologies Detected" icon={Code2}>
          <TechBadgeGroup technologies={data.technologies} />
        </ResultCard>
      </div>

      {/* Email Provider */}
      <div className="animate-fade-in animate-fade-in-delay-7">
        <ResultCard title="Email Provider" icon={Mail}>
          <div className="flex items-center gap-1.5">
            <p className="text-lg sm:text-xl font-display font-semibold text-foreground">{data.emailProvider}</p>
            <CopyButton text={data.emailProvider} />
          </div>
          {data.dns.mx.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-muted-foreground mb-1">MX Records</p>
              {data.dns.mx.map((mx, i) => (
                <div key={`${mx}-${i}`} className="flex items-center gap-1 group">
                  <p className="text-muted-foreground font-mono text-xs truncate flex-1">{mx}</p>
                  <CopyButton text={mx} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}
        </ResultCard>
      </div>

      {/* DNS Records — all types */}
      <div className="animate-fade-in animate-fade-in-delay-7">
        <ResultCard title="DNS Records" icon={Globe}>
          <div className="flex justify-end mb-1">
            <CopyButton text={allDnsText} className="opacity-70 hover:opacity-100" />
          </div>
          <div className="space-y-3 text-sm max-h-72 overflow-y-auto pr-1">
            <DnsBlock label="Nameservers (NS)" records={data.dns.ns} />
            <DnsBlock label="A Records (IPv4)" records={data.dns.a} />
            <DnsBlock label="AAAA Records (IPv6)" records={data.dns.aaaa} />
            <DnsBlock label="CNAME Records" records={data.dns.cname} />
            <DnsBlock label="TXT Records" records={data.dns.txt} />
          </div>
        </ResultCard>
      </div>

      {/* Screenshot */}
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
  );
}
