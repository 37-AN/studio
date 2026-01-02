"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Target, Users, Radio, FileText, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { IncomeChart } from "@/components/charts/income-chart";
import { StreamsChart } from "@/components/charts/streams-chart";
import { ClientFunnelChart } from "@/components/charts/client-funnel-chart";
import { TimeAllocationChart } from "@/components/charts/time-allocation-chart";
import { fetchClients, getMonthlyIncome, fetchDiscipline, fetchMusicReleases } from "@/lib/queries";
import { calculateMonthlyTotal, salaryReplacementPercentage, disciplineConsistency, quitJobReadiness } from "@/lib/calculations";
import { onAuthChanged } from "@/lib/firebase";
import { ClientsTable } from "@/app/dashboard/components/Tables";

export default function DashboardPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [replacementPercent, setReplacementPercent] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [weeklyConsistency, setWeeklyConsistency] = useState(0);
  const [quitReady, setQuitReady] = useState(false);
  const [incomeSeries, setIncomeSeries] = useState<any[]>([]);
  const [clientsState, setClientsState] = useState<any[]>([]);
  const [totalStreams, setTotalStreams] = useState(0);
  const [latestRelease, setLatestRelease] = useState<any | null>(null);

  useEffect(() => {
    const unsub = onAuthChanged(async (u) => {
      if (!u) return; // require auth
      // fetch and compute
      const aggregated = await getMonthlyIncome(6);
      setIncomeSeries(aggregated.map((a: any) => ({ month: a.month, total: a.total })));
      const totals = aggregated.map((a: any) => a.total);
      const current = totals[0] || 0;
      setMonthlyIncome(current);
      setReplacementPercent(salaryReplacementPercentage(current, 18000));
      setQuitReady(quitJobReadiness(totals, 18000));

      const clients = await fetchClients();
      setActiveClients(clients.filter((c) => c.status === "ACTIVE").length);
      setClientsState(clients);

      const discipline = await fetchDiscipline();
      setWeeklyConsistency(disciplineConsistency(discipline));

      const releases = await fetchMusicReleases();
      const total = (releases || []).reduce((s: number, r: any) => s + (r.streams || 0), 0);
      setTotalStreams(total);
      setLatestRelease(releases && releases[0] ? releases[0] : null);
    });
    return () => unsub();
  }, []);

  const icons = {
    "Total Monthly Income": <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    "Progress to R18,000": <Target className="h-4 w-4 text-muted-foreground" />,
    "Active AI Clients": <Users className="h-4 w-4 text-muted-foreground" />,
    "Monthly Music Streams": <Radio className="h-4 w-4 text-muted-foreground" />,
    "Content Posted": <FileText className="h-4 w-4 text-muted-foreground" />,
    "Consistency Score": <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  };

  const kpis = [
    { title: "Total Monthly Income", value: `R${monthlyIncome}` , description: "Latest month total"},
    { title: "Progress to R18,000", value: `${replacementPercent}%`, description: quitReady ? "3-months >= R18,000" : "Goal progress" },
    { title: "Active AI Clients", value: `${activeClients}`, description: "Active clients" },
    { title: "Consistency Score", value: `${weeklyConsistency}%`, description: "Last 7 days" },
    { title: "Monthly Music Streams", value: `${totalStreams}`, description: latestRelease ? `Latest: ${latestRelease.title}` : "No releases" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <StatCard key={kpi.title} title={kpi.title} value={kpi.value} icon={icons[kpi.title as keyof typeof icons]} description={kpi.description} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <IncomeChart data={incomeSeries.map((s) => ({ month: s.month, income: s.total }))} />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <ClientFunnelChart data={[] as any} />
          <ClientsTable clients={clientsState} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <StreamsChart data={[] as any} />
        </div>
        <div className="lg:col-span-3">
          <TimeAllocationChart data={[] as any} />
        </div>
      </div>
    </div>
  );
}
