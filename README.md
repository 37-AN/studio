# Supabase Studio

**Firebase → Supabase Migration Complete** ✅

This is a Next.js + Supabase (Auth + Postgres + RLS) starter dashboard for tracking AI income, music releases, discipline, and client management.

## Quick Start (Local Dev)

### Prerequisites
- Node.js 18+
- Supabase CLI (optional, for local Postgres): `brew install supabase/tap/supabase`

### Option A: Use a Hosted Supabase Project (Easiest)

1. **Create a Supabase project**: https://app.supabase.com
2. **Run the database schema**:
   - Supabase → SQL Editor → Paste contents of `supabase/schema.sql` → Execute
3. **Copy your credentials**:
   - Copy Project URL and Anon Key from Supabase dashboard
   - Copy Service Role Key from Settings → API
4. **Set environment variables**:
   ```bash
   cat > .env.local << EOF
   NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
   MAKE_WEBHOOK_SECRET=<your-webhook-secret>
   GEMINI_API_KEY=<optional-for-AI-features>
   EOF
   ```
5. **Install and run**:
   ```bash
   npm install
   npm run seed          # Populate sample data
   npm run build         # Verify build works
   npm run dev           # Start dev server
   ```
6. **Visit**: http://localhost:3000 → Sign up → Dashboard

### Option B: Local Supabase (Development with Full Control)

1. **Start local Supabase** (requires Docker):
   ```bash
   supabase start
   # Output includes local URL and credentials
   ```
2. **Set environment from startup output**:
   ```bash
   # Copy NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from startup
   cat > .env.local << EOF
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<local-service-role-key>
   MAKE_WEBHOOK_SECRET=changeme
   EOF
   ```
3. **Run schema** (in Supabase Studio http://localhost:54323):
   - Open SQL Editor → Paste `supabase/schema.sql` → Execute
4. **Seed and start**:
   ```bash
   npm install
   npm run seed
   npm run dev
   ```

## Verify Setup

### Health Check
```bash
curl -X GET http://localhost:3000/api/webhook
# Should return: {"ok":true,"message":"supabase reachable"}
```

### Run Tests
```bash
npm run test:calc      # Metric calculation tests
npm run build          # Production build test
```

### Test Webhook
```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "x-make-secret: changeme" \
  -H "Content-Type: application/json" \
  -d '{"collection":"income","data":{"amount":500,"date":"2026-01-02","source":"AI_FACTORY","recurring":true}}'
```

## Key Files

- **`supabase/schema.sql`** — Database tables and RLS policies
- **`src/lib/supabase.ts`** — Supabase client initialization
- **`src/lib/queries.ts`** — Data access layer (fetchIncome, getMonthlyIncome, etc.)
- **`src/app/api/webhook/route.ts`** — Make.com webhook endpoint (with health check)
- **`src/app/auth/login/page.tsx`** — Auth UI (sign up / sign in)
- **`src/app/(dashboard)/page.tsx`** — Main metrics dashboard
- **`src/components/AuthGuard.tsx`** — Route protection (redirect to login if not authenticated)
- **`supabase/functions/`** — Serverless Edge Functions (Spotify sync, webhook handler alternative)

## Features

✅ **Authentication**: Supabase Auth (email/password)  
✅ **Database**: Postgres with Row Level Security (RLS)  
✅ **API Routes**: Next.js serverless functions  
✅ **Edge Functions**: Supabase serverless for automations  
✅ **Metrics**: Income, discipline, clients, music streams  
✅ **Charts**: Recharts for visualization  
✅ **Styling**: TailwindCSS + Radix UI  

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/     # Protected routes
│   ├── api/webhook/     # Webhook handler
│   ├── auth/login/      # Auth page
│   └── page.tsx         # Landing / redirect
├── lib/
│   ├── supabase.ts      # Client init
│   ├── queries.ts       # Data fetching
│   ├── calculations.ts  # Metrics logic
│   └── types.ts         # TypeScript types
├── components/
│   ├── AuthGuard.tsx    # Route protection
│   ├── charts/          # Recharts components
│   └── ui/              # Radix UI components

supabase/
├── schema.sql           # Database migrations
└── functions/           # Edge Functions (optional)
```

## Deployment to Vercel

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "migration: Firebase → Supabase"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit https://vercel.com/new
   - Import your GitHub repo
   - Add environment variables (from Supabase dashboard):
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)
     - `MAKE_WEBHOOK_SECRET`
     - `GEMINI_API_KEY` (optional)
   - Click "Deploy"

3. **Verify production**:
   ```bash
   curl https://<your-vercel-url>/api/webhook
   ```

## Configuration

### Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes* | Supabase service role (server-side, keep secret) |
| `MAKE_WEBHOOK_SECRET` | No | Webhook authentication secret |
| `GEMINI_API_KEY` | No | Google Gemini API for AI features |

*Required for seeding and server-side operations.

### Webhook Integration (Make.com)

Send data to your app via Make.com:

**Endpoint**: `https://<your-url>/api/webhook`  
**Method**: POST  
**Headers**:
- `x-make-secret: <MAKE_WEBHOOK_SECRET>`
- `Content-Type: application/json`

**Payload**:
```json
{
  "collection": "income",
  "data": {
    "amount": 1000,
    "date": "2026-01-02",
    "source": "AI_SAAS",
    "recurring": true
  }
}
```

**Allowed tables**: `income`, `clients`, `discipline`, `music_releases`, `outreach`

## Next Steps

- [ ] Deploy to Vercel (see instructions above)
- [ ] Test webhook integration with Make.com
- [ ] Deploy Supabase Edge Functions (see `supabase/functions/README.md`)
- [ ] Add Spotify integration for music metrics
- [ ] Set up database backups in Supabase
- [ ] Monitor with Sentry or Supabase logs

## Documentation

- [E2E Testing & Local Setup](docs/e2e-testing.md)
- [Deployment Guide](docs/deployment.md)
- [Extension Guidance](docs/extension-guidance.md)

## Troubleshooting

**Error: "supabase not configured"**
→ Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local

**Error: "TypeError: fetch failed"**
→ Verify Supabase URL is correct; if local, ensure `supabase start` is running

**Error: "RLS violation"**
→ Check your user_id matches the authenticated user; RLS restricts access to own data

**Error: 401 on webhook**
→ Verify `x-make-secret` header matches `MAKE_WEBHOOK_SECRET`

## Support

For Supabase issues, see [Supabase Docs](https://supabase.com/docs).
For Next.js issues, see [Next.js Docs](https://nextjs.org/docs).
