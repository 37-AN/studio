import { StatCard } from '@/components/stat-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { financeData } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, PiggyBank, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function FinancePage() {
    const { salary, livingExpenses, sideIncome, cashSavings } = financeData;
    const totalIncome = salary + sideIncome;
    const netMonthly = totalIncome - livingExpenses;
    const runway = cashSavings / livingExpenses;
    const freedomPercentage = Math.min((sideIncome / livingExpenses) * 100, 100);
    const breakEvenMonth = netMonthly > 0 ? "Achieved" : `in ${Math.ceil(livingExpenses / netMonthly * -1)} months`;
  
    const isRisk = runway < 3;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Money & Survival Tracker</h1>
      <p className="text-muted-foreground">Zero Capital Reality: Tracking the path to financial freedom.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Monthly Income" value={formatCurrency(totalIncome)} icon={<TrendingUp />} />
        <StatCard title="Living Expenses" value={formatCurrency(livingExpenses)} icon={<TrendingDown />} />
        <StatCard title="Side Income Growth" value={formatCurrency(sideIncome)} icon={<TrendingUp />} />
        <StatCard title="Cash Runway" value={`${runway.toFixed(1)} months`} icon={<PiggyBank />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Freedom Meter</CardTitle>
                <CardDescription>
                    How much of your living expenses are covered by business income.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <Progress value={freedomPercentage} />
                    </div>
                    <span className="text-xl font-bold text-primary">{freedomPercentage.toFixed(0)}%</span>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">
                    You need {formatCurrency(livingExpenses)}/month to be free. Your side hustles currently generate {formatCurrency(sideIncome)}.
                </p>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Break-Even Point</CardTitle>
                 <CardDescription>When side income covers all living expenses.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold text-center p-6">
                    {breakEvenMonth}
                </p>
            </CardContent>
        </Card>
      </div>
      
      {isRisk ? (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Risk Alert!</AlertTitle>
            <AlertDescription>
            Your cash runway is below 3 months. Focus on increasing income or reducing expenses immediately.
            </AlertDescription>
        </Alert>
      ) : (
        <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Financially Stable</AlertTitle>
            <AlertDescription>
            Your cash runway is healthy. Keep building momentum.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
