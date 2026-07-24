import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
