// Supabase Edge Function: Spotify sync
// Deploy with: supabase functions deploy spotify-sync --no-verify
// Trigger: Scheduled job (daily at 00:00 UTC) or HTTP POST

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.35.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const spotifyClientId = Deno.env.get("SPOTIFY_CLIENT_ID");
const spotifyClientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
const spotifyArtistId = Deno.env.get("SPOTIFY_ARTIST_ID");

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper: get Spotify access token
async function getSpotifyToken() {
  if (!spotifyClientId || !spotifyClientSecret) {
    throw new Error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET required");
  }
  const auth = btoa(`${spotifyClientId}:${spotifyClientSecret}`);
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const { access_token } = await res.json();
  return access_token;
}

// Helper: fetch artist's releases from Spotify
async function getArtistReleases(token: string) {
  if (!spotifyArtistId) {
    throw new Error("SPOTIFY_ARTIST_ID required");
  }
  const res = await fetch(`https://api.spotify.com/v1/artists/${spotifyArtistId}/albums?limit=10`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { items } = await res.json();
  return items || [];
}

// Helper: get track streams for an album
async function getAlbumStreams(token: string, albumId: string) {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { items } = await res.json();
  // Note: Spotify API doesn't expose streams in free tier; you'd need web scraping or a paid service
  // For now, return a placeholder
  return items?.length || 0;
}

// Main function
export async function handler(req: Request) {
  try {
    const token = await getSpotifyToken();
    const releases = await getArtistReleases(token);

    // Upsert releases into Supabase
    for (const album of releases) {
      const { data: existing } = await supabase
        .from("music_releases")
        .select("id")
        .eq("title", album.name)
        .single();

      if (!existing) {
        const streams = await getAlbumStreams(token, album.id);
        await supabase.from("music_releases").insert({
          artist: "43v3r", // or fetch from Supabase user config
          title: album.name,
          platform: "SPOTIFY",
          streams,
          release_date: album.release_date,
        });
      }
    }

    return new Response(
      JSON.stringify({ ok: true, synced: releases.length }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Spotify sync error", err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Scheduled job config (supabase/functions/spotify-sync/config.json)
// {
//   "cron": "0 0 * * *",  // Daily at 00:00 UTC
//   "function": "spotify-sync"
// }
