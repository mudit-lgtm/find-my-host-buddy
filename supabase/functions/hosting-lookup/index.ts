import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const HOSTING_PROVIDERS: Record<string, string[]> = {
  "Amazon Web Services (AWS)": ["awsdns", "amazonaws", "aws", "ec2", "cloudfront"],
  "Google Cloud": ["googledomains", "google.com", "googleusercontent", "ghs.google"],
  Cloudflare: ["cloudflare", "ns.cloudflare"],
  GoDaddy: ["godaddy", "domaincontrol", "secureserver"],
  Namecheap: ["namecheap", "registrar-servers"],
  DigitalOcean: ["digitalocean"],
  Hetzner: ["hetzner"],
  OVH: ["ovh.net", "ovh.com"],
  Bluehost: ["bluehost"],
  HostGator: ["hostgator"],
  SiteGround: ["siteground", "sgvps"],
  DreamHost: ["dreamhost"],
  "Linode / Akamai": ["linode", "akamai"],
  Vercel: ["vercel", "vercel-dns"],
  Netlify: ["netlify"],
  Shopify: ["shopify", "myshopify"],
  "WP Engine": ["wpengine"],
  Squarespace: ["squarespace"],
  Wix: ["wixdns", "wix.com"],
  Fastly: ["fastly"],
  "Microsoft Azure": ["azure", "microsoft", "msft"],
  Rackspace: ["rackspace"],
  Hostinger: ["hostinger"],
  "A2 Hosting": ["a2hosting"],
  "InMotion Hosting": ["inmotionhosting"],
  "Fly.io": ["fly.io", "fly.dev"],
  Railway: ["railway.app"],
  Render: ["render.com", "onrender"],
  Heroku: ["heroku", "herokuapp"],
  Kinsta: ["kinsta"],
  Vultr: ["vultr"],
  Contabo: ["contabo"],
  Ionos: ["ionos", "1and1"],
  Strato: ["strato"],
  "Liquid Web": ["liquidweb"],
  "Scala Hosting": ["scalahosting"],
};

function identifyProvider(nsRecords: string[], org: string, isp: string): string {
  const text = [...nsRecords, org, isp].join(" ").toLowerCase();
  for (const [provider, ids] of Object.entries(HOSTING_PROVIDERS)) {
    for (const id of ids) {
      if (text.includes(id.toLowerCase())) return provider;
    }
  }
  return org || isp || "Unknown Provider";
}

async function resolveDNS(domain: string, type: string): Promise<string[]> {
  try {
    const resp = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
    const json = await resp.json();
    if (json.Answer) {
      return json.Answer.map((a: { data: string }) => a.data);
    }
    return [];
  } catch {
    return [];
  }
}

// WHOIS lookup via RDAP
async function fetchWhois(domain: string): Promise<{
  registrar: string;
  createdDate: string;
  expiryDate: string;
  updatedDate: string;
  domainAge: string;
  registrant: string;
}> {
  const defaults = { registrar: "Unknown", createdDate: "", expiryDate: "", updatedDate: "", domainAge: "", registrant: "" };
  try {
    const resp = await fetch(`https://rdap.org/domain/${domain}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) { await resp.text(); return defaults; }
    const data = await resp.json();

    let registrar = "Unknown";
    if (data.entities) {
      for (const entity of data.entities) {
        if (entity.roles?.includes("registrar")) {
          registrar = entity.vcardArray?.[1]?.find((v: string[]) => v[0] === "fn")?.[3]
            || entity.handle || "Unknown";
        }
      }
    }

    let createdDate = "", expiryDate = "", updatedDate = "";
    if (data.events) {
      for (const evt of data.events) {
        if (evt.eventAction === "registration") createdDate = evt.eventDate || "";
        if (evt.eventAction === "expiration") expiryDate = evt.eventDate || "";
        if (evt.eventAction === "last changed") updatedDate = evt.eventDate || "";
      }
    }

    let domainAge = "";
    if (createdDate) {
      const created = new Date(createdDate);
      const now = new Date();
      const years = Math.floor((now.getTime() - created.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      const months = Math.floor(((now.getTime() - created.getTime()) % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
      domainAge = years > 0 ? `${years} years, ${months} months` : `${months} months`;
    }

    let registrant = "";
    if (data.entities) {
      for (const entity of data.entities) {
        if (entity.roles?.includes("registrant")) {
          registrant = entity.vcardArray?.[1]?.find((v: string[]) => v[0] === "fn")?.[3] || "";
        }
      }
    }

    return { registrar, createdDate, expiryDate, updatedDate, domainAge, registrant };
  } catch {
    return defaults;
  }
}

function identifyEmailProvider(mxRecords: string[]): string {
  const mx = mxRecords.join(" ").toLowerCase();
  if (mx.includes("google") || mx.includes("googlemail")) return "Google Workspace";
  if (mx.includes("outlook") || mx.includes("protection.outlook") || mx.includes("microsoft")) return "Microsoft 365";
  if (mx.includes("zoho")) return "Zoho Mail";
  if (mx.includes("protonmail") || mx.includes("proton")) return "ProtonMail";
  if (mx.includes("mimecast")) return "Mimecast";
  if (mx.includes("barracuda")) return "Barracuda";
  if (mx.includes("pphosted") || mx.includes("proofpoint")) return "Proofpoint";
  if (mx.includes("secureserver") || mx.includes("godaddy")) return "GoDaddy Email";
  if (mx.includes("hostinger")) return "Hostinger Email";
  if (mx.includes("ovh")) return "OVH Email";
  if (mx.includes("yahoo")) return "Yahoo Mail";
  if (mx.includes("icloud") || mx.includes("apple")) return "iCloud Mail";
  if (mxRecords.length > 0) return "Custom/Self-hosted";
  return "No email configured";
}

interface TechResult {
  cms: string[];
  frameworks: string[];
  cdn: string[];
  analytics: string[];
  server: string[];
  javascript: string[];
}

function detectTechnologies(headers: Record<string, string>, body: string): TechResult {
  const tech: TechResult = { cms: [], frameworks: [], cdn: [], analytics: [], server: [], javascript: [] };
  const h = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v.toLowerCase()]));
  const b = body.toLowerCase();

  if (h["server"]) {
    const s = h["server"];
    if (s.includes("nginx")) tech.server.push("Nginx");
    else if (s.includes("apache")) tech.server.push("Apache");
    else if (s.includes("litespeed")) tech.server.push("LiteSpeed");
    else if (s.includes("cloudflare")) tech.server.push("Cloudflare");
    else if (s.includes("microsoft") || s.includes("iis")) tech.server.push("Microsoft IIS");
    else tech.server.push(h["server"]);
  }
  if (h["x-powered-by"]) {
    const xp = h["x-powered-by"];
    if (xp.includes("php")) tech.server.push("PHP");
    if (xp.includes("express")) tech.server.push("Express.js");
    if (xp.includes("asp.net")) tech.server.push("ASP.NET");
    if (xp.includes("next.js")) tech.frameworks.push("Next.js");
  }

  if (b.includes("wp-content") || b.includes("wp-includes") || b.includes("wordpress")) tech.cms.push("WordPress");
  if (b.includes("cdn.shopify") || b.includes("shopify.com") || b.includes("myshopify")) tech.cms.push("Shopify");
  if (b.includes("squarespace")) tech.cms.push("Squarespace");
  if (b.includes("wix.com") || b.includes("wixstatic")) tech.cms.push("Wix");
  if (b.includes("webflow")) tech.cms.push("Webflow");
  if (b.includes("drupal")) tech.cms.push("Drupal");
  if (b.includes("joomla")) tech.cms.push("Joomla");
  if (b.includes("ghost.io") || b.includes("ghost-")) tech.cms.push("Ghost");
  if (b.includes('content="hugo"') || b.includes("gohugo")) tech.cms.push("Hugo");
  if (b.includes("contentful")) tech.cms.push("Contentful");

  if (b.includes("__next_data__") || b.includes("/_next/")) tech.frameworks.push("Next.js");
  if (b.includes("__nuxt") || b.includes("/_nuxt/")) tech.frameworks.push("Nuxt.js");
  if ((b.includes("react") && b.includes("reactdom")) || b.includes("_reactroot") || b.includes("__react")) tech.frameworks.push("React");
  if (b.includes("ng-version") || b.includes("ng-app") || b.includes("angular")) tech.frameworks.push("Angular");
  if (b.includes("__svelte") || b.includes("svelte")) tech.frameworks.push("Svelte");
  if (b.includes("gatsby")) tech.frameworks.push("Gatsby");
  if (b.includes("vue") && (b.includes("__vue") || b.includes("vue.js") || b.includes("vue@"))) tech.frameworks.push("Vue.js");
  if (b.includes("remix") && b.includes("__remix")) tech.frameworks.push("Remix");
  if (b.includes("astro")) tech.frameworks.push("Astro");

  if (h["cf-ray"] || h["cf-cache-status"]) tech.cdn.push("Cloudflare");
  if (h["x-amz-cf-id"] || h["x-amz-cf-pop"]) tech.cdn.push("AWS CloudFront");
  if (h["x-fastly-request-id"] || h["via"]?.includes("fastly")) tech.cdn.push("Fastly");
  if (h["x-served-by"]?.includes("cache")) tech.cdn.push("Varnish Cache");
  if (h["x-cdn"]?.includes("akamai") || h["x-akamai-transformed"]) tech.cdn.push("Akamai");
  if (b.includes("cdn.jsdelivr")) tech.cdn.push("jsDelivr");
  if (b.includes("cdnjs.cloudflare")) tech.cdn.push("cdnjs");
  if (b.includes("unpkg.com")) tech.cdn.push("unpkg");

  if (b.includes("gtag") || b.includes("google-analytics") || b.includes("ga.js") || b.includes("analytics.js") || b.includes("googletagmanager")) tech.analytics.push("Google Analytics");
  if (b.includes("fbq(") || b.includes("facebook.net/en_US/fbevents") || b.includes("connect.facebook.net")) tech.analytics.push("Facebook Pixel");
  if (b.includes("hotjar")) tech.analytics.push("Hotjar");
  if (b.includes("segment.com") || b.includes("segment.io") || b.includes("analytics.min.js")) tech.analytics.push("Segment");
  if (b.includes("mixpanel")) tech.analytics.push("Mixpanel");
  if (b.includes("clarity.ms")) tech.analytics.push("Microsoft Clarity");
  if (b.includes("plausible")) tech.analytics.push("Plausible");
  if (b.includes("matomo") || b.includes("piwik")) tech.analytics.push("Matomo");
  if (b.includes("amplitude")) tech.analytics.push("Amplitude");

  if (b.includes("jquery") && !b.includes("jqueryui")) tech.javascript.push("jQuery");
  if (b.includes("bootstrap")) tech.javascript.push("Bootstrap");
  if (b.includes("tailwindcss") || b.includes("tailwind")) tech.javascript.push("Tailwind CSS");
  if (b.includes("lodash")) tech.javascript.push("Lodash");
  if (b.includes("gsap") || b.includes("greensock")) tech.javascript.push("GSAP");
  if (b.includes("three.js") || b.includes("threejs")) tech.javascript.push("Three.js");

  tech.frameworks = [...new Set(tech.frameworks)];
  tech.cms = [...new Set(tech.cms)];
  tech.cdn = [...new Set(tech.cdn)];

  return tech;
}

interface SecurityHeadersResult {
  hsts: boolean;
  xFrameOptions: boolean;
  csp: boolean;
  xContentType: boolean;
  referrerPolicy: boolean;
  permissionsPolicy: boolean;
}

function analyzeSecurityHeaders(headers: Record<string, string>): { headers: SecurityHeadersResult; grade: string } {
  const h = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));

  const result: SecurityHeadersResult = {
    hsts: !!h["strict-transport-security"],
    xFrameOptions: !!h["x-frame-options"],
    csp: !!h["content-security-policy"],
    xContentType: !!h["x-content-type-options"],
    referrerPolicy: !!h["referrer-policy"],
    permissionsPolicy: !!h["permissions-policy"],
  };

  const count = Object.values(result).filter(Boolean).length;
  let grade: string;
  if (count >= 6) grade = "A+";
  else if (count >= 5) grade = "A";
  else if (count >= 4) grade = "B";
  else if (count >= 3) grade = "C";
  else if (count >= 2) grade = "D";
  else grade = "F";

  return { headers: result, grade };
}

function gradePerformance(ttfb: number): string {
  if (ttfb < 200) return "Excellent";
  if (ttfb < 500) return "Good";
  if (ttfb < 1000) return "Average";
  return "Slow";
}

async function fetchSiteData(domain: string): Promise<{
  isUp: boolean;
  statusCode: number;
  responseTime: number;
  headers: Record<string, string>;
  body: string;
  contentLength: number;
  ssl: { issuer: string; protocol: string; validFrom: string; validTo: string };
}> {
  const start = Date.now();
  const defaultResult = {
    isUp: false, statusCode: 0, responseTime: 0,
    headers: {}, body: "", contentLength: 0,
    ssl: { issuer: "", protocol: "", validFrom: "", validTo: "" },
  };

  for (const protocol of ["https", "http"]) {
    try {
      const resp = await fetch(`${protocol}://${domain}`, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(12000),
        headers: { "User-Agent": "SiteHostFinderBot/1.0" },
      });
      const responseTime = Date.now() - start;
      const body = await resp.text();
      const headerObj: Record<string, string> = {};
      resp.headers.forEach((v, k) => { headerObj[k] = v; });

      const contentLength = parseInt(headerObj["content-length"] || "0") || body.length;

      const ssl = {
        issuer: protocol === "https" ? "Valid SSL" : "No SSL",
        protocol: protocol === "https" ? "TLS" : "None",
        validFrom: "",
        validTo: "",
      };

      return {
        isUp: resp.ok || resp.status < 500,
        statusCode: resp.status,
        responseTime,
        headers: headerObj,
        body: body.substring(0, 100000),
        contentLength,
        ssl,
      };
    } catch {
      continue;
    }
  }
  return defaultResult;
}

function extractFavicon(domain: string, body: string): string {
  const iconMatch = body.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i)
    || body.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut )?icon["']/i);

  if (iconMatch && iconMatch[1]) {
    const href = iconMatch[1];
    if (href.startsWith("http")) return href;
    if (href.startsWith("//")) return `https:${href}`;
    return `https://${domain}${href.startsWith("/") ? "" : "/"}${href}`;
  }

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== "string") {
      return new Response(JSON.stringify({ error: "Invalid domain" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].split("?")[0];

    // Run all lookups in parallel — now includes TXT, AAAA, CNAME and WHOIS
    const [aRecords, aaaaRecords, nsRecords, mxRecords, txtRecords, cnameRecords, siteData, whois] = await Promise.all([
      resolveDNS(cleanDomain, "A"),
      resolveDNS(cleanDomain, "AAAA"),
      resolveDNS(cleanDomain, "NS"),
      resolveDNS(cleanDomain, "MX"),
      resolveDNS(cleanDomain, "TXT"),
      resolveDNS(cleanDomain, "CNAME"),
      fetchSiteData(cleanDomain),
      fetchWhois(cleanDomain),
    ]);

    const ipAddress = aRecords[0] || "";
    let serverLocation = { country: "Unknown", city: "Unknown", lat: 0, lon: 0, isp: "", org: "" };

    if (ipAddress) {
      try {
        const geoResp = await fetch(`http://ip-api.com/json/${ipAddress}?fields=country,city,lat,lon,isp,org`);
        const geo = await geoResp.json();
        serverLocation = {
          country: geo.country || "Unknown",
          city: geo.city || "Unknown",
          lat: geo.lat || 0,
          lon: geo.lon || 0,
          isp: geo.isp || "",
          org: geo.org || "",
        };
      } catch { /* keep defaults */ }
    }

    const hostingProvider = identifyProvider(nsRecords, serverLocation.org, serverLocation.isp);
    const technologies = detectTechnologies(siteData.headers, siteData.body);
    const security = analyzeSecurityHeaders(siteData.headers);
    const emailProvider = identifyEmailProvider(mxRecords);
    const favicon = extractFavicon(cleanDomain, siteData.body);
    const performanceGrade = gradePerformance(siteData.responseTime);

    const result = {
      domain: cleanDomain,
      ipAddress,
      hostingProvider,
      serverLocation,
      dns: {
        a: aRecords,
        aaaa: aaaaRecords,
        ns: nsRecords,
        mx: mxRecords,
        txt: txtRecords,
        cname: cnameRecords,
      },
      siteStatus: {
        isUp: siteData.isUp,
        statusCode: siteData.statusCode,
        responseTime: siteData.responseTime,
      },
      ssl: siteData.ssl,
      securityHeaders: security.headers,
      securityGrade: security.grade,
      technologies,
      performance: {
        ttfb: siteData.responseTime,
        contentLength: siteData.contentLength,
        grade: performanceGrade,
      },
      favicon,
      emailProvider,
      whois,
      screenshot: `https://image.thum.io/get/width/600/crop/400/https://${cleanDomain}`,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Hosting lookup error:", err);
    return new Response(JSON.stringify({ error: "Lookup failed. Please check the domain and try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
