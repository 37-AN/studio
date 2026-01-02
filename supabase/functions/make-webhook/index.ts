// Supabase Edge Function: Make.com webhook handler (alternative to Next.js route)
// Deploy with: supabase functions deploy make-webhook --no-verify
// Endpoint: POST https://<project>.supabase.co/functions/v1/make-webhook

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.35.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const webhookSecret = Deno.env.get("MAKE_WEBHOOK_SECRET")!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler(req: Request) {
  // Only POST allowed
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Verify secret header
    const secret = req.headers.get("x-make-secret") || req.headers.get("authorization");
    if (!secret || secret !== webhookSecret) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
    }

    const body = await req.json() as any;
    const collection = body.collection || "income";
    const data = body.data || body;

    // Whitelist tables
    const allowedTables = ["income", "clients", "discipline", "music_releases", "outreach"];
    if (!allowedTables.includes(collection)) {
      return new Response(JSON.stringify({ ok: false, error: "invalid collection" }), { status: 400 });
    }

    // Normalize dates to ISO strings
    const normalized = { ...data } as any;
    if (normalized.date && normalized.date instanceof Date) normalized.date = normalized.date.toISOString();
    if (normalized.releaseDate && normalized.releaseDate instanceof Date) normalized.releaseDate = normalized.releaseDate.toISOString();

    // Insert into Supabase
    const { data: inserted, error } = await supabase.from(collection).insert([normalized]).select();

    if (error) {
      console.error("Supabase insert error", error);
      return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true, result: inserted }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Webhook handler error", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
