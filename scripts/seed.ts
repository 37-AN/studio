import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env for seeding");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  console.log("Seeding sample data...");

  await supabase.from("income").insert([
    { date: new Date().toISOString(), source: "AI_FACTORY", amount: 5000, recurring: true },
    { date: new Date().toISOString(), source: "AI_SAAS", amount: 2000, recurring: true },
    { date: new Date().toISOString(), source: "MUSIC", amount: 300, recurring: false },
  ]);

  await supabase.from("clients").insert([
    { name: "Acme Ltd", businessType: "SME", service: "AI_REPORTING", status: "ACTIVE", monthlyValue: 3000 },
    { name: "Creative Co", businessType: "ARTIST", service: "AI_CONTENT", status: "LEAD", monthlyValue: 0 },
  ]);

  const disciplineToInsert = [] as any[];
  for (let i = 0; i < 10; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    disciplineToInsert.push({ date: d.toISOString(), plannedHours: 8, workedHours: Math.random() > 0.2 ? 8 : 4, completed: Math.random() > 0.2 });
  }
  await supabase.from("discipline").insert(disciplineToInsert);

  await supabase.from("music_releases").insert([{ artist: "43v3r", title: "Single One", platform: "SPOTIFY", streams: 1200, releaseDate: new Date().toISOString() }]);

  console.log("Seeding complete");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
