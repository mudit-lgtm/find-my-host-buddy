import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Globe } from "lucide-react";

export function WhatIsMyIPTool() {
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
