import { Navbar } from '@/components/layout/Navbar';
import SalonListings from '@/components/salons/SalonListings';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SalonsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="font-headline text-4xl font-bold">Recommended Salons</h1>
            <p className="text-muted-foreground">Nearby professionals matched with your AI profile.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search services..." className="pl-10 h-12 rounded-xl bg-white/50 border-white/50" />
            </div>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-xl bg-white/50 border-white/50">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <SalonListings />
      </main>
    </div>
  );
}
