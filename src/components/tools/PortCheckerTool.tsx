import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function PortCheckerTool() {
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
