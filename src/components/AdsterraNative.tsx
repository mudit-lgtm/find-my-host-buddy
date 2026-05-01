import { useEffect, useRef } from "react";

const NATIVE_KEY = "5bad8e8d639144b657db95197f18a925";

/**
 * Adsterra native banner. Only one instance per page.
 */
export function AdsterraNative({ className }: { className?: string }) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `https://maddenwiped.com/${NATIVE_KEY}/invoke.js`;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div id={`container-${NATIVE_KEY}`} />
    </div>
  );
}
