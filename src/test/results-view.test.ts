import { describe, it, expect } from "vitest";
import { normalizeView, visibleSections, VIEW_TITLES } from "@/lib/resultsView";

describe("results view routing", () => {
  it("normalizes unknown view to 'all'", () => {
    expect(normalizeView("garbage")).toBe("all");
    expect(normalizeView(null)).toBe("all");
    expect(normalizeView("")).toBe("all");
  });

  it("accepts every supported view", () => {
    for (const v of ["dns", "whois", "ssl", "headers", "ip", "tech", "all"] as const) {
      expect(normalizeView(v)).toBe(v);
    }
  });

  it("each tool view exposes a unique section combination", () => {
    const combos = new Set<string>();
    for (const v of ["dns", "whois", "ssl", "headers", "ip", "tech"] as const) {
      const s = visibleSections(v);
      const key = `${+s.overview}${+s.whois}${+s.security}${+s.dns}`;
      combos.add(key);
    }
    // dns+tech share, ssl+headers share → 4 distinct combos for 6 views.
    expect(combos.size).toBeGreaterThanOrEqual(4);
  });

  it("dns view shows only DNS section", () => {
    const s = visibleSections("dns");
    expect(s.dns).toBe(true);
    expect(s.whois).toBe(false);
    expect(s.security).toBe(false);
    expect(s.overview).toBe(false);
  });

  it("whois view shows only WHOIS section", () => {
    const s = visibleSections("whois");
    expect(s).toEqual({ overview: false, whois: true, security: false, dns: false });
  });

  it("ssl view shows only Security section (covers ssl+headers)", () => {
    const s = visibleSections("ssl");
    expect(s).toEqual({ overview: false, whois: false, security: true, dns: false });
  });

  it("headers view shares the security panel with ssl view", () => {
    expect(visibleSections("headers")).toEqual(visibleSections("ssl"));
  });

  it("ip view shows only Overview section", () => {
    const s = visibleSections("ip");
    expect(s).toEqual({ overview: true, whois: false, security: false, dns: false });
  });

  it("all view shows every section", () => {
    const s = visibleSections("all");
    expect(s).toEqual({ overview: true, whois: true, security: true, dns: true });
  });

  it("each view has a unique human title", () => {
    const titles = Object.values(VIEW_TITLES);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
