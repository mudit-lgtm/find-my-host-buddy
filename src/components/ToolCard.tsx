import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}

const colorMap: Record<string, string> = {
  "Hosting Checker": "from-blue-500 to-blue-600",
  "DNS Lookup": "from-cyan-500 to-teal-500",
  "Is It Up or Down?": "from-green-500 to-emerald-500",
  "What Is My IP": "from-orange-500 to-amber-500",
  "Port Checker": "from-red-500 to-pink-500",
  "Domain Compare": "from-purple-500 to-violet-500",
};

export function ToolCard({ title, description, icon: Icon, href, onClick }: ToolCardProps) {
  const gradient = colorMap[title] || "from-primary to-blue-600";

  const content = (
    <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 card-hover-gradient cursor-pointer">
      <CardHeader className="flex flex-row items-start gap-4 p-5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-base font-display font-semibold leading-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );

  if (onClick) {
    return <button onClick={onClick} className="text-left w-full">{content}</button>;
  }

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }

  return content;
}