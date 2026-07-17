import { Bell, Search, User } from 'lucide-react';

export function DashboardNavbar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search customers, deals, or campaigns..."
              className="w-full appearance-none bg-background pl-8 shadow-none rounded-md border-0 py-2 ring-1 ring-inset ring-input sm:text-sm focus:ring-2 focus:ring-primary md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <button className="rounded-full border border-border p-2 hover:bg-muted transition-colors relative">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
      </button>
      <button className="rounded-full border border-border p-2 hover:bg-muted transition-colors">
        <User className="h-4 w-4" />
      </button>
    </header>
  );
}
