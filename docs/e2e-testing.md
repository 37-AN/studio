# E2E Integration Test & Deployment Guide

## Prerequisites

To run end-to-end tests with a real Supabase database:

### Option 1: Local Supabase (Recommended for Development)

1. **Install Supabase CLI**
   ```bash
   # Using Homebrew (macOS):
   brew install supabase/tap/supabase
   
   # Or using the official script:
   curl -fsSL https://get.supabase.io | bash
   
   # Or using npm (requires special binary installation):
   npm install -g supabase
   ```

2. **Start local Supabase instance**
   ```bash
   cd /Users/34v3r/Desktop/dev/studio
   supabase start
   # This starts local Postgres, Auth, and API on default ports
   # Note the credentials and URLs printed in the output
   ```

3. **Run the database migrations**
   ```bash
   # Copy the local Supabase URL and anon key from the startup output
   # Then run the schema.sql in Supabase Studio (http://localhost:54323)
   # Or via psql if you have it:
   # psql postgres://postgres:postgres@localhost:54322/postgres < supabase/schema.sql
   ```

4. **Update .env.local with local Supabase credentials**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-startup>
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key-from-startup>
   MAKE_WEBHOOK_SECRET=changeme
   ```

5. **Run seeder and tests**
   ```bash
   npm run seed
   npm run test:calc
   npm run build
   npm run dev
   ```

6. **Hit the webhook health endpoint**
   ```bash
   curl -X GET http://localhost:3000/api/webhook
   # Should return: {"ok":true,"message":"supabase reachable"}
   
   curl -X POST http://localhost:3000/api/webhook \
     -H "x-make-secret: changeme" \
     -H "Content-Type: application/json" \
     -d '{"collection":"income","data":{"amount":250,"date":"2026-01-02","source":"AI_FACTORY","recurring":true}}'
   # Should return: {"ok":true,"result":[...]}
   ```

### Option 2: Hosted Supabase (Production & CI/CD)

1. **Create a Supabase project**
   - Visit https://app.supabase.com
   - Create a new project
   - Copy the Project URL and API keys

2. **Run the schema.sql migration**
   - Open Supabase → SQL Editor → Paste `supabase/schema.sql` and execute

3. **Set environment variables** (locally or in Vercel/CI)
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>  # Keep secret!
   MAKE_WEBHOOK_SECRET=<your-webhook-secret>
   ```

4. **Test the integration**
   ```bash
   npm run seed
   npm run test:calc
   npm run build
   ```

---

## Expected Test Results

### Calculation Tests (`npm run test:calc`)
- ✓ Monthly income total calculation
- ✓ Salary replacement percentage (e.g., 50% of R18,000)
- ✓ Discipline consistency score (last 7 days)
- ✓ Quit job readiness (3-month average >= salary)

### Webhook Health Check (`curl -X GET http://localhost:3000/api/webhook`)
- ✓ Returns 200 OK if Supabase is configured and reachable
- ✓ Returns 500/502 with helpful error if Supabase URL or credentials are missing/invalid
- ✓ Validates MAKE_WEBHOOK_SECRET header

### Webhook POST (`curl -X POST http://localhost:3000/api/webhook ...`)
- ✓ Accepts authenticated requests (x-make-secret header)
- ✓ Rejects unauthorized requests (401)
- ✓ Validates collection name (whitelist: income, clients, discipline, music_releases, outreach)
- ✓ Normalizes dates to ISO strings
- ✓ Inserts data into the correct Supabase table
- ✓ Returns inserted records with ID

### Dashboard Auth
- ✓ `/auth/login` page is accessible
- ✓ `/` (dashboard) redirects to `/auth/login` if unauthenticated
- ✓ Supabase Auth sign-up/sign-in works with email/password
- ✓ Dashboard loads metrics (income, clients, discipline, music streams)

### Database RLS
- ✓ Users can only read/write their own data (user_id matches auth.uid())
- ✓ Service role can bypass RLS for seeding

---

## Deployment to Vercel

1. **Push to GitHub** (or your repo)
   ```bash
   git add .
   git commit -m "migration: Firebase → Supabase"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com/new
   - Import the GitHub repo
   - Create a new project

3. **Add environment variables**
   In Vercel project → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   MAKE_WEBHOOK_SECRET=<your-webhook-secret>
   GEMINI_API_KEY=<your-gemini-api-key>  (optional, for AI flows)
   ```

4. **Deploy**
   - Click "Deploy" in Vercel
   - Visit your live URL and test login/dashboard

5. **Verify production**
   ```bash
   curl https://<your-vercel-url>/api/webhook
   curl -X POST https://<your-vercel-url>/api/webhook \
     -H "x-make-secret: <your-secret>" \
     -H "Content-Type: application/json" \
     -d '{"collection":"income","data":{"amount":500,"source":"AI_SAAS"}}'
   ```

---

## CI/CD Best Practices

1. **Rotate Supabase keys periodically**
   - Use Vercel's secret manager for production keys
   - Never commit service role keys to Git

2. **Run tests on every push**
   - Add GitHub Actions to run `npm run build && npm run test:calc` on PR

3. **Monitor webhook health**
   - Periodically call GET /api/webhook from monitoring service
   - Alert if it fails

4. **Enable Supabase audit logs**
   - Track inserts/updates to income, clients, etc. via Supabase dashboard

---

## Troubleshooting

### Error: "supabase not configured"
- Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local
- Check `.env.local` is not in .gitignore (it should be, for security)

### Error: "TypeError: fetch failed"
- Verify NEXT_PUBLIC_SUPABASE_URL is correct (e.g., http://localhost:54321 or https://xyz.supabase.co)
- If using local Supabase, ensure `supabase start` is running
- Check network connectivity and firewall

### Error: "invalid collection"
- Webhook only accepts: income, clients, discipline, music_releases, outreach
- Update the whitelist in `src/app/api/webhook/route.ts` if needed

### Error: RLS violation
- Verify you're using an authenticated user (not service role for testing)
- Check `user_id` in inserted records matches the authenticated user's UID

---

## Next Steps

- [ ] Add Supabase Edge Functions for Spotify sync automation
- [ ] Implement real-time updates using Supabase RealtimeClient
- [ ] Add database backups & disaster recovery plan
- [ ] Set up Sentry/monitoring for error tracking
- [ ] Add integration tests for each metric calculation
