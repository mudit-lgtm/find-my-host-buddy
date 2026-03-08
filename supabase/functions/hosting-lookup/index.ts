import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Known hosting providers matched by NS records, org, ISP
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

async function checkSiteStatus(domain: string): Promise<{ isUp: boolean; statusCode: number; responseTime: number }> {
  const start = Date.now();
  try {
    const resp = await fetch(`https://${domain}`, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    return { isUp: resp.ok || resp.status < 500, statusCode: resp.status, responseTime: Date.now() - start };
  } catch {
    try {
      const resp = await fetch(`http://${domain}`, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
      return { isUp: resp.ok || resp.status < 500, statusCode: resp.status, responseTime: Date.now() - start };
    } catch {
      return { isUp: false, statusCode: 0, responseTime: 0 };
    }
  }
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

    // Clean domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].split("?")[0];

    // Run all lookups in parallel
    const [aRecords, nsRecords, mxRecords, siteStatus] = await Promise.all([
      resolveDNS(cleanDomain, "A"),
      resolveDNS(cleanDomain, "NS"),
      resolveDNS(cleanDomain, "MX"),
      checkSiteStatus(cleanDomain),
    ]);

    // Get IP geolocation
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
      } catch {
        // keep defaults
      }
    }

    const hostingProvider = identifyProvider(nsRecords, serverLocation.org, serverLocation.isp);

    const result = {
      domain: cleanDomain,
      ipAddress,
      hostingProvider,
      serverLocation,
      dns: { a: aRecords, ns: nsRecords, mx: mxRecords },
      siteStatus,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Hosting lookup error:", err);
    return new Response(JSON.stringify({ error: "Lookup failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
