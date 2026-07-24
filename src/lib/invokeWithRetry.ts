// Resilient wrapper around supabase.functions.invoke.
// Adds timeout + retries with exponential backoff to survive Edge Function cold-starts.
import { supabase } from "@/integrations/supabase/client";

export interface InvokeOptions {
  body?: unknown;
  timeoutMs?: number;
  retries?: number;
  onRetry?: (attempt: number) => void;
}

export async function invokeWithRetry<T = unknown>(
  functionName: string,
  { body, timeoutMs = 15000, retries = 2, onRetry }: InvokeOptions = {},
): Promise<{ data: T | null; error: Error | null }> {
  const attempts = retries + 1;
  const backoff = [0, 700, 1800];
  let lastErr: Error | null = null;

  for (let i = 0; i < attempts; i++) {
    if (i > 0) {
      onRetry?.(i);
      await new Promise((r) => setTimeout(r, backoff[i] ?? 2000));
    }
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: body as Record<string, unknown> | undefined,
      });
      clearTimeout(t);
      if (error) {
        lastErr = new Error(error.message || "Function error");
        continue;
      }
      return { data: data as T, error: null };
    } catch (e) {
      clearTimeout(t);
      lastErr = e instanceof Error ? e : new Error(String(e));
    }
  }
  return { data: null, error: lastErr ?? new Error("Unknown failure") };
}
