import { DashboardSidebar } from '@/components/layouts/DashboardSidebar';
import { DashboardNavbar } from '@/components/layouts/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
