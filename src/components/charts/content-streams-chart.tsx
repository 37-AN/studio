"use client";

import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { MusicRelease } from "@/lib/types";

const chartConfig = {
  correlation: {
    label: "Release",
    color: "hsl(var(--accent))",
  },
};

type ContentStreamsChartProps = {
  data: MusicRelease[];
};

export function ContentStreamsChart({ data }: ContentStreamsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content vs. Streams</CardTitle>
        <CardDescription>Correlation between content pieces and streams</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="contentPieces" name="Content Pieces" unit="" />
            <YAxis type="number" dataKey="streams" name="Streams" unit="" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent indicator="dot" />} />
            <Scatter name="Releases" data={data} fill="var(--color-correlation)" />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
