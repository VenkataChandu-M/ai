import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold text-center mb-8 tracking-tighter">
        Biz<span className="text-primary">Catalyst</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px] text-center mb-12">
        The complete enterprise platform for CRM, Marketing Campaigns, Analytics, and Scheduling.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/dashboard" 
          className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
