"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useEffect, useState } from 'react';

/* ===== Donut Chart ===== */
const pieData = [
  { label: 'Organic', value: 40, color: '#8b5cf6' },
  { label: 'Email', value: 25, color: '#06b6d4' },
  { label: 'Social', value: 20, color: '#f59e0b' },
  { label: 'Direct', value: 15, color: '#10b981' },
];

function DonutChart() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 200); }, []);
  const total = pieData.reduce((acc, d) => acc + d.value, 0);
  let cumulative = 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {pieData.map((d, i) => {
            const pct = d.value / total;
            const dashArray = circumference * pct;
            const dashOffset = circumference * (1 - pct);
            const rotation = (cumulative / total) * 360 - 90;
            cumulative += d.value;
            return (
              <circle
                key={i}
                cx="100" cy="100" r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="24"
                strokeDasharray={`${animated ? dashArray : 0} ${animated ? dashOffset : circumference}`}
                strokeLinecap="round"
                transform={`rotate(${rotation} 100 100)`}
                style={{ transition: 'stroke-dasharray 1s ease-out', transitionDelay: `${i * 0.2}s` }}
              />
            );
          })}
          <text x="100" y="95" textAnchor="middle" className="fill-foreground text-2xl font-bold">
            {total}%
          </text>
          <text x="100" y="115" textAnchor="middle" className="fill-muted-foreground text-xs">
            Total Traffic
          </text>
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {pieData.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
            {d.label} ({d.value}%)
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Line Chart ===== */
const lineData = [12, 18, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45];
const lineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function LineChart() {
  const max = Math.max(...lineData);
  const min = Math.min(...lineData);
  const w = 500;
  const h = 200;
  const padX = 40;
  const padY = 20;

  const points = lineData.map((d, i) => {
    const x = padX + (i / (lineData.length - 1)) * (w - padX * 2);
    const y = padY + (1 - (d - min) / (max - min)) * (h - padY * 2);
    return { x, y, value: d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = pathD + ` L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h + 30}`} className="w-full h-[250px]">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(263 70% 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(263 70% 50%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
        const y = padY + pct * (h - padY * 2);
        const val = Math.round(max - pct * (max - min));
        return (
          <g key={i}>
            <line x1={padX} y1={y} x2={w - padX} y2={y} stroke="hsl(215 28% 17%)" strokeWidth="1" />
            <text x={padX - 8} y={y + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">{val}k</text>
          </g>
        );
      })}
      {/* Area */}
      <path d={areaD} fill="url(#lineGrad)" className="animate-fade-in" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="hsl(263 70% 50%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-line" />
      {/* Dots */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="hsl(263 70% 50%)" className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }} />
          <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="hsl(263 70% 50%)" strokeWidth="1.5" opacity="0.3" />
        </g>
      ))}
      {/* X Labels */}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={h + 20} textAnchor="middle" className="fill-muted-foreground text-[10px]">{lineLabels[i]}</text>
      ))}
    </svg>
  );
}

const kpis = [
  { title: 'Total Pageviews', value: '124,563', change: '↑ 14%', positive: true },
  { title: 'Bounce Rate', value: '42.3%', change: '↓ 2.1%', positive: false },
  { title: 'Conversion Rate', value: '3.8%', change: '↑ 0.5%', positive: true },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep insights into your campaigns and overall performance.</p>
        </div>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-secondary/50 border border-border/50 rounded-lg h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="12m">Last 12 Months</option>
          </select>
          <button className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 rounded-lg text-sm font-medium transition-opacity">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((k, i) => (
          <Card key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{k.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{k.value}</div>
              <p className={`text-xs mt-1 ${k.positive ? 'text-emerald-500' : 'text-red-400'}`}>{k.change} vs previous period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
