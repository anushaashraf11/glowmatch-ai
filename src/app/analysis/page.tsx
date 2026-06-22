import { Navbar } from '@/components/layout/Navbar';
import FaceAnalyzer from '@/components/analysis/FaceAnalyzer';

export default function AnalysisPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">AI Face Analysis</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take or upload a well-lit selfie to receive personalized beauty recommendations. 
            Our AI focuses on skin tone and facial structure.
          </p>
        </div>
        
        <FaceAnalyzer />
      </main>
    </div>
  );
}
