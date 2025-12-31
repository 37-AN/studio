import {
  FileText,
  Target,
  Users,
  TrendingUp,
  Radio,
  CheckCircle,
} from "lucide-react";
import {
  executiveKpis,
  incomeGrowthData,
  streamsGrowthData,
  clientFunnelData,
  timeAllocationData,
} from "@/lib/data";
import { StatCard } from "@/components/stat-card";
import { IncomeChart } from "@/components/charts/income-chart";
import { StreamsChart } from "@/components/charts/streams-chart";
import { ClientFunnelChart } from "@/components/charts/client-funnel-chart";
import { TimeAllocationChart } from "@/components/charts/time-allocation-chart";

const icons = {
  "Total Monthly Income": <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  "Progress to R1,000,000": <Target className="h-4 w-4 text-muted-foreground" />,
  "AI Clients": <Users className="h-4 w-4 text-muted-foreground" />,
  "SaaS MRR": <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  "Monthly Music Streams": <Radio className="h-4 w-4 text-muted-foreground" />,
  "Content Posted": <FileText className="h-4 w-4 text-muted-foreground" />,
  "Consistency Score": <CheckCircle className="h-4 w-4 text-muted-foreground" />,
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {executiveKpis.map((kpi) => (
          <StatCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={icons[kpi.title as keyof typeof icons]}
            description={kpi.description}
            change={kpi.change}
            changeType={kpi.changeType}
          />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <IncomeChart data={incomeGrowthData} />
        </div>
        <div className="lg:col-span-3">
            <ClientFunnelChart data={clientFunnelData} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <StreamsChart data={streamsGrowthData} />
        </div>
        <div className="lg:col-span-3">
            <TimeAllocationChart data={timeAllocationData} />
        </div>
      </div>
    </div>
  );
}
