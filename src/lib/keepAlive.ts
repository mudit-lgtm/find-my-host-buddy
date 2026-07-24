// Keeps Supabase Edge Functions warm while a user's tab is visible.
// Pings the lightweight `health` function every 4 minutes; pauses when hidden.
import { supabase } from "@/integrations/supabase/client";

const INTERVAL_MS = 4 * 60 * 1000;
let timer: number | null = null;

function ping() {
  if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
  supabase.functions.invoke("health", { body: {} }).catch(() => {});
}

export function startKeepAlive() {
  if (typeof window === "undefined") return;
  if (timer !== null) return;
  ping();
  timer = window.setInterval(ping, INTERVAL_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") ping();
  });
}
