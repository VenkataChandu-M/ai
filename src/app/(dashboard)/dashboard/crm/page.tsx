"use client";

import { Card, CardContent } from '@/components/ui/Card';
import { Search, Plus, MoreHorizontal, X, UserPlus } from 'lucide-react';
import { useState } from 'react';

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'lead' | 'customer' | 'churned';
  added: string;
};

const initialContacts: Contact[] = [
  { id: '1', name: 'John Doe', email: 'john@acme.com', company: 'Acme Corp', status: 'customer', added: 'Today' },
  { id: '2', name: 'Jane Smith', email: 'jane@startup.io', company: 'Startup IO', status: 'lead', added: 'Yesterday' },
  { id: '3', name: 'Marcus Kim', email: 'marcus@dataforge.ai', company: 'DataForge', status: 'customer', added: '3 days ago' },
  { id: '4', name: 'Anika Patel', email: 'anika@targetflow.com', company: 'TargetFlow', status: 'lead', added: '5 days ago' },
  { id: '5', name: 'James Liu', email: 'james@scaleup.ai', company: 'ScaleUp AI', status: 'churned', added: '1 week ago' },
];

const statusConfig = {
  customer: { label: 'Customer', bg: 'bg-emerald-500/15 text-emerald-400' },
  lead: { label: 'Lead', bg: 'bg-blue-500/15 text-blue-400' },
  churned: { label: 'Churned', bg: 'bg-red-500/15 text-red-400' },
};

export default function CRMPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', company: '', status: 'lead' as Contact['status'] });

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.email) return;
    setContacts(prev => [...prev, { ...newContact, id: Date.now().toString(), added: 'Just now' }]);
    setNewContact({ name: '', email: '', company: '', status: 'lead' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground mt-1">Manage your contacts, leads, and active deals.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 inline-flex items-center rounded-lg text-sm font-medium transition-opacity"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </button>
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <Card className="animate-fade-in-up border-primary/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2"><UserPlus className="h-4 w-4 text-primary" /> New Contact</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
              <input value={newContact.name} onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))} placeholder="Full Name *" required className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={newContact.email} onChange={(e) => setNewContact(p => ({ ...p, email: e.target.value }))} placeholder="Email *" type="email" required className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={newContact.company} onChange={(e) => setNewContact(p => ({ ...p, company: e.target.value }))} placeholder="Company" className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <select value={newContact.status} onChange={(e) => setNewContact(p => ({ ...p, status: e.target.value as Contact['status'] }))} className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="lead">Lead</option>
                <option value="customer">Customer</option>
              </select>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors">Cancel</button>
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg font-medium hover:opacity-90 transition-opacity">Add Contact</button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search contacts by name, email, or company..."
          className="w-full bg-secondary/50 pl-10 pr-4 py-2.5 rounded-lg border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/30">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Added</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="px-6 py-4">
                      <div className="font-medium">{c.name}</div>
                      <div className="text-muted-foreground text-xs">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{c.company}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[c.status].bg}`}>
                        {statusConfig[c.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{c.added}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No contacts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
