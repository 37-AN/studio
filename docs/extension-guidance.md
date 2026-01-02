# Extension Guidance — Next Steps 🔧

- Make.com Webhooks: POST to the built-in API route `/api/webhook` and set `MAKE_WEBHOOK_SECRET` as the header `x-make-secret` for authentication. Send JSON with { collection: "income", data: { ... } } to push data into Supabase (the route uses the `SUPABASE_SERVICE_ROLE_KEY` server key).

- Spotify: Add a server-side function that authenticates to Spotify (client_id/client_secret) and pulls latest release metrics. Store results in `music_releases` collection. The current repo includes a placeholder for `music_releases` and chart components that can be wired to the fetched data.

- Security: Keep service account credentials out of the repo. Use secrets manager in CI/CD (GitHub Actions / Firebase CI) to set `FIREBASE_SERVICE_ACCOUNT` and `MAKE_WEBHOOK_SECRET`.

- Future improvements:
  - Add role-based rules to Firestore to allow team members restricted access
  - Add background sync cron function to refresh Spotify metrics daily
  - Add more granular audit logging for webhook writes

