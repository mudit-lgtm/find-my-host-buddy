import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { startKeepAlive } from "./lib/keepAlive";

const rootEl = document.getElementById("root")!;

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Prerendered pages ship server-rendered markup inside #root — hydrate it so
// nothing is replaced or re-rendered from scratch. The dev template has an
// empty #root, so a fresh root is created there.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

// Warm backend functions so users never hit cold-start delays.
startKeepAlive();
