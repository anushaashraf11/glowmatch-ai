import { Navbar } from '@/components/layout/Navbar';
import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage({ params }: { params: { salonId: string } }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <BookingForm salonId={params.salonId} />
      </main>
    </div>
  );
}
