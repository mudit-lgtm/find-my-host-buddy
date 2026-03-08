import { Badge } from "@/components/ui/badge";

interface TechBadgeGroupProps {
  technologies: {
    cms: string[];
    frameworks: string[];
    cdn: string[];
    analytics: string[];
    server: string[];
    javascript: string[];
  };
}

const categoryConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  cms: { label: "CMS / Platform", variant: "default" },
  frameworks: { label: "Frameworks", variant: "secondary" },
  server: { label: "Server", variant: "outline" },
  cdn: { label: "CDN", variant: "secondary" },
  analytics: { label: "Analytics", variant: "outline" },
  javascript: { label: "Libraries", variant: "outline" },
};

export function TechBadgeGroup({ technologies }: TechBadgeGroupProps) {
  const hasAny = Object.values(technologies).some((arr) => arr.length > 0);

  if (!hasAny) {
    return <p className="text-sm text-muted-foreground">No technologies detected</p>;
  }

  return (
    <div className="space-y-3">
      {Object.entries(categoryConfig).map(([key, config]) => {
        const items = technologies[key as keyof typeof technologies];
        if (!items || items.length === 0) return null;
        return (
          <div key={key}>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">{config.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((tech) => (
                <Badge key={tech} variant={config.variant} className="text-xs font-mono">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
