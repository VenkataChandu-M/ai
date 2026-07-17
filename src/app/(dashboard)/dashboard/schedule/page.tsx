"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, X, Video, Phone, Building } from 'lucide-react';
import { useState } from 'react';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  locationType: 'zoom' | 'phone' | 'office';
  status: 'upcoming' | 'completed' | 'cancelled';
};

const locationIcons = { zoom: Video, phone: Phone, office: Building };
const statusConfig = {
  upcoming: 'bg-blue-500/15 text-blue-400',
  completed: 'bg-emerald-500/15 text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-400',
};

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split('T')[0];

const initialEvents: Event[] = [
  { id: '1', title: 'Product Demo - Acme Corp', date: formatDate(new Date(today.getTime() + 2 * 86400000)), time: '10:00', duration: 60, location: 'Zoom', locationType: 'zoom', status: 'upcoming' },
  { id: '2', title: 'Follow up call - Startup IO', date: formatDate(new Date(today.getTime() + 5 * 86400000)), time: '14:30', duration: 30, location: 'Phone', locationType: 'phone', status: 'upcoming' },
  { id: '3', title: 'Strategy Meeting - DataForge', date: formatDate(today), time: '09:00', duration: 90, location: 'Office', locationType: 'office', status: 'upcoming' },
  { id: '4', title: 'Onboarding Call - TargetFlow', date: formatDate(new Date(today.getTime() - 86400000)), time: '11:00', duration: 45, location: 'Zoom', locationType: 'zoom', status: 'completed' },
];

// Build calendar grid
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: formatDate(today), time: '09:00', duration: '30', location: 'Zoom', locationType: 'zoom' as Event['locationType'] });
  const [currentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear());

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title) return;
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      duration: Number(newEvent.duration),
      location: newEvent.location,
      locationType: newEvent.locationType,
      status: 'upcoming',
    }]);
    setNewEvent({ title: '', date: formatDate(today), time: '09:00', duration: '30', location: 'Zoom', locationType: 'zoom' });
    setShowAdd(false);
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground mt-1">View and manage your upcoming events and meetings.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-opacity">
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </button>
      </div>

      {/* Add Event */}
      {showAdd && (
        <Card className="animate-fade-in-up border-primary/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-primary" /> New Event</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input value={newEvent.title} onChange={(e) => setNewEvent(p => ({ ...p, title: e.target.value }))} placeholder="Event Title *" required className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 sm:col-span-2 lg:col-span-1" />
              <input value={newEvent.date} onChange={(e) => setNewEvent(p => ({ ...p, date: e.target.value }))} type="date" className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={newEvent.time} onChange={(e) => setNewEvent(p => ({ ...p, time: e.target.value }))} type="time" className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <select value={newEvent.locationType} onChange={(e) => setNewEvent(p => ({ ...p, locationType: e.target.value as Event['locationType'], location: e.target.value === 'zoom' ? 'Zoom' : e.target.value === 'phone' ? 'Phone' : 'Office' }))} className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="zoom">Zoom</option>
                <option value="phone">Phone</option>
                <option value="office">Office</option>
              </select>
              <input value={newEvent.duration} onChange={(e) => setNewEvent(p => ({ ...p, duration: e.target.value }))} placeholder="Duration (min)" type="number" className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors">Cancel</button>
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg font-medium hover:opacity-90 transition-opacity">Create Event</button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Calendar Grid */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarIcon className="h-5 w-5 text-primary" /> {monthName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-xs text-muted-foreground font-medium py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const isToday = day === today.getDate() && currentMonth === today.getMonth();
                const dayEvents = getEventsForDay(day);
                return (
                  <div key={i} className={`relative min-h-[60px] p-1.5 rounded-lg text-sm transition-colors ${isToday ? 'bg-primary/15 border border-primary/30' : 'hover:bg-secondary/50'}`}>
                    <span className={`text-xs ${isToday ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{day}</span>
                    {dayEvents.map((ev, j) => (
                      <div key={j} className="mt-1 text-[10px] bg-primary/20 text-primary rounded px-1 py-0.5 truncate">{ev.title.split(' - ')[0]}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg">Upcoming Events</h3>
          {events.filter(e => e.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)).map((ev, i) => {
            const LocIcon = locationIcons[ev.locationType];
            return (
              <Card key={ev.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{ev.title}</h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusConfig[ev.status]}`}>{ev.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ev.time} ({ev.duration}min)</span>
                    <span className="flex items-center gap-1"><LocIcon className="h-3 w-3" /> {ev.location}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
