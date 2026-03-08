import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  comingSoon?: boolean;
}

export function ToolCard({ title, description, icon: Icon, href, comingSoon }: ToolCardProps) {
  const Wrapper = comingSoon ? "div" : Link;
  return (
    <Wrapper to={comingSoon ? undefined : href} className={comingSoon ? "cursor-default" : ""}>
      <Card className={`group h-full transition-all duration-200 ${comingSoon ? "opacity-60" : "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"}`}>
        <CardHeader className="flex flex-row items-start gap-4 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base font-display font-semibold leading-tight">
              {title}
              {comingSoon && (
                <span className="ml-2 inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  Soon
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Wrapper>
  );
}
