import { Navbar } from '@/components/layout/Navbar';
import BookingForm from '@/components/booking/BookingForm';

export default async function BookingPage({ params }: { params: Promise<{ salonId: string }> }) {
  const { salonId } = await params;
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <BookingForm salonId={salonId} />
      </main>
    </div>
  );
}
