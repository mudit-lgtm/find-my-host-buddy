import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ResultCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: "default" | "hero";
  accentColor?: string;
  className?: string;
}

export function ResultCard({ title, icon: Icon, children, variant = "default", accentColor, className = "" }: ResultCardProps) {
  const isHero = variant === "hero";

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow relative ${isHero ? "bg-gradient-to-br from-primary/5 to-card border-primary/20" : ""} ${className}`}>
      {accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
      )}
      <CardHeader className={`flex flex-row items-center gap-2.5 sm:gap-3 pb-2 sm:pb-3 pt-4 sm:pt-5 px-4 sm:px-5 ${accentColor ? "pt-5 sm:pt-6" : ""}`}>
        <div className={`flex shrink-0 items-center justify-center rounded-lg ${isHero ? "h-10 w-10 bg-primary text-primary-foreground" : "h-8 w-8 sm:h-9 sm:w-9 bg-primary/10 text-primary"}`}>
          <Icon className={isHero ? "h-5 w-5" : "h-4 w-4"} />
        </div>
        <CardTitle className={`${isHero ? "text-base sm:text-lg" : "text-sm sm:text-base"} font-display font-semibold`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-5 pb-4 sm:pb-5">{children}</CardContent>
    </Card>
  );
}
