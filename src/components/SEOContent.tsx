import { Server, Shield, Zap, Globe, Database, Network, Search, Lock, Award, TrendingUp } from "lucide-react";

const topics = [
  {
    icon: Server,
    gradient: "from-blue-500 to-cyan-500",
    title: "What Is a Web Hosting Checker?",
    body: (
      <>
        A web hosting checker (host finder) identifies which provider serves any website. Our tool resolves DNS, analyzes IPs, and matches against 500+ hosting providers including{" "}
        <a href="https://aws.amazon.com/what-is/web-hosting/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AWS</a>, Google Cloud, Cloudflare, and{" "}
        <a href="/go/hostinger" target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-primary hover:underline">Hostinger</a>.
      </>
    ),
  },
  {
    icon: Search,
    gradient: "from-purple-500 to-pink-500",
    title: "Why Check Who Hosts a Website?",
    body: <>Benchmark competitor infrastructure, troubleshoot performance, evaluate hosting reliability, or research providers before migration. Includes IP, server location, DNS, WHOIS, and security analysis.</>,
  },
  {
    icon: Database,
    gradient: "from-orange-500 to-amber-500",
    title: "Types of Web Hosting",
    body: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li><strong>Shared</strong> — Multiple sites per server. <a href="/go/hostinger" target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-primary hover:underline">Hostinger</a> excels here.</li>
        <li><strong>VPS</strong> — Dedicated virtual resources.</li>
        <li><strong>Dedicated</strong> — Entire physical server.</li>
        <li><strong>Cloud</strong> — Distributed, scalable (AWS, GCP).</li>
        <li><strong>Managed WordPress</strong> — WP-optimized.</li>
      </ul>
    ),
  },
  {
    icon: Network,
    gradient: "from-green-500 to-emerald-500",
    title: "How DNS & Hosting Work Together",
    body: (
      <>
        The{" "}
        <a href="https://www.cloudflare.com/learning/dns/what-is-dns/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DNS</a>{" "}
        translates domains into IPs. Our DNS lookup queries A, AAAA, MX, NS, TXT, and CNAME records to identify hosting infrastructure.
      </>
    ),
  },
];

const moreTopics = [
  {
    icon: Globe,
    gradient: "from-indigo-500 to-blue-500",
    title: "Domain Registration vs. Web Hosting",
    body: (
      <>
        A registrar (accredited by{" "}
        <a href="https://www.icann.org/resources/pages/accredited-list-2012-02-25-en" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ICANN</a>
        ) is where you buy domains. Hosting stores and serves your files. Often different companies — use our hosting finder to check.
      </>
    ),
  },
  {
    icon: TrendingUp,
    gradient: "from-rose-500 to-orange-500",
    title: "How to Switch Hosting Providers",
    body: (
      <>
        Backup files, set up new account, upload site, update nameservers. Keep old host until{" "}
        <a href="https://www.cloudflare.com/learning/dns/dns-propagation/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DNS propagation</a>{" "}
        completes.{" "}
        <a href="/go/hostinger" target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-primary hover:underline">Hostinger offers free migration</a>.
      </>
    ),
  },
  {
    icon: Lock,
    gradient: "from-teal-500 to-cyan-500",
    title: "Website Security & SSL Certificates",
    body: (
      <>
        SSL/TLS enables HTTPS. Most hosts include free SSL via{" "}
        <a href="https://letsencrypt.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Let's Encrypt</a>. Verify with{" "}
        <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SSL Labs</a>.
      </>
    ),
  },
  {
    icon: Shield,
    gradient: "from-violet-500 to-purple-500",
    title: "CDN vs Hosting Provider",
    body: (
      <>
        A{" "}
        <a href="https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CDN</a>{" "}
        caches assets globally and sits in front of origin host. Cloudflare results often mean origin is hidden behind it.
      </>
    ),
  },
  {
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    title: "Server Response Time & SEO",
    body: (
      <>
        Page speed is a Google ranking factor. TTFB affects{" "}
        <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Core Web Vitals</a>. Use{" "}
        <a href="https://developers.google.com/speed/docs/insights/v5/about" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PageSpeed Insights</a>{" "}
        with our host finder.
      </>
    ),
  },
  {
    icon: Award,
    gradient: "from-pink-500 to-rose-500",
    title: "Choosing the Best Hosting Provider",
    body: (
      <>
        Consider uptime, speed, support, scalability, and pricing. For beginners,{" "}
        <a href="/go/hostinger" target="_blank" rel="nofollow sponsored noopener noreferrer" className="text-primary hover:underline font-semibold">Hostinger</a>{" "}
        balances speed, features, and affordability.
      </>
    ),
  },
];

function TopicCard({ icon: Icon, gradient, title, body }: typeof topics[number]) {
  return (
    <div className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md mb-3`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display font-bold text-foreground mb-2">{title}</h3>
      <div className="text-sm text-muted-foreground leading-relaxed">{body}</div>
    </div>
  );
}

export function SEOContent() {
  return (
    <section id="hosting-guide" className="container max-w-5xl mx-auto px-4 py-16 border-t">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        <span className="text-gradient">Find Website Host</span> — Complete Hosting Guide
      </h2>
      <p className="text-muted-foreground mb-8">Everything you need to know about web hosting, DNS, and choosing the right provider.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((t) => (
          <TopicCard key={t.title} {...t} />
        ))}
      </div>

      <details className="mt-6 group">
        <summary className="cursor-pointer list-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-primary/20 text-sm font-semibold text-foreground hover:from-blue-500/20 hover:to-cyan-500/20 transition-all">
          <span>📖 Read full hosting guide</span>
          <span className="transition-transform group-open:rotate-180">▼</span>
        </summary>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {moreTopics.map((t) => (
            <TopicCard key={t.title} {...t} />
          ))}
        </div>
      </details>
    </section>
  );
}
