// AEO/GEO enrichment blocks per route: key takeaways (answer-engine friendly),
// common errors (mistake → fix), and a closing summary. Merged into the route
// objects in keywordMap.ts so both the React pages and the prerenderer use them.

import type { CommonError } from "./keywordMap";

export interface RouteExtras {
  keyTakeaways: string[];
  commonErrors: CommonError[];
  summary: string;
}

export const ROUTE_EXTRAS: Record<string, RouteExtras> = {
  "/": {
    keyTakeaways: [
      "Paste any domain to see its hosting provider, IP address, server location, nameservers and WHOIS data in one lookup.",
      "Results come from live DNS resolution, so they reflect the site's configuration right now — not a cached snapshot.",
      "If a site sits behind Cloudflare or another CDN, the CDN is reported first; the origin host stays hidden by design.",
      "Free and unlimited worldwide — no account, no rate limit, works for any public domain in any country.",
    ],
    commonErrors: [
      { mistake: "Entering a full URL with a path or tracking parameters", fix: "Only the domain matters — example.com and https://example.com/page/?utm=1 resolve identically, but the bare domain is fastest." },
      { mistake: "Assuming the CDN in the result is the real host", fix: "When Cloudflare, Fastly or Akamai appears, check MX records and historical WHOIS to infer the origin hosting provider." },
      { mistake: "Checking a domain minutes after changing nameservers", fix: "DNS propagation takes up to 48 hours; re-run the lookup later or query the new nameserver directly." },
    ],
    summary: "Site Host Finder answers \"who is hosting this website?\" in one step by combining DNS, IP geolocation, provider matching and WHOIS into a single free report. Use the host checker above for a full picture, then jump into the dedicated DNS, WHOIS, SSL, header, reverse IP or CMS tools when you need to dig into one layer.",
  },

  "/tools/dns-lookup": {
    keyTakeaways: [
      "A DNS lookup shows the A, AAAA, MX, NS, TXT and CNAME records that route a domain's traffic and email.",
      "A records point to IPv4 addresses, AAAA to IPv6, MX to mail servers and NS to the authoritative nameservers.",
      "TXT records carry SPF, DKIM and domain-verification strings — the first place to look when email fails.",
      "Records are fetched live from authoritative nameservers, so edits appear as soon as they propagate.",
    ],
    commonErrors: [
      { mistake: "Adding a second A record instead of replacing the old one", fix: "Delete the outdated A record — two conflicting A records make browsers round-robin between servers." },
      { mistake: "Publishing more than one SPF TXT record", fix: "Merge all senders into a single SPF record; multiple SPF records are an automatic validation failure." },
      { mistake: "Pointing a CNAME at the root domain", fix: "Use an A record or an ALIAS/ANAME record at the apex — CNAME at the root breaks MX and NS resolution." },
    ],
    summary: "Use this free DNS lookup tool whenever a domain resolves to the wrong server, email stops arriving, or a verification record needs confirming. Check the A and AAAA records for hosting, MX for mail, NS for delegation and TXT for policy — then pair it with the WHOIS lookup and reverse IP lookup for the complete infrastructure picture.",
  },

  "/tools/whois-lookup": {
    keyTakeaways: [
      "WHOIS reveals the registrar, registration date, expiry date, status codes and nameservers of any domain.",
      "Domain age from the creation date is a practical trust and SEO signal when vetting a site or backlink.",
      "GDPR privacy services redact personal owner data, but registrar, dates and nameservers stay public.",
      "Registrar and hosting provider are different companies — WHOIS names the registrar, DNS names the host.",
    ],
    commonErrors: [
      { mistake: "Reading a redacted WHOIS record as \"no owner\"", fix: "Redaction is privacy protection, not an error — contact the owner through the registrar's anonymised forwarding address." },
      { mistake: "Confusing the registrar with the web host", fix: "Run the host checker or DNS lookup to identify the hosting provider; WHOIS only reports where the domain was registered." },
      { mistake: "Ignoring clientTransferProhibited or pendingDelete status codes", fix: "Resolve the status at the registrar before attempting a transfer or purchase — those codes block both." },
    ],
    summary: "A WHOIS lookup is the fastest way to verify who registered a domain, when it expires and which registrar controls it. Use it to vet sellers before a domain purchase, audit link partners, track your own renewal dates, and confirm nameserver delegation alongside the DNS lookup tool.",
  },

  "/tools/ip-checker": {
    keyTakeaways: [
      "See your own public IPv4 and IPv6 address instantly, plus the ISP and approximate location attached to it.",
      "Look up any other IP address to reveal its hosting provider, ASN, organisation and data-centre country.",
      "IP geolocation is accurate to country and usually city level — it is never a precise street address.",
      "A VPN or proxy changes the IP that websites see; check here to confirm your VPN is actually active.",
    ],
    commonErrors: [
      { mistake: "Expecting a street-level location from an IP", fix: "Treat IP geolocation as country/region-level only; registries map IP ranges to organisations, not households." },
      { mistake: "Assuming a changed IP means a hack", fix: "Most home connections use dynamic IPs that rotate on reconnect — compare the ISP and ASN instead of the raw number." },
      { mistake: "Testing an IPv6-only setup with IPv4 tools", fix: "Check both the A (IPv4) and AAAA (IPv6) results; some networks report only one stack." },
    ],
    summary: "This free IP checker answers both \"what is my IP address?\" and \"who owns this IP?\" in one place. Use it to confirm a VPN is working, identify the host behind a server IP, and then run a reverse IP lookup to see which other websites share that same address.",
  },

  "/tools/reverse-ip-lookup": {
    keyTakeaways: [
      "A reverse IP lookup lists the other websites that resolve to the same IP address or server.",
      "Dozens of unrelated domains on one IP usually means shared hosting; one or two suggests VPS or dedicated.",
      "Neighbours matter: spammy sites on a shared IP can affect email deliverability and reputation scores.",
      "CDN-fronted IPs are shared by thousands of sites, so those results reflect the CDN, not real neighbours.",
    ],
    commonErrors: [
      { mistake: "Running a reverse lookup on a Cloudflare IP", fix: "Resolve the origin IP first — CDN edge addresses serve millions of domains and produce meaningless neighbour lists." },
      { mistake: "Treating shared hosting as automatically harmful", fix: "Shared IPs are normal and fine for most sites; only investigate if you see abuse patterns or blacklisting." },
      { mistake: "Expecting a complete list of every domain", fix: "No reverse IP dataset is exhaustive — use results as a strong sample, not a definitive inventory." },
    ],
    summary: "Reverse IP lookup turns a single IP address into a map of everything hosted beside it — ideal for shared-hosting audits, competitor research, spotting PBN footprints and diagnosing email reputation problems. Combine it with the IP checker to confirm ownership and the host checker to name the provider.",
  },

  "/tools/ssl-checker": {
    keyTakeaways: [
      "The SSL checker reports the certificate issuer, validity dates, covered hostnames, key strength and TLS version.",
      "An expired or mismatched certificate triggers full-page browser warnings and destroys conversions.",
      "Free Let's Encrypt certificates renew every 90 days; a failed renewal is the most common cause of outages.",
      "Wildcard certificates cover *.example.com but not example.com itself unless it is listed explicitly.",
    ],
    commonErrors: [
      { mistake: "Installing the leaf certificate without the intermediate chain", fix: "Add the full chain bundle — browsers may accept it while Android apps and older clients reject it." },
      { mistake: "Securing example.com but not www.example.com", fix: "Include both hostnames in the certificate SAN list, or redirect one to the other before the TLS handshake." },
      { mistake: "Serving mixed content over HTTPS", fix: "Update every internal image, script and stylesheet URL to https:// so the padlock stays intact." },
    ],
    summary: "Run this free SSL checker before launches and after every certificate renewal to confirm HTTPS is valid, complete and trusted worldwide. Check expiry early, verify the chain, then use the HTTP header checker to confirm HSTS and redirect behaviour are configured correctly.",
  },

  "/tools/http-headers": {
    keyTakeaways: [
      "HTTP response headers expose the status code, server software, redirect chain, caching rules and security policy.",
      "A 200 means success, 301 a permanent redirect, 404 not found and 5xx a server-side failure.",
      "Security headers — HSTS, CSP, X-Content-Type-Options and X-Frame-Options — are visible here in seconds.",
      "Cache-Control and ETag headers determine how aggressively browsers and CDNs reuse your pages.",
    ],
    commonErrors: [
      { mistake: "Chaining several redirects before the final URL", fix: "Collapse to a single 301 hop — every extra redirect costs crawl budget and page speed." },
      { mistake: "Using 302 for a permanent move", fix: "Return 301 so search engines transfer ranking signals to the new URL." },
      { mistake: "Sending no-cache on static assets", fix: "Give hashed assets a long max-age and reserve no-cache for HTML documents." },
    ],
    summary: "The HTTP header checker is the fastest way to see exactly what a server tells browsers and crawlers. Use it to debug redirect loops, confirm status codes after a migration, audit security headers and validate caching — then check the SSL certificate and DNS records for the layers underneath.",
  },

  "/tools/cms-detector": {
    keyTakeaways: [
      "The CMS detector identifies WordPress, Shopify, Wix, Webflow, Squarespace, Drupal, Ghost, Joomla and 50+ platforms.",
      "Detection reads public signals: HTML fingerprints, meta generator tags, asset paths, cookies and response headers.",
      "Headless and heavily customised builds may return no match — that itself indicates a custom or headless stack.",
      "Knowing the CMS tells you the likely hosting requirements, plugin ecosystem and migration effort.",
    ],
    commonErrors: [
      { mistake: "Expecting a match on a headless or hand-coded site", fix: "Check the HTTP headers and JavaScript bundles instead; a blank CMS result often means a custom front end." },
      { mistake: "Assuming the CMS also identifies the host", fix: "Run the host checker — Shopify and Wix host their own sites, but WordPress runs on thousands of providers." },
      { mistake: "Testing a staging or cached page", fix: "Detect on the live canonical URL; cached or password-protected pages strip the fingerprints." },
    ],
    summary: "Use this free CMS detector to check what platform any website is built on before a redesign, migration, competitive audit or outreach campaign. Pair it with the HTTP header checker for server details and the host checker to find who hosts the site.",
  },

  "/tools/website-down-checker": {
    keyTakeaways: [
      "The down checker fetches the site from an external network, so it tells you if a site is down for everyone or just you.",
      "A live HTTP status code and response time separate real outages from local DNS or ISP problems.",
      "5xx codes point to server or application failures; timeouts usually mean firewall, DNS or overload issues.",
      "If the site loads here but not for you, clear DNS cache, try another network, or switch resolvers.",
    ],
    commonErrors: [
      { mistake: "Blaming the host for a local DNS cache issue", fix: "Flush your resolver cache and retest — if this tool reports 200 OK, the outage is on your side." },
      { mistake: "Reading a 403 as downtime", fix: "403 means the server answered but refused access, often bot protection or geo-blocking rather than an outage." },
      { mistake: "Testing once and concluding the site is stable", fix: "Re-check a few times over several minutes to catch intermittent failures and overloaded servers." },
    ],
    summary: "This free website down checker gives an independent verdict on availability with a live status code and response time. Use it during incidents to confirm whether the problem is the server or your connection, then check DNS records and HTTP headers to find the root cause.",
  },

  "/tools/port-checker": {
    keyTakeaways: [
      "The port checker tests whether a specific TCP port is open and reachable on any server or IP address.",
      "Common ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 25/587 (SMTP), 3306 (MySQL) and 3389 (RDP).",
      "An open port means a service is listening and the firewall allows external connections to it.",
      "Closed or filtered results usually indicate a firewall, security group or stopped service — not a broken server.",
    ],
    commonErrors: [
      { mistake: "Leaving database ports like 3306 open to the internet", fix: "Restrict database ports to trusted IPs or a private network and tunnel over SSH instead." },
      { mistake: "Opening a port while the service is stopped", fix: "Confirm the service is running and bound to 0.0.0.0, not just 127.0.0.1." },
      { mistake: "Forgetting the cloud provider's own firewall", fix: "Update both the OS firewall and the provider's security group — either one can block the port." },
    ],
    summary: "Use this free online port checker to verify firewall rules, confirm a newly deployed service is reachable and debug SSH, mail or database connectivity from outside your network. Follow up with the HTTP header checker for web-layer issues and the down checker for full-site availability.",
  },

  "/tools/domain-compare": {
    keyTakeaways: [
      "Compare two domains side by side across hosting provider, IP, DNS records, WHOIS, SSL and response time.",
      "Useful for benchmarking your site against a competitor before choosing or leaving a hosting provider.",
      "Response time and server location together explain most speed differences between two similar sites.",
      "Differences in nameservers and CDN usage often matter more than the raw hosting brand name.",
    ],
    commonErrors: [
      { mistake: "Comparing a CDN-fronted site with a direct-origin site", fix: "Note which domain uses a CDN — the comparison reflects edge performance, not the origin server." },
      { mistake: "Judging hosting quality from one response-time sample", fix: "Re-run the comparison a few times and from context; a single measurement includes network noise." },
      { mistake: "Ignoring domain age when comparing authority", fix: "Read the WHOIS creation dates in the comparison — an older domain often explains ranking gaps." },
    ],
    summary: "The domain comparison tool puts two websites' infrastructure in one table so hosting, DNS, SSL and speed differences are obvious at a glance. Use it for competitor research, migration planning and hosting decisions, then open the individual DNS, WHOIS or SSL tools for a deeper look at any single row.",
  },
};
