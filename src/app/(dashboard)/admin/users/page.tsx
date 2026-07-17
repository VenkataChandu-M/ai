import { Card, CardContent } from '@/components/ui/Card';
import { Shield, MoreHorizontal, UserCheck, UserX } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            User Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Control RBAC roles, ban users, and view platform adoption.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">User ID / Email</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Last Login</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">admin@bizcatalyst.io</div>
                    <div className="text-muted-foreground text-xs">d4c3...8910</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                      <Shield className="h-3 w-3" /> Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">Just now</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">john@customer.com</div>
                    <div className="text-muted-foreground text-xs">a1b2...3456</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      User
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">2 days ago</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="text-green-500 hover:text-green-600" title="Promote to Moderator">
                      <UserCheck className="h-4 w-4" />
                    </button>
                    <button className="text-destructive hover:text-destructive/80" title="Ban User">
                      <UserX className="h-4 w-4" />
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
