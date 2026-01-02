import { supabase } from "./supabase";
import { startOfMonth, format } from "date-fns";

export type IncomeEntry = {
  id?: string;
  date: string | Date;
  source: "SALARY" | "AI_FACTORY" | "AI_CONTENT" | "AI_SAAS" | "MUSIC";
  amount: number;
  recurring: boolean;
  notes?: string;
  user_id?: string;
};

export type Client = {
  id?: string;
  name: string;
  businessType?: string;
  service?: string;
  status?: string;
  monthlyValue?: number;
  startDate?: Date | string;
};

async function fetchCollection<T>(table: string): Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*").order("date", { ascending: false });
  if (error) throw error;
  return (data as T[]) || [];
}

export async function fetchIncome(): Promise<IncomeEntry[]> {
  return fetchCollection<IncomeEntry>("income");
}

export async function fetchClients(): Promise<Client[]> {
  const { data, error } = await supabase.from("clients").select("*");
  if (error) throw error;
  return (data as Client[]) || [];
}

export async function fetchDiscipline() {
  return fetchCollection<any>("discipline");
}

export async function fetchMusicReleases() {
  return fetchCollection<any>("music_releases");
}

export async function fetchOutreach() {
  return fetchCollection<any>("outreach");
}

export async function getMonthlyIncome(months = 6) {
  // Use a date range filter to minimize data transfer
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  const isoStart = start.toISOString().slice(0, 10); // YYYY-MM-DD

  const { data: incomes, error } = await supabase
    .from("income")
    .select("date, amount")
    .gte("date", isoStart)
    .order("date", { ascending: false });

  if (error) throw error;

  const map: Record<string, number> = {};
  for (const inc of (incomes || []) as any[]) {
    const d = inc.date instanceof Date ? inc.date : new Date(inc.date as any);
    const key = format(startOfMonth(d), "yyyy-MM-dd");
    map[key] = (map[key] || 0) + (Number(inc.amount) || 0);
  }

  // Ensure the returned array contains exactly `months` entries (fill missing months with 0)
  const out: { month: string; total: number }[] = [];
  for (let i = 0; i < months; i++) {
    const mDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = format(startOfMonth(mDate), "yyyy-MM-dd");
    out.push({ month: key, total: map[key] || 0 });
  }

  return out.slice(0, months);
}
