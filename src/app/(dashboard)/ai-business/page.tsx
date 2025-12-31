import { StatCard } from '@/components/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { aiPipelineData, saasFeaturesData } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Users, BarChart, HardDrive, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AiBusinessPage() {
  const totalRevenue = aiPipelineData.reduce((acc, client) => acc + client.revenue, 0);
  const totalClients = aiPipelineData.filter(c => c.status === 'Closed').length;
  const shippedFeatures = saasFeaturesData.filter(f => f.status === 'Shipped').length;
  const validationScore = saasFeaturesData.reduce((acc, f) => acc + f.validationScore, 0) / saasFeaturesData.length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">AI Business System</h1>
      <p className="text-muted-foreground">Managing the service-to-SaaS pipeline.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Client Revenue" value={formatCurrency(totalRevenue)} icon={<Users />} />
        <StatCard title="Closed Clients" value={totalClients.toString()} icon={<Users />} />
        <StatCard title="Features Shipped" value={shippedFeatures.toString()} icon={<HardDrive />} />
        <StatCard title="SaaS Validation Score" value={validationScore.toFixed(1)} description="Avg. score of all features" icon={<CheckSquare />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Services Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiPipelineData.map((client) => (
                  <TableRow key={client.client}>
                    <TableCell className="font-medium">{client.client}</TableCell>
                    <TableCell>{client.platform}</TableCell>
                    <TableCell>
                      <Badge variant={client.status === 'Closed' ? 'default' : client.status === 'Warm' ? 'secondary' : 'outline'}
                       className={cn(client.status === 'Closed' && 'bg-green-600 text-white')}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(client.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SaaS Build Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Validation Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {saasFeaturesData.map((feature) => (
                        <TableRow key={feature.feature}>
                            <TableCell className="font-medium">{feature.feature}</TableCell>
                            <TableCell>
                                <Badge variant={feature.status === 'Shipped' ? 'default' : feature.status === 'In Progress' ? 'secondary' : 'outline'}
                                className={cn(feature.status === 'Shipped' && 'bg-primary')}>
                                    {feature.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">{feature.validationScore}/10</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
