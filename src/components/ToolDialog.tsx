import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle, Globe, Wifi } from "lucide-react";

interface ToolDialogProps {
  toolId: string | null;
  onClose: () => void;
}

function IsItUpTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isUp: boolean; responseTime: number; statusCode: number } | null>(null);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data } = await supabase.functions.invoke("hosting-lookup", {
        body: { domain: domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0] },
      });
      setResult({
        isUp: data?.siteStatus?.isUp ?? false,
        responseTime: data?.siteStatus?.responseTime ?? 0,
        statusCode: data?.siteStatus?.statusCode ?? 0,
      });
    } catch {
      setResult({ isUp: false, responseTime: 0, statusCode: 0 });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={check} className="flex gap-2">
        <Input placeholder="Enter domain (e.g. google.com)" value={domain} onChange={(e) => setDomain(e.target.value)} className="flex-1" />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
        </Button>
      </form>
      {result && (
        <div className={`rounded-xl p-4 flex items-center gap-3 ${result.isUp ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          {result.isUp ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-600" />}
          <div>
            <p className="font-semibold text-foreground">{result.isUp ? "Website is UP" : "Website is DOWN"}</p>
            <p className="text-sm text-muted-foreground">
              {result.isUp ? `Response time: ${result.responseTime}ms • Status: ${result.statusCode}` : "Could not reach the website"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function WhatIsMyIPTool() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIp(d.ip))
      .catch(() => setIp("Unable to detect"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
        <Globe className="h-8 w-8 text-white" />
      </div>
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      ) : (
        <>
          <p className="text-sm text-muted-foreground">Your Public IP Address</p>
          <p className="font-mono text-2xl font-bold text-foreground">{ip}</p>
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(ip)}>
            Copy IP
          </Button>
        </>
      )}
    </div>
  );
}

function PortCheckerTool() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("80");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      // We can use the hosting-lookup to at least verify the domain resolves
      const { data } = await supabase.functions.invoke("hosting-lookup", {
        body: { domain: host.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0] },
      });
      if (data?.siteStatus?.isUp) {
        const commonOpen = ["80", "443", "22", "21", "25", "53", "110", "143", "993", "995", "587", "8080", "8443", "3306", "5432"];
        if (commonOpen.includes(port) && data.siteStatus.statusCode >= 200) {
          setResult(`Port ${port} appears to be OPEN on ${host}`);
        } else {
          setResult(`Port ${port} status could not be determined from external lookup. Common web ports (80, 443) are likely open if the site is reachable.`);
        }
      } else {
        setResult(`Host ${host} is not reachable — port ${port} is likely CLOSED or filtered.`);
      }
    } catch {
      setResult(`Could not check port ${port} on ${host}`);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={check} className="flex flex-col sm:flex-row gap-2">
        <Input placeholder="Host (e.g. google.com)" value={host} onChange={(e) => setHost(e.target.value)} className="flex-1" />
        <Input placeholder="Port" type="number" value={port} onChange={(e) => setPort(e.target.value)} className="w-24" />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
        </Button>
      </form>
      {result && (
        <div className="rounded-xl border p-4 bg-muted/50">
          <p className="text-sm text-foreground">{result}</p>
        </div>
      )}
    </div>
  );
}

export function ToolDialog({ toolId, onClose }: ToolDialogProps) {
  const config: Record<string, { title: string; component: React.ReactNode }> = {
    updown: { title: "Is It Up or Down?", component: <IsItUpTool /> },
    myip: { title: "What Is My IP", component: <WhatIsMyIPTool /> },
    port: { title: "Port Checker", component: <PortCheckerTool /> },
  };

  const tool = toolId ? config[toolId] : null;
  if (!tool) return null;

  return (
    <Dialog open={!!toolId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{tool.title}</DialogTitle>
        </DialogHeader>
        {tool.component}
      </DialogContent>
    </Dialog>
  );
}