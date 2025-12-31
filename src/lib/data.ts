import type {
  Kpi,
  ChartData,
  PieChartData,
  FunnelData,
  AiPipelineEntry,
  SaasFeature,
  MusicRelease,
  Schedule,
  DayType,
  AutomationTool,
  Grant,
} from '@/lib/types';
import { Bot, Music, Wrench, BarChart2, Link, Landmark, Linkedin, Mail, MessageSquare } from 'lucide-react';

export const executiveKpis: Kpi[] = [
  {
    title: 'Total Monthly Income',
    value: 'R22,500',
    change: '+12.5%',
    changeType: 'increase',
    description: 'Salary + AI Services + SaaS + Music',
  },
  {
    title: 'Progress to R1,000,000',
    value: '2.25%',
    description: 'Current total income against goal',
  },
  {
    title: 'AI Clients',
    value: '3',
    change: '+1',
    changeType: 'increase',
    description: 'Total active AI service clients',
  },
  {
    title: 'SaaS MRR',
    value: 'R500',
    change: '+R500',
    changeType: 'increase',
    description: 'Monthly Recurring Revenue from SaaS',
  },
  {
    title: 'Monthly Music Streams',
    value: '10,450',
    change: '+8.2%',
    changeType: 'increase',
    description: 'Streams across all platforms',
  },
  {
    title: 'Consistency Score',
    value: '85%',
    change: '-5%',
    changeType: 'decrease',
    description: 'Days worked / Days planned this week',
  },
];

export const incomeGrowthData: ChartData[] = [
  { month: 'Jan', income: 18000 },
  { month: 'Feb', income: 18500 },
  { month: 'Mar', income: 19000 },
  { month: 'Apr', income: 20500 },
  { month: 'May', income: 21000 },
  { month: 'Jun', income: 22500 },
];

export const streamsGrowthData: ChartData[] = [
  { month: 'Jan', streams: 5200 },
  { month: 'Feb', streams: 6100 },
  { month: 'Mar', streams: 7500 },
  { month: 'Apr', streams: 8200 },
  { month: 'May', streams: 9100 },
  { month: 'Jun', streams: 10450 },
];

export const clientFunnelData: FunnelData[] = [
  { stage: 'Outreach', count: 150 },
  { stage: 'Replies', count: 45 },
  { stage: 'Meetings', count: 12 },
  { stage: 'Closed', count: 3 },
];

export const timeAllocationData: PieChartData[] = [
  { name: 'Day Job', value: 40, fill: 'hsl(var(--chart-1))' },
  { name: 'AI Services', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'SaaS Build', value: 15, fill: 'hsl(var(--chart-3))' },
  { name: 'Music', value: 10, fill: 'hsl(var(--chart-4))' },
  { name: 'Learning', value: 10, fill: 'hsl(var(--chart-5))' },
];

export const aiPipelineData: AiPipelineEntry[] = [
  { client: 'Innovate Corp', platform: 'LinkedIn', status: 'Closed', revenue: 15000, invoiceSent: 'Yes', email: 'contact@innovatecorp.com' },
  { client: 'Data Solutions Ltd', platform: 'Email', status: 'Warm', revenue: 0, invoiceSent: 'No', email: 'info@datasolutions.co.za' },
  { client: 'Local Biz Pty', platform: 'WhatsApp', status: 'Closed', revenue: 7500, invoiceSent: 'Yes', email: 'manager@localbiz.co' },
  { client: 'Future Tech', platform: 'Email', status: 'Cold', revenue: 0, invoiceSent: 'No', email: 'enquiries@futuretech.io' },
];

export const saasFeaturesData: SaasFeature[] = [
    { feature: 'User Authentication', status: 'Shipped', validationScore: 9 },
    { feature: 'Dashboard v1', status: 'Shipped', validationScore: 8 },
    { feature: 'Automated Reporting', status: 'In Progress', validationScore: 10 },
    { feature: 'Team Collaboration', status: 'Planned', validationScore: 7 },
];

export const musicReleasesData: MusicRelease[] = [
  { id: 'rel1', title: 'Midnight Drive', artist: '43V3R', releaseDate: '2023-01-15', distributor: 'DistroKid', streams: 8203, contentPieces: 15, revenue: 250 },
  { id: 'rel2', title: 'City Lights', artist: '43V3R', releaseDate: '2023-03-20', distributor: 'DistroKid', streams: 12510, contentPieces: 25, revenue: 410 },
  { id: 'rel3', title: 'Echoes in Rain', artist: '43V3R', releaseDate: '2023-05-30', distributor: 'SoundCloud', streams: 5400, contentPieces: 10, revenue: 50 },
  { id: 'rel4', title: 'Future Forward', artist: '43V3R', releaseDate: '2023-07-10', distributor: 'DistroKid', streams: 10450, contentPieces: 22, revenue: 350 },
];

export const schedules: Record<DayType, Schedule> = {
  'Work Day': {
    dayType: 'Work Day',
    availableHours: 2,
    tasks: [
      { id: 'wd1', description: 'Client Outreach (10 contacts)', type: 'mandatory' },
      { id: 'wd2', description: 'Review SaaS PRs', type: 'mandatory' },
      { id: 'wd3', description: 'Post 1 piece of content', type: 'stretch' },
    ],
  },
  'Work Night': {
    dayType: 'Work Night',
    availableHours: 2,
    tasks: [
      { id: 'wn1', description: 'Complete 1 module of advanced AI course', type: 'learning' },
      { id: 'wn2', description: 'Design 1 new automation flow in Make.com', type: 'mandatory' },
      { id: 'wn3', description: 'Outline next music track', type: 'stretch' },
    ],
  },
  'Off Day': {
    dayType: 'Off Day',
    availableHours: 5,
    tasks: [
      { id: 'od1', description: 'Deep Work: SaaS feature development (3 hours)', type: 'mandatory' },
      { id: 'od2', description: 'Client service delivery (1 hour)', type: 'mandatory' },
      { id: 'od3', description: 'Record music (1 hour)', type: 'mandatory' },
      { id: 'od4', description: 'Plan week\'s content calendar', type: 'stretch' },
      { id: 'od5', description: 'Research new grant opportunities', type: 'stretch' },
    ],
  },
};

export const financeData = {
  salary: 18000,
  livingExpenses: 15000,
  sideIncome: 4500,
  cashSavings: 30000,
};

export const automationTools: AutomationTool[] = [
  { name: 'Make.com', category: 'AI & Automation', link: 'https://make.com', icon: Wrench },
  { name: 'ChatGPT', category: 'AI & Automation', link: 'https://chat.openai.com', icon: Bot },
  { name: 'Notion', category: 'AI & Automation', link: 'https://notion.so', icon: Wrench },
  { name: 'Google Sheets', category: 'AI & Automation', link: 'https://sheets.google.com', icon: Wrench },
  { name: 'Gmail', category: 'AI & Automation', link: 'https://gmail.com', icon: Wrench },
  { name: 'LinkedIn', category: 'AI & Automation', link: 'https://linkedin.com', icon: Wrench },
  { name: 'DistroKid', category: 'Music', link: 'https://distrokid.com', icon: Music },
  { name: 'SoundCloud', category: 'Music', link: 'https://soundcloud.com', icon: Music },
  { name: 'Spotify for Artists', category: 'Music', link: 'https://artists.spotify.com', icon: Music },
  { name: 'TikTok Analytics', category: 'Music', link: 'https://www.tiktok.com/analytics', icon: Music },
  { name: 'Google Analytics', category: 'Analytics', link: 'https://analytics.google.com', icon: BarChart2 },
  { name: 'Linktree', category: 'Analytics', link: 'https://linktr.ee', icon: Link },
  { name: 'Bitly', category: 'Analytics', link: 'https://bitly.com', icon: Link },
];

export const grantsData: Grant[] = [
    { name: 'Small Enterprise Development Agency', acronym: 'SEDA', contactEmail: 'info@seda.org.za', website: 'https://seda.org.za', requirements: 'Business plan, registration docs', status: 'Not Applied' },
    { name: 'National Youth Development Agency', acronym: 'NYDA', contactEmail: 'info@nyda.gov.za', website: 'https://nyda.gov.za', requirements: 'Youth-owned (18-35), business idea', status: 'Not Applied' },
    { name: 'Department of Trade, Industry and Competition', acronym: 'DTIC', contactEmail: 'contactus@thedtic.gov.za', website: 'https://www.thedtic.gov.za', requirements: 'Varies by program, manufacturing focus', status: 'Not Applied' },
    { name: 'Technology Innovation Agency', acronym: 'TIA', contactEmail: 'customerservice@tia.org.za', website: 'https://www.tia.org.za', requirements: 'Tech-based innovation, IP potential', status: 'Not Applied' },
    { name: 'Industrial Development Corporation', acronym: 'IDC', contactEmail: 'callcentre@idc.co.za', website: 'https://www.idc.co.za', requirements: 'Job creation potential, commercially viable', status: 'Not Applied' },
];
