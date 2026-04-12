import { Lock, Zap, Database, Users } from "lucide-react";

const trustItems = [
  { icon: Lock, stat: "100% Free", subtitle: "No signup required", gradient: "from-blue-500 to-cyan-500" },
  { icon: Zap, stat: "Real-Time", subtitle: "Live DNS resolution", gradient: "from-orange-500 to-amber-500" },
  { icon: Database, stat: "500+", subtitle: "Hosting providers", gradient: "from-purple-500 to-violet-500" },
  { icon: Users, stat: "10,000+", subtitle: "Developers trust us", gradient: "from-green-500 to-emerald-500" },
];

export function TrustFactors() {
  return (
    <section id="why-trust-us" className="border-t bg-muted/30">
      <div className="container max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item) => (
            <div
              key={item.stat}
              className="flex flex-col items-center text-center gap-2 rounded-xl border bg-card px-4 py-5 hover:shadow-md transition-shadow"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white shadow-md`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">
                {item.stat}
              </span>
              <span className="text-xs text-muted-foreground">{item.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}