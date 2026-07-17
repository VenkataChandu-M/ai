import { Bell, Search, User } from 'lucide-react';

export function DashboardNavbar() {
  return (
    <header className="flex h-16 items-center gap-4 glass-strong border-b border-border/20 px-4 lg:px-6 sticky top-0 z-40">
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search customers, deals, or campaigns..."
              className="w-full bg-secondary/50 pl-10 pr-4 py-2.5 rounded-lg border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/70 md:w-2/3 lg:w-1/3 transition-all"
            />
          </div>
        </form>
      </div>
      <button className="relative rounded-lg p-2.5 hover:bg-secondary/50 transition-colors group">
        <Bell className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
      </button>
      <button className="rounded-lg p-2.5 hover:bg-secondary/50 transition-colors group">
        <User className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>
    </header>
  );
}
