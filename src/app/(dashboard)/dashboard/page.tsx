"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DollarSign, UserPlus, Megaphone, CalendarDays, TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

/* ===== Animated Counter ===== */
function AnimatedValue({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const inc = target / 60;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ===== Bar Chart ===== */
const barData = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 85 },
  { label: 'Wed', value: 45 },
  { label: 'Thu', value: 95 },
  { label: 'Fri', value: 70 },
  { label: 'Sat', value: 40 },
  { label: 'Sun', value: 55 },
];

function BarChart() {
  const max = Math.max(...barData.map(d => d.value));
  return (
    <div className="h-[260px] flex items-end gap-3 px-2">
      {barData.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">{d.value}</span>
          <div className="w-full rounded-t-md relative overflow-hidden" style={{ height: `${(d.value / max) * 200}px` }}>
            <div
              className="absolute inset-0 rounded-t-md bg-gradient-to-t from-primary/80 to-primary/40 animate-bar-grow chart-bar"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ===== Activity Timeline ===== */
const activities = [
  { time: '2m ago', text: 'New lead: Jane Smith from Startup IO', color: 'bg-blue-500' },
  { time: '15m ago', text: 'Deal "Acme Q3 License" moved to Won', color: 'bg-emerald-500' },
  { time: '1h ago', text: 'Campaign "Q3 B2B Lead Gen" sent 1,200 emails', color: 'bg-purple-500' },
  { time: '3h ago', text: 'AI generated 3 social media images', color: 'bg-amber-500' },
  { time: '5h ago', text: 'Meeting with DataForge completed', color: 'bg-pink-500' },
];

const stats = [
  { title: 'Total Revenue', value: 45231, prefix: '$', change: '+20.1%', up: true, icon: DollarSign, color: 'from-emerald-500 to-teal-400' },
  { title: 'New Customers', value: 2350, prefix: '+', change: '+180.1%', up: true, icon: UserPlus, color: 'from-blue-500 to-cyan-400' },
  { title: 'Active Campaigns', value: 12, prefix: '', change: '+19%', up: true, icon: Megaphone, color: 'from-purple-500 to-pink-400' },
  { title: 'Upcoming Events', value: 5, prefix: '', change: 'next 7 days', up: true, icon: CalendarDays, color: 'from-amber-500 to-orange-400' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Your key business metrics at a glance.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold"><AnimatedValue target={s.value} prefix={s.prefix} /></div>
                <div className="flex items-center gap-1 mt-1">
                  {s.up ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                  <span className={`text-xs ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>{s.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">✨</span> AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 text-sm rounded-lg border border-primary/20">
                <strong className="text-primary">Insight:</strong>{' '}
                <span className="text-foreground/80">3 deals are stuck in negotiation. Consider sending a follow-up email with the Q3 discount code.</span>
              </div>
              <div className="p-3 bg-purple-500/10 text-sm rounded-lg border border-purple-500/20">
                <strong className="text-purple-400">Insight:</strong>{' '}
                <span className="text-foreground/80">Your &apos;Tech Conf Sponsorship&apos; campaign generated 120 leads. Time to assign them to sales reps.</span>
              </div>
              <div className="p-3 bg-emerald-500/10 text-sm rounded-lg border border-emerald-500/20">
                <strong className="text-emerald-400">Insight:</strong>{' '}
                <span className="text-foreground/80">Revenue is up 20% this month. Top performing channel: Email campaigns.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-2 h-2 rounded-full mt-2 ${a.color}`} />
                <div className="flex-1">
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
