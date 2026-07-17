"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

const features = [
  { icon: '🔒', title: 'Enterprise Security', desc: 'SOC 2 compliant with end-to-end encryption, SSO, and role-based access controls.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-second load times and real-time sync across all devices and team members.' },
  { icon: '🤖', title: 'AI-Powered CMO', desc: 'Autonomous AI Chief Marketing Officer generates campaigns, images, and emails.' },
  { icon: '🔗', title: 'Seamless Integrations', desc: 'Connect with 200+ tools including Slack, Zapier, Google Workspace, and more.' },
  { icon: '📱', title: 'Mobile Ready', desc: 'Full-featured responsive design. Manage your business on any device.' },
  { icon: '📊', title: 'Custom Dashboards', desc: 'Drag-and-drop dashboard builder with real-time analytics and charts.' },
];

const catalogs = [
  { title: 'CRM', desc: 'Manage contacts, deals, and pipelines. Track every customer interaction.', persona: 'For Sales Teams', color: 'from-blue-500 to-cyan-400', href: '/dashboard/crm' },
  { title: 'Campaigns', desc: 'Create and launch multi-channel marketing campaigns with AI targeting.', persona: 'For Marketers', color: 'from-purple-500 to-pink-400', href: '/dashboard/campaigns' },
  { title: 'Analytics', desc: 'Real-time dashboards, custom reports, and actionable insights.', persona: 'For Analysts', color: 'from-amber-500 to-orange-400', href: '/dashboard/analytics' },
  { title: 'Schedule', desc: 'Team calendars, appointment booking, and automated reminders.', persona: 'For Operations', color: 'from-emerald-500 to-teal-400', href: '/dashboard/schedule' },
];

const marqueeItems = ['🏢 Acme Corp', '🚀 LaunchPad Inc', '📊 DataForge', '🎯 TargetFlow', '💼 VentureStack', '🌐 GlobalReach', '⚙️ TechNova', '📈 ScaleUp AI'];

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ⚡ <span className="gradient-text">BizCatalyst</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#catalogs" className="hover:text-foreground transition-colors">Catalogs</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Log In</Link>
            <Link href="/dashboard" className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-1.5 rounded-full border border-border/50 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now in Public Beta — Join 2,500+ businesses
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Grow Your Business<br />
            With <span className="gradient-text">One Platform</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            CRM, campaigns, analytics, and scheduling — everything your team needs
            to attract, engage, and retain customers. Powered by AI.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-wrap justify-center gap-4 mb-16">
            <Link href="/dashboard" className="group bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-all flex items-center gap-2">
              Explore Dashboard
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="#how-it-works" className="px-8 py-3.5 rounded-full font-medium border border-border hover:bg-secondary transition-colors">
              See How It Works
            </a>
          </div>

          <div className="animate-fade-in-up delay-400 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: 2500, label: 'Active Businesses' },
              { value: 98, label: 'Satisfaction %', suffix: '%' },
              { value: 4, label: 'Powerful Modules' },
              { value: 24, label: '7 Support Hours' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text"><AnimatedCounter target={s.value} suffix={s.suffix} /></div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-8 border-y border-border/30 overflow-hidden">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-4">Trusted by industry leaders worldwide</p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-sm text-muted-foreground whitespace-nowrap opacity-60">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATALOGS ===== */}
      <section id="catalogs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-3 animate-fade-in-up">📦 Our Catalogs</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 animate-fade-in-up delay-100">
            Choose Your <span className="gradient-text">Business Module</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-in-up delay-200">
            Four powerful catalogs designed for different teams. Pick what fits your workflow, or use them all together.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {catalogs.map((c, i) => (
              <Link key={i} href={c.href} className="group glass rounded-xl p-6 text-left hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                <span className="text-xs font-medium text-muted-foreground">{c.persona}</span>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mt-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-white text-lg font-bold">{c.title[0]}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <span className="inline-block mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-3">✨ Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why Businesses <span className="gradient-text">Love Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Built from the ground up for modern teams, with enterprise-grade security and simplicity.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass rounded-xl p-6 text-left hover:border-primary/30 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h4 className="font-semibold mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-3">🚀 How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Up and Running in <span className="gradient-text">3 Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Get started in minutes, not months. No complex setup or technical expertise required.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Choose Catalogs', desc: 'Select the modules that fit — CRM, Campaigns, Analytics, or Scheduling.' },
              { n: '2', title: 'Configure', desc: 'Set up your workspace with custom fields, workflows, and team permissions.' },
              { n: '3', title: 'Launch & Grow', desc: 'Start using tools immediately. Invite your team and watch productivity soar.' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-8 relative">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">{s.n}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10 border border-primary/20 p-12 text-center">
            <div className="orb orb-1 opacity-20" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-8 relative z-10">Join 2,500+ companies already growing with BizCatalyst. Start your free trial today.</p>
            <Link href="/dashboard" className="relative z-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity">
              Get Started for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border/30 py-12 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-bold text-lg mb-3">⚡ <span className="gradient-text">BizCatalyst</span></p>
            <p className="text-sm text-muted-foreground leading-relaxed">The all-in-one business platform for modern teams. CRM, campaigns, analytics, and scheduling — unified.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/crm" className="hover:text-foreground transition-colors">CRM</Link></li>
              <li><Link href="/dashboard/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link></li>
              <li><Link href="/dashboard/analytics" className="hover:text-foreground transition-colors">Analytics</Link></li>
              <li><Link href="/dashboard/schedule" className="hover:text-foreground transition-colors">Scheduling</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>© 2026 BizCatalyst. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
