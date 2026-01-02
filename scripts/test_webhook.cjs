// Run with: node -r ts-node/register scripts/test_webhook.cjs
const route = require('../src/app/api/webhook/route');

async function run() {
  // Ensure the MAKE_WEBHOOK_SECRET is set
  process.env.MAKE_WEBHOOK_SECRET = process.env.MAKE_WEBHOOK_SECRET || 'changeme';

  // Simulate Supabase not configured
  const prev = process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.SUPABASE_SERVICE_ROLE_KEY = '';

  const fakeReq = {
    headers: {
      get: (name) => {
        if (name === 'x-make-secret') return process.env.MAKE_WEBHOOK_SECRET;
        return null;
      },
    },
    json: async () => ({ collection: 'income', data: { amount: 42, date: new Date().toISOString() } }),
  };

  const res = await route.POST(fakeReq);
  // NextResponse.json returns a Response-like object; try to extract the body
  try {
    const json = await res.json();
    console.log('Webhook test response:', json);
  } catch (err) {
    console.error('Could not parse response object', err);
  }

  // restore
  process.env.SUPABASE_SERVICE_ROLE_KEY = prev;
}

run().catch((e) => { console.error(e); process.exit(1); });
