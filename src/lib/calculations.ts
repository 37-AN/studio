import { IncomeEntry } from "./queries";

export function calculateMonthlyTotal(entries: IncomeEntry[]) {
  return entries.reduce((s, e) => s + (e.amount || 0), 0);
}

export function salaryReplacementPercentage(monthlyIncome: number, salary = 18000) {
  if (salary === 0) return 0;
  return Math.round((monthlyIncome / salary) * 100);
}

export function disciplineConsistency(entries: { date: string | any; completed: boolean }[]) {
  if (!entries.length) return 0;
  const last7 = entries.slice(0, 7);
  const completed = last7.filter((e) => e.completed).length;
  return Math.round((completed / last7.length) * 100);
}

export function quitJobReadiness(monthlyTotals: number[], salary = 18000) {
  // true when last 3 months monthly totals >= salary
  if (monthlyTotals.length < 3) return false;
  const last3 = monthlyTotals.slice(0, 3);
  return last3.every((t) => t >= salary);
}
