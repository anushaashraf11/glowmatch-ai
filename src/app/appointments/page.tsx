import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Scissors, CalendarCheck, CalendarX, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const UPCOMING_APPOINTMENTS = [
  {
    id: 'b1',
    salonName: 'Mirrors Luxury Salon & Spa',
    location: 'Jubilee Hills, Hyderabad',
    serviceName: 'AI Matched Haircut',
    date: 'July 15, 2024',
    time: '10:30 AM',
    price: '₹1,499',
    status: 'Confirmed',
    color: 'primary'
  }
];

const PAST_APPOINTMENTS = [
  {
    id: 'b2',
    salonName: 'Naturals Salon',
    location: 'Banjara Hills, Hyderabad',
    serviceName: 'Glow Signature Facial',
    date: 'June 20, 2024',
    time: '02:30 PM',
    price: '₹3,499',
    status: 'Completed',
    color: 'accent'
  },
  {
    id: 'b3',
    salonName: 'Toni & Guy',
    location: 'Gachibowli, Hyderabad',
    serviceName: 'Global Styling',
    date: 'May 12, 2024',
    time: '11:00 AM',
    price: '₹5,999',
    status: 'Completed',
    color: 'accent'
  }
];

export default function AppointmentsPage() {
  const hasAppointments = UPCOMING_APPOINTMENTS.length > 0 || PAST_APPOINTMENTS.length > 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <header className="mb-10 space-y-2">
          <h1 className="font-headline text-4xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your AI-matched beauty treatments and appointments.</p>
        </header>

        {!hasAppointments ? (
          <div className="glass rounded-[3rem] p-16 text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold">No appointments yet</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                You haven't booked any beauty treatments. Start with an AI analysis or explore top Hyderabad salons.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/salons">
                <Button size="lg" className="rounded-2xl px-8 bg-primary">Explore Salons</Button>
              </Link>
              <Link href="/analysis">
                <Button size="lg" variant="outline" className="rounded-2xl px-8 bg-white/50 border-white/40">AI Analysis</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="space-y-8">
            <TabsList className="glass p-1 h-14 rounded-2xl w-full max-w-md mx-auto grid grid-cols-2 border-white/40">
              <TabsTrigger value="upcoming" className="rounded-xl font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="rounded-xl font-bold text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Past Visits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {UPCOMING_APPOINTMENTS.map((booking) => (
                <AppointmentCard key={booking.id} booking={booking} type="upcoming" />
              ))}
              {UPCOMING_APPOINTMENTS.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No upcoming appointments.</p>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {PAST_APPOINTMENTS.map((booking) => (
                <AppointmentCard key={booking.id} booking={booking} type="past" />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}

function AppointmentCard({ booking, type }: { booking: any, type: 'upcoming' | 'past' }) {
  return (
    <Card className="glass overflow-hidden rounded-[2.5rem] border-white/40 shadow-xl group hover:border-primary/30 transition-all">
      <div className="p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex gap-6 items-start">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${booking.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
            <Scissors className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-headline text-2xl font-bold">{booking.salonName}</h3>
              <Badge variant={type === 'upcoming' ? 'default' : 'secondary'} className="rounded-full text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                {booking.status}
              </Badge>
            </div>
            <p className="text-lg font-medium text-primary">{booking.serviceName}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary/60" />
                <span>{booking.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary/60" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary/60" />
                <span>{booking.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 lg:pl-8 lg:border-l border-primary/10">
          <div className="text-center md:text-right md:mr-4">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Paid</div>
            <div className="text-2xl font-bold text-gradient">{booking.price}</div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            {type === 'upcoming' ? (
              <>
                <Button variant="outline" className="flex-1 md:w-auto rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 bg-white/50 h-12">
                  <CalendarX className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button className="flex-1 md:w-auto rounded-xl bg-primary h-12 px-6">
                  <CalendarCheck className="w-4 h-4 mr-2" /> Reschedule
                </Button>
              </>
            ) : (
              <Button className="w-full md:w-auto rounded-xl bg-primary h-12 px-8 gap-2 group">
                Rebook Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
