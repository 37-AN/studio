import { StatCard } from '@/components/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { musicReleasesData } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Music, BarChart, DollarSign, FileVideo } from 'lucide-react';
import { StreamsPerReleaseChart } from '@/components/charts/streams-per-release-chart';
import { ContentStreamsChart } from '@/components/charts/content-streams-chart';

export default function MusicLabelPage() {
    const totalStreams = musicReleasesData.reduce((acc, release) => acc + release.streams, 0);
    const totalRevenue = musicReleasesData.reduce((acc, release) => acc + release.revenue, 0);
    const totalReleases = musicReleasesData.length;
    const totalContent = musicReleasesData.reduce((acc, release) => acc + release.contentPieces, 0);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Music Label System - 43V3R</h1>
      <p className="text-muted-foreground">Tracking releases, streams, and content.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Releases" value={totalReleases.toString()} icon={<Music />} />
        <StatCard title="Total Streams" value={totalStreams.toLocaleString()} icon={<BarChart />} />
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={<DollarSign />} />
        <StatCard title="Total Content Pieces" value={totalContent.toString()} icon={<FileVideo />} />
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle>Release Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Distributor</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead className="text-right">Streams</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {musicReleasesData.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="font-medium">{release.title}</TableCell>
                    <TableCell>
                        <Badge variant="secondary">{release.distributor}</Badge>
                    </TableCell>
                    <TableCell>{new Date(release.releaseDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{release.streams.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
            <StreamsPerReleaseChart data={musicReleasesData} />
            <ContentStreamsChart data={musicReleasesData} />
        </div>
    </div>
  );
}
