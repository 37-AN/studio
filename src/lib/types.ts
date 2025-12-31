import type { LucideIcon } from 'lucide-react';

export type Kpi = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  description: string;
};

export type ChartData = {
  month: string;
  [key: string]: string | number;
};

export type PieChartData = {
  name: string;
  value: number;
  fill: string;
};

export type FunnelData = {
  stage: string;
  count: number;
};

export type AiPipelineEntry = {
  client: string;
  platform: 'LinkedIn' | 'Email' | 'WhatsApp';
  status: 'Cold' | 'Warm' | 'Closed';
  revenue: number;
  invoiceSent: 'Yes' | 'No';
  email: string;
};

export type SaasFeature = {
  feature: string;
  status: 'Shipped' | 'In Progress' | 'Planned';
  validationScore: number;
};

export type MusicRelease = {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  distributor: 'DistroKid' | 'SoundCloud' | 'Other';
  streams: number;
  contentPieces: number;
  revenue: number;
};

export type DayType = 'Work Day' | 'Work Night' | 'Off Day';

export type Task = {
  id: string;
  description: string;
  type: 'mandatory' | 'stretch' | 'learning';
};

export type Schedule = {
  dayType: DayType;
  availableHours: number;
  tasks: Task[];
};

export type AutomationTool = {
  name: string;
  category: 'AI & Automation' | 'Music' | 'Analytics';
  link: string;
  icon: LucideIcon;
};

export type Grant = {
  name: string;
  acronym: string;
  contactEmail: string;
  website: string;
  requirements: string;
  status: 'Applied' | 'Pending' | 'Approved' | 'Not Applied';
};
