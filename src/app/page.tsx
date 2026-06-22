import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Camera, Scissors, ShieldCheck, Users, Target, Store, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-beauty');

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                <Sparkles className="w-3 h-3" />
                <span>AI-Powered Beauty</span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight">
                Reveal Your <span className="text-gradient">Natural</span> Glow.
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Upload a selfie and let our AI analyze your features to recommend perfect treatments, hairstyles, and skincare routines tailored for your unique Indian skin profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/analysis">
                  <Button size="lg" className="rounded-2xl px-8 h-14 bg-primary text-lg gap-2 shadow-lg shadow-primary/25">
                    Start AI Analysis <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/salons">
                  <Button size="lg" variant="outline" className="rounded-2xl px-8 h-14 text-lg bg-white/50 border-white/40">
                    Find Salons in Hyderabad
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted">
                      <img src={`https://picsum.photos/seed/user${i}/100`} alt="user" />
                    </div>
                  ))}
                </div>
                <p>Trusted by 10k+ beauty enthusiasts across India</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-accent opacity-20 blur-3xl rounded-full" />
              <div className="relative glass rounded-3xl p-4 shadow-2xl overflow-hidden aspect-[4/5] md:aspect-square">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description}
                    fill
                    className="object-cover rounded-2xl"
                    priority
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6 border-white/50 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">AI Matched</h4>
                      <p className="text-sm text-muted-foreground">Warm Olive Undertones Found</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pb-24 px-6 relative z-10">
          <div className="max-w-6xl mx-auto glass rounded-[3.5rem] p-10 md:p-16 border-white/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
            
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-bold font-headline text-gradient">10,000+</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Consultations</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Store className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-bold font-headline text-gradient">500+</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Partner Salons</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-bold font-headline text-gradient">95%</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Accuracy Rate</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-bold font-headline text-gradient">50,000+</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bookings Done</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 text-center mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">How GlowMatch Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Luxury beauty meets cutting-edge technology to simplify your glow-up journey in Hyderabad.</p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Camera className="w-8 h-8 text-primary" />}
              title="Step 1: AI Selfie Scan"
              description="Our advanced computer vision analyzes your skin tone, face shape, and hair texture in seconds."
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-primary" />}
              title="Step 2: Smart Recommendations"
              description="Receive a curated list of hairstyles, treatments, and skincare products that actually suit your profile."
            />
            <FeatureCard 
              icon={<Scissors className="w-8 h-8 text-primary" />}
              title="Step 3: Precise Booking"
              description="Connect with top-rated Hyderabad salons and book your AI-matched treatment instantly."
            />
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-primary/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">G</div>
            <span className="font-headline font-bold text-xl tracking-tight text-gradient">GlowMatch AI Hyderabad</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 GlowMatch AI India. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-10 rounded-3xl space-y-4 hover:translate-y-[-8px] transition-transform duration-300">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-headline text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}