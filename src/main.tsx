import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const tree = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// If prerendered HTML exists inside #root, hydrate; otherwise mount fresh.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
