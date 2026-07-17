import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search, Plus } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground mt-1">Manage your marketing efforts across all channels.</p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium inline-flex items-center">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Q3 B2B Lead Gen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-semibold">$2,000</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Leads</p>
                <p className="font-semibold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
