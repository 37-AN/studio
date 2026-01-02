# Deployment & Setup ✅

## Environment variables
Create a `.env.local` file in the project root with the following (replace values from the Supabase project):

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...  # server-side key (keep secret)
MAKE_WEBHOOK_SECRET=your-secret-string

For local seeding and server-side operations, set `SUPABASE_SERVICE_ROLE_KEY`. Keep it out of source control and use your secrets manager in CI/CD.


## Local dev
- Install the Supabase CLI: `npm i -g supabase` (or follow https://supabase.com/docs/guides/cli)
- Start local Supabase for dev: `supabase start` (this provides local Postgres and Auth on default ports)
- npm install
- npm run dev

## Seeding sample data
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in `.env.local`.
- Run `npm run seed` to populate the sample data using the Supabase service role key.

## Database schema
- The SQL migration is in `supabase/schema.sql`. Run it in the Supabase SQL editor (or via psql) to create tables and enable RLS policies.

## Deploying
- Deploy the Next.js app to Vercel (free tier). Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `MAKE_WEBHOOK_SECRET` in Vercel project settings.
- Confirm RLS policies and any Postgres extensions (pgcrypto) are available in your Supabase project.

## Security
- Use Supabase Row Level Security (RLS) to restrict access. The committed `supabase/schema.sql` includes rls policy examples.
- Keep service role keys out of source control and use a secrets manager in CI/CD.

## Notes
- The Make.com webhook now POSTs to `/api/webhook` and writes into Supabase (protected by `MAKE_WEBHOOK_SECRET`).
- The app has been migrated from Firebase to Supabase; see the README for details.
