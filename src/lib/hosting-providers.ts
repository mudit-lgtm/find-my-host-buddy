// Map of known hosting provider identifiers (from NS records, IP ranges, org names)
const HOSTING_PROVIDERS: Record<string, string[]> = {
  "Amazon Web Services (AWS)": ["awsdns", "amazonaws.com", "aws", "ec2", "cloudfront"],
  "Google Cloud": ["googledomains", "google.com", "googleusercontent", "ghs.google"],
  "Cloudflare": ["cloudflare", "ns.cloudflare"],
  "GoDaddy": ["godaddy", "domaincontrol", "secureserver"],
  "Namecheap": ["namecheap", "registrar-servers"],
  "DigitalOcean": ["digitalocean"],
  "Hetzner": ["hetzner"],
  "OVH": ["ovh.net", "ovh.com"],
  "Bluehost": ["bluehost"],
  "HostGator": ["hostgator"],
  "SiteGround": ["siteground", "sgvps"],
  "DreamHost": ["dreamhost"],
  "Linode / Akamai": ["linode", "akamai"],
  "Vercel": ["vercel", "vercel-dns"],
  "Netlify": ["netlify"],
  "Shopify": ["shopify", "myshopify"],
  "WP Engine": ["wpengine"],
  "Squarespace": ["squarespace"],
  "Wix": ["wixdns", "wix.com"],
  "Fastly": ["fastly"],
  "Microsoft Azure": ["azure", "microsoft", "msft"],
  "Rackspace": ["rackspace"],
  "Hostinger": ["hostinger"],
  "A2 Hosting": ["a2hosting"],
  "InMotion Hosting": ["inmotionhosting"],
  "Fly.io": ["fly.io", "fly.dev"],
  "Railway": ["railway.app"],
  "Render": ["render.com", "onrender"],
  "Heroku": ["heroku", "herokuapp"],
  "Kinsta": ["kinsta"],
  "Vultr": ["vultr"],
  "Contabo": ["contabo"],
  "Ionos": ["ionos", "1and1"],
  "Strato": ["strato"],
  "Liquid Web": ["liquidweb"],
  "Scala Hosting": ["scalahosting"],
};

export function identifyHostingProvider(nsRecords: string[], org: string, isp: string): string {
  const searchText = [...nsRecords, org, isp].join(" ").toLowerCase();

  for (const [provider, identifiers] of Object.entries(HOSTING_PROVIDERS)) {
    for (const id of identifiers) {
      if (searchText.includes(id.toLowerCase())) {
        return provider;
      }
    }
  }

  return org || isp || "Unknown Provider";
}
