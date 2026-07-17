import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground mt-1">View and manage your upcoming events and meetings.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" /> Product Demo - Acme Corp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> 10:00 AM (60 min)
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Zoom Link
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
