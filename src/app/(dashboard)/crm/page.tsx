import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
          <p className="text-muted-foreground mt-1">
            Manage your contacts, leads, and active deals.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search contacts by name or email..."
            className="w-full bg-background pl-8 border rounded-md h-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Added</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">John Doe</div>
                    <div className="text-muted-foreground text-xs">john@acme.com</div>
                  </td>
                  <td className="px-6 py-4">Acme Corp</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Customer
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">Today</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">Jane Smith</div>
                    <div className="text-muted-foreground text-xs">jane@startup.io</div>
                  </td>
                  <td className="px-6 py-4">Startup IO</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Lead
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">Yesterday</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
