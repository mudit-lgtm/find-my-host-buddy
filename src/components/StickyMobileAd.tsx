import { useIsMobile } from "@/hooks/use-mobile";
import { AdsterraAd } from "./AdsterraAd";
import { useState } from "react";
import { X } from "lucide-react";

export function StickyMobileAd() {
  const isMobile = useIsMobile();
  const [closed, setClosed] = useState(false);

  if (!isMobile || closed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur border-t shadow-lg"
      style={{ height: 56 }}
    >
      <button
        onClick={() => setClosed(true)}
        className="absolute top-1 right-1 z-10 rounded-full bg-muted/80 p-1 text-muted-foreground hover:text-foreground"
        aria-label="Close ad"
      >
        <X className="h-3 w-3" />
      </button>
      <AdsterraAd adKey="f31040552d39b072bb19669f075b9e6c" width={320} height={50} />
    </div>
  );
}
