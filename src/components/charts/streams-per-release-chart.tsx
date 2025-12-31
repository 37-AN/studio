"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { MusicRelease } from "@/lib/types";

const chartConfig = {
  streams: {
    label: "Streams",
    color: "hsl(var(--primary))",
  },
};

type StreamsPerReleaseChartProps = {
  data: MusicRelease[];
};

export function StreamsPerReleaseChart({ data }: StreamsPerReleaseChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Streams Per Release</CardTitle>
        <CardDescription>Performance of each track</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
              tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
            />
            <XAxis type="number" hide />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="streams" fill="var(--color-streams)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
