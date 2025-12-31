"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { schedules } from '@/lib/data';
import type { DayType, Schedule as ScheduleType, Task } from '@/lib/types';
import { Bed, Briefcase, Coffee, AlertTriangle } from 'lucide-react';
import { StatCard } from '@/components/stat-card';

const cycle = ['Work Day', 'Work Day', 'Work Night', 'Work Night', 'Off Day', 'Off Day'];
const startDate = new Date('2024-01-01');

const icons = {
  'Work Day': <Briefcase className="h-6 w-6" />,
  'Work Night': <Bed className="h-6 w-6" />,
  'Off Day': <Coffee className="h-6 w-6" />,
};

export default function SchedulePage() {
  const [currentDayType, setCurrentDayType] = useState<DayType>('Off Day');
  const [schedule, setSchedule] = useState<ScheduleType | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [weeklyScore, setWeeklyScore] = useState(100);
  const [missedDays, setMissedDays] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const dayInCycle = diffDays % 6;
    const type = cycle[dayInCycle] as DayType;
    setCurrentDayType(type);
    setSchedule(schedules[type]);
  }, []);

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const mandatoryTasks = schedule?.tasks.filter(t => t.type === 'mandatory') || [];
  const completedMandatory = mandatoryTasks.filter(t => completedTasks.has(t.id)).length;
  const progress = mandatoryTasks.length > 0 ? (completedMandatory / mandatoryTasks.length) * 100 : 100;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Daily Schedule</h1>
      <p className="text-muted-foreground">Automatically generated for your shift pattern.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Today is an <span className="text-primary">{currentDayType}</span>
                </CardTitle>
                <CardDescription>Available hours for deep work: {schedule?.availableHours}</CardDescription>
              </div>
              <div className="text-primary">{icons[currentDayType]}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Mandatory Tasks</h3>
              <div className="space-y-2">
                {schedule?.tasks.filter(t => t.type !== 'stretch').map((task: Task) => (
                  <div key={task.id} className="flex items-center space-x-3 rounded-md border p-3">
                    <Checkbox id={task.id} onCheckedChange={() => handleTaskToggle(task.id)} />
                    <label htmlFor={task.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {task.description}
                    </label>
                    <Badge variant={task.type === 'learning' ? 'secondary' : 'outline'} className="ml-auto">
                      {task.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Stretch Tasks</h3>
              <div className="space-y-2">
                {schedule?.tasks.filter(t => t.type === 'stretch').map((task: Task) => (
                   <div key={task.id} className="flex items-center space-x-3 rounded-md border p-3 bg-muted/50">
                    <Checkbox id={task.id} onCheckedChange={() => handleTaskToggle(task.id)} />
                     <label htmlFor={task.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       {task.description}
                     </label>
                   </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Daily Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-center text-lg font-medium">{completedMandatory} / {mandatoryTasks.length} mandatory tasks</p>
                        <Progress value={progress} />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Anti-Laziness System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <StatCard title="Weekly Discipline" value={`${weeklyScore}%`} description="Based on completed mandatory tasks"/>
                    <StatCard title="Missed Day Penalties" value={missedDays.toString()} icon={<AlertTriangle className="text-destructive"/>} description="Days with 0 mandatory tasks completed"/>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
