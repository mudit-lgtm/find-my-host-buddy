// Single source of truth for SEO content across all routes.
// Used by: page components (titles/H1/FAQ), sitemap generator, prerender script, and SEO audit.

export const BASE_URL = "https://site-host-finder.vercel.app";

export interface FAQ {
  q: string;
  a: string;
}

export interface RouteContent {
  path: string;
  title: string;          // <60c
  description: string;    // <155c
  h1: string;
  intro: string;          // AEO 40-60w intro
  keywords: string[];
  sections: { heading: string; body: string }[];
  faqs: FAQ[];
  related: { label: string; href: string }[];
  outbound: { label: string; href: string; rel?: string }[];
  category: "tool" | "guide" | "policy" | "home";
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
  schemaType?: "SoftwareApplication" | "Article" | "HowTo" | "WebPage";
  toolComponent?:
    | "HostingChecker"
    | "FindWebsiteHost"
    | "WhereIsHosted"
    | "WhoIsHosting"
    | "HostingLookup"
    | "DnsLookup"
    | "IpChecker"
    | "IsItUp"
    | "PortChecker"
    | "DomainCompare";
}

// Outbound authority links (reused)
const ICANN = { label: "ICANN — Domain Registration", href: "https://www.icann.org", rel: "noopener noreferrer" };
const IANA = { label: "IANA — Root Zone Database", href: "https://www.iana.org/domains/root/db", rel: "noopener noreferrer" };
const CLOUDFLARE_DNS = { label: "Cloudflare — What is DNS?", href: "https://www.cloudflare.com/learning/dns/what-is-dns/", rel: "noopener noreferrer" };
const CLOUDFLARE_HOST = { label: "Cloudflare — What is web hosting?", href: "https://www.cloudflare.com/learning/cdn/glossary/origin-server/", rel: "noopener noreferrer" };
const MDN_HTTP = { label: "MDN — HTTP overview", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", rel: "noopener noreferrer" };
const HOSTINGER = { label: "Get fast hosting from Hostinger", href: "/go/hostinger", rel: "nofollow sponsored noopener noreferrer" };
const LETSENCRYPT = { label: "Let's Encrypt — Free SSL", href: "https://letsencrypt.org/", rel: "noopener noreferrer" };

// Common tool-cross-links
const allTools = [
  { label: "Hosting Checker", href: "/tools/hosting-checker" },
  { label: "Find Website Host", href: "/tools/find-website-host" },
  { label: "Where Is Website Hosted", href: "/tools/where-is-website-hosted" },
  { label: "Who Is Hosting", href: "/tools/who-is-hosting" },
  { label: "Hosting Lookup", href: "/tools/hosting-lookup" },
  { label: "DNS Lookup", href: "/tools/dns-lookup" },
  { label: "IP Checker", href: "/tools/ip-checker" },
  { label: "Website Down Checker", href: "/tools/website-down-checker" },
  { label: "Port Checker", href: "/tools/port-checker" },
  { label: "Domain Compare", href: "/tools/domain-compare" },
];

const relatedToolsExcluding = (slug: string, count = 4) =>
  allTools.filter((t) => !t.href.endsWith(slug)).slice(0, count);

export const TOOL_ROUTES: RouteContent[] = [
  {
    path: "/tools/hosting-checker",
    title: "Host Checker — Free Hosting Checker for Any Website",
    description: "Free host checker tool. Enter any domain to instantly identify the hosting provider, server IP, location, and DNS records.",
    h1: "Host Checker — Find the Hosting Provider of Any Website",
    intro: "Our free host checker identifies who hosts any website in seconds. Enter a domain, and we resolve its DNS, geolocate the server IP, and match it against 500+ known hosting companies — no signup, no limits, accurate results worldwide.",
    keywords: ["host checker", "hosting checker", "hostchecker", "check host", "website hosting checker", "web host checker"],
    sections: [
      { heading: "What is a host checker?", body: "A host checker is an online tool that reveals which web hosting company powers any public website. It queries DNS, fetches the IP address, looks up the IP's owner, and matches that against a database of providers like AWS, Cloudflare, Hostinger, GoDaddy, Bluehost, DigitalOcean, and hundreds more." },
      { heading: "How our host checker works", body: "We perform real-time A and AAAA record resolution, then IP geolocation, then ASN ownership lookup. Results combine DNS, WHOIS, SSL fingerprint, and HTTP header analysis so you see the true hosting provider — even when sites sit behind Cloudflare or other CDNs." },
      { heading: "Who uses a hosting checker?", body: "Web developers verifying migrations, SEO professionals researching competitor infrastructure, agencies auditing client sites, and business owners confirming where their own websites live. Anyone asking 'check my host' or 'what host is this' gets an answer in under 3 seconds." },
    ],
    faqs: [
      { q: "How do I check who hosts a website?", a: "Enter the domain into our host checker above. We instantly resolve DNS, identify the server IP, and match it against 500+ hosting providers — results appear in seconds." },
      { q: "Is this host checker free?", a: "Yes. 100% free, unlimited lookups, no signup. We support free hosting checker queries for any public domain worldwide." },
      { q: "How accurate is the hostchecker result?", a: "We use live DNS resolution plus ASN/IP-range matching, which is the most accurate method short of contacting the site owner. Accuracy is >95% for non-CDN sites." },
      { q: "Why does the host checker show Cloudflare?", a: "If a site uses Cloudflare's proxy, all traffic terminates at Cloudflare edges. The host checker reports Cloudflare because Cloudflare is, technically, what's serving requests. The origin server is hidden by design." },
      { q: "Can I use this as a check host alternative?", a: "Yes — our hostchecker is a faster, cleaner alternative to other host check tools, with richer DNS, WHOIS, and security data included." },
    ],
    related: relatedToolsExcluding("hosting-checker"),
    outbound: [ICANN, CLOUDFLARE_HOST, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "HostingChecker",
  },
  {
    path: "/tools/find-website-host",
    title: "Find Website Host — Discover Any Site's Hosting Provider",
    description: "Find website host details instantly. Enter any domain to discover the hosting provider, IP address, and server location free.",
    h1: "Find Website Host — Who's Hosting Any Site",
    intro: "Need to find a website's host? Paste the URL and we identify the hosting company, IP, and server location. Built for developers, SEO pros, and business owners who need fast, accurate hosting intelligence without paywalls or signups.",
    keywords: ["find website host", "find my host", "find host of website", "find web host", "find hosting", "find host", "find out website host"],
    sections: [
      { heading: "Why find a website's host?", body: "Knowing who hosts a site lets you compare providers before switching, research competitor stacks, verify a migration finished cleanly, or simply answer 'find my host' for sites you manage. Hosting also affects speed, uptime, and SEO." },
      { heading: "How to find host of website in 30 seconds", body: "Enter the domain, click Find Host. We resolve A records, AAAA records, look up the IP's owning ASN, and surface the hosting provider's name. The same query returns nameservers, mail servers, and the registrar." },
      { heading: "Find web host vs find domain registrar", body: "The host is who serves your files (Hostinger, AWS, DigitalOcean). The registrar is who sold you the domain (GoDaddy, Namecheap, Cloudflare Registrar). They're often different companies and our tool surfaces both." },
    ],
    faqs: [
      { q: "How do I find out who is hosting any website?", a: "Type the domain into the tool above. We perform DNS resolution and IP geolocation, then match to our provider database — results in under 3 seconds." },
      { q: "Can I find website host without DNS knowledge?", a: "Yes. The tool handles all technical steps. You just enter the URL, the provider name appears." },
      { q: "How accurate is find website host data?", a: "Highly accurate for direct-hosted sites. For sites behind Cloudflare, Fastly, or Akamai, the CDN appears as the host because that's what answers requests." },
      { q: "Is find my host free for unlimited lookups?", a: "Yes — totally free, no rate limit, no signup required." },
    ],
    related: relatedToolsExcluding("find-website-host"),
    outbound: [CLOUDFLARE_HOST, ICANN, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "FindWebsiteHost",
  },
  {
    path: "/tools/where-is-website-hosted",
    title: "Where Is This Website Hosted? — Free Lookup",
    description: "Find out where any website is hosted. See the hosting provider, server city, country, and IP — free, instant, no signup.",
    h1: "Where Is This Website Hosted?",
    intro: "Wonder where a website is hosted? Our tool answers in seconds — showing the hosting provider, the server's physical city and country, plus the public IP address. Perfect for asking 'where is my site hosted' or auditing geographic data residency.",
    keywords: ["where is my website hosted", "where is this site hosted", "where is website hosted", "where is site hosted", "where is this website hosted", "where is my site hosted", "where is this hosted"],
    sections: [
      { heading: "What 'where is website hosted' actually means", body: "It means two things: (1) the company providing the server (the hosting provider), and (2) the physical location of that server. Our tool answers both — provider name plus city, region, and country from IP geolocation." },
      { heading: "Why server location matters", body: "Server geography affects page load speed (closer is faster), legal compliance (GDPR, data sovereignty), and SEO (Google considers server location as one weak ranking signal for local queries)." },
      { heading: "How to check where a website is hosted", body: "Enter the URL above. We resolve the A record, look up the IP geolocation, and combine it with hosting provider data. Works for any public domain — no login, no payment." },
    ],
    faqs: [
      { q: "Where is my website hosted?", a: "Enter your own domain in the box above. The tool returns the hosting provider, server IP, and the physical city/country where that server sits." },
      { q: "How accurate is server geolocation?", a: "City-level accuracy is typically 80-90%; country accuracy approaches 99%. CDN-fronted sites resolve to the CDN's edge city, not the origin." },
      { q: "Where is this site hosted vs where is the domain registered?", a: "Hosting is where the files live. Registration is which company sold you the domain. These are different — our tool shows both." },
      { q: "Can I move where my website is hosted?", a: "Yes. You can migrate hosting anytime by pointing your domain's nameservers to a new provider. We recommend Hostinger for fast, affordable hosting." },
    ],
    related: relatedToolsExcluding("where-is-website-hosted"),
    outbound: [CLOUDFLARE_HOST, ICANN, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "WhereIsHosted",
  },
  {
    path: "/tools/who-is-hosting",
    title: "Who Is Hosting This Site? — Free Host Identifier",
    description: "Find out who is hosting any website. Get the hosting company, IP, server location, and DNS records in seconds.",
    h1: "Who Is Hosting This Website?",
    intro: "Want to know who hosts a website? Enter the domain — we reveal the hosting company, IP address, server location, and DNS setup. Free, fast, and works for any public site. The go-to answer for 'who hosts this site' and 'who is hosting this site'.",
    keywords: ["who hosts this site", "who is hosting this site", "who hosts this website", "who host this", "who is hosting my website", "who is hosting this website"],
    sections: [
      { heading: "How we identify who is hosting a site", body: "Our tool combines DNS resolution, IP-to-ASN mapping, and reverse-DNS lookup. The result: the actual hosting company name (e.g., Amazon AWS, Google Cloud, Hostinger, DigitalOcean), not just an opaque IP." },
      { heading: "Common reasons to ask 'who hosts this'", body: "Competitive research — see what stack rivals trust. Sales prospecting — qualify leads by infrastructure quality. Due diligence — verify a partner's hosting before integration. Migration planning — replicate a setup you admire." },
      { heading: "What if the site uses Cloudflare?", body: "Cloudflare proxies hide the origin host. Our tool reports Cloudflare, plus all DNS records that may hint at the real backend (MX servers, TXT records often reveal the true infrastructure)." },
    ],
    faqs: [
      { q: "How do I find out who hosts a website?", a: "Use the lookup above. We identify the hosting provider in seconds via DNS and IP ownership data." },
      { q: "Who hosts this website I'm visiting?", a: "Paste the URL into our tool. The provider name, server location, and IP appear instantly." },
      { q: "Can I find who is hosting my website?", a: "Yes — enter your own domain and the result shows your current hosting company." },
      { q: "Is the who-is-hosting tool free?", a: "100% free, unlimited lookups, no signup, no API key." },
    ],
    related: relatedToolsExcluding("who-is-hosting"),
    outbound: [ICANN, CLOUDFLARE_HOST, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "WhoIsHosting",
  },
  {
    path: "/tools/hosting-lookup",
    title: "Hosting Lookup — Web Hosting Provider Lookup Tool",
    description: "Free hosting lookup tool. Enter any domain to lookup hosting provider, DNS records, WHOIS, IP, and server location.",
    h1: "Hosting Lookup — Web Hosting Provider Lookup",
    intro: "Run a complete hosting lookup on any domain. Our free web hosting lookup returns provider, IP, DNS, WHOIS, and server location in one report — designed for developers and SEOs who need a single source of truth for hosting intelligence.",
    keywords: ["hosting lookup", "web hosting lookup", "domain hosting lookup", "website host lookup", "hosting provider checker", "domain hosting"],
    sections: [
      { heading: "What a hosting lookup returns", body: "Hosting provider name, ASN, server IPv4 and IPv6, reverse DNS hostname, server city/country, nameservers (NS records), mail servers (MX), TXT/SPF records, WHOIS registration details, SSL certificate issuer, and HTTP response time." },
      { heading: "Hosting lookup vs WHOIS lookup", body: "WHOIS shows who registered the domain. A hosting lookup shows who serves the files. WHOIS data comes from registrar databases; hosting data comes from live DNS + IP ownership lookups. We perform both in a single query." },
      { heading: "Use cases for web hosting lookup", body: "Pre-purchase diligence on premium domains, migration verification, security incident response (identifying compromised infrastructure), sales-team account research, and bulk hosting audits via our domain compare tool." },
    ],
    faqs: [
      { q: "What is a hosting lookup?", a: "A hosting lookup is a tool that reveals the web hosting company behind any domain, plus its DNS, IP, and WHOIS data — all in one query." },
      { q: "Is the web hosting lookup tool free?", a: "Yes — free with no limits, no signup, no API key." },
      { q: "Does the hosting lookup work for any domain?", a: "Any public domain worldwide. Internal/intranet domains aren't resolvable and won't return results." },
      { q: "How do I do a domain hosting lookup for my own site?", a: "Enter your domain above. Useful to verify your hosting setup, debug DNS, or confirm a migration completed." },
    ],
    related: relatedToolsExcluding("hosting-lookup"),
    outbound: [ICANN, IANA, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "HostingLookup",
  },
  {
    path: "/tools/dns-lookup",
    title: "DNS Lookup — Free DNS Records Checker (A, MX, NS, TXT)",
    description: "Free DNS lookup tool. View A, AAAA, MX, NS, TXT, CNAME records for any domain — instant results, no signup required.",
    h1: "DNS Lookup — Free DNS Records Checker",
    intro: "Look up DNS records for any domain. Our free DNS lookup returns A, AAAA, MX, NS, TXT, and CNAME records — essential for debugging email, verifying nameserver changes, and confirming DNS propagation worldwide.",
    keywords: ["dns lookup", "dns hosting checker", "dns records", "nameserver lookup", "mx record check"],
    sections: [
      { heading: "What DNS lookup means", body: "DNS lookup is the act of querying authoritative nameservers to retrieve a domain's records. A records map to IPv4, AAAA to IPv6, MX to mail servers, NS to nameservers, TXT to verification strings (SPF, DKIM, DMARC), and CNAME to aliases." },
      { heading: "When to use a DNS lookup tool", body: "After moving hosts (verify propagation), debugging email delivery (check MX and SPF), setting up Google Workspace or Microsoft 365 (validate TXT verification), or auditing whether DNS changes have rolled out globally." },
      { heading: "DNS lookup vs nslookup", body: "nslookup is a command-line tool. Our web DNS lookup gives the same data with a friendlier UI, queries multiple record types in one shot, and shows propagation hints — no terminal required." },
    ],
    faqs: [
      { q: "What does a DNS lookup return?", a: "A, AAAA, MX, NS, TXT, and CNAME records for the domain you query — typically in under a second." },
      { q: "Is the DNS lookup tool free?", a: "Yes — free, unlimited, no signup." },
      { q: "How long does DNS propagation take?", a: "Typically 1-48 hours depending on TTL. Use this tool to verify when changes have propagated to public resolvers." },
      { q: "Can I check MX records here?", a: "Yes — MX records are part of the standard output." },
    ],
    related: relatedToolsExcluding("dns-lookup"),
    outbound: [CLOUDFLARE_DNS, IANA, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "DnsLookup",
  },
  {
    path: "/tools/ip-checker",
    title: "IP Checker — What's My IP & IP Host Lookup",
    description: "Free IP checker. See your public IP address and look up the hosting provider, location, and ASN of any IP address.",
    h1: "IP Checker — What's My IP & IP Host Lookup",
    intro: "Our free IP checker shows your public IPv4 address instantly, plus lets you look up any IP's hosting provider, ASN, and geographic location. Useful for VPN verification, firewall whitelists, and answering 'ip host checker' queries.",
    keywords: ["ip host checker", "ip check host", "ip checker", "what is my ip", "ip address lookup", "find ip host"],
    sections: [
      { heading: "What is an IP checker?", body: "An IP checker tool displays your public IP address (what websites see) and lets you inspect any IPv4/IPv6 address to reveal its owner, hosting company, country, and city. Useful for both end users and network engineers." },
      { heading: "Public IP vs private IP", body: "Your private IP (192.168.x.x or 10.x.x.x) is only visible inside your local network. Your public IP is what every website sees — assigned by your ISP and what we display above." },
      { heading: "IP host checker for domains", body: "Enter a domain instead of an IP and our tool resolves it to its server IP, then identifies that IP's hosting company. The same engine powers our hosting checker." },
    ],
    faqs: [
      { q: "What is my IP address?", a: "Your public IPv4 appears at the top of this page automatically. It's what websites and servers see when you connect to them." },
      { q: "How does an IP host checker work?", a: "It looks up the IP address in regional registry databases (ARIN, RIPE, APNIC) to find the owning organization, then matches that to known hosting providers." },
      { q: "Is the IP check tool free?", a: "Yes — free with unlimited queries, no signup required." },
      { q: "Can I find ip host of any website?", a: "Yes — enter the domain or IP and the tool returns the hosting provider, city, country, and ASN." },
    ],
    related: relatedToolsExcluding("ip-checker"),
    outbound: [{ label: "ARIN — Regional Internet Registry", href: "https://www.arin.net/", rel: "noopener noreferrer" }, CLOUDFLARE_HOST, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "IpChecker",
  },
  {
    path: "/tools/website-down-checker",
    title: "Is It Down? — Free Website Down Checker",
    description: "Check if any website is down for everyone or just you. Free website down checker — real-time status, response time, and HTTP code.",
    h1: "Is This Website Down? — Free Down Checker",
    intro: "Check whether a website is down for everyone or just you. Our free website down checker pings the URL in real time and reports the HTTP status code, response time, and reachability — no signup, instant answer.",
    keywords: ["is it up", "is it down", "website down checker", "site down", "is this site down"],
    sections: [
      { heading: "Why your favorite site might be 'down'", body: "Common causes: DNS misconfiguration, expired SSL certificate, server overload, scheduled maintenance, or your local ISP routing problem. Our checker rules out local issues by testing from our servers — if we get through, the site is up for the rest of the world." },
      { heading: "How the down checker works", body: "We send a real HTTP GET request from our servers and measure response time and status code. 200-299 means up. 4xx/5xx means the server is reachable but returning errors. Timeout/network errors mean truly down." },
      { heading: "What to do when a site is genuinely down", body: "Check the host's status page. Run a DNS lookup to confirm records are correct. Verify SSL hasn't expired. If you own the site, contact your hosting provider — slow or unreliable hosts cost SEO ranking." },
    ],
    faqs: [
      { q: "Is my favorite website down?", a: "Enter it above. We check from our servers — if we get through, the issue is local to your network or ISP." },
      { q: "What does a 503 error mean?", a: "Service Unavailable. The server is up but temporarily overloaded or in maintenance. Try again in a few minutes." },
      { q: "Is the website down checker free?", a: "Yes — free, unlimited, no signup." },
      { q: "How often can I check the same site?", a: "As often as you want. We don't rate-limit." },
    ],
    related: relatedToolsExcluding("website-down-checker"),
    outbound: [MDN_HTTP, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "IsItUp",
  },
  {
    path: "/tools/port-checker",
    title: "Port Checker — Test if a TCP Port Is Open",
    description: "Free port checker. Test if any TCP port is open on a server — great for firewall debugging and service availability verification.",
    h1: "Port Checker — Test Open TCP Ports",
    intro: "Test whether a specific TCP port is open on any public host. Our free port checker is perfect for firewall debugging, verifying services like SSH, HTTPS, SMTP, MySQL are reachable from the public internet, and diagnosing 'connection refused' errors.",
    keywords: ["port checker", "open port test", "tcp port check", "is port open"],
    sections: [
      { heading: "What is a port checker?", body: "A port checker attempts a TCP connection to a specific port on a remote host. If the connection succeeds, the port is open and listening. If it times out, the port is filtered or closed." },
      { heading: "Common ports to test", body: "22 (SSH), 25/465/587 (SMTP), 80 (HTTP), 443 (HTTPS), 3306 (MySQL), 5432 (PostgreSQL), 6379 (Redis), 27017 (MongoDB), 8080/8443 (alt HTTP/HTTPS)." },
      { heading: "Why a port might appear closed", body: "Firewall rules (cloud security group, iptables), the service isn't running, the service binds to localhost only (127.0.0.1 instead of 0.0.0.0), or your hosting provider blocks the port by default." },
    ],
    faqs: [
      { q: "How do I check if a port is open?", a: "Enter the host and port above, hit check. If we connect, it's open." },
      { q: "Is the port checker free?", a: "Yes — free, unlimited tests." },
      { q: "Why is port 25 always blocked?", a: "Most hosting providers and home ISPs block outbound port 25 to prevent spam. Use 587 (submission) or 465 (SMTPS) for email." },
      { q: "Can I scan multiple ports?", a: "Currently single-port. Don't use this tool for unauthorized port scanning — that's illegal in most jurisdictions." },
    ],
    related: relatedToolsExcluding("port-checker"),
    outbound: [{ label: "IANA — Service Name and Port Registry", href: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", rel: "noopener noreferrer" }, HOSTINGER],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "PortChecker",
  },
  {
    path: "/tools/domain-compare",
    title: "Domain Compare — Side-by-Side Hosting Comparison",
    description: "Compare two domains side by side — hosting provider, IP, DNS, WHOIS, performance. Free domain compare tool.",
    h1: "Domain Compare — Side-by-Side Hosting Comparison",
    intro: "Compare two domains side by side — hosting provider, server location, DNS records, WHOIS, SSL grade, and performance. Perfect for competitive research, agency client audits, and migration planning. Free with no signup.",
    keywords: ["compare domains", "domain compare", "side by side hosting compare", "competitor hosting research"],
    sections: [
      { heading: "What domain compare reveals", body: "Both domains' hosting provider, IP geolocation, nameservers, mail servers, TLS grade, performance scores, and WHOIS registration. Differences are highlighted so you can spot infrastructure gaps instantly." },
      { heading: "Use cases for domain compare", body: "Competitive analysis (what's the competition running?), agency reporting (your client vs their rival), pre-migration benchmarking, and qualifying sales prospects by infrastructure maturity." },
      { heading: "What 'better' hosting looks like", body: "Lower TTFB, modern TLS (1.3), HTTP/2 or HTTP/3 support, geographic proximity to audience, strong security headers (HSTS, CSP, X-Frame-Options), and a reputable provider like Hostinger, AWS, or Cloudflare." },
    ],
    faqs: [
      { q: "How does domain compare work?", a: "Enter two domains. We run our full hosting lookup on each in parallel and present the data side by side, highlighting differences." },
      { q: "Is domain compare free?", a: "Yes — free, no signup, unlimited comparisons." },
      { q: "Can I compare more than two domains?", a: "Currently two at a time. Run multiple sessions for larger batches." },
    ],
    related: relatedToolsExcluding("domain-compare"),
    outbound: [HOSTINGER, ICANN],
    category: "tool",
    changefreq: "weekly",
    priority: "0.9",
    schemaType: "SoftwareApplication",
    toolComponent: "DomainCompare",
  },
];

export const GUIDE_ROUTES: RouteContent[] = [
  {
    path: "/guides/what-is-web-hosting",
    title: "What Is Web Hosting? A Beginner's Guide (2026)",
    description: "Web hosting explained simply. Learn what hosting is, how it works, types of hosting, and how to choose the right provider.",
    h1: "What Is Web Hosting? A Beginner's Guide",
    intro: "Web hosting is the service of renting space on a server connected to the internet so your website's files can be accessed by anyone with the URL. Without hosting, a website exists only on your laptop and nobody else can visit it.",
    keywords: ["what is web hosting", "web hosting explained", "hosting for beginners"],
    sections: [
      { heading: "How web hosting works", body: "When a visitor types your domain, their browser asks DNS for the IP address. DNS returns the IP of your hosting server. The browser then sends an HTTP request to that server, which responds with your website's HTML, CSS, images, and JavaScript." },
      { heading: "Types of web hosting", body: "Shared hosting (cheapest, slowest, many sites per server), VPS (dedicated slice of a server, faster, more control), Cloud hosting (scales automatically across many servers), Dedicated (an entire physical machine, expensive). Most new sites start on shared or cloud." },
      { heading: "What to look for in a host", body: "Uptime guarantee (99.9%+), fast SSD/NVMe storage, free SSL, daily backups, good support, modern PHP/Node runtimes, and a transparent renewal price. Hostinger and SiteGround are popular starting points." },
      { heading: "How much does hosting cost?", body: "Shared hosting starts at $2-5/month. VPS runs $5-30/month. Cloud hosting bills by usage. Dedicated servers start at $80+/month. Most sites under 10k monthly visitors are fine on shared or basic cloud." },
    ],
    faqs: [
      { q: "Do I need web hosting if I have a domain?", a: "Yes. A domain is just an address. Hosting is the actual space where your website lives. You need both." },
      { q: "Can I host a website for free?", a: "Yes, but with severe limits — ads, branded subdomains, no email. For serious projects, paid hosting from a few dollars/month is worth it." },
      { q: "What's the best web hosting for beginners?", a: "Hostinger is the most popular budget option — affordable, fast, includes a free domain. See our best hosting for beginners guide." },
    ],
    related: [
      { label: "Best Web Hosting for Beginners", href: "/guides/best-web-hosting-for-beginners" },
      { label: "Shared vs VPS vs Cloud Hosting", href: "/guides/shared-vs-vps-vs-cloud-hosting" },
      { label: "How to Find Where a Website Is Hosted", href: "/guides/how-to-find-where-a-website-is-hosted" },
      { label: "Hosting Checker Tool", href: "/tools/hosting-checker" },
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
    description: "Compare shared, VPS, and cloud hosting. Learn the differences in price, performance, and scalability to pick the right type.",
    h1: "Shared vs VPS vs Cloud Hosting — Complete Comparison",
    intro: "Shared hosting puts many sites on one server (cheap, slow). VPS gives you a dedicated slice with root access (faster, more flexible). Cloud hosting scales across many servers (most resilient, pay-as-you-go). The right pick depends on traffic, budget, and technical comfort.",
    keywords: ["shared vs vps hosting", "cloud hosting vs vps", "types of hosting"],
    sections: [
      { heading: "Shared hosting: best for starters", body: "Sub-$5/month. Resources pooled across hundreds of sites. Fine for blogs, portfolios, small business sites under 10k monthly visits. Slow at scale because noisy neighbors can hog CPU." },
      { heading: "VPS hosting: best for control", body: "$5-30/month. Virtualized server slice with guaranteed CPU, RAM, and disk. Root access lets you install anything. Best for developers, custom apps, or sites outgrowing shared." },
      { heading: "Cloud hosting: best for scale", body: "Pay-per-use. Auto-scales during traffic spikes, distributes across regions. AWS, Google Cloud, DigitalOcean lead. Better uptime than single-server alternatives because hardware failure is invisible." },
      { heading: "How to choose", body: "<10k visits/month and no special needs → shared. Custom apps or technical control → VPS. Variable traffic, must-not-go-down requirements → cloud. Most sites can run our hosting checker on competitors to see what stack works for similar traffic." },
    ],
    faqs: [
      { q: "Is VPS faster than shared hosting?", a: "Usually yes — guaranteed resources mean predictable performance vs shared's variable speed." },
      { q: "Is cloud hosting always better than VPS?", a: "Not always. Cloud is better for variable traffic. A consistent workload can be cheaper on VPS." },
      { q: "Can I upgrade from shared to VPS later?", a: "Yes — most providers offer easy upgrade paths, often with free migration assistance." },
    ],
    related: [
      { label: "What Is Web Hosting?", href: "/guides/what-is-web-hosting" },
      { label: "Best Hosting for Beginners", href: "/guides/best-web-hosting-for-beginners" },
      { label: "Hosting Lookup Tool", href: "/tools/hosting-lookup" },
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
    description: "Step-by-step guide to find where any website is hosted. Use DNS lookup, IP geolocation, WHOIS, and our free hosting checker.",
    h1: "How to Find Where a Website Is Hosted",
    intro: "There are four reliable ways to find where a website is hosted: use a hosting checker tool, do a DNS lookup to get the IP and trace ownership, run a WHOIS lookup for registrar context, or inspect SSL certificate details. The fastest is method one — our free hosting checker.",
    keywords: ["how to find where a website is hosted", "how to find out who is hosting a website", "find host of website tutorial"],
    sections: [
      { heading: "Method 1: Use our hosting checker", body: "Open our hosting checker, paste the domain, click Find Host. The tool resolves DNS, geolocates the IP, and matches it against 500+ providers. Takes 3 seconds. Most accurate for non-CDN sites." },
      { heading: "Method 2: DNS lookup + IP geolocation", body: "Run dig or nslookup on the domain to get the A record (IPv4). Then look up that IP in an ASN database to find the owning organization. Our DNS lookup tool combines both steps." },
      { heading: "Method 3: WHOIS lookup", body: "WHOIS shows who registered the domain but rarely reveals hosting directly. It's useful supplementary data — registrar and contact info often hint at the host." },
      { heading: "Method 4: SSL certificate inspection", body: "Click the padlock in your browser, view the certificate. The issuer (Let's Encrypt, Sectigo) and Subject Alternative Names can reveal infrastructure clues, especially for shared hosting platforms." },
    ],
    faqs: [
      { q: "What's the fastest way to find a website's host?", a: "Use our free hosting checker — paste the domain, answer in 3 seconds." },
      { q: "Can I find the host of a Cloudflare-protected site?", a: "Not directly. Cloudflare hides the origin. MX records and TXT records sometimes leak the true backend." },
      { q: "Is finding a website's host legal?", a: "Yes. DNS and WHOIS data are public records by design." },
    ],
    related: [
      { label: "Hosting Checker", href: "/tools/hosting-checker" },
      { label: "DNS Lookup", href: "/tools/dns-lookup" },
      { label: "IP Checker", href: "/tools/ip-checker" },
      { label: "Find Website Host", href: "/tools/find-website-host" },
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
    description: "Top web hosting picks for beginners. Compare features, pricing, and ease of use. Hostinger leads for value and simplicity.",
    h1: "Best Web Hosting for Beginners in 2026",
    intro: "For most beginners, Hostinger offers the best combination of price (from $2.99/month), speed (LiteSpeed servers + NVMe SSD), free domain for the first year, and a beginner-friendly control panel. It's our top recommendation for first-time site owners in 2026.",
    keywords: ["best web hosting beginners", "hostinger review", "cheap web hosting"],
    sections: [
      { heading: "Why Hostinger wins for beginners", body: "Pricing starts at $2.99/month, includes a free domain, free SSL, free email, daily backups, and a custom hPanel that's simpler than cPanel. LiteSpeed + NVMe SSD gives speeds rivalling much pricier hosts. Try Hostinger →" },
      { heading: "What to look for as a beginner", body: "One-click WordPress install, free SSL, included email, daily backups, 24/7 chat support, transparent renewal pricing, and a 30-day money-back guarantee. Hostinger checks all of these." },
      { heading: "Common beginner mistakes to avoid", body: "Don't pay yearly upfront without testing first. Skip 'unlimited' marketing claims (always rate-limited). Avoid hosts without free SSL — paying for SSL in 2026 is a red flag. Always check renewal prices, not just intro prices." },
      { heading: "Quick comparison vs competitors", body: "Bluehost is similar price but slower in benchmarks. SiteGround is faster but 3-4x the price. DreamHost is reliable but pricier than Hostinger. For raw value, Hostinger wins. Verify with our hosting checker on similar sites." },
    ],
    faqs: [
      { q: "Is Hostinger good for beginners?", a: "Yes — it's the most beginner-friendly mainstream host. Simple control panel, generous starter plan, included domain and SSL. Try Hostinger →" },
      { q: "How much should a beginner pay for hosting?", a: "$3-5/month is enough for any beginner site. Don't pay more until traffic justifies upgrading." },
      { q: "Can I switch hosts later?", a: "Yes — easily. Most quality hosts (including Hostinger) offer free migration if you outgrow your current setup." },
    ],
    related: [
      { label: "What Is Web Hosting?", href: "/guides/what-is-web-hosting" },
      { label: "Shared vs VPS vs Cloud", href: "/guides/shared-vs-vps-vs-cloud-hosting" },
      { label: "Hosting Checker", href: "/tools/hosting-checker" },
      { label: "Domain Compare", href: "/tools/domain-compare" },
    ],
    outbound: [HOSTINGER, { label: "Hostinger Knowledge Base", href: "https://support.hostinger.com/", rel: "nofollow noopener noreferrer" }],
    category: "guide",
    changefreq: "monthly",
    priority: "0.8",
    schemaType: "Article",
  },
];

export const POLICY_ROUTES: RouteContent[] = [
  {
    path: "/privacy",
    title: "Privacy Policy — Site Host Finder",
    description: "How Site Host Finder collects, uses, and protects your data. Privacy practices for our free hosting checker tool.",
    h1: "Privacy Policy",
    intro: "Site Host Finder respects your privacy. This page explains what data we collect, how we use it, who we share it with, and your rights.",
    keywords: ["privacy policy"],
    sections: [
      { heading: "Information we collect", body: "We do not require accounts. Domain lookups are processed in real time and not stored against your identity. Server logs may temporarily contain IP addresses for abuse prevention (deleted within 30 days). Our analytics provider (Google Analytics 4) sets cookies." },
      { heading: "Advertising", body: "We display ads via Google AdSense and Adsterra. These networks use cookies for ad personalization. You can opt out via Google's Ads Settings (adssettings.google.com) and aboutads.info." },
      { heading: "Cookies", body: "Cookies are used for analytics and advertising. You may disable cookies in your browser — the tools still work without them." },
      { heading: "Third-party services", body: "Google AdSense, Adsterra, Google Analytics, and Supabase (backend). Each has its own privacy policy. We do not sell your data." },
      { heading: "Your rights", body: "EU/UK/California residents may request access, deletion, or portability of any personal data we hold. Email contact@sitehostfinder.com." },
      { heading: "Changes", body: "We may update this policy. Material changes will be announced on this page with a revised date." },
    ],
    faqs: [],
    related: [],
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
    description: "Terms governing your use of Site Host Finder's free hosting checker, DNS lookup, and related tools.",
    h1: "Terms of Service",
    intro: "By using Site Host Finder you agree to these Terms of Service. Read them carefully before using our tools.",
    keywords: ["terms of service"],
    sections: [
      { heading: "Use of service", body: "Site Host Finder provides hosting lookup, DNS records, WHOIS, and related tools 'as is' without warranties. Do not use the service for unlawful purposes, abuse our infrastructure, scrape at high volume, or attempt to disrupt the service." },
      { heading: "Accuracy of data", body: "DNS, WHOIS, and IP data may change at any time. We provide best-effort accuracy but make no guarantees. Do not rely solely on our output for critical decisions." },
      { heading: "Intellectual property", body: "All content, design, branding, and code are property of Site Host Finder. You may not reproduce, mirror, or redistribute without written permission." },
      { heading: "Affiliate disclosure", body: "We earn commissions from Hostinger referrals. Recommendations are based on genuine quality evaluation; commissions do not increase your price." },
      { heading: "Limitation of liability", body: "Site Host Finder is not liable for any indirect, incidental, special, or consequential damages arising from use of the service." },
      { heading: "Changes to terms", body: "We may update these terms. Continued use constitutes acceptance of changes." },
    ],
    faqs: [],
    related: [],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer — Site Host Finder",
    description: "Legal disclaimer for Site Host Finder's free tools, third-party data, and affiliate links.",
    h1: "Disclaimer",
    intro: "The information on Site Host Finder is provided in good faith for educational and informational purposes only. We make no representations about accuracy, completeness, or reliability.",
    keywords: ["disclaimer"],
    sections: [
      { heading: "No professional advice", body: "Content is not legal, financial, or technical advice. Consult qualified professionals before acting on anything you read here." },
      { heading: "Third-party data", body: "DNS, WHOIS, and IP geolocation data comes from third-party sources (registrars, regional registries, geolocation providers). We are not responsible for inaccuracies in upstream data." },
      { heading: "Affiliate links", body: "Some outbound links (notably to Hostinger) are affiliate links — we earn a commission if you purchase through them at no extra cost to you. We only recommend products we have personally evaluated." },
      { heading: "External links", body: "We are not responsible for the content or practices of external websites linked from our pages." },
    ],
    faqs: [],
    related: [],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
  {
    path: "/about",
    title: "About Site Host Finder — Free Hosting Checker Tools",
    description: "Site Host Finder builds free hosting checker, DNS lookup, and WHOIS tools used by developers and SEOs worldwide.",
    h1: "About Site Host Finder",
    intro: "Site Host Finder is an independent web tools project. We build free, fast hosting intelligence tools — used by developers, SEOs, agencies, and curious site owners worldwide.",
    keywords: ["about site host finder"],
    sections: [
      { heading: "Our mission", body: "Make hosting intelligence free, fast, and accurate. Most existing tools are slow, paywalled, or limit lookups. We don't." },
      { heading: "What we offer", body: "10 free tools: hosting checker, find website host, where is website hosted, who is hosting, hosting lookup, DNS lookup, IP checker, website down checker, port checker, domain compare. Plus guides explaining everything." },
      { heading: "How we fund this", body: "Advertising (Google AdSense, Adsterra) and Hostinger affiliate referrals. We never sell user data. Tools stay free forever." },
      { heading: "Get in touch", body: "Email contact@sitehostfinder.com for feedback, bug reports, partnership requests, or press inquiries." },
    ],
    faqs: [],
    related: [
      { label: "All Tools", href: "/" },
      { label: "Hosting Guide", href: "/guides/what-is-web-hosting" },
    ],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
  {
    path: "/contact",
    title: "Contact Site Host Finder",
    description: "Get in touch with Site Host Finder for feedback, bug reports, or partnership inquiries.",
    h1: "Contact Us",
    intro: "Questions, feedback, bug reports, or partnership ideas? We'd love to hear from you. We typically respond within 24-48 hours.",
    keywords: ["contact site host finder"],
    sections: [
      { heading: "Email", body: "Reach us at contact@sitehostfinder.com. For bug reports, please include the URL you were checking, your browser, and a screenshot if possible." },
      { heading: "Feedback", body: "Want a new tool? Found an inaccurate hosting match? Tell us. User feedback drives our roadmap." },
      { heading: "Partnerships & press", body: "For affiliate partnerships, API access requests, press inquiries, or sponsorships, use the same email." },
    ],
    faqs: [],
    related: [
      { label: "About Us", href: "/about" },
      { label: "All Tools", href: "/" },
    ],
    outbound: [],
    category: "policy",
    changefreq: "yearly",
    priority: "0.3",
    schemaType: "WebPage",
  },
];

export const HOME_ROUTE: RouteContent = {
  path: "/",
  title: "Site Host Finder — Free Hosting Checker & Host Finder Tool",
  description: "Free hosting checker. Find website host, hosting provider, DNS, IP, WHOIS for any domain instantly. No signup, unlimited lookups.",
  h1: "Find Out Who Is Hosting Any Website",
  intro: "Site Host Finder is the free hosting checker used by thousands of developers, SEOs, and site owners. Enter any domain to discover the hosting provider, IP address, server location, DNS records, and WHOIS data instantly.",
  keywords: ["hosting checker", "find website host", "host finder", "web host checker"],
  sections: [],
  faqs: [],
  related: [],
  outbound: [],
  category: "home",
  changefreq: "weekly",
  priority: "1.0",
  schemaType: "WebPage",
};

export const ALL_ROUTES: RouteContent[] = [
  HOME_ROUTE,
  ...TOOL_ROUTES,
  ...GUIDE_ROUTES,
  ...POLICY_ROUTES,
];

// Sitemap-only entries (no full page content)
export const PRERENDER_PATHS = ALL_ROUTES.map((r) => r.path);
