import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { FunnelData } from "@/lib/types"

type ClientFunnelChartProps = {
    data: FunnelData[];
}

const colors = [
  "bg-primary",
  "bg-primary/80",
  "bg-primary/60",
  "bg-primary/40",
];

export function ClientFunnelChart({ data }: ClientFunnelChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Acquisition Funnel</CardTitle>
        <CardDescription>From outreach to closed deals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-2">
          {data.map((item, index) => {
            const widthPercentage = (item.count / maxCount) * 100;
            return (
              <div key={item.stage} className="w-full flex flex-col items-center">
                <div className="flex justify-between w-full text-xs text-muted-foreground px-2">
                    <span>{item.stage}</span>
                    <span>{item.count}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-6">
                  <div
                    className={`${colors[index % colors.length]} h-6 rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground`}
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}
