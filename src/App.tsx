import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import GoHostinger from "./pages/GoHostinger";
import NotFound from "./pages/NotFound";
import ToolPage from "@/components/pages/ToolPage";
import GuidePage from "@/components/pages/GuidePage";
import PolicyPage from "@/components/pages/PolicyPage";
import { TOOL_ROUTES, GUIDE_ROUTES, POLICY_ROUTES } from "@/lib/seo/keywordMap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/results/:domain" element={<Results />} />
          <Route path="/go/hostinger" element={<GoHostinger />} />

          {TOOL_ROUTES.map((r) => (
            <Route key={r.path} path={r.path} element={<ToolPage route={r} />} />
          ))}
          {GUIDE_ROUTES.map((r) => (
            <Route key={r.path} path={r.path} element={<GuidePage route={r} />} />
          ))}
          {POLICY_ROUTES.map((r) => (
            <Route key={r.path} path={r.path} element={<PolicyPage route={r} />} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
