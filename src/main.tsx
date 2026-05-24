import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Always mount fresh into an empty #root. The prerendered SEO body lives in a
// separate hidden <div id="seo-prerender"> sibling so crawlers see content
// but users never see a plain-text flash before React boots.
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
