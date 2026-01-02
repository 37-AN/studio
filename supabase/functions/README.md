# Supabase Edge Functions

This directory contains serverless functions deployed on Supabase.

## Setup

1. **Install Supabase CLI**
   ```bash
   brew install supabase/tap/supabase
   # or npm install -g supabase (with proper setup)
   ```

2. **Link your Supabase project**
   ```bash
   supabase link --project-ref <your-project-ref>
   ```

3. **Deploy functions**
   ```bash
   supabase functions deploy make-webhook --no-verify
   supabase functions deploy spotify-sync --no-verify
   ```

4. **Set function secrets**
   ```bash
   supabase secrets set MAKE_WEBHOOK_SECRET=<your-secret>
   supabase secrets set SPOTIFY_CLIENT_ID=<your-id>
   supabase secrets set SPOTIFY_CLIENT_SECRET=<your-secret>
   supabase secrets set SPOTIFY_ARTIST_ID=<your-artist-id>
   ```

## Functions

### `make-webhook`
- **Purpose**: Alternative to Next.js `/api/webhook` route; handles Make.com webhooks.
- **Endpoint**: `https://<project>.supabase.co/functions/v1/make-webhook`
- **Auth**: `x-make-secret` header
- **Tables**: income, clients, discipline, music_releases, outreach
- **Example**:
  ```bash
  curl -X POST https://<project>.supabase.co/functions/v1/make-webhook \
    -H "x-make-secret: <secret>" \
    -H "Content-Type: application/json" \
    -d '{"collection":"income","data":{"amount":100,"date":"2026-01-02","source":"AI_FACTORY"}}'
  ```

### `spotify-sync`
- **Purpose**: Fetch artist releases from Spotify API and sync to `music_releases` table.
- **Trigger**: Scheduled (daily at 00:00 UTC) or HTTP POST
- **Endpoint**: `https://<project>.supabase.co/functions/v1/spotify-sync`
- **Secrets required**: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_ARTIST_ID
- **Note**: Free Spotify API doesn't expose stream counts; consider Spotify for Artists analytics or a paid API service.

## Local Testing

To test Edge Functions locally:

1. **Start local Supabase**
   ```bash
   supabase start
   ```

2. **Deploy locally**
   ```bash
   supabase functions deploy make-webhook --no-verify
   supabase functions deploy spotify-sync --no-verify
   ```

3. **Test via local API**
   ```bash
   curl -X POST http://localhost:54321/functions/v1/make-webhook \
     -H "x-make-secret: changeme" \
     -H "Content-Type: application/json" \
     -d '{"collection":"income","data":{"amount":50,"source":"AI_SAAS"}}'
   ```

## Production Deployment

Edge Functions are deployed automatically when you run `supabase deploy` in a GitHub Actions workflow or manually via the CLI. They run on Supabase's edge network (Deno runtime).

## References

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Docs](https://deno.land/manual)
