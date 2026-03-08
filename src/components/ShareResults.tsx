import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Check } from "lucide-react";
import type { HostingResult } from "@/lib/types";
import { toast } from "sonner";

interface ShareResultsProps {
  data: HostingResult;
}

export function ShareResults({ data }: ShareResultsProps) {
  const [copied, setCopied] = useState<"link" | "text" | null>(null);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied("link");
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyText = async () => {
    const text = [
      `🔍 Hosting Report: ${data.domain}`,
      ``,
      `🏢 Provider: ${data.hostingProvider}`,
      `📍 Location: ${data.serverLocation.city}, ${data.serverLocation.country}`,
      `🌐 IP: ${data.ipAddress}`,
      `${data.siteStatus.isUp ? "✅" : "❌"} Status: ${data.siteStatus.isUp ? "Online" : "Offline"} (HTTP ${data.siteStatus.statusCode})`,
      `⚡ TTFB: ${data.performance.ttfb}ms (${data.performance.grade})`,
      `🔒 Security: Grade ${data.securityGrade}`,
      `📧 Email: ${data.emailProvider}`,
      data.technologies.cms.length ? `🛠 CMS: ${data.technologies.cms.join(", ")}` : "",
      data.technologies.frameworks.length ? `⚛️ Frameworks: ${data.technologies.frameworks.join(", ")}` : "",
      data.technologies.cdn.length ? `🌍 CDN: ${data.technologies.cdn.join(", ")}` : "",
    ].filter(Boolean).join("\n");

    await navigator.clipboard.writeText(text);
    setCopied("text");
    toast.success("Report copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5">
        {copied === "link" ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        Share Link
      </Button>
      <Button variant="outline" size="sm" onClick={copyText} className="gap-1.5">
        {copied === "text" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        Copy Report
      </Button>
    </div>
  );
}
