import Link from 'next/link';
import { Sparkles, MapPin, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <div className="w-full max-w-5xl glass rounded-full flex items-center justify-between px-5 py-1.5 shadow-md border-white/30">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">G</div>
          <span className="font-headline font-bold text-lg tracking-tight text-gradient">GlowMatch</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase">
          <Link href="/analysis" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>AI Analysis</span>
          </Link>
          <Link href="/salons" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Explore</span>
          </Link>
          <Link href="/appointments" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Bookings</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden w-8 h-8 rounded-full hover:bg-white/40">
            <User className="w-4 h-4" />
          </Button>
          <Button size="sm" className="hidden md:flex rounded-full bg-primary hover:bg-primary/90 px-5 h-8 text-xs font-bold shadow-sm shadow-primary/20">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
