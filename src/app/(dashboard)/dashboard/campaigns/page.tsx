"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, X, Mail, Share2, Smartphone, Megaphone } from 'lucide-react';
import { useState } from 'react';

type Campaign = {
  id: string;
  name: string;
  channel: 'email' | 'social' | 'sms' | 'ads';
  budget: number;
  spent: number;
  leads: number;
  status: 'active' | 'paused' | 'completed';
};

const channelConfig = {
  email: { icon: Mail, color: 'from-blue-500 to-cyan-400' },
  social: { icon: Share2, color: 'from-purple-500 to-pink-400' },
  sms: { icon: Smartphone, color: 'from-emerald-500 to-teal-400' },
  ads: { icon: Megaphone, color: 'from-amber-500 to-orange-400' },
};

const statusConfig = {
  active: 'bg-emerald-500/15 text-emerald-400',
  paused: 'bg-amber-500/15 text-amber-400',
  completed: 'bg-blue-500/15 text-blue-400',
};

const initialCampaigns: Campaign[] = [
  { id: '1', name: 'Q3 B2B Lead Gen', channel: 'email', budget: 2000, spent: 1500, leads: 42, status: 'active' },
  { id: '2', name: 'Tech Conf Sponsorship', channel: 'ads', budget: 5000, spent: 5000, leads: 120, status: 'completed' },
  { id: '3', name: 'Summer Social Blitz', channel: 'social', budget: 1500, spent: 800, leads: 67, status: 'active' },
  { id: '4', name: 'Re-engagement SMS', channel: 'sms', budget: 500, spent: 200, leads: 18, status: 'paused' },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [showAdd, setShowAdd] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: '', channel: 'email' as Campaign['channel'], budget: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.name) return;
    setCampaigns(prev => [...prev, {
      id: Date.now().toString(),
      name: newCamp.name,
      channel: newCamp.channel,
      budget: Number(newCamp.budget) || 0,
      spent: 0,
      leads: 0,
      status: 'active',
    }]);
    setNewCamp({ name: '', channel: 'email', budget: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Manage your marketing efforts across all channels.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-opacity">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </button>
      </div>

      {/* Add Campaign */}
      {showAdd && (
        <Card className="animate-fade-in-up border-primary/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Megaphone className="h-4 w-4 text-primary" /> New Campaign</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-3 gap-4">
              <input value={newCamp.name} onChange={(e) => setNewCamp(p => ({ ...p, name: e.target.value }))} placeholder="Campaign Name *" required className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <select value={newCamp.channel} onChange={(e) => setNewCamp(p => ({ ...p, channel: e.target.value as Campaign['channel'] }))} className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="email">Email</option>
                <option value="social">Social</option>
                <option value="sms">SMS</option>
                <option value="ads">Ads</option>
              </select>
              <input value={newCamp.budget} onChange={(e) => setNewCamp(p => ({ ...p, budget: e.target.value }))} placeholder="Budget ($)" type="number" className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="sm:col-span-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors">Cancel</button>
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg font-medium hover:opacity-90 transition-opacity">Create Campaign</button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Campaign Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c, i) => {
          const config = channelConfig[c.channel];
          const Icon = config.icon;
          const progress = c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0;

          return (
            <Card key={c.id} className="animate-fade-in-up hover:-translate-y-0.5 transition-transform" style={{ animationDelay: `${i * 0.08}s` }}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{c.name}</CardTitle>
                      <span className="text-xs text-muted-foreground capitalize">{c.channel}</span>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[c.status]}`}>
                    {c.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Budget Used</span>
                    <span>${c.spent.toLocaleString()} / ${c.budget.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${config.color} transition-all duration-1000`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/20">
                  <div>
                    <p className="text-xs text-muted-foreground">Leads</p>
                    <p className="font-semibold">{c.leads}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Cost/Lead</p>
                    <p className="font-semibold">{c.leads > 0 ? `$${(c.spent / c.leads).toFixed(0)}` : '—'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
