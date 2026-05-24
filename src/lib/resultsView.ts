// Pure helpers for /results/:domain?view=… so the view-based filter logic is
// unit-testable without rendering React or hitting Supabase.

export type ViewKind = "dns" | "whois" | "ssl" | "headers" | "ip" | "tech" | "all";

export const VALID_VIEWS: ViewKind[] = ["dns", "whois", "ssl", "headers", "ip", "tech", "all"];

export const VIEW_TITLES: Record<ViewKind, string> = {
  dns: "DNS Records",
  whois: "WHOIS Registration",
  ssl: "SSL / TLS Certificate",
  headers: "HTTP & Security Headers",
  ip: "IP & Reverse Hosting",
  tech: "Detected Technologies & CMS",
  all: "Full Hosting Report",
};

export function normalizeView(raw: string | null | undefined): ViewKind {
  const v = (raw || "all").toLowerCase() as ViewKind;
  return VALID_VIEWS.includes(v) ? v : "all";
}

export interface VisibleSections {
  overview: boolean;
  whois: boolean;
  security: boolean;
  dns: boolean;
}

export function visibleSections(view: ViewKind): VisibleSections {
  const showAll = view === "all";
  return {
    overview: showAll || view === "ip",
    whois: showAll || view === "whois",
    security: showAll || view === "ssl" || view === "headers",
    dns: showAll || view === "dns" || view === "tech",
  };
}
