import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground mt-1">
            Deep insights into your campaigns and overall performance.
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-background border rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 12 Months</option>
          </select>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pageviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">124,563</div>
            <p className="text-xs text-green-500 mt-1">↑ 14% vs previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42.3%</div>
            <p className="text-xs text-red-500 mt-1">↓ 2.1% vs previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.8%</div>
            <p className="text-xs text-green-500 mt-1">↑ 0.5% vs previous period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-muted/20 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
              [Pie Chart Visualization]
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-muted/20 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
              [Line Chart Visualization]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
