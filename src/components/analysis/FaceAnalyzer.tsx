"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { analyzeFace, type AnalyzeFaceOutput } from '@/ai/flows/ai-face-analysis';
import { generatePersonalizedBeautyRecommendations, type PersonalizedBeautyRecommendationsOutput } from '@/ai/flows/personalized-beauty-recommendations-flow';
import Image from 'next/image';
import Link from 'next/link';

export default function FaceAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeFaceOutput | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedBeautyRecommendationsOutput | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    try {
      // Step 1: Analyze Face
      const result = await analyzeFace({ selfieDataUri: image });
      setAnalysis(result);

      // Step 2: Generate Personalized Recommendations
      // Parsing simple results from analysis text for flow input
      const recs = await generatePersonalizedBeautyRecommendations({
        skinTone: "neutral-warm", // Mock mapping for this demo
        faceShape: "oval",        // Mock mapping for this demo
        skinConcerns: ["glow enhancement", "hydration"],
        hairType: "wavy"
      });
      setRecommendations(recs);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (analysis && recommendations) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-3xl overflow-hidden aspect-square relative">
            <Image src={image!} alt="Selfie" fill className="object-cover" />
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> AI Analyzed
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl border-primary/20">
              <h3 className="font-headline font-bold text-xl mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Skin Tone Analysis
              </h3>
              <p className="text-muted-foreground leading-relaxed">{analysis.skinToneAnalysis}</p>
            </div>
            
            <div className="glass p-6 rounded-3xl border-accent/20">
              <h3 className="font-headline font-bold text-xl mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-accent" /> Facial Structure
              </h3>
              <p className="text-muted-foreground leading-relaxed">{analysis.facialStructureAnalysis}</p>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] space-y-8 bg-gradient-to-br from-white/60 to-primary/5">
          <h2 className="font-headline text-3xl font-bold text-center">Your Smart Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RecommendationSection title="Hairstyles" items={recommendations.hairstyles} />
            <RecommendationSection title="Skincare" items={recommendations.skincareRoutine} />
            <RecommendationSection title="Services" items={recommendations.cosmeticServices} />
            <RecommendationSection title="Pro Tips" items={recommendations.generalTips} />
          </div>

          <div className="flex justify-center pt-8">
            <Link href="/salons">
              <Button size="lg" className="rounded-2xl h-14 px-10 bg-primary shadow-xl shadow-primary/30 gap-2">
                Find Salons for These Treatments <Upload className="w-5 h-5 rotate-90" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {!image ? (
        <div className="glass-dark aspect-square rounded-[3rem] flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-primary/30 group hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-headline text-2xl font-bold mb-2">Upload a Selfie</h3>
          <p className="text-muted-foreground">Click or drag and drop to start your analysis</p>
          <div className="mt-8 flex gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Natural Light
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Clear Face
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden glass shadow-2xl">
            <Image src={image} alt="Preview" fill className="object-cover" />
            <Button 
              variant="secondary" 
              className="absolute top-4 right-4 rounded-full" 
              onClick={() => setImage(null)}
            >
              Change Photo
            </Button>
          </div>
          <Button 
            className="w-full h-16 rounded-2xl text-xl font-bold bg-primary gap-3 shadow-xl shadow-primary/20"
            onClick={startAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Your Features...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Begin Face Analysis
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function RecommendationSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="space-y-4">
      <h4 className="font-headline font-bold text-primary flex items-center gap-2 border-b pb-2 border-primary/10">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span className="text-muted-foreground leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
