import Link from 'next/link';
import { Sparkles, MapPin, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="w-full max-w-6xl glass rounded-2xl flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">G</div>
          <span className="font-headline font-bold text-xl tracking-tight text-gradient">GlowMatch AI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/analysis" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI Analysis</span>
          </Link>
          <Link href="/salons" className="flex items-center gap-2 hover:text-primary transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Explore Salons</span>
          </Link>
          <Link href="/appointments" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Calendar className="w-4 h-4 text-primary" />
            <span>My Bookings</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <User className="w-5 h-5" />
          </Button>
          <Button size="sm" className="hidden md:flex rounded-xl bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
