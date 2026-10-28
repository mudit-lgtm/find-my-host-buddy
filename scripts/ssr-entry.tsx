// SSR entry used by scripts/prerender.ts.
// Bundled with esbuild (see prerender.ts) because the app reads import.meta.env
// (Vite-only); prerender injects the real values via esbuild `define`.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "../src/App";

export interface RenderedRoute {
  /** Server-rendered body markup for <div id="root">. */
  body: string;
  /** Helmet head tags (title / meta / link) for <head>. */
  head: string;
}

interface HelmetOutput {
  title?: { toString(): string };
  meta?: { toString(): string };
  link?: { toString(): string };
}

export function renderRoute(path: string): RenderedRoute {
  const helmetContext: { helmet?: HelmetOutput } = {};
  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  const head = [
    helmet?.title?.toString() ?? "",
    helmet?.meta?.toString() ?? "",
    helmet?.link?.toString() ?? "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return { body, head };
}
