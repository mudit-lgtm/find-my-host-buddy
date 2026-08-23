// Reference-guide depth blocks appended BELOW the existing tool content on each
// tool page (and the homepage). Purpose: turn each utility page into a genuine
// reference guide — mechanism, scenarios, how to read the output — plus the
// long-tail FAQ phrasing users actually type into Google.
//
// Nothing here changes titles, descriptions, canonicals, slugs or tool logic.

import type { FAQ, RichSection } from "./keywordMap";

/** Human-visible maintenance signal (E-E-A-T). Bump when content is revised. */
export const LAST_UPDATED = "August 2026";
export const MAINTAINER = "Reviewed by the Site Host Finder engineering team";

export interface DepthContent {
  sections: RichSection[];
  faqs?: FAQ[];
}

export const DEPTH_CONTENT: Record<string, DepthContent> = {
  // ---------------------------------------------------------------- HOME
  "/": {
    sections: [
      {
        heading: "About Site Host Finder",
        body:
          "Site Host Finder started as an internal script. We were running small web projects, constantly inheriting sites from other developers, and the same question kept coming up before every migration quote: who actually hosts this thing? Answering it meant three terminal windows — dig for the records, whois for the registrar, curl for the headers — and then guessing which company owned the IP range. We turned that workflow into one input box and kept it free. Today the same engine answers roughly the same question thousands of times a week for freelancers, agencies, SEO teams and IT admins in more than 90 countries. We maintain a hand-curated map of ASN ranges to hosting companies, refresh it when providers acquire each other or move address space, and check the provider matcher against a fixed sample of known sites so accuracy does not drift silently. Every lookup runs live against authoritative nameservers and the target server itself — we never serve you a cached record from last month and call it current. There is no account, no credit system and no rate limit, because a tool that makes you sign up to answer a 3-second question is not a tool. If a result looks wrong, email us: we investigate provider mismatches by hand and ship fixes to the matcher.",
      },
      {
        heading: "Explore our tools — what each one is actually for",
        body:
          "Every tool on this site answers a different question, and they are deliberately not clones of each other. Pick the one that matches what you are trying to prove:",
        bullets: [
          "DNS Lookup — for when records disagree: you changed something and need to see which A, MX, NS or TXT value the public internet is currently serving.",
          "WHOIS Lookup — for ownership and age: registrar, registration date and expiry, the fields that matter when valuing or acquiring a domain.",
          "IP Checker — for the address layer: shows your own outbound IP and resolves any domain or IP to its owning organisation and city.",
          "Reverse IP Lookup — for neighbourhood risk: which other domains answer on the same address, the fastest way to tell shared hosting from dedicated.",
          "SSL Checker — for certificate deadlines: issuer, expiry date, hostname coverage and TLS version, before a browser warning does it for you.",
          "HTTP Headers — for the server's own story: software, CDN, cache policy and the security headers a pentest report will ask about.",
          "CMS Detector — for stack research: which platform builds the pages, inferred from markup fingerprints rather than guesswork.",
          "Is It Up or Down — for the 'is it just me?' moment: an independent probe from outside your network and your ISP.",
          "Port Checker — for reachability: whether a TCP port on a public host actually accepts connections from the outside world.",
          "Domain Compare — for decisions: two domains side by side across registrar, age, hosting and DNS in a single view.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a host checker?",
        a: "A host checker is a lookup tool that identifies the company whose servers deliver a website. It resolves the domain to an IP address, finds which organisation owns that address block, and reports the hosting provider along with the server's location. It is read-only research — the same information any browser receives when it loads the page, just presented clearly.",
      },
      {
        q: "How do I find out where a website is hosted?",
        a: "Paste the bare domain into the checker at the top of this page and read the provider field. If you prefer the command line, dig +short example.com gives you the IP and a WHOIS query on that IP names the owning network. Our tool does both steps plus the provider matching in one request.",
      },
      {
        q: "Is checking a website's host legal?",
        a: "Yes. DNS records, WHOIS registration data and HTTP response headers are published deliberately so the internet can route and verify traffic. Reading them is passive research, not access to a private system. Nothing on this site attempts to log in, scan for vulnerabilities or retrieve non-public data.",
      },
      {
        q: "Why would I need a host finder tool?",
        a: "The common reasons are practical: quoting a migration for a client who has lost their hosting login, checking whether a slow competitor is on cheap shared hosting, confirming a DNS cutover actually landed on the new server, or documenting infrastructure for an audit. It is also the fastest way to work out who to contact about an abusive or infringing site.",
      },
    ],
  },

  // -------------------------------------------------------- CMS DETECTOR
  "/tools/cms-detector": {
    sections: [
      {
        heading: "How the CMS detector works",
        body:
          "Detection is signature matching, not magic. When you submit a domain we fetch the public homepage exactly as a browser would and read four layers of evidence. First, the meta generator tag — Drupal, Ghost, Joomla and many WordPress installs still announce themselves there in plain text. Second, asset paths: /wp-content/ and /wp-includes/ are WordPress, cdn.shopify.com is Shopify, static1.squarespace.com is Squarespace, parastorage.com is Wix. Third, response headers and cookies, where X-Generator, X-Powered-By, X-Wix-Request-Id and platform-specific session cookie names give the platform away even when the markup has been cleaned up. Fourth, JavaScript globals and class-name conventions — a Shopify.theme object, Webflow's w- prefixed classes, Squarespace's Static.SQUARESPACE_CONTEXT. Each hit adds weight to a candidate platform, and the highest-scoring candidate with at least one strong signal is what the CMS checker reports. Weak or contradictory evidence is reported as a best guess rather than a confident answer, which is why you will occasionally see a secondary platform listed alongside the primary one.",
      },
      {
        heading: "When you would use a CMS checker",
        body:
          "Three situations account for most of the traffic to this page. A freelancer receives a redesign enquiry and needs to know before quoting whether the current site is a stock WordPress theme (a two-day job) or a bespoke headless build (a two-month one). An agency researching a pitch runs the top ten competitors in a client's sector to see whether the market has standardised on Shopify or is still on legacy Magento — a genuinely useful slide in a proposal. A developer inheriting an undocumented site checks what CMS the site is using before asking for credentials, so the first client call sounds informed rather than exploratory. Recruiters and technical due-diligence teams use it the same way, at scale, to confirm what a company's engineering claims actually look like in production.",
      },
      {
        heading: "How to read your CMS detection results",
        body:
          "The platform name is the CMS the evidence points to. The signals list shows the specific markers found — treat a result backed by three independent signals as reliable and a single-signal result as a hypothesis. A framework detected alongside the CMS (Next.js, Astro, Nuxt) usually indicates a headless setup where the framework renders and a separate CMS stores content that is invisible from outside. A CDN entry means the response you received came from an edge cache, so headers may be rewritten. False positives cluster around migrated sites: a shop that moved from WooCommerce to Shopify may keep legacy /wp-content/ image URLs for years, so check whether the WordPress signals are only images. If you need more certainty, run the HTTP Headers tool on the same domain and compare the server and cache headers against the platform reported here.",
      },
    ],
    faqs: [
      {
        q: "What CMS is this website using?",
        a: "Enter the domain above and the CMS detector reads its markup, headers, cookies and asset paths for platform fingerprints. Mainstream platforms — WordPress, Shopify, Wix, Squarespace, Webflow, Drupal, Joomla, Ghost, Magento — are identified in a couple of seconds. The result lists the signals behind the answer so you can judge it yourself rather than take it on trust.",
      },
      {
        q: "Why does the CMS detector show 'unknown'?",
        a: "Three causes cover almost every case. The site is headless, so the public HTML is generated by Next.js or Astro while the actual CMS sits behind an API and never appears in the response. The site is hand-built or uses a niche in-house platform with no published fingerprints. Or an aggressive CDN and cache layer has stripped the generator tag and rewritten the headers that would otherwise identify it.",
      },
      {
        q: "Is it legal to check what CMS a site uses?",
        a: "Yes. The detector only reads the HTML, headers and cookies that the server voluntarily sends to every visitor, including yours right now. It does not attempt logins, probe admin paths, or scan for vulnerabilities. This is the same public information that browser extensions and technology-profiling services have reported for over a decade.",
      },
      {
        q: "Does this work on WordPress, Shopify, Wix, and custom-built sites?",
        a: "WordPress, Shopify, Wix, Squarespace and Webflow are the highest-confidence detections because each leaves several unmistakable markers. Drupal, Joomla, Ghost, Magento, BigCommerce, HubSpot CMS and PrestaShop are reliably identified too. Genuinely custom builds have no standard fingerprint, so the tool will name the web server and any framework it can see instead of inventing a CMS.",
      },
      {
        q: "How accurate is CMS detection?",
        a: "On mainstream platforms with default configurations, accuracy is very high — the markers are structural and difficult to remove without breaking the site. Accuracy drops on heavily customised installs, sites behind a rewriting CDN, and anything headless. Read the signals list: a detection backed by asset paths plus headers plus a JavaScript global is close to certain, while one lone meta tag on a migrated site can be a leftover.",
      },
    ],
  },

  // -------------------------------------------------------- WHOIS LOOKUP
  "/tools/whois-lookup": {
    sections: [
      {
        heading: "How WHOIS lookup works",
        body:
          "WHOIS is one of the oldest services on the internet and it still works the way it did in the 1980s: a plain-text query to a server that holds registration data. Your lookup starts at IANA, which knows which registry runs each top-level domain — Verisign for .com and .net, PIR for .org, Nominet for .uk. The registry responds with a thin record naming the registrar that sold the domain, and the query is then repeated against that registrar's own WHOIS server, which holds the thick record with dates and contact fields. Our tool follows that referral chain for you, normalises the wildly inconsistent formatting each registrar uses, and presents the fields in a consistent layout. Newer TLDs increasingly answer over RDAP, a structured JSON successor to WHOIS, which we use when it is available because the data is cleaner and rate limits are friendlier. Registry data updates within minutes of a change at the registrar, so a domain you just bought or renewed will show correctly almost immediately.",
      },
      {
        heading: "When you would run a domain owner lookup",
        body:
          "Buying an aged domain is the most common reason: the creation date tells you whether a seller's claim of a 15-year history is true, and the expiry date tells you how soon you would need to renew. Trademark and brand teams use WHOIS to document a lookalike domain before sending a notice, since the registrar named in the record is who receives the complaint. Anyone planning a transfer needs the current registrar and the domain's status codes — clientTransferProhibited has to be lifted first. And when a domain suddenly stops working, the expiry date is the first field to check before anyone touches DNS: a surprising share of overnight outages are simply an unrenewed registration.",
      },
      {
        heading: "How to read your WHOIS results",
        body:
          "Registrar is the company that sold and manages the domain — the party to contact for transfers, disputes or recovery. Creation date is the domain's true age and it does not reset when a domain changes hands, which makes it the honest signal in a domain sale. Updated date reflects the last change to the record, often a renewal or a nameserver edit. Expiry date is the hard deadline, after which the domain enters a redemption period of roughly 30 days before it drops. Status codes describe locks: clientTransferProhibited is a normal anti-hijacking lock, pendingDelete means the domain is on its way out. Contact fields showing 'REDACTED FOR PRIVACY' or a proxy address are the norm, not an error. If the registrant fields are blank but you need to reach the owner, the registrar's abuse address in the same record is the correct route.",
      },
    ],
    faqs: [
      {
        q: "How do I find out who owns a domain?",
        a: "Run the domain through the WHOIS lookup above. You will always get the registrar, registration and expiry dates, nameservers and status codes. Personal owner details are visible only when the registrant has not enabled privacy protection, which today is mostly corporate and government domains.",
      },
      {
        q: "Why does WHOIS show 'redacted for privacy'?",
        a: "Since GDPR came into force in 2018, registrars mask personal contact fields by default rather than publish them worldwide. Many also sell privacy-proxy services that substitute their own address for the owner's. The registration remains valid and fully queryable — only the personally identifiable fields are withheld.",
      },
      {
        q: "Is WHOIS data always accurate?",
        a: "Dates, registrar and status codes come from the registry and are authoritative. Contact details are self-reported by the registrant, so they can be stale or deliberately vague, though ICANN requires registrars to verify an email address and can suspend a domain over a proven false record. Treat dates as fact and contacts as a claim.",
      },
      {
        q: "Can I find a domain owner's real contact info?",
        a: "Not from a public WHOIS query when privacy is enabled, and no legitimate tool can bypass that. Your practical routes are the proxy email in the record, which forwards to the owner, a contact form on the site itself, or the registrar's abuse contact for genuine legal complaints. Courts and law-enforcement requests can compel disclosure; ordinary lookups cannot.",
      },
    ],
  },

  // -------------------------------------------------------- PORT CHECKER
  "/tools/port-checker": {
    sections: [
      {
        heading: "How the port checker works",
        body:
          "The test is deliberately simple, which is what makes it trustworthy. From our server we open a TCP connection to the host and port you enter and watch what the remote end does. A completed three-way handshake means a service is listening and accepting connections from the public internet — reported as open. An immediate RST packet means the host is reachable but nothing is bound to that port, or a firewall is actively refusing it — reported as closed. Silence until the timeout expires means packets are being dropped without a reply, the classic signature of a firewall configured to DROP rather than REJECT, or a host that does not exist. Because the probe originates outside your network and outside your ISP, it answers the only question that matters for port forwarding: can someone on the internet actually reach this service? Testing from your own LAN cannot answer that, since traffic never leaves the router and hairpin NAT quietly makes broken forwards look fine.",
      },
      {
        heading: "When you would test a port",
        body:
          "Right after configuring port forwarding on a home router, to confirm the rule works from the outside instead of trusting the router's status page. After changing a cloud security group or ufw rule, to verify the change applied to the right interface. When a game server, Minecraft instance, camera NVR or remote desktop is unreachable for everyone except you on the local network. And when standing up a new service — checking that 443 answers before pointing DNS at it saves a window of downtime for real visitors. Security-minded admins run the reverse check too: confirming that 3306, 5432, 6379 or 27017 are firmly closed to the internet, because an exposed database port is found by automated scanners within hours.",
      },
      {
        heading: "How to read your port results",
        body:
          "Open means a listening service completed the handshake — if that port is a database, cache or admin interface, treat it as an urgent finding rather than a success. Closed means the host answered but rejected the connection, which usually means the service is stopped or bound only to 127.0.0.1 instead of 0.0.0.0. Filtered or timed out means no response at all: a DROP firewall rule, a cloud security group with no matching ingress, or an ISP blocking the port upstream. Common upstream blocks to know about: residential ISPs frequently block 25, 80 and 445, and most cloud providers block outbound 25 until you request otherwise. Response time is also informative — a handshake that takes far longer than the rest points at routing problems rather than firewall rules.",
      },
    ],
    faqs: [
      {
        q: "What is an open port and why does it matter?",
        a: "An open port is a numbered endpoint on a public IP where a program is listening and willing to accept connections. Ports you intend to expose, like 443 for HTTPS, must be open for the service to work. Ports you did not intend to expose are attack surface: automated scanners sweep the entire IPv4 space continuously and will find an open database port within hours.",
      },
      {
        q: "How do I test if a port is forwarded correctly?",
        a: "Enter your public IP address and the external port number above and run the check from outside your network, which is what this tool does. If it reports closed or filtered, verify three things: the forwarding rule points at the device's current internal IP, the device's own firewall allows the port, and the service is bound to 0.0.0.0 rather than localhost. Testing from inside your own LAN proves nothing.",
      },
      {
        q: "Is port scanning legal on my own server?",
        a: "Checking a single port on infrastructure you own or administer is routine, legitimate diagnostics. Sweeping ranges of ports on systems you have no authority over is a different matter and is prohibited or illegal in many jurisdictions. This tool tests one host and one port at a time by design, and you should only use it against systems you are responsible for.",
      },
      {
        q: "Why is a port showing as closed when I opened it in my router?",
        a: "Almost always one of four reasons: the internal device took a new DHCP address and the forwarding rule now points nowhere, the device's local firewall is still blocking, the service is listening on 127.0.0.1 instead of all interfaces, or your ISP uses CGNAT so your router's WAN address is not actually a public IP. Compare the WAN IP shown in your router with the address reported by our IP Checker — if they differ, CGNAT is your answer.",
      },
    ],
  },

  // ---------------------------------------------------------- IP CHECKER
  "/tools/ip-checker": {
    sections: [
      {
        heading: "How the IP checker works",
        body:
          "There are two directions to this tool. Looking at your own address requires nothing clever: every request you make carries a source IP, and we simply echo back the one that reached our server, which is exactly what every website you visit sees. Looking up someone else's address is a chain of public databases. The address is matched against the regional internet registry allocations — ARIN, RIPE, APNIC, LACNIC and AFRINIC — to find the owning organisation and its autonomous system number. A reverse DNS query on the address returns the PTR hostname, which often reveals the data centre or ISP naming scheme. Geolocation then maps the block to a city using registry records and network latency measurements. Enter a domain instead of an address and the tool resolves the A and AAAA records first, then runs the same chain against the resulting IP, which is why the domain path doubles as a quick hosting lookup.",
      },
      {
        heading: "When you would check an IP address",
        body:
          "Whitelisting is the everyday case: a client's firewall, database or admin panel needs your current public address, and it changes whenever your ISP renews the lease. VPN users check it to confirm the tunnel is actually carrying traffic and not silently leaking. Support teams check a reported IP against the customer's claimed location before escalating a fraud flag. Developers resolve a domain to its IP to confirm which of several servers a load balancer is currently sending them to. And anyone triaging a suspicious login reads the owning organisation field to see whether the address belongs to a residential ISP, a corporate network or a hosting provider — the last of these being a strong signal of automation rather than a human visitor.",
      },
      {
        heading: "How to read your IP results",
        body:
          "The organisation or ISP field is the most reliable part of the result: registry allocations are authoritative and rarely wrong. Location is an estimate, not a measurement. Country accuracy is typically excellent, city accuracy is decent for residential broadband and can be badly off for mobile networks, satellite links and corporate VPNs, where traffic exits through a gateway hundreds of miles from the actual user. The reverse DNS hostname is worth reading closely, since names like ec2-…-compute.amazonaws.com or a provider's pop code often tell you more about where the server really lives than the geolocation does. If both an IPv4 and IPv6 address appear, that is normal dual-stack configuration; the two can even resolve to different edge nodes on a CDN.",
      },
    ],
    faqs: [
      {
        q: "How do I find a website's IP address?",
        a: "Type the domain into the checker above and it resolves the A record for IPv4 and the AAAA record for IPv6, then reports the owning organisation. On the command line, dig +short example.com or ping example.com returns the same address. Sites behind Cloudflare or a similar proxy will return the CDN's edge address rather than the origin server's.",
      },
      {
        q: "Can two websites share the same IP?",
        a: "Yes, and it is extremely common. Shared hosting routinely places hundreds of sites on one address, and the web server decides which site to serve from the Host header in each request. CDNs take this further, serving millions of domains from the same anycast addresses. Run our Reverse IP Lookup on an address to see which other domains answer there.",
      },
      {
        q: "Does my IP checker reveal my location precisely?",
        a: "No, and neither does anyone else's. Geolocation infers a location from registry records for the address block, so you get the ISP's serving area rather than a street address. Country is usually right, city is approximate, and mobile, satellite or VPN connections can place you in an entirely different region. Only your ISP can tie an address to a subscriber, and only with legal process.",
      },
      {
        q: "What's the difference between IPv4 and IPv6 results here?",
        a: "IPv4 is the familiar 32-bit format like 93.184.216.34 and its address space ran out years ago. IPv6 is the 128-bit successor written as 2606:2800:220:1:248:1893:25c8:1946. A site listing both is dual-stacked and reachable either way; your own connection will prefer IPv6 when your network supports it. Firewall and whitelist rules must cover both, since allowing only the IPv4 address is a frequent cause of mysterious access failures.",
      },
    ],
  },

  // --------------------------------------------------- REVERSE IP LOOKUP
  "/tools/reverse-ip-lookup": {
    sections: [
      {
        heading: "How reverse IP lookup works",
        body:
          "Forward DNS answers 'which address does this name point to'. Reverse IP lookup asks the harder question in the other direction: which names point at this address? There is no single authoritative index for that, because DNS is not designed to be queried backwards, so the answer is assembled from passive DNS data — historical records of forward resolutions collected across the internet — combined with the PTR record for the address and the TLS certificate the host presents, whose subject alternative names often list every domain a server terminates. Our tool queries the address, gathers the domains observed resolving to it, and returns them with the hosting organisation that owns the block. Because the source data is observational rather than definitive, the result should be read as 'these domains have been seen on this address', which is usually current but occasionally includes a site that moved away recently.",
      },
      {
        heading: "When you would run a reverse IP lookup",
        body:
          "Deliverability investigations are the strongest use case: if your transactional email is landing in spam, knowing that four hundred other sites share your sending address explains a lot, and it is the argument for moving to a dedicated IP. Before buying hosting, checking a provider's address range shows how densely they pack customers. Security teams pivot on an address found in logs to see what else the same server hosts, which quickly separates a compromised shared box from targeted infrastructure. And anyone auditing a client's setup uses it to prove whether the 'dedicated server' they are paying for is actually dedicated.",
      },
      {
        heading: "How to read reverse IP results",
        body:
          "A single domain, or a handful belonging to the same owner, indicates a dedicated address — good for deliverability and isolation. Dozens or hundreds of unrelated domains mean shared hosting, where your neighbours' behaviour can affect your reputation. Zero results usually means the address belongs to a CDN or proxy: those edges front so many domains that meaningful attribution is impossible, and the origin behind them is not exposed. Domains that look unrelated to the site you started from are worth a second look before drawing conclusions — some are stale entries from sites that have since migrated, and passive data can lag by weeks. Cross-check anything important with the IP Checker for the owning organisation and the HTTP Headers tool to confirm what the server actually serves today.",
      },
    ],
    faqs: [
      {
        q: "What is reverse IP lookup used for?",
        a: "Mainly for understanding what kind of hosting an address represents. It reveals whether a site sits alone on its own address or shares one with hundreds of neighbours, which matters for email deliverability, security isolation and performance. It is also a standard first pivot in infrastructure research and abuse investigations.",
      },
      {
        q: "Why would multiple domains share one IP?",
        a: "Because IPv4 addresses are scarce and virtual hosting makes sharing trivial: a single web server reads the Host header of each request and serves the matching site. Shared hosting plans exist precisely to amortise one address across many customers, and CDNs push the model to its limit by serving vast numbers of domains from a small pool of anycast addresses.",
      },
      {
        q: "Is reverse IP lookup accurate for shared hosting?",
        a: "It is directionally accurate — if a busy shared server is behind the address, you will see a long list of domains and that conclusion is safe. Completeness is another matter: passive DNS never captures every domain, and low-traffic sites are often missing. Treat the list as a representative sample rather than a full inventory, and expect a few stale entries from sites that have moved.",
      },
    ],
  },

  // ---------------------------------------------------------- SSL CHECKER
  "/tools/ssl-checker": {
    sections: [
      {
        heading: "How the SSL checker works",
        body:
          "The tool performs a real TLS handshake with the server on port 443, exactly as a browser would, and then reports what came back instead of rendering a page. During the handshake the server presents its certificate chain: the leaf certificate for the site, one or more intermediates, and a pointer up to a root that browsers already trust. We read the leaf for issuer, validity window, common name and every subject alternative name, verify that the intermediates chain correctly to a trusted root, and record the highest TLS version and cipher the server agreed to negotiate. Because it is a live handshake, the result reflects what a visitor's browser would experience right now — including the very common misconfiguration where a certificate is valid but the server forgot to send the intermediate, so it works in browsers that cache the intermediate and fails everywhere else.",
      },
      {
        heading: "When you would check an SSL certificate",
        body:
          "The scheduled case is renewal monitoring: certificates from Let's Encrypt last 90 days, and an automation failure is silent until a browser warning appears. The urgent case is a user reporting 'your connection is not private' that you cannot reproduce, usually a missing intermediate or a hostname the certificate does not cover. Migrations are the third: after moving a site, confirming the new server presents the right certificate before the DNS change reaches everyone avoids an outage. Anyone adding a subdomain should check too, since a certificate issued for example.com does not automatically cover shop.example.com unless it is a wildcard or the SAN list was extended.",
      },
      {
        heading: "How to read your SSL results",
        body:
          "Valid from and valid to define the window in which browsers accept the certificate; anything under two weeks remaining deserves attention today. Issuer names the certificate authority — Let's Encrypt and Google Trust Services for free automated certificates, DigiCert or Sectigo for paid and extended-validation ones. Browsers make no visible distinction, so a free certificate is not a weaker one. The common name and SAN list must include the exact hostname visitors type, including the www variant if you use it; a mismatch here produces the harshest browser warning. Chain issues flagged as incomplete mean the intermediate is missing from the server configuration. TLS version should be 1.2 or 1.3 — anything older is rejected by current browsers. For a graded analysis of cipher suites and protocol downgrades, follow up with SSL Labs.",
      },
    ],
    faqs: [
      {
        q: "How do I check if a website has a valid SSL certificate?",
        a: "Enter the domain above and the checker completes a live TLS handshake, returning the issuer, validity dates, covered hostnames and chain status. A valid certificate is unexpired, issued by a trusted authority, covers the exact hostname you are visiting, and is served with its full intermediate chain. All four conditions must hold or a browser will warn.",
      },
      {
        q: "What does an SSL warning mean?",
        a: "It means the browser could not verify the connection and is refusing to proceed silently. The usual causes are an expired certificate, a hostname the certificate does not cover, a missing intermediate, a self-signed certificate, or a system clock that is badly wrong. This checker names which of those applies so you are not guessing.",
      },
      {
        q: "How often should SSL certificates be renewed?",
        a: "Let's Encrypt issues 90-day certificates and expects automated renewal at around 60 days, which most hosting panels and certbot handle for you. Commercial certificates are typically annual. The industry is moving toward much shorter lifetimes, so the real answer is to automate renewal and monitor it rather than rely on a calendar reminder.",
      },
    ],
  },

  // ------------------------------------------------------- DOMAIN COMPARE
  "/tools/domain-compare": {
    sections: [
      {
        heading: "What the domain comparison actually compares",
        body:
          "Enter two domains and the tool runs the full lookup pipeline on each in parallel, then lines the results up field by field so differences are obvious at a glance. The comparison covers the registrar and registration dates from WHOIS, giving you true domain age and remaining term; the hosting provider, IP address and server location from DNS plus ASN ownership; the DNS layer itself, meaning nameservers, mail exchangers and the presence of SPF or verification records; the certificate issuer and expiry; and basic response health such as status code and time to first byte. Presenting both sets side by side matters more than it sounds — the interesting signal is rarely a single value, it is the mismatch, such as two domains claiming to be independent businesses that share a registrar, an IP address and a nameserver pair.",
      },
      {
        heading: "When comparing two domains is worth the time",
        body:
          "Due diligence before buying an aged domain is the clearest case. A seller's history claim is checkable: compare the target against a domain of known provenance and look at creation date, registrar changes and whether the DNS has been parked on an ad platform for years, which often accompanies a dropped and re-registered name rather than continuous ownership. Agencies use the comparison to benchmark a client against a competitor — if the competitor's time to first byte is a third of yours on better infrastructure, that is a hosting conversation backed by evidence. Investigators compare suspected sibling sites to establish shared infrastructure. And during a migration, comparing the old and new domain confirms every layer moved, not just the homepage.",
      },
      {
        heading: "How to read the comparison",
        body:
          "Read down the rows and treat each difference as a question. A creation date far more recent than a seller claims means the domain probably dropped and was re-registered, which resets most of its accumulated value. Different registrars with identical nameservers usually means one management company behind both. Identical IP addresses point to the same server, whether that is shared hosting or genuinely common ownership. A large gap in response time is a hosting-quality difference, not a coding one, especially when the slower domain sits on a shared plan. Where a row shows a CDN on one side and a hosting provider on the other, you are not comparing like with like — the CDN masks the origin, so weigh the DNS and WHOIS rows more heavily than the hosting row in that case.",
      },
    ],
    faqs: [
      {
        q: "What can I learn by comparing two domains?",
        a: "Which is older, who registered each and where, whether they share hosting or nameservers, how their DNS and mail are configured, and which responds faster. It is the quickest way to test whether two sites are genuinely independent or quietly related.",
      },
      {
        q: "How do I check a domain's real age before buying it?",
        a: "Compare the creation date in the WHOIS row against the seller's claim. Age does not reset on transfer, so a genuine 15-year-old domain shows a 15-year-old creation date regardless of how many owners it has had. A recent date on a supposedly established domain means it lapsed and was re-registered, and any historical value is gone.",
      },
      {
        q: "Do both domains need to be live for the comparison to work?",
        a: "No. WHOIS and DNS data return for any registered domain, so you can compare a parked or expired domain against a live one. Rows that depend on an actual HTTP response — status code, response time, certificate — will simply be empty for the domain that is not serving.",
      },
    ],
  },

  // --------------------------------------------------------- HTTP HEADERS
  "/tools/http-headers": {
    sections: [
      {
        heading: "How the header checker works",
        body:
          "We send a plain HTTP request to the URL you provide and print the complete response head before any HTML is parsed. Every redirect in the chain is shown separately with its own status code and Location target, so a domain that goes apex to www to HTTPS reveals all three hops rather than only the destination. The response headers are then grouped: identity headers such as Server and X-Powered-By, caching headers, compression and content negotiation, cookies with their flags, and the security headers auditors ask about.",
      },
      {
        heading: "How to read your header results",
        body:
          "Status code comes first — 200 is a normal response, 301 is a permanent redirect that passes ranking signals, 302 is temporary and often used by mistake where a 301 belongs. Multiple redirect hops add latency and should be collapsed into one where possible. In the security group, absent is the value to look for: no Strict-Transport-Security means downgrade attacks remain possible, no Content-Security-Policy leaves injected scripts unrestricted, no X-Frame-Options or frame-ancestors directive allows clickjacking. Cache-Control tells you whether a CDN or browser will reuse the response, which explains a surprising number of 'my change is not showing' reports. Server and CDN headers name the software actually answering, and are useful cross-checks against the CMS Detector result on the same domain.",
      },
    ],
    faqs: [
      {
        q: "How do I check the HTTP headers of a website?",
        a: "Enter the URL above and the tool returns the full response head, including every redirect hop. From a terminal, curl -I https://example.com gives the same thing for the final response. Checking from outside your network also shows headers added by a CDN that you would not see locally.",
      },
      {
        q: "Which security headers should a site have?",
        a: "At minimum Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options set to nosniff, a Referrer-Policy, and frame protection via X-Frame-Options or the frame-ancestors directive. Missing ones are the most common findings in a basic security review and most can be added in the server or CDN config without touching application code.",
      },
      {
        q: "Why does my site show multiple redirects?",
        a: "Usually because separate rules handle HTTP to HTTPS and non-www to www, and each fires in turn. Combining them into a single 301 to the canonical HTTPS host removes a round trip and keeps redirect chains clean for crawlers.",
      },
    ],
  },

  // ------------------------------------------------------------ DNS LOOKUP
  "/tools/dns-lookup": {
    sections: [
      {
        heading: "How the DNS lookup works",
        body:
          "The query starts at the root, which points to the registry for the domain's top-level domain, which points to the authoritative nameservers listed in the domain's delegation. We ask those authoritative servers directly rather than reading a local cache, so what you see is the record as published, not as remembered by an intermediate resolver. Each record type is requested separately and returned with its TTL, the number of seconds resolvers are permitted to cache it — the single most useful number when you are waiting on a change to take effect.",
      },
      {
        heading: "How to read your DNS results",
        body:
          "A and AAAA records are the hosting layer: the IPv4 and IPv6 addresses that serve the site. NS records show who controls DNS, which is often a different company from the registrar and is the first thing to verify after a migration. MX records route email, and their absence explains bounced mail more often than any mail server setting. TXT records hold SPF, DKIM and DMARC policy plus verification strings from Google, Microsoft and others. CNAME records alias one name to another and must never be placed at the apex of a domain. If a value looks wrong, check the TTL before assuming the change failed — a record with a 24-hour TTL can be served from resolver caches long after you edited it.",
      },
    ],
    faqs: [
      {
        q: "How long do DNS changes take to propagate?",
        a: "Up to the TTL of the old record, which is commonly one to twenty-four hours, though most resolvers update sooner. Lowering the TTL to 300 seconds a day before a planned change makes the cutover almost immediate.",
      },
      {
        q: "Why is my email not working after a DNS change?",
        a: "Check the MX records first — replacing a hosting provider's default DNS zone often wipes existing MX entries. Then check that exactly one SPF TXT record exists, since two SPF records is an automatic validation failure and quietly breaks delivery.",
      },
      {
        q: "What is the difference between an A record and a CNAME?",
        a: "An A record maps a name directly to an IPv4 address. A CNAME maps a name to another name, which is then resolved in turn. CNAMEs are convenient for subdomains pointing at a provider's hostname but are invalid at the root of a domain, where an A record or a provider-specific ALIAS record is required.",
      },
    ],
  },

  // -------------------------------------------------- WEBSITE DOWN CHECKER
  "/tools/website-down-checker": {
    sections: [
      {
        heading: "How the down checker works",
        body:
          "We make a real HTTP request to the site from our own infrastructure and report exactly what happened: the status code, the time taken, and any redirects along the way. Because the request originates outside your network, your ISP and your browser cache, it isolates the variable everyone argues about during an outage — whether the site is genuinely down or only down for you. A 2xx or 3xx response means the server is alive and answering. A 5xx means the server is reachable but failing internally, which is an application or database problem rather than a hosting one. A connection timeout means nothing answered at all.",
      },
      {
        heading: "How to read the result and what to do next",
        body:
          "If we report the site up and you still cannot reach it, the fault is local: flush your DNS cache, try another network or mobile data, and check whether a VPN or corporate filter is intercepting the request. If we report it down, work up the stack — run a DNS lookup to confirm the domain still resolves to the right address, check the SSL certificate has not expired, then check your host's status page before opening a ticket. Persistent 5xx responses with correct DNS point at the application, so server error logs are the next stop. Repeated brief outages across a week are a hosting quality problem, and worth documenting with timestamps before raising it with the provider.",
      },
    ],
    faqs: [
      {
        q: "Is the website down or is it just me?",
        a: "Run the check above: it probes the site from our servers, entirely outside your network. If we get a normal response and you do not, the problem is local — DNS cache, ISP routing, VPN or a browser extension.",
      },
      {
        q: "What does a 503 error mean?",
        a: "The server is running but temporarily unable to handle the request, typically because of maintenance mode, resource exhaustion or a rate limiter. It usually resolves without intervention; if it persists, the site is over capacity or a backend service it depends on has failed.",
      },
      {
        q: "How can I tell if a site is down for everyone?",
        a: "An external probe like this one is the fastest single answer, since it removes your network from the equation. For a broader picture, check the hosting provider's status page and re-test a few minutes later — intermittent failures often indicate an overloaded server rather than a hard outage.",
      },
    ],
  },
};
