import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "supabase not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)" }, { status: 500 });
  }
  const supabase = createClient(url, key);
  try {
    const { data, error } = await supabase.from("income").select("id").limit(1);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    return NextResponse.json({ ok: true, message: "supabase reachable" });
  } catch (err: any) {
    console.error("Supabase healthcheck error", err);
    return NextResponse.json({ ok: false, error: err?.message || String(err), hint: "Network error — check NEXT_PUBLIC_SUPABASE_URL and if local Supabase is running (supabase start)" }, { status: 502 });
  }
}

export async function POST(req: Request) {
  try {
    const secret = process.env.MAKE_WEBHOOK_SECRET;
    const header = req.headers.get("x-make-secret") || req.headers.get("authorization");
    if (!secret || !header || header !== secret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const collection = (body.collection as string) || "income";
    const data = body.data || body;

    // Whitelist tables to avoid accidental or malicious writes
    const allowedTables = ["income", "clients", "discipline", "music_releases", "outreach"] as const;
    if (!allowedTables.includes(collection as any)) {
      return NextResponse.json({ ok: false, error: "invalid collection" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ ok: false, error: "supabase not configured" }, { status: 500 });
    }

    const supabase = createClient(url, key);

    // Normalize dates to ISO strings for Postgres compatibility
    const normalized = { ...data } as any;
    if (normalized.date && normalized.date instanceof Date) normalized.date = normalized.date.toISOString();
    if (normalized.releaseDate && normalized.releaseDate instanceof Date) normalized.releaseDate = normalized.releaseDate.toISOString();

    try {
      const { data: inserted, error } = await supabase.from(collection).insert([normalized]).select();
      if (error) {
        console.error("Supabase insert error", error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, result: inserted });
    } catch (err: any) {
      console.error("Supabase network/error during insert", err);
      return NextResponse.json({ ok: false, error: err?.message || String(err), hint: "Network error — check NEXT_PUBLIC_SUPABASE_URL and if local Supabase is running (supabase start)" }, { status: 502 });
    }
  } catch (err: any) {
    console.error("Webhook handler unexpected error", err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
