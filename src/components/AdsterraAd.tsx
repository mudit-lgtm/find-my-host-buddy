import { useEffect, useRef } from "react";

interface AdsterraAdProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Renders an Adsterra iframe ad using their atOptions + invoke.js pattern.
 * Each instance creates an isolated container so multiple ads can coexist.
 */
export function AdsterraAd({ adKey, width, height, className }: AdsterraAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    const container = containerRef.current;
    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `
      atOptions = {
        'key': '${adKey}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://maddenwiped.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    container.appendChild(optionsScript);
    container.appendChild(invokeScript);
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, maxWidth: "100%", overflow: "hidden", margin: "0 auto" }}
      aria-hidden="true"
    />
  );
}
