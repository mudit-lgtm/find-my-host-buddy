import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { invokeWithRetry } from "@/lib/invokeWithRetry";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export function IsItUpTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ isUp: boolean; responseTime: number; statusCode: number } | null>(null);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data } = await invokeWithRetry<{ siteStatus?: { isUp: boolean; responseTime: number; statusCode: number } }>(
        "hosting-lookup",
        { body: { domain: domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0] } },
      );
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
