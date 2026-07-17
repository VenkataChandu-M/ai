"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart3, Mail, Calendar, Settings, LogOut, Sparkles, Shield } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/crm', label: 'CRM', icon: Users },
  { href: '/dashboard/campaigns', label: 'Campaigns', icon: Mail },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/ai', label: 'AI Co-Pilot', icon: Sparkles, highlight: true },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-64 flex-shrink-0 min-h-screen flex-col glass-strong border-r border-border/30 sticky top-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border/20">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">⚡ <span className="gradient-text">BizCatalyst</span></span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary/15 text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }
                ${item.highlight && !isActive ? 'text-primary/80' : ''}
              `}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''} ${item.highlight ? 'text-primary' : ''}`} />
              {item.label}
              {item.highlight && (
                <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold animate-pulse-glow">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border/20 space-y-1">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive/80 hover:bg-destructive/10 transition-colors"
        >
          <Shield className="h-4 w-4" />
          Admin Panel
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
