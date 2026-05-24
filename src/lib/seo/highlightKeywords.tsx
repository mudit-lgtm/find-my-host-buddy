import React from "react";

/**
 * Wrap the first occurrence (case-insensitive) of each keyword in <strong>.
 * Keeps long content scannable without keyword-stuffing.
 */
export function highlightKeywords(text: string, keywords: string[] = []): React.ReactNode {
  if (!text || keywords.length === 0) return text;

  // Sort longest-first so "host checker" matches before "host".
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const used = new Set<string>();
  let remaining = text;
  const parts: React.ReactNode[] = [];
  let key = 0;

  while (remaining.length > 0) {
    let bestIdx = -1;
    let bestKw = "";
    for (const kw of sorted) {
      if (used.has(kw.toLowerCase())) continue;
      const idx = remaining.toLowerCase().indexOf(kw.toLowerCase());
      if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
        bestIdx = idx;
        bestKw = kw;
      }
    }
    if (bestIdx === -1) {
      parts.push(remaining);
      break;
    }
    if (bestIdx > 0) parts.push(remaining.slice(0, bestIdx));
    const matched = remaining.slice(bestIdx, bestIdx + bestKw.length);
    parts.push(
      <strong key={key++} className="font-semibold text-foreground">
        {matched}
      </strong>
    );
    used.add(bestKw.toLowerCase());
    remaining = remaining.slice(bestIdx + bestKw.length);
  }
  return <>{parts}</>;
}
