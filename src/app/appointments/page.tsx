"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Scissors, 
  CalendarCheck, 
  CalendarX, 
  ArrowRight, 
  ShoppingBag,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const INITIAL_APPOINTMENTS = [
  {
    id: 'b1',
    salonName: 'Mirrors Luxury Salon & Spa',
    location: 'Jubilee Hills, Hyderabad',
    serviceName: 'AI Matched Haircut',
    date: new Date(2024, 6, 15),
    time: '10:30 AM',
    price: '₹1,499',
    status: 'Confirmed',
    color: 'primary'
  },
  {
    id: 'b2',
    salonName: 'Naturals Salon',
    location: 'Banjara Hills, Hyderabad',
    serviceName: 'Glow Signature Facial',
    date: new Date(2024, 5, 20),
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
    date: new Date(2024, 4, 12),
    time: '11:00 AM',
    price: '₹5,999',
    status: 'Completed',
    color: 'accent'
  }
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  
  // Reschedule temporary state
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCancel = () => {
    if (!cancelId) return;
    setAppointments(prev => prev.map(app => 
      app.id === cancelId ? { ...app, status: 'Cancelled' } : app
    ));
    toast({
      title: "Appointment cancelled successfully",
      description: "We've notified the salon about your cancellation.",
    });
    setCancelId(null);
  };

  const handleReschedule = () => {
    if (!rescheduleId || !newDate || !newTime) return;
    setIsUpdating(true);
    
    // Simulate API delay
    setTimeout(() => {
      setAppointments(prev => prev.map(app => 
        app.id === rescheduleId ? { ...app, date: newDate, time: newTime } : app
      ));
      toast({
        title: "Appointment rescheduled successfully",
        description: `Your appointment is now on ${format(newDate, 'PPP')} at ${newTime}.`,
      });
      setIsUpdating(false);
      setRescheduleId(null);
    }, 800);
  };

  const upcoming = appointments.filter(a => a.status === 'Confirmed');
  const past = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <header className="mb-10 space-y-2">
          <h1 className="font-headline text-4xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your AI-matched beauty treatments and appointments.</p>
        </header>

        {appointments.length === 0 ? (
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
              {upcoming.map((booking) => (
                <AppointmentCard 
                  key={booking.id} 
                  booking={booking} 
                  onCancel={() => setCancelId(booking.id)}
                  onReschedule={() => {
                    setRescheduleId(booking.id);
                    setNewDate(booking.date);
                    setNewTime(booking.time);
                  }}
                />
              ))}
              {upcoming.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No upcoming appointments.</p>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {past.map((booking) => (
                <AppointmentCard key={booking.id} booking={booking} />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Cancellation Dialog */}
      <AlertDialog open={!!cancelId} onOpenChange={(open) => !open && setCancelId(null)}>
        <AlertDialogContent className="glass rounded-[2rem] border-white/40">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-headline">Cancel Appointment?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="rounded-xl border-white/40 bg-white/50">Keep Appointment</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Dialog */}
      <Dialog open={!!rescheduleId} onOpenChange={(open) => !open && setRescheduleId(null)}>
        <DialogContent className="glass rounded-[2.5rem] border-white/40 max-w-2xl overflow-hidden p-0">
          <DialogHeader className="p-8 pb-0">
            <DialogTitle className="text-3xl font-headline">Reschedule Visit</DialogTitle>
          </DialogHeader>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass bg-white/20 rounded-2xl p-4 border-white/30">
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-6">
              <h4 className="font-headline font-bold text-lg">Select New Time</h4>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={newTime === time ? "default" : "outline"}
                    className={`rounded-xl h-12 text-sm transition-all ${newTime === time ? 'bg-primary shadow-lg shadow-primary/25' : 'bg-white/50 border-white/40'}`}
                    onClick={() => setNewTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 pt-0 flex-col sm:flex-row gap-4">
            <Button 
              variant="ghost" 
              className="rounded-xl h-12" 
              onClick={() => setRescheduleId(null)}
            >
              Go Back
            </Button>
            <Button 
              className="rounded-xl h-12 bg-primary px-8 gap-2 min-w-[160px]"
              disabled={!newDate || !newTime || isUpdating}
              onClick={handleReschedule}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                </>
              ) : (
                <>
                  Confirm New Slot <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AppointmentCard({ 
  booking, 
  onCancel, 
  onReschedule 
}: { 
  booking: any;
  onCancel?: () => void;
  onReschedule?: () => void;
}) {
  const isConfirmed = booking.status === 'Confirmed';
  const isCancelled = booking.status === 'Cancelled';
  const isCompleted = booking.status === 'Completed';

  return (
    <Card className="glass overflow-hidden rounded-[2.5rem] border-white/40 shadow-xl group hover:border-primary/30 transition-all duration-500 animate-in fade-in slide-in-from-right-4">
      <div className="p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex gap-6 items-start">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-500 ${booking.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
            <Scissors className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-headline text-2xl font-bold">{booking.salonName}</h3>
              <Badge 
                variant={isConfirmed ? 'default' : isCancelled ? 'destructive' : 'secondary'} 
                className="rounded-full text-[10px] font-bold uppercase tracking-wider px-3 py-1"
              >
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
                <CalendarIcon className="w-4 h-4 text-primary/60" />
                <span>{format(booking.date, 'MMMM dd, yyyy')}</span>
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
            {isConfirmed ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={onCancel}
                  className="flex-1 md:w-auto rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 bg-white/50 h-12 transition-all"
                >
                  <CalendarX className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button 
                  onClick={onReschedule}
                  className="flex-1 md:w-auto rounded-xl bg-primary h-12 px-6 shadow-lg shadow-primary/20"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" /> Reschedule
                </Button>
              </>
            ) : (
              <Button className="w-full md:w-auto rounded-xl bg-primary h-12 px-8 gap-2 group shadow-lg shadow-primary/20">
                {isCompleted ? 'Rebook Now' : 'Book Again'} 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
