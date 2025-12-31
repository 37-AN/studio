"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"
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
} from "@/components/ui/chart"
import type { ChartData } from "@/lib/types"

const chartConfig = {
  streams: {
    label: "Streams",
    color: "hsl(var(--accent))",
  },
}

type StreamsChartProps = {
    data: ChartData[];
}

export function StreamsChart({ data }: StreamsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Streams Growth</CardTitle>
        <CardDescription>Monthly music streams</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value) => (value as number).toLocaleString()}
              />}
            />
            <Bar dataKey="streams" fill="var(--color-streams)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
