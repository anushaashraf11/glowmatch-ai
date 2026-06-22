"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, Scissors, CreditCard, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SERVICES = [
  { id: '1', name: 'AI Matched Haircut', price: '₹1,499', numericPrice: 1499, duration: '60 min', description: 'Cut and style based on your facial structure analysis.' },
  { id: '2', name: 'Glow Signature Facial', price: '₹3,499', numericPrice: 3499, duration: '45 min', description: 'Treatments optimized for your detected skin tone.' },
  { id: '3', name: 'Precision Color', price: '₹5,999', numericPrice: 5999, duration: '120 min', description: 'Advanced coloring tailored to your natural undertones.' },
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];
const SERVICE_FEE = 99;

export default function BookingForm({ salonId }: { salonId: string }) {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);
  const total = (selectedService?.numericPrice || 0) + SERVICE_FEE;
  const progressValue = (step / 3) * 100;

  if (step === 4) {
    return (
      <div className="text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="font-headline text-4xl font-bold">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-lg">Your appointment at Orchid Beauty Studio is set.</p>
        </div>
        <Card className="glass p-8 max-w-md mx-auto rounded-[2rem] text-left space-y-4">
          <div className="flex justify-between border-b border-primary/10 pb-4">
            <span className="text-muted-foreground">Service</span>
            <span className="font-bold">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between border-b border-primary/10 pb-4">
            <span className="text-muted-foreground">Date</span>
            <span className="font-bold">{date?.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="font-bold">{selectedTime}</span>
          </div>
        </Card>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-2xl px-10 bg-primary">Add to Calendar</Button>
          <Button size="lg" variant="outline" className="rounded-2xl px-10">Manage Bookings</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-headline text-2xl font-bold">
            {step === 1 && "Choose a Service"}
            {step === 2 && "Pick a Date & Time"}
            {step === 3 && "Finalize Booking"}
          </h2>
          <span className="text-sm font-medium text-primary">Step {step} of 3</span>
        </div>
        <Progress value={progressValue} className="h-2 rounded-full" />
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-right-4 duration-500">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`glass p-6 rounded-3xl cursor-pointer border-2 transition-all ${selectedServiceId === service.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/30'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-xl font-bold">{service.name}</h3>
                  <span className="text-primary font-bold text-lg">{service.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-500">
            <div className="glass p-6 rounded-3xl flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl"
              />
            </div>
            <div className="glass p-8 rounded-3xl space-y-6">
              <h4 className="font-headline font-bold text-lg">Available Times</h4>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`rounded-xl h-12 text-sm ${selectedTime === time ? 'bg-primary' : 'bg-white/50 border-white/40'}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Card className="glass p-8 rounded-[2rem] space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Scissors className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{selectedService?.name}</h4>
                    <p className="text-sm text-muted-foreground">{date?.toLocaleDateString()} at {selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold">Payment Method</h4>
                    <p className="text-sm text-muted-foreground">UPI Payment (GPay/PhonePe)</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-primary/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{selectedService?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Booking Fee</span>
                  <span>₹{SERVICE_FEE}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-8 border-t border-primary/10">
        <Button 
          variant="ghost" 
          className="rounded-xl px-8" 
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button 
          className="rounded-xl px-10 h-12 bg-primary gap-2"
          onClick={() => setStep(s => s + 1)}
          disabled={
            (step === 1 && !selectedServiceId) || 
            (step === 2 && (!date || !selectedTime))
          }
        >
          {step === 3 ? "Confirm Booking" : "Continue"} <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}