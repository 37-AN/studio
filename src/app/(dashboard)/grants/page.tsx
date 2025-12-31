import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { grantsData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function GrantsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">South African Grants & Contacts</h1>
      <p className="text-muted-foreground">An embedded directory of funding and support organizations.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Grant Opportunities</CardTitle>
          <CardDescription>
            A curated list of agencies to help fund and support your venture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grantsData.map((grant) => (
                <TableRow key={grant.acronym}>
                  <TableCell className="font-medium">
                    <div>{grant.name}</div>
                    <div className="text-sm text-muted-foreground">{grant.acronym}</div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{grant.requirements}</TableCell>
                  <TableCell>
                    <Badge variant={grant.status === 'Not Applied' ? "outline" : "default"}>{grant.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={grant.website} target="_blank">
                            Visit <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
