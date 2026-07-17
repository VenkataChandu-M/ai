import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Shield, Users, Activity, Settings as SettingsIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-destructive flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Admin Control Center
        </h2>
        <p className="text-muted-foreground mt-1">
          Platform management, RBAC, and system analytics. (Admins only)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/users">
          <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Management</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,204</div>
              <p className="text-xs text-muted-foreground">Registered users across all tenants</p>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime over the last 30 days</p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Settings</CardTitle>
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Config</div>
            <p className="text-xs text-muted-foreground">Manage API keys and Webhooks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
