import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IsItUpTool } from "./tools/IsItUpTool";
import { WhatIsMyIPTool } from "./tools/WhatIsMyIPTool";
import { PortCheckerTool } from "./tools/PortCheckerTool";

interface ToolDialogProps {
  toolId: string | null;
  onClose: () => void;
}

export function ToolDialog({ toolId, onClose }: ToolDialogProps) {
  const config: Record<string, { title: string; component: React.ReactNode }> = {
    updown: { title: "Is It Up or Down?", component: <IsItUpTool /> },
    myip: { title: "What Is My IP", component: <WhatIsMyIPTool /> },
    port: { title: "Port Checker", component: <PortCheckerTool /> },
  };

  const tool = toolId ? config[toolId] : null;
  if (!tool) return null;

  return (
    <Dialog open={!!toolId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{tool.title}</DialogTitle>
        </DialogHeader>
        {tool.component}
      </DialogContent>
    </Dialog>
  );
}
