"use client"

import { Pie, PieChart, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { PieChartData } from "@/lib/types"

const chartConfig = {
    'Day Job': { label: 'Day Job' },
    'AI Services': { label: 'AI Services' },
    'SaaS Build': { label: 'SaaS Build' },
    'Music': { label: 'Music' },
    'Learning': { label: 'Learning' },
}

type TimeAllocationChartProps = {
    data: PieChartData[];
}

export function TimeAllocationChart({ data }: TimeAllocationChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Allocation</CardTitle>
        <CardDescription>Weekly work distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <PieChart>
            <Tooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              strokeWidth={2}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
