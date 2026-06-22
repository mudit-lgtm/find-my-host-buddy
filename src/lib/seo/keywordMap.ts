// Single source of truth for SEO content across all routes.
// Used by: page components (titles/H1/FAQ/tables), sitemap generator, prerender script, and SEO audit.

export const BASE_URL = "https://site-host-finder.vercel.app";
export const HOSTINGER_REF = "/go/hostinger"; // cloaked affiliate

export interface FAQ {
  q: string;
  a: string;
}

export interface RouteTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface RichSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface UseCase {
  title: string;
  body: string;
}

export interface Troubleshoot {
  problem: string;
  solution: string;
}

export interface RouteContent {
  path: string;
  title: string;          // <60c
  description: string;    // <155c
  h1: string;
  intro: string;          // AEO 40-60w intro paragraph
  keywords: string[];
  /** Snippet-ready 1-2 sentence direct answer for AEO (lifted by ChatGPT/Perplexity/Google snippet). */
  quickAnswer?: string;
  /** Single line GEO note (worldwide + US emphasis). */
  geoNote?: string;
  /** Scannable bullets summarising what the page covers. */
  keyPoints?: string[];
  sections: RichSection[];
  tables?: RouteTable[];
  /** Long-form real-world scenarios. */
  useCases?: UseCase[];
  /** Common problems + fixes. */
  troubleshooting?: Troubleshoot[];
  faqs: FAQ[];
  related: { label: string; href: string }[];
  outbound: { label: string; href: string; rel?: string }[];
  category: "tool" | "guide" | "policy" | "home";
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
  schemaType?: "SoftwareApplication" | "Article" | "HowTo" | "WebPage";
  toolComponent?:
    | "Hosting"          // master hosting checker (SearchBar -> /results)
    | "DnsLookup"
    | "IpChecker"
    | "IsItUp"
    | "PortChecker"
    | "DomainCompare"
    | "WhoisLookup"
    | "SslChecker"
    | "HttpHeaders"
    | "ReverseIpLookup"
    | "CmsDetector";
}

// Outbound authority links (reused)
const ICANN = { label: "ICANN — Domain Registration", href: "https://www.icann.org", rel: "noopener noreferrer" };
const IANA = { label: "IANA — Root Zone Database", href: "https://www.iana.org/domains/root/db", rel: "noopener noreferrer" };
const CLOUDFLARE_DNS = { label: "Cloudflare — What is DNS?", href: "https://www.cloudflare.com/learning/dns/what-is-dns/", rel: "noopener noreferrer" };
const CLOUDFLARE_HOST = { label: "Cloudflare — What is web hosting?", href: "https://www.cloudflare.com/learning/cdn/glossary/origin-server/", rel: "noopener noreferrer" };
const MDN_HTTP = { label: "MDN — HTTP overview", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", rel: "noopener noreferrer" };
const MDN_HEADERS = { label: "MDN — HTTP headers", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers", rel: "noopener noreferrer" };
const HOSTINGER = { label: "Get fast hosting from Hostinger", href: HOSTINGER_REF, rel: "nofollow sponsored noopener noreferrer" };
const LETSENCRYPT = { label: "Let's Encrypt — Free SSL", href: "https://letsencrypt.org/", rel: "noopener noreferrer" };
const SSL_LABS = { label: "SSL Labs — Server Test", href: "https://www.ssllabs.com/ssltest/", rel: "noopener noreferrer" };

// ---------- HOME (master Host Checker absorbs all hosting-* intents) ----------

export const HOME_ROUTE: RouteContent = {
  path: "/",
  title: "Check Host — Free Host Checker: Find Who Hosts Any Website",
  description: "✅ Free Host Checker — paste a domain to instantly check host, find website host, hosting provider, IP, DNS & WHOIS. No signup, unlimited lookups, 3-second results.",
  h1: "Host Checker — Check Host & Find Who Is Hosting Any Website",
  intro: "Free host checker (a.k.a. checkhost / hostchecker / check-host) that finds who hosts any website in seconds. Paste a domain to check host, find the hosting provider, server IP, server location, nameservers, DNS records, and WHOIS data — no signup, unlimited lookups, accurate worldwide.",
  keywords: [
    "check host", "host checker", "hostchecker", "checkhost", "check-host",
    "hosting checker", "find website host", "where is website hosted", "where is it hosted",
    "who is hosting", "who hosts this site", "hosting lookup", "web hosting lookup",
    "find my host", "host finder", "web host checker", "ip host checker",
    "where is my website hosted", "find out who is hosting any website", "cek host",
  ],
  sections: [
    {
      heading: "How the host checker works",
      body: "Enter any domain and we resolve its A and AAAA records, look up the owning ASN of the IP, geolocate the server, and match the result against a database of 500+ hosting providers. Results combine DNS, WHOIS, IP ownership, SSL fingerprint, and HTTP headers so you see the real hosting company even when sites sit behind Cloudflare or another CDN.",
    },
    {
      heading: "What our hosting lookup returns",
      body: "Hosting provider name, ASN, IPv4 and IPv6 addresses, reverse-DNS hostname, server city and country, nameservers (NS), mail servers (MX), TXT and SPF records, WHOIS registration data, SSL issuer, and HTTP response time. Everything you need from a single web hosting lookup.",
    },
    {
      heading: "Why find website host data matters",
      body: "Compare providers before switching, research competitor stacks, verify a migration completed cleanly, qualify sales prospects by infrastructure, debug DNS propagation, or simply answer 'where is my website hosted' for sites you manage. Hosting also affects page speed, uptime, and SEO ranking.",
    },
    {
      heading: "Where is this site hosted? Read the result",
      body: "The provider field is the company physically serving the files. The location field is the data-center city the server lives in. If the result shows Cloudflare, Fastly, or Akamai the site uses a CDN — the true origin is hidden by design but MX and TXT records often hint at the real backend.",
    },
  ],
  tables: [
    {
      caption: "Common hosting providers our host checker identifies",
      headers: ["Provider", "Type", "Typical use case", "Starting price (USD)"],
      rows: [
        ["Hostinger", "Shared / Cloud / VPS", "Beginner & SMB sites", "$2.99 / mo"],
        ["AWS (EC2, Lightsail)", "Cloud", "Scalable apps & SaaS", "Pay-as-you-go"],
        ["Cloudflare Pages", "Edge / CDN", "Static & Jamstack sites", "Free tier"],
        ["DigitalOcean", "Cloud VPS", "Developer projects", "$4 / mo"],
        ["Google Cloud", "Cloud", "Enterprise workloads", "Pay-as-you-go"],
        ["GoDaddy", "Shared / WordPress", "Small business sites", "$5.99 / mo"],
        ["Bluehost", "Shared / WordPress", "Beginner WordPress", "$2.95 / mo"],
        ["Vercel", "Edge / Serverless", "Next.js & frontend apps", "Free tier"],
      ],
    },
    {
      caption: "What you can learn from a single hosting lookup",
      headers: ["Field", "Source", "Why it matters"],
      rows: [
        ["Hosting provider", "IP → ASN lookup", "Who serves the files"],
        ["IPv4 / IPv6", "DNS A / AAAA", "The origin server address"],
        ["Server city / country", "IP geolocation", "Latency & data sovereignty"],
        ["Nameservers", "DNS NS records", "Who controls DNS"],
        ["Mail server", "DNS MX records", "Where email is delivered"],
        ["Registrar", "WHOIS", "Where the domain was bought"],
        ["SSL issuer", "TLS handshake", "Certificate authority used"],
      ],
    },
  ],
  faqs: [
    { q: "How do I find out who is hosting any website?", a: "Type the domain into the host checker above. We resolve DNS, identify the server IP, look up its owning ASN, and match against 500+ providers — results in under 3 seconds." },
    { q: "Is this host checker free?", a: "Yes. 100% free, unlimited lookups, no signup, no API key. The web hosting lookup, DNS, and WHOIS data are all included at no cost." },
    { q: "Where is my website hosted?", a: "Enter your own domain in the bar above. The tool returns your hosting provider, server IP, and the city and country where the server sits." },
    { q: "Where is this site hosted vs where is the domain registered?", a: "Hosting is where the files live. Registration is which company sold you the domain. They are usually different — our tool surfaces both in one lookup." },
    { q: "Why does the host checker show Cloudflare?", a: "Cloudflare's proxy terminates all traffic at its edge. The host checker reports Cloudflare because Cloudflare is what answers requests. The origin server is intentionally hidden — try the MX and TXT records for backend hints." },
    { q: "How accurate is the find-website-host data?", a: "Above 95% for non-CDN sites. CDN-fronted sites resolve to the CDN's edge city, not the origin. We use live DNS plus ASN ownership which is the most accurate non-intrusive method." },
    { q: "Can I find out who is hosting any website worldwide?", a: "Yes — any public domain on any TLD. Internal or intranet domains are not resolvable on the public internet and will not return results." },
  ],
  related: [
    { label: "DNS Lookup", href: "/tools/dns-lookup" },
    { label: "WHOIS Lookup", href: "/tools/whois-lookup" },
    { label: "IP Checker", href: "/tools/ip-checker" },
    { label: "Is It Up or Down", href: "/tools/website-down-checker" },
    { label: "SSL Checker", href: "/tools/ssl-checker" },
    { label: "Domain Compare", href: "/tools/domain-compare" },
  ],
  outbound: [ICANN, CLOUDFLARE_HOST, HOSTINGER],
  category: "home",
  changefreq: "weekly",
  priority: "1.0",
  schemaType: "SoftwareApplication",
  toolComponent: "Hosting",
};

// ---------- TOOLS (distinct intent + distinct widget) ----------

const baseRelatedTools = [
  { label: "Host Checker (home)", href: "/" },
  { label: "DNS Lookup", href: "/tools/dns-lookup" },
  { label: "WHOIS Lookup", href: "/tools/whois-lookup" },
  { label: "IP Checker", href: "/tools/ip-checker" },
  { label: "SSL Checker", href: "/tools/ssl-checker" },
  { label: "HTTP Headers", href: "/tools/http-headers" },
  { label: "Reverse IP Lookup", href: "/tools/reverse-ip-lookup" },
  { label: "CMS Detector", href: "/tools/cms-detector" },
  { label: "Is It Up or Down", href: "/tools/website-down-checker" },
  { label: "Port Checker", href: "/tools/port-checker" },
  { label: "Domain Compare", href: "/tools/domain-compare" },
];

const related = (excludePath: string) =>
  baseRelatedTools.filter((t) => t.href !== excludePath).slice(0, 5);

export const TOOL_ROUTES: RouteContent[] = [
  {
    path: "/tools/dns-lookup",
    title: "DNS Lookup — Free A, AAAA, MX, NS, TXT, CNAME Checker",
    description: "Free DNS lookup tool. View A, AAAA, MX, NS, TXT & CNAME records for any domain — instant results, no signup, unlimited queries.",
    h1: "DNS Lookup — Free DNS Records Checker",
    intro: "Look up DNS records for any domain in real time. Our free DNS lookup returns A, AAAA, MX, NS, TXT, and CNAME records — essential for debugging email, verifying nameserver changes, confirming DNS propagation worldwide, and auditing how a domain is wired up.",
    keywords: ["dns lookup", "dns records", "nameserver lookup", "mx record check", "txt record lookup", "cname lookup", "dns hosting checker"],
    sections: [
      { heading: "What a DNS lookup returns", body: "A DNS lookup queries authoritative nameservers to retrieve a domain's records. A records map to IPv4, AAAA to IPv6, MX to mail servers, NS to nameservers, TXT to verification strings (SPF, DKIM, DMARC), and CNAME to aliases. Our tool returns every common type in one query." },
      { heading: "When to use a DNS lookup tool", body: "After moving hosts (verify propagation), debugging email delivery (check MX, SPF, DKIM, DMARC), setting up Google Workspace or Microsoft 365 (validate TXT verification), or auditing whether DNS changes have rolled out to public resolvers globally." },
      { heading: "DNS lookup vs nslookup vs dig", body: "nslookup and dig are command-line tools shipped with most operating systems. Our web DNS lookup returns the same data with a friendlier UI, queries multiple record types in one shot, and shows propagation hints — no terminal required." },
    ],
    tables: [
      {
        caption: "DNS record types our DNS lookup tool resolves",
        headers: ["Record type", "What it stores", "Common use"],
        rows: [
          ["A", "IPv4 address", "Maps domain to a server"],
          ["AAAA", "IPv6 address", "Modern IPv6 routing"],
          ["MX", "Mail server hostname + priority", "Email delivery routing"],
          ["NS", "Nameserver hostname", "Delegation to DNS provider"],
          ["TXT", "Arbitrary text", "SPF, DKIM, DMARC, verification"],
          ["CNAME", "Alias to another hostname", "Subdomain pointing to a CDN"],
          ["SOA", "Zone authority data", "Primary nameserver & refresh"],
          ["PTR", "Reverse DNS", "IP-to-hostname mapping"],
        ],
      },
    ],
    faqs: [
      { q: "What does a DNS lookup return?", a: "A, AAAA, MX, NS, TXT, and CNAME records for the queried domain — typically in under a second." },
      { q: "Is the DNS lookup tool free?", a: "Yes — free, unlimited queries, no signup." },
      { q: "How long does DNS propagation take?", a: "Typically 1–48 hours depending on the record's TTL. Use this DNS lookup tool to verify when changes have propagated to public resolvers worldwide." },
      { q: "Can I check MX records with this DNS lookup?", a: "Yes — MX records are part of the standard output along with priority and target mail server." },
      { q: "How is DNS lookup different from WHOIS lookup?", a: "DNS lookup reads live records served by nameservers. WHOIS reads registration records held by the registrar. Run our WHOIS lookup for ownership data." },
    ],
    related: related("/tools/dns-lookup"),
    outbound: [CLOUDFLARE_DNS, IANA, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "DnsLookup",
  },
  {
    path: "/tools/whois-lookup",
    title: "WHOIS Lookup — Free Domain WHOIS & Owner Checker",
    description: "Free WHOIS lookup. Find domain owner, registrar, registration date, expiry, nameservers & domain age for any domain instantly.",
    h1: "WHOIS Lookup — Free Domain WHOIS & Owner Checker",
    intro: "Look up WHOIS records for any domain — registrar, registration date, expiry date, domain age, nameservers, and (when not privacy-protected) the registered owner. Free, instant, unlimited, and works on every public TLD.",
    keywords: ["whois lookup", "domain whois", "who owns this domain", "domain registration lookup", "domain age checker", "registrar lookup"],
    sections: [
      { heading: "What is WHOIS?", body: "WHOIS is a public protocol that returns the registration record of a domain. Records are stored by the domain's registrar and are governed by ICANN. WHOIS data tells you who registered a domain, when it was first registered, when it expires, who manages DNS, and how to contact the owner." },
      { heading: "Why run a WHOIS lookup", body: "Verify domain availability before purchase, confirm a domain's age for SEO valuation, identify the registrar before transferring, see contact details for outreach, or check expiry to spot a domain that may soon become available." },
      { heading: "Privacy protection & GDPR", body: "Since GDPR (2018), most registrars mask personal contact details for European registrants. You will see the registrar's privacy-proxy email instead of the real owner. Corporate domains often still show full contact data." },
    ],
    tables: [
      {
        caption: "Key WHOIS fields and what they mean",
        headers: ["Field", "Meaning"],
        rows: [
          ["Registrar", "Company that sold the domain"],
          ["Created", "First registration date (= domain age start)"],
          ["Updated", "Last modification of the WHOIS record"],
          ["Expires", "When the registration lapses if not renewed"],
          ["Status", "EPP status codes (clientTransferProhibited, etc.)"],
          ["Nameservers", "DNS provider currently serving the domain"],
          ["Registrant", "Owner — often masked by WHOIS privacy"],
        ],
      },
    ],
    faqs: [
      { q: "How do I find who owns a domain?", a: "Run a WHOIS lookup above. If WHOIS privacy is enabled you will see the proxy contact; otherwise the real registrant name, email, and address appear." },
      { q: "What is domain age and how does WHOIS reveal it?", a: "Domain age is the time since the WHOIS Created date. Older domains tend to carry more SEO trust." },
      { q: "Is WHOIS lookup free here?", a: "Yes — free, unlimited, and works on every public TLD that exposes WHOIS data." },
      { q: "Why does WHOIS show a privacy proxy instead of the owner?", a: "Most registrars enable WHOIS privacy by default to comply with GDPR. You can still email the privacy proxy and it will forward to the real owner." },
      { q: "How does WHOIS lookup differ from DNS lookup?", a: "DNS lookup reads live records served by nameservers (A, MX, TXT, etc.). WHOIS reads registration metadata held by the registrar (owner, expiry, registrar)." },
    ],
    related: related("/tools/whois-lookup"),
    outbound: [ICANN, IANA, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "WhoisLookup",
  },
  {
    path: "/tools/ip-checker",
    title: "IP Checker — What's My IP & IP Host Lookup Free",
    description: "Free IP checker. See your public IP address and look up the hosting provider, location & ASN of any IPv4 or IPv6 address.",
    h1: "IP Checker — What's My IP & IP Host Lookup",
    intro: "Our free IP checker shows your public IPv4 address instantly, plus lets you look up any IP's hosting provider, ASN, and geographic location. Useful for VPN verification, firewall whitelists, network troubleshooting, and answering 'what is my IP' or 'ip host checker' queries.",
    keywords: ["what is my ip", "ip address lookup", "ip checker", "ip host checker", "find ip host", "ipv4 lookup", "ipv6 lookup"],
    sections: [
      { heading: "What is an IP checker?", body: "An IP checker displays your public IP address — what websites and servers see — and lets you inspect any IPv4 or IPv6 address to reveal its owning organisation, hosting company, country, and city." },
      { heading: "Public vs private IP", body: "Your private IP (192.168.x.x or 10.x.x.x) is only visible inside your local network. Your public IP is what every website sees — assigned by your ISP, and what we display at the top of this page." },
      { heading: "IP host checker for domains", body: "Enter a domain instead of an IP and the same engine resolves it to a server IP, then identifies the hosting company. The same lookup powers our main host checker on the home page." },
    ],
    tables: [
      {
        caption: "Common IP-checker use cases",
        headers: ["Use case", "Why your IP matters"],
        rows: [
          ["Firewall whitelisting", "Allow your office IP into a private system"],
          ["VPN verification", "Confirm your VPN exit node is masking your real IP"],
          ["Remote access setup", "Share your home IP for SSH or RDP"],
          ["Geo-region checks", "See what country a service thinks you are in"],
          ["IP reputation", "Spot if your IP is on a spam blocklist"],
        ],
      },
    ],
    faqs: [
      { q: "What is my IP address?", a: "Your public IPv4 appears on this page automatically. It's what websites and servers see when you connect to them." },
      { q: "How does an IP host checker work?", a: "It queries regional registry databases (ARIN, RIPE, APNIC, LACNIC, AFRINIC) to find the owning organisation of an IP, then matches that against known hosting providers." },
      { q: "Is the IP check tool free?", a: "Yes — free with unlimited queries, no signup required." },
      { q: "Can I find the IP host of any website?", a: "Yes — enter the domain or IP and the tool returns the hosting provider, city, country, and ASN." },
      { q: "Why does my IP change?", a: "Most home ISPs assign dynamic IPs that rotate when your router restarts. Business connections usually get static IPs." },
    ],
    related: related("/tools/ip-checker"),
    outbound: [{ label: "ARIN — Regional Internet Registry", href: "https://www.arin.net/", rel: "noopener noreferrer" }, CLOUDFLARE_HOST, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "IpChecker",
  },
  {
    path: "/tools/reverse-ip-lookup",
    title: "Reverse IP Lookup — Find Sites on the Same Server",
    description: "Free reverse IP lookup. See which websites share an IP address or hosting server — great for shared-hosting research & competitor intel.",
    h1: "Reverse IP Lookup — Sites Hosted on the Same Server",
    intro: "Run a reverse IP lookup to see every domain that resolves to a given IP address. Useful for spotting shared-hosting neighbours, mapping a hosting account, hunting for related sites, or qualifying server quality before you migrate.",
    keywords: ["reverse ip lookup", "sites on same server", "shared hosting lookup", "domains on ip", "reverse dns"],
    sections: [
      { heading: "What reverse IP lookup means", body: "A reverse IP lookup takes an IPv4 or IPv6 address and returns the list of domain names that resolve to it. Common when many sites share a shared-hosting server, when researching a competitor's infrastructure, or when triaging an abuse complaint." },
      { heading: "Why share an IP?", body: "Cheap shared hosting puts hundreds of sites on one IP to cut costs. Cloud and managed hosting usually give each site its own dedicated IP, which is better for SEO, deliverability, and security isolation." },
      { heading: "When reverse IP returns nothing", body: "If the IP belongs to a large CDN (Cloudflare, Fastly) the reverse lookup either fails or returns the CDN's generic hostname. Origin sites behind a CDN are hidden by design." },
    ],
    tables: [
      {
        caption: "What reverse IP tells you about a host",
        headers: ["Sites on IP", "Likely hosting type", "Implication"],
        rows: [
          ["1", "Dedicated IP / VPS / Cloud", "Clean SEO neighbourhood"],
          ["2–50", "Small shared plan", "Usually fine for SMB sites"],
          ["50–500", "Cheap shared hosting", "Watch for noisy neighbours"],
          ["500+", "Overloaded shared / parking", "Consider migrating"],
        ],
      },
    ],
    faqs: [
      { q: "Is reverse IP lookup free here?", a: "Yes — free, unlimited, no signup." },
      { q: "Does shared hosting hurt SEO?", a: "Modern Google does not penalise shared IPs by default, but spammy neighbours can drag down a server's overall reputation for email and security signals." },
      { q: "Why does reverse IP return only Cloudflare?", a: "When a site sits behind Cloudflare its real origin IP is hidden. Reverse lookup on the Cloudflare edge IP returns Cloudflare-owned hostnames only." },
      { q: "How do I find sites on the same hosting account?", a: "Reverse IP lookup is the closest proxy. For a definitive answer you need access to the hosting control panel." },
    ],
    related: related("/tools/reverse-ip-lookup"),
    outbound: [{ label: "ARIN — Regional Internet Registry", href: "https://www.arin.net/", rel: "noopener noreferrer" }, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.8",
    schemaType: "SoftwareApplication",
    toolComponent: "ReverseIpLookup",
  },
  {
    path: "/tools/ssl-checker",
    title: "SSL Checker — Free HTTPS Certificate Inspector",
    description: "Free SSL checker. Verify any site's HTTPS certificate — issuer, expiry, key strength, chain, and TLS version. Instant, no signup.",
    h1: "SSL Checker — Free HTTPS Certificate Inspector",
    intro: "Verify any website's SSL/TLS certificate in seconds. Our free SSL checker shows the issuer, validity dates, subject and SAN domains, key strength, chain of trust, and supported TLS versions — useful for confirming an HTTPS rollout, debugging certificate errors, and spotting weak crypto.",
    keywords: ["ssl checker", "check ssl certificate", "https checker", "tls checker", "ssl certificate lookup"],
    sections: [
      { heading: "What an SSL checker reveals", body: "Issuer (Let's Encrypt, DigiCert, Sectigo, Google Trust Services), validity window, common name, all SAN entries, signature algorithm, key size, and the full intermediate chain. We also report the highest TLS version the server negotiates." },
      { heading: "Why your SSL might fail in browsers", body: "Expired certificate, missing intermediate, wrong common name, self-signed cert, mixed-content warnings, or unsupported TLS version (browsers now drop TLS 1.0 and 1.1). Each shows up as a specific error in this checker." },
      { heading: "SSL grade vs SSL checker", body: "Our checker reports the facts of the certificate. SSL Labs goes further and gives an overall A–F grade including cipher suites and protocol downgrades. Use both." },
    ],
    tables: [
      {
        caption: "TLS versions and current browser support",
        headers: ["Version", "Status", "Recommendation"],
        rows: [
          ["TLS 1.3", "Modern, fastest", "Required for new deployments"],
          ["TLS 1.2", "Widely supported", "Keep enabled as a fallback"],
          ["TLS 1.1", "Deprecated", "Disable — blocked by major browsers"],
          ["TLS 1.0", "Insecure", "Disable — known POODLE/BEAST issues"],
          ["SSL 3.0", "Broken", "Must be disabled"],
        ],
      },
    ],
    faqs: [
      { q: "Is the SSL checker free?", a: "Yes — free, unlimited, no signup." },
      { q: "How do I check if my SSL certificate is valid?", a: "Enter your domain above. We connect over HTTPS and report issuer, expiry, chain, and TLS version." },
      { q: "Can I check SSL for any port?", a: "Default is 443. Many services (SMTPS 465, IMAPS 993, custom) also serve TLS — supply a port if needed." },
      { q: "Why does my certificate say 'not trusted'?", a: "Usually a missing intermediate. Re-install the full chain bundle from your CA — Let's Encrypt's fullchain.pem is the canonical example." },
      { q: "How often should I renew SSL?", a: "Let's Encrypt expires every 90 days and most clients renew automatically at day 60. Commercial certs typically run 1 year." },
    ],
    related: related("/tools/ssl-checker"),
    outbound: [LETSENCRYPT, SSL_LABS, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "SslChecker",
  },
  {
    path: "/tools/http-headers",
    title: "HTTP Header Checker — Inspect Response Headers Free",
    description: "Free HTTP header checker. View response headers, status code, redirects, security headers & cache policy for any URL.",
    h1: "HTTP Header Checker — Inspect Response Headers",
    intro: "Inspect the HTTP response headers of any URL in real time. Our free HTTP header checker shows the status code, server banner, content type, cache policy, security headers (HSTS, CSP, X-Frame-Options), redirect chain, and cookies — essential for debugging caching, SEO, and security configuration.",
    keywords: ["http header checker", "response headers", "http status code checker", "redirect checker", "security headers"],
    sections: [
      { heading: "What HTTP headers reveal", body: "Server software (Nginx, Apache, LiteSpeed, Cloudflare), CDN in use, cache directives, content-type, compression (gzip, br), cookies, HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy. Together they paint a complete picture of how a server responds." },
      { heading: "Why check security headers", body: "Missing HSTS leaves users vulnerable to TLS downgrade. Missing CSP enables XSS. Missing X-Frame-Options allows clickjacking. Mozilla Observatory grades security headers; our checker is the quickest way to spot what is missing." },
      { heading: "Redirect chains and SEO", body: "Each 301 hop loses a tiny amount of link equity and adds latency. Check that your domain redirects in a single hop (apex → www → https, ideally combined) and that no temporary 302 sits where a 301 should be." },
    ],
    tables: [
      {
        caption: "Security headers worth setting on every site",
        headers: ["Header", "Purpose", "Recommended value"],
        rows: [
          ["Strict-Transport-Security", "Force HTTPS", "max-age=31536000; includeSubDomains"],
          ["Content-Security-Policy", "Block XSS", "Strict source allow-lists"],
          ["X-Frame-Options", "Prevent clickjacking", "DENY or SAMEORIGIN"],
          ["X-Content-Type-Options", "Stop MIME sniffing", "nosniff"],
          ["Referrer-Policy", "Limit referrer leakage", "strict-origin-when-cross-origin"],
          ["Permissions-Policy", "Restrict APIs", "camera=(), microphone=()"],
        ],
      },
    ],
    faqs: [
      { q: "What does the HTTP header checker show?", a: "Status code, all response headers, redirect chain, cookies, and a summary of present/missing security headers." },
      { q: "Why is my redirect doing two hops?", a: "Usually because the apex redirects to www first, then to HTTPS. Configure both at once at the edge to keep it a single 301." },
      { q: "How do I add HSTS?", a: "Set the Strict-Transport-Security header at your web server or CDN. Start with a low max-age and raise it once stable." },
      { q: "Is the HTTP header tool free?", a: "Yes — free, unlimited, no signup." },
    ],
    related: related("/tools/http-headers"),
    outbound: [MDN_HEADERS, MDN_HTTP, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.8",
    schemaType: "SoftwareApplication",
    toolComponent: "HttpHeaders",
  },
  {
    path: "/tools/cms-detector",
    title: "CMS Detector — What CMS Is This Website Using? (Free CMS Checker)",
    description: "✅ Free CMS Detector — instantly check what CMS a website is using. Detect WordPress, Shopify, Wix, Webflow, Squarespace, Drupal, Ghost & 50+ platforms. No signup.",
    h1: "CMS Detector — What CMS Is This Website Using?",
    intro: "Free CMS detector and CMS checker — paste any URL to instantly detect what CMS, e-commerce platform, or website builder a site is using. Identifies WordPress, Shopify, Wix, Webflow, Squarespace, Drupal, Joomla, Ghost, Magento, BigCommerce and 50+ other platforms by inspecting HTML markup, HTTP headers, asset paths, cookies, and meta tags.",
    keywords: [
      "cms detector", "cms checker", "check cms", "cms check", "detect cms", "cms finder",
      "what cms is this", "what cms is this site using", "what cms is this website using",
      "what cms is a site using", "what cms is a website using", "what cms website is using",
      "what cms is site using", "what cms does this site use", "what cms does a site use",
      "what cms is used by a website", "what cms used for the site", "which cms",
      "website cms checker", "cms detect", "check cms of website", "check cms system",
      "what is my cms", "detect wordpress", "detect shopify", "website builder detector",
      "what platform is this site built with",
    ],
    quickAnswer: "Paste any URL above — our free CMS detector instantly tells you what CMS the website is using (WordPress, Shopify, Wix, Webflow, Drupal, Ghost and 50+ more) by inspecting HTML, headers, asset paths, and meta tags.",
    keyPoints: [
      "Detect WordPress, Shopify, Wix, Webflow, Squarespace, Drupal, Ghost & more",
      "Works on any public website — no signup, unlimited checks",
      "Returns primary CMS + secondary signals (theme, framework, hosting)",
      "Free alternative to BuiltWith, Wappalyzer & WhatCMS",
    ],
    sections: [
      { heading: "What is a CMS detector?", body: "A CMS detector (also called a CMS checker or 'what CMS is this' tool) inspects a website's public HTML, HTTP response headers, JavaScript bundles, asset paths, and cookies to identify the content management system powering the site. It answers questions like 'what CMS is this site using' or 'what CMS does a website use' in under 2 seconds — no installation required.", bullets: [
        "Reads the raw HTML — no scraping of admin pages",
        "Combines 30+ signals for a high-confidence verdict",
        "Detects CMS, e-commerce platform, website builder, or static-site generator",
      ]},
      { heading: "How CMS detection works", body: "Each platform leaves fingerprints. WordPress drops /wp-content/ and /wp-includes/ in asset URLs. Shopify exposes a cdn.shopify.com asset domain and Shopify.theme JavaScript object. Webflow ships a w-* class prefix and webflow.com badge. Wix uses a parastorage.com CDN and X-Wix-Request-Id header. Squarespace serves static1.squarespace.com assets. Ghost serves a generator meta tag. Drupal exposes an X-Generator header. Combined, these signals give a high-confidence answer about what CMS a website is using." },
      { heading: "Why detect a competitor's CMS", body: "Knowing the CMS behind a site helps you choose the right tech for a similar project, qualify an agency lead by CMS expertise, plan a CMS migration, estimate build and licensing cost, recruit developers with the right skillset, or perform competitive research on a market." },
      { heading: "CMS detector vs Wappalyzer vs BuiltWith", body: "Wappalyzer and BuiltWith are paid SaaS tools that bundle CMS detection with broader tech-stack profiling. Our free CMS detector focuses on the single question 'what CMS is this website using' and returns an answer instantly without signup, paywall, or API limit. For a one-off check or quick competitor lookup it's faster and free." },
      { heading: "Limits of CMS detection", body: "Headless setups (Next.js + Sanity, Astro + Strapi) often only expose the frontend framework — the headless CMS backend is rarely fingerprintable from the public HTML. Heavy theme customisation can strip default markers. Aggressive caching or a CDN reverse-proxy can hide response headers. In those edge cases we report the most likely platform plus the secondary signals we found." },
    ],
    tables: [
      {
        caption: "Popular platforms our CMS checker recognises",
        headers: ["Platform", "Primary signal", "Category"],
        rows: [
          ["WordPress", "/wp-content/ asset path", "CMS"],
          ["Shopify", "cdn.shopify.com", "E-commerce"],
          ["Wix", "static.wixstatic.com", "Website builder"],
          ["Squarespace", "static1.squarespace.com", "Website builder"],
          ["Webflow", "w-* class prefix", "Website builder"],
          ["Ghost", "generator meta tag", "CMS / blog"],
          ["Drupal", "X-Generator: Drupal header", "CMS"],
          ["Joomla", "/media/jui/ asset path", "CMS"],
          ["Magento", "Mage.Cookies cookie", "E-commerce"],
          ["BigCommerce", "cdn.bigcommerce.com", "E-commerce"],
          ["HubSpot CMS", "hs-scripts.com", "CMS / marketing"],
          ["Framer", "framerusercontent.com", "Website builder"],
        ],
      },
    ],
    useCases: [
      { title: "Competitor research", body: "Identify what CMS competitors run before pitching a redesign or migration." },
      { title: "Agency sales", body: "Qualify inbound leads by detecting their current CMS in one click." },
      { title: "Hiring", body: "Confirm a portfolio site really is built on the CMS the candidate claims." },
      { title: "Migration planning", body: "Audit a list of sites to plan a CMS-to-CMS migration cost estimate." },
    ],
    faqs: [
      { q: "What CMS is this site using?", a: "Enter the URL in the tool above. We inspect HTML, headers, and asset paths and report the most likely CMS along with secondary signals — usually in under 2 seconds." },
      { q: "What CMS is this website using if it's on WordPress?", a: "If the site runs WordPress you'll see /wp-content/ in asset URLs and a wp-json REST endpoint — both of which our CMS detector picks up automatically. We also identify the active theme when possible." },
      { q: "How do I check what CMS a website is using for free?", a: "Use the CMS checker above. It's free, requires no signup, and works on any public URL. Unlike BuiltWith or Wappalyzer there's no API limit or paywall." },
      { q: "Can the CMS detector identify headless sites?", a: "It can usually detect the frontend framework (Next.js, Gatsby, Astro, Nuxt). The headless backend (Sanity, Strapi, Contentful, Prismic) is rarely fingerprintable from the public HTML and is reported as 'headless / unknown CMS'." },
      { q: "What CMS does a site use if it's not WordPress?", a: "Common non-WordPress CMS platforms our detector recognises include Shopify, Wix, Squarespace, Webflow, Drupal, Joomla, Ghost, HubSpot CMS, Magento, BigCommerce, and Framer." },
      { q: "Why does CMS detection fail on some sites?", a: "Heavy theme customisation removes default markers. Aggressive caching or a reverse-proxy CDN strips response headers. In those cases we report 'Custom / unknown' rather than guess." },
      { q: "Is this CMS detector really free?", a: "Yes — 100% free, unlimited checks, no signup, no API key, no rate limit on normal usage." },
      { q: "What's the difference between a CMS, a website builder, and an e-commerce platform?", a: "A CMS (WordPress, Drupal) gives developers full control over content and code. A website builder (Wix, Squarespace) is fully hosted with a visual editor. An e-commerce platform (Shopify, BigCommerce) is a builder specialised for selling products. Our CMS detector identifies all three." },
    ],
    related: related("/tools/cms-detector"),
    outbound: [
      { label: "MDN — HTTP headers", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers", rel: "noopener noreferrer" },
      { label: "W3Techs CMS market share", href: "https://w3techs.com/technologies/overview/content_management", rel: "noopener noreferrer" },
      HOSTINGER,
    ],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "CmsDetector",
  },
  {
    path: "/tools/website-down-checker",
    title: "Is It Down? — Free Website Down Checker",
    description: "Check if any website is down for everyone or just you. Free website down checker — real-time HTTP status, response time, reachability.",
    h1: "Is This Website Down? — Free Down Checker",
    intro: "Check whether a website is down for everyone or just you. Our free website down checker pings the URL from our servers in real time and reports HTTP status code, response time, and reachability — no signup, instant answer, unlimited probes.",
    keywords: ["is it up", "is it down", "website down checker", "site down", "is this site down", "down for everyone or just me"],
    sections: [
      { heading: "Why your favourite site might be down", body: "Common causes: DNS misconfiguration, expired SSL certificate, server overload, scheduled maintenance, BGP routing problem, or an ISP issue local to you. Our checker rules out the local cause by probing from our servers." },
      { heading: "How the down checker works", body: "We send a real HTTP GET from our edge and measure response time and status code. 200–299 means up. 4xx/5xx means the server is reachable but returning errors. Timeout or network error means truly down." },
      { heading: "What to do when a site is genuinely down", body: "Check the host's status page. Run a DNS lookup to confirm records are correct. Verify SSL has not expired. If you own the site, contact your hosting provider — slow or unreliable hosts cost SEO ranking." },
    ],
    tables: [
      {
        caption: "Common HTTP status codes and what they mean",
        headers: ["Code", "Meaning", "Action"],
        rows: [
          ["200 OK", "Page loaded successfully", "Site is up"],
          ["301 / 302", "Redirect", "Follow the Location header"],
          ["403", "Forbidden", "Access denied — check auth / firewall"],
          ["404", "Not found", "URL does not exist on the server"],
          ["500", "Internal server error", "App crashed — check server logs"],
          ["502 / 504", "Bad / Gateway timeout", "Upstream is slow or unreachable"],
          ["503", "Service unavailable", "Server overloaded or in maintenance"],
        ],
      },
    ],
    faqs: [
      { q: "Is my favourite website down for everyone?", a: "Enter it above. We probe from our servers — if we get through, the issue is local to your network or ISP." },
      { q: "What does a 503 error mean?", a: "Service Unavailable. The server is up but temporarily overloaded or in maintenance. Try again in a few minutes." },
      { q: "Is the website down checker free?", a: "Yes — free, unlimited, no signup." },
      { q: "How often can I check the same site?", a: "As often as you want. We do not rate-limit individual lookups." },
    ],
    related: related("/tools/website-down-checker"),
    outbound: [MDN_HTTP, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "IsItUp",
  },
  {
    path: "/tools/port-checker",
    title: "Port Checker — Test if a TCP Port Is Open Free",
    description: "Free port checker. Test if any TCP port is open on a server — perfect for firewall debugging and service availability checks.",
    h1: "Port Checker — Test Open TCP Ports",
    intro: "Test whether a specific TCP port is open on any public host. Our free port checker is perfect for firewall debugging, verifying services like SSH, HTTPS, SMTP, and MySQL are reachable from the public internet, and diagnosing 'connection refused' errors.",
    keywords: ["port checker", "open port test", "tcp port check", "is port open", "online port scanner"],
    sections: [
      { heading: "What a port checker does", body: "A port checker attempts a TCP connection to a specific port on a remote host. If the connection succeeds, the port is open and a service is listening. If it times out, the port is filtered or closed." },
      { heading: "When to test a port", body: "After installing a new service (verify it is reachable), after a firewall change (confirm rules apply correctly), when a client reports 'connection refused', or when verifying that your hosting provider has not blocked an outbound port." },
      { heading: "Why a port might appear closed", body: "Firewall rules (cloud security group, iptables, ufw), the service is not running, the service binds to localhost only (127.0.0.1 instead of 0.0.0.0), or your hosting provider blocks the port by default (port 25 is famously blocked on most networks)." },
    ],
    tables: [
      {
        caption: "Common ports and their services",
        headers: ["Port", "Service", "Notes"],
        rows: [
          ["22", "SSH", "Remote shell"],
          ["25 / 465 / 587", "SMTP / SMTPS / Submission", "Email — 25 often blocked"],
          ["80", "HTTP", "Unencrypted web"],
          ["443", "HTTPS", "TLS web"],
          ["3306", "MySQL", "Should not be public"],
          ["5432", "PostgreSQL", "Should not be public"],
          ["6379", "Redis", "Should not be public"],
          ["27017", "MongoDB", "Should not be public"],
          ["8080 / 8443", "Alt HTTP / HTTPS", "App servers, admin UIs"],
        ],
      },
    ],
    faqs: [
      { q: "How do I check if a port is open?", a: "Enter the host and port above, click check. If we connect successfully, the port is open." },
      { q: "Is the port checker free?", a: "Yes — free, unlimited tests, no signup." },
      { q: "Why is port 25 always blocked?", a: "Most hosting providers and home ISPs block outbound port 25 to prevent spam. Use 587 (submission) or 465 (SMTPS) for email." },
      { q: "Can I scan multiple ports at once?", a: "Currently single-port for ethics — please do not use this tool for unauthorised port scanning, which is illegal in most jurisdictions." },
    ],
    related: related("/tools/port-checker"),
    outbound: [{ label: "IANA — Service Name and Port Registry", href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", rel: "noopener noreferrer" }, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.8",
    schemaType: "SoftwareApplication",
    toolComponent: "PortChecker",
  },
  {
    path: "/tools/domain-compare",
    title: "Domain Compare — Side-by-Side Hosting Comparison",
    description: "Compare two domains side by side — hosting provider, IP, DNS, WHOIS, performance & SSL. Free domain compare tool.",
    h1: "Domain Compare — Side-by-Side Hosting Comparison",
    intro: "Compare two domains side by side — hosting provider, server location, DNS records, WHOIS, SSL grade, and performance. Perfect for competitive research, agency client audits, and migration planning. Free with no signup and unlimited comparisons.",
    keywords: ["compare domains", "domain compare", "side by side hosting compare", "competitor hosting research", "compare web hosts"],
    sections: [
      { heading: "What domain compare reveals", body: "Both domains' hosting provider, IP geolocation, nameservers, mail servers, TLS grade, performance scores, and WHOIS. Differences are highlighted so you can spot infrastructure gaps instantly." },
      { heading: "Use cases for domain compare", body: "Competitive analysis (what stack does the competition trust?), agency reporting (your client vs their rival), pre-migration benchmarking, and qualifying sales prospects by infrastructure maturity." },
      { heading: "What 'better' hosting looks like", body: "Lower TTFB, modern TLS 1.3, HTTP/2 or HTTP/3, geographic proximity to audience, strong security headers (HSTS, CSP), and a reputable provider like Hostinger, AWS, or Cloudflare." },
    ],
    tables: [
      {
        caption: "What we compare side by side",
        headers: ["Category", "Fields"],
        rows: [
          ["Hosting", "Provider, ASN, server IP, location"],
          ["DNS", "Nameservers, MX, TXT, A/AAAA"],
          ["WHOIS", "Registrar, age, expiry"],
          ["Security", "TLS version, HSTS, CSP, X-Frame-Options"],
          ["Performance", "TTFB, status code, response time"],
        ],
      },
    ],
    faqs: [
      { q: "How does domain compare work?", a: "Enter two domains. We run our full hosting lookup on each in parallel and present the data side by side, highlighting differences." },
      { q: "Is domain compare free?", a: "Yes — free, no signup, unlimited comparisons." },
      { q: "Can I compare more than two domains?", a: "Currently two at a time. Run multiple sessions for larger batches." },
      { q: "Does the compare tool include security and SSL?", a: "Yes — TLS version and key security headers appear in the comparison." },
    ],
    related: related("/tools/domain-compare"),
    outbound: [HOSTINGER, ICANN, SSL_LABS],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "DomainCompare",
  },
];

// ---------- Overlay rich AEO/GEO content from toolContent.json -----------
// Each tool gets: quickAnswer, geoNote, keyPoints, expanded sections w/ bullets,
// useCases, troubleshooting, and 10+ FAQs (1500-2300 body words per page).
import toolContentRaw from "./toolContent.json";
type ToolContent = {
  quickAnswer: string;
  geoNote: string;
  keyPoints: string[];
  sections: RichSection[];
  useCases: UseCase[];
  troubleshooting: Troubleshoot[];
  faqs: FAQ[];
};
const toolContent = toolContentRaw as Record<string, ToolContent>;
const slugFromPath = (p: string) => p.replace(/^\/tools\//, "");

for (const route of TOOL_ROUTES) {
  const rich = toolContent[slugFromPath(route.path)];
  if (!rich) continue;
  route.quickAnswer = rich.quickAnswer;
  route.geoNote = rich.geoNote;
  route.keyPoints = rich.keyPoints;
  route.sections = rich.sections;        // replace with the 7-9 rich sections
  route.useCases = rich.useCases;
  route.troubleshooting = rich.troubleshooting;
  // Merge FAQs: keep originals first, append AI-generated, dedupe by question.
  const seen = new Set(route.faqs.map((f) => f.q.toLowerCase()));
  for (const f of rich.faqs) {
    if (!seen.has(f.q.toLowerCase())) {
      route.faqs.push(f);
      seen.add(f.q.toLowerCase());
    }
  }
}



// ---------- GUIDES ----------

export const GUIDE_ROUTES: RouteContent[] = [
  {
    path: "/guides/what-is-web-hosting",
    title: "What Is Web Hosting? A Beginner's Guide (2026)",
    description: "Web hosting explained simply. Learn what hosting is, how it works, the main types, and how to pick the right provider in 2026.",
    h1: "What Is Web Hosting? A Beginner's Guide",
    intro: "Web hosting is the service of renting space on a server connected to the internet so your website's files can be reached by anyone with the URL. Without hosting, a website exists only on your laptop. This guide explains how hosting works, the main types, what to look for, and how much it costs in 2026.",
    keywords: ["what is web hosting", "web hosting explained", "hosting for beginners", "types of web hosting"],
    sections: [
      { heading: "How web hosting works", body: "When a visitor types your domain, their browser asks DNS for the IP address. DNS returns the IP of your hosting server. The browser then sends an HTTP request to that server, which responds with your site's HTML, CSS, images, and JavaScript." },
      { heading: "Types of web hosting", body: "Shared hosting (cheapest, slowest, many sites per server), VPS (a dedicated slice of a server, faster and more flexible), Cloud hosting (scales automatically across many servers), Dedicated (a whole physical machine, expensive). Most new sites start on shared or cloud." },
      { heading: "What to look for in a host", body: "Uptime guarantee (99.9%+), fast SSD/NVMe storage, free SSL, daily backups, good support, modern PHP/Node runtimes, and a transparent renewal price. Run our host checker on a competitor to see what stack works for your traffic." },
      { heading: "How much hosting costs in 2026", body: "Shared hosting starts at $2–5/month. VPS runs $5–30/month. Cloud bills by usage. Dedicated servers start at $80+/month. Sites under 10k monthly visitors are usually fine on shared or basic cloud." },
    ],
    tables: [
      {
        caption: "Hosting types compared",
        headers: ["Type", "Price (USD/mo)", "Best for", "Trade-off"],
        rows: [
          ["Shared", "$2–5", "Blogs, portfolios, SMB", "Noisy-neighbour risk"],
          ["VPS", "$5–30", "Developers, custom apps", "Need basic Linux skills"],
          ["Cloud", "Pay-as-you-go", "Variable traffic, SaaS", "Bill can spike"],
          ["Dedicated", "$80+", "High traffic, compliance", "Expensive & rigid"],
          ["Managed WordPress", "$10–35", "WordPress sites at scale", "Locked to WP"],
        ],
      },
    ],
    faqs: [
      { q: "Do I need web hosting if I have a domain?", a: "Yes. A domain is just an address. Hosting is the actual space where your website lives. You need both." },
      { q: "Can I host a website for free?", a: "Yes but with severe limits — ads, branded subdomains, no email. For serious projects, paid hosting from a few dollars a month is worth it." },
      { q: "What is the best web hosting for beginners?", a: "Hostinger is the most popular budget option — affordable, fast, includes a free domain. See our best-hosting-for-beginners guide." },
    ],
    related: [
      { label: "Best Web Hosting for Beginners", href: "/guides/best-web-hosting-for-beginners" },
      { label: "Shared vs VPS vs Cloud Hosting", href: "/guides/shared-vs-vps-vs-cloud-hosting" },
      { label: "How to Find Where a Website Is Hosted", href: "/guides/how-to-find-where-a-website-is-hosted" },
      { label: "Host Checker Tool", href: "/" },
    ],
    outbound: [CLOUDFLARE_HOST, HOSTINGER, LETSENCRYPT],
    category: "guide",
    changefreq: "monthly",
    priority: "0.7",
    schemaType: "Article",
  },
  {
    path: "/guides/shared-vs-vps-vs-cloud-hosting",
    title: "Shared vs VPS vs Cloud Hosting — Which Is Best?",
    description: "Compare shared, VPS, and cloud hosting on price, performance, and scalability. Find the right hosting type for your site in 2026.",
    h1: "Shared vs VPS vs Cloud Hosting — Complete Comparison",
    intro: "Shared hosting puts many sites on one server (cheap, slow). VPS gives you a dedicated slice with root access (faster, more flexible). Cloud hosting scales across many servers (most resilient, pay-as-you-go). The right pick depends on traffic, budget, and technical comfort.",
    keywords: ["shared vs vps hosting", "cloud hosting vs vps", "types of hosting compared", "best hosting type"],
    sections: [
      { heading: "Shared hosting — best for starters", body: "Sub-$5/month. Resources pooled across hundreds of sites. Fine for blogs, portfolios, small business sites under 10k monthly visits. Slow at scale because noisy neighbours can hog CPU." },
      { heading: "VPS hosting — best for control", body: "$5–30/month. Virtualised server slice with guaranteed CPU, RAM, and disk. Root access lets you install anything. Best for developers, custom apps, or sites outgrowing shared." },
      { heading: "Cloud hosting — best for scale", body: "Pay-per-use. Auto-scales during traffic spikes, distributes across regions. AWS, Google Cloud, DigitalOcean lead. Better uptime than single-server alternatives because hardware failure is invisible." },
      { heading: "How to choose", body: "<10k visits/month and no special needs → shared. Custom apps or technical control → VPS. Variable traffic, must-not-go-down requirements → cloud. Run our host checker on competitors to see what stack works for similar traffic." },
    ],
    tables: [
      {
        caption: "Shared vs VPS vs Cloud at a glance",
        headers: ["Criterion", "Shared", "VPS", "Cloud"],
        rows: [
          ["Price (USD/mo)", "$2–5", "$5–30", "Pay-as-you-go"],
          ["Performance", "Variable", "Consistent", "Auto-scaled"],
          ["Setup difficulty", "Easy", "Moderate", "Moderate"],
          ["Root access", "No", "Yes", "Yes"],
          ["Scales with traffic", "Limited", "Manual", "Automatic"],
          ["Best for", "Blogs, SMB", "Devs, custom apps", "SaaS, spiky sites"],
        ],
      },
    ],
    faqs: [
      { q: "Is VPS faster than shared hosting?", a: "Usually yes — guaranteed resources mean predictable performance vs shared's variable speed." },
      { q: "Is cloud hosting always better than VPS?", a: "Not always. Cloud is better for variable traffic. A consistent workload can be cheaper on a fixed-price VPS." },
      { q: "Can I upgrade from shared to VPS later?", a: "Yes — most providers offer easy upgrade paths, often with free migration assistance." },
    ],
    related: [
      { label: "What Is Web Hosting?", href: "/guides/what-is-web-hosting" },
      { label: "Best Hosting for Beginners", href: "/guides/best-web-hosting-for-beginners" },
      { label: "Host Checker", href: "/" },
      { label: "Domain Compare", href: "/tools/domain-compare" },
    ],
    outbound: [CLOUDFLARE_HOST, HOSTINGER],
    category: "guide",
    changefreq: "monthly",
    priority: "0.7",
    schemaType: "Article",
  },
  {
    path: "/guides/how-to-find-where-a-website-is-hosted",
    title: "How to Find Where a Website Is Hosted (4 Easy Ways)",
    description: "Step-by-step guide to find where any website is hosted using a host checker, DNS lookup, IP geolocation, WHOIS, or SSL inspection.",
    h1: "How to Find Where a Website Is Hosted",
    intro: "There are four reliable ways to find where a website is hosted: use a host checker tool, do a DNS lookup to get the IP and trace ownership, run a WHOIS lookup for registrar context, or inspect the SSL certificate. The fastest is method one — our free host checker on the home page.",
    keywords: ["how to find where a website is hosted", "how to find out who is hosting a website", "find host of website tutorial"],
    sections: [
      { heading: "Method 1 — use our host checker", body: "Open our host checker on the home page, paste the domain, click Find Host. The tool resolves DNS, geolocates the IP, and matches it against 500+ providers. Takes 3 seconds. Most accurate for non-CDN sites." },
      { heading: "Method 2 — DNS lookup + IP geolocation", body: "Run dig or nslookup on the domain to get the A record (IPv4). Then look up that IP in an ASN database to find the owning organisation. Our DNS lookup tool combines both steps." },
      { heading: "Method 3 — WHOIS lookup", body: "WHOIS shows who registered the domain but rarely reveals hosting directly. It is useful supplementary data — registrar and contact info often hint at the host." },
      { heading: "Method 4 — SSL certificate inspection", body: "Click the padlock in your browser, view the certificate. The issuer (Let's Encrypt, Sectigo) and Subject Alternative Names can reveal infrastructure clues, especially for shared platforms. Our SSL checker shows all of this." },
    ],
    tables: [
      {
        caption: "Methods to find a website's host compared",
        headers: ["Method", "Speed", "Accuracy", "Tool"],
        rows: [
          ["Host checker", "3 seconds", "Very high (non-CDN)", "Home page"],
          ["DNS lookup + ASN", "10 seconds", "High", "/tools/dns-lookup"],
          ["WHOIS lookup", "5 seconds", "Indirect", "/tools/whois-lookup"],
          ["SSL certificate", "5 seconds", "Hints only", "/tools/ssl-checker"],
        ],
      },
    ],
    faqs: [
      { q: "What is the fastest way to find a website's host?", a: "Use our free host checker on the home page — paste the domain, answer in 3 seconds." },
      { q: "Can I find the host of a Cloudflare-protected site?", a: "Not directly. Cloudflare hides the origin. MX records and TXT records sometimes leak the true backend." },
      { q: "Is finding a website's host legal?", a: "Yes. DNS and WHOIS data are public records by design." },
    ],
    related: [
      { label: "Host Checker (home)", href: "/" },
      { label: "DNS Lookup", href: "/tools/dns-lookup" },
      { label: "IP Checker", href: "/tools/ip-checker" },
      { label: "WHOIS Lookup", href: "/tools/whois-lookup" },
    ],
    outbound: [ICANN, CLOUDFLARE_DNS, HOSTINGER],
    category: "guide",
    changefreq: "monthly",
    priority: "0.8",
    schemaType: "HowTo",
  },
  {
    path: "/guides/best-web-hosting-for-beginners",
    title: "Best Web Hosting for Beginners in 2026",
    description: "Top web hosting picks for beginners. Compare features, pricing, and ease of use. Hostinger leads on value, speed, and simplicity.",
    h1: "Best Web Hosting for Beginners in 2026",
    intro: "For most beginners, Hostinger offers the best combination of price (from $2.99/month), speed (LiteSpeed servers + NVMe SSD), free domain for the first year, and a beginner-friendly control panel. It's our top recommendation for first-time site owners in 2026.",
    keywords: ["best web hosting beginners", "hostinger review", "cheap web hosting", "easiest hosting for beginners"],
    sections: [
      { heading: "Why Hostinger wins for beginners", body: "Pricing from $2.99/month, includes a free domain, free SSL, free email, daily backups, and a custom hPanel that's simpler than cPanel. LiteSpeed + NVMe SSD gives speeds rivalling much pricier hosts. Try Hostinger →" },
      { heading: "What to look for as a beginner", body: "One-click WordPress install, free SSL, included email, daily backups, 24/7 chat support, transparent renewal pricing, and a 30-day money-back guarantee. Hostinger checks all of these." },
      { heading: "Common beginner mistakes to avoid", body: "Don't pay yearly upfront without testing first. Skip 'unlimited' marketing claims (always rate-limited). Avoid hosts without free SSL — paying for SSL in 2026 is a red flag. Always check renewal prices, not just intro prices." },
      { heading: "Quick comparison vs competitors", body: "Bluehost is similar price but slower in benchmarks. SiteGround is faster but 3–4x the price. DreamHost is reliable but pricier than Hostinger. For raw value, Hostinger wins. Verify with our host checker on similar sites." },
    ],
    tables: [
      {
        caption: "Top beginner hosts compared (2026)",
        headers: ["Host", "Starting price", "Free SSL", "Free domain", "Speed score"],
        rows: [
          ["Hostinger", "$2.99/mo", "Yes", "Yes (year 1)", "A"],
          ["Bluehost", "$2.95/mo", "Yes", "Yes (year 1)", "B"],
          ["SiteGround", "$3.99/mo", "Yes", "No", "A"],
          ["DreamHost", "$2.95/mo", "Yes", "Yes", "B+"],
          ["GoDaddy", "$5.99/mo", "Yes", "No", "B-"],
        ],
      },
    ],
    faqs: [
      { q: "Is Hostinger good for beginners?", a: "Yes — it's the most beginner-friendly mainstream host. Simple control panel, generous starter plan, included domain and SSL. Try Hostinger →" },
      { q: "How much should a beginner pay for hosting?", a: "$3–5/month is enough for any beginner site. Don't pay more until traffic justifies upgrading." },
      { q: "Can I switch hosts later?", a: "Yes — easily. Most quality hosts (including Hostinger) offer free migration if you outgrow your current setup." },
    ],
    related: [
      { label: "What Is Web Hosting?", href: "/guides/what-is-web-hosting" },
      { label: "Shared vs VPS vs Cloud", href: "/guides/shared-vs-vps-vs-cloud-hosting" },
      { label: "Host Checker", href: "/" },
      { label: "Domain Compare", href: "/tools/domain-compare" },
    ],
    outbound: [HOSTINGER, { label: "Hostinger Knowledge Base", href: "https://support.hostinger.com/", rel: "nofollow noopener noreferrer" }],
    category: "guide",
    changefreq: "monthly",
    priority: "0.8",
    schemaType: "Article",
  },
];

// ---------- POLICY PAGES (AdSense-required, in footer only) ----------

export const POLICY_ROUTES: RouteContent[] = [
  {
    path: "/privacy",
    title: "Privacy Policy — Site Host Finder",
    description: "How Site Host Finder collects, uses, and protects your data when you use our free host checker and webmaster tools.",
    h1: "Privacy Policy",
    intro: "Site Host Finder respects your privacy. This page explains what data we collect, how we use it, who we share it with, your rights, and how to contact us about privacy.",
    keywords: ["privacy policy"],
    sections: [
      { heading: "Information we collect", body: "We do not require accounts. Domain lookups are processed in real time and not stored against your identity. Server logs may temporarily contain IP addresses for abuse prevention (deleted within 30 days). Our analytics provider (Google Analytics 4) sets cookies." },
      { heading: "Advertising", body: "We display ads via Google AdSense and Adsterra. These networks use cookies for ad personalisation. You can opt out via Google's Ads Settings (adssettings.google.com) and aboutads.info." },
      { heading: "Cookies", body: "Cookies are used for analytics and advertising. You may disable cookies in your browser — the tools still work without them." },
      { heading: "Third-party services", body: "Google AdSense, Adsterra, Google Analytics, and our backend infrastructure provider. Each has its own privacy policy. We do not sell your data." },
      { heading: "Your rights", body: "EU/UK/California residents may request access, deletion, or portability of any personal data we hold. Email contact@sitehostfinder.com." },
      { heading: "Changes", body: "We may update this policy. Material changes will be announced on this page with a revised date." },
    ],
    faqs: [],
    related: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Contact", href: "/contact" },
    ],
    outbound: [
      { label: "Google Ads Settings", href: "https://adssettings.google.com", rel: "noopener noreferrer" },
      { label: "AboutAds opt-out", href: "https://www.aboutads.info", rel: "noopener noreferrer" },
    ],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
  {
    path: "/terms",
    title: "Terms of Service — Site Host Finder",
    description: "Terms governing your use of Site Host Finder's free host checker, DNS lookup, WHOIS, and related tools.",
    h1: "Terms of Service",
    intro: "By using Site Host Finder you agree to these Terms of Service. Please read them carefully before using our tools.",
    keywords: ["terms of service"],
    sections: [
      { heading: "Use of service", body: "Site Host Finder provides hosting lookup, DNS, WHOIS, and related tools 'as is' without warranties. Do not use the service for unlawful purposes, abuse our infrastructure, scrape at high volume, or attempt to disrupt the service." },
      { heading: "Accuracy of data", body: "DNS, WHOIS, and IP data may change at any time. We provide best-effort accuracy but make no guarantees. Do not rely solely on our output for critical decisions." },
      { heading: "Intellectual property", body: "All content, design, branding, and code are property of Site Host Finder. You may not reproduce, mirror, or redistribute without written permission." },
      { heading: "Affiliate disclosure", body: "We earn commissions from Hostinger referrals via the cloaked link at /go/hostinger. Recommendations are based on genuine evaluation; commissions do not increase your price." },
      { heading: "Limitation of liability", body: "Site Host Finder is not liable for any indirect, incidental, special, or consequential damages arising from use of the service." },
      { heading: "Changes to terms", body: "We may update these terms. Continued use constitutes acceptance of changes." },
    ],
    faqs: [],
    related: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Contact", href: "/contact" },
    ],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer — Site Host Finder",
    description: "Legal disclaimer for Site Host Finder's free tools, third-party data sources, and affiliate links.",
    h1: "Disclaimer",
    intro: "The information on Site Host Finder is provided in good faith for educational and informational purposes only. We make no representations about accuracy, completeness, or reliability.",
    keywords: ["disclaimer"],
    sections: [
      { heading: "No professional advice", body: "Content is not legal, financial, or technical advice. Consult qualified professionals before acting on anything you read here." },
      { heading: "Third-party data", body: "DNS, WHOIS, and IP geolocation data comes from third-party sources (registrars, regional registries, geolocation providers). We are not responsible for inaccuracies in upstream data." },
      { heading: "Affiliate links", body: "Some outbound links — notably the cloaked /go/hostinger link to Hostinger — are affiliate links. We earn a commission if you purchase through them at no extra cost to you. We only recommend products we have personally evaluated." },
      { heading: "External links", body: "We are not responsible for the content or practices of external websites linked from our pages." },
    ],
    faqs: [],
    related: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
  {
    path: "/about",
    title: "About Site Host Finder — Free Host Checker Tools",
    description: "Site Host Finder builds free host checker, DNS lookup, WHOIS, and webmaster tools used by developers and SEOs worldwide.",
    h1: "About Site Host Finder",
    intro: "Site Host Finder is an independent web tools project. We build free, fast hosting intelligence tools — used by developers, SEOs, agencies, and curious site owners worldwide.",
    keywords: ["about site host finder"],
    sections: [
      { heading: "Our mission", body: "Make hosting intelligence free, fast, and accurate. Most existing tools are slow, paywalled, or rate-limited. We are not." },
      { heading: "What we offer", body: "Free webmaster tools: master host checker (home page), DNS lookup, WHOIS lookup, IP checker, reverse IP, SSL checker, HTTP header inspector, CMS detector, website down checker, port checker, and domain compare. Plus guides explaining everything." },
      { heading: "How we fund this", body: "Advertising (Google AdSense, Adsterra) and Hostinger affiliate referrals via /go/hostinger. We never sell user data. Tools stay free forever." },
      { heading: "Get in touch", body: "Email contact@sitehostfinder.com for feedback, bug reports, partnership requests, or press inquiries." },
    ],
    faqs: [],
    related: [
      { label: "Host Checker", href: "/" },
      { label: "Hosting Guide", href: "/guides/what-is-web-hosting" },
      { label: "Contact", href: "/contact" },
    ],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.4",
    schemaType: "WebPage",
  },
  {
    path: "/contact",
    title: "Contact Site Host Finder",
    description: "Get in touch with Site Host Finder for feedback, bug reports, or partnership inquiries — we reply within 24–48 hours.",
    h1: "Contact Us",
    intro: "Questions, feedback, bug reports, or partnership ideas? We'd love to hear from you. We typically respond within 24–48 hours.",
    keywords: ["contact site host finder"],
    sections: [
      { heading: "Email", body: "Reach us at contact@sitehostfinder.com. For bug reports, please include the URL you were checking, your browser, and a screenshot if possible." },
      { heading: "Feedback", body: "Want a new tool? Found an inaccurate hosting match? Tell us. User feedback drives our roadmap." },
      { heading: "Partnerships & press", body: "For affiliate partnerships, API access, press inquiries, or sponsorships, use the same email." },
    ],
    faqs: [],
    related: [
      { label: "About Us", href: "/about" },
      { label: "Host Checker", href: "/" },
    ],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
];

export const ALL_ROUTES: RouteContent[] = [
  HOME_ROUTE,
  ...TOOL_ROUTES,
  ...GUIDE_ROUTES,
  ...POLICY_ROUTES,
];

// 301 redirects — old/duplicate URLs collapsed into the home host checker.
export const REDIRECTS_301: { from: string; to: string }[] = [
  { from: "/tools/hosting-checker", to: "/" },
  { from: "/tools/hosting-lookup", to: "/" },
  { from: "/tools/find-website-host", to: "/" },
  { from: "/tools/where-is-website-hosted", to: "/" },
  { from: "/tools/who-is-hosting", to: "/" },
];
