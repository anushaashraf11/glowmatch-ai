"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Sparkles, Loader2, CheckCircle2, User, Palette, Maximize2, Scissors, Zap, Award, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock types to maintain compatibility with the UI
type MockAnalysis = {
  skinType: string;
  skinTone: string;
  faceShape: string;
  confidenceScore: number;
  beautyScore: number;
  skinToneAnalysis: string;
  facialStructureAnalysis: string;
};

type MockRecommendations = {
  hairstyles: string[];
  skincareRoutine: string[];
  cosmeticServices: string[];
  generalTips: string[];
};

const SKIN_TYPES = ["Combination", "Oily", "Dry", "Sensitive", "Normal"];
const SKIN_TONES = ["Warm Olive", "Cool Ivory", "Neutral Sand", "Golden Honey", "Deep Bronze"];
const FACE_SHAPES = ["Oval", "Heart", "Square", "Round", "Diamond"];

export default function FaceAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MockAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<MockRecommendations | null>(null);

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
    
    // Simulate complex AI processing time
    setTimeout(() => {
      const randomSkinType = SKIN_TYPES[Math.floor(Math.random() * SKIN_TYPES.length)];
      const randomSkinTone = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
      const randomFaceShape = FACE_SHAPES[Math.floor(Math.random() * FACE_SHAPES.length)];
      const confidence = Math.floor(Math.random() * 10) + 89; // 89-99%
      const beauty = Math.floor(Math.random() * 8) + 91; // 91-99%

      const mockResult: MockAnalysis = {
        skinType: randomSkinType,
        skinTone: randomSkinTone,
        faceShape: randomFaceShape,
        confidenceScore: confidence,
        beautyScore: beauty,
        skinToneAnalysis: `Detected ${randomSkinTone} undertones with balanced melanin levels. Ideal for earth-toned makeup palettes and high-SPF hydration routines.`,
        facialStructureAnalysis: `The ${randomFaceShape} structure shows strong symmetry in the cheekbones and a balanced jawline. High-volume hairstyles will accentuate these features.`
      };

      const mockRecs: MockRecommendations = {
        hairstyles: [
          `Layered cut to complement ${randomFaceShape} shape`,
          "Textured waves for volume",
          "Face-framing fringe"
        ],
        skincareRoutine: [
          `Hydrating serum for ${randomSkinType} skin`,
          "Vitamin C brightening complex",
          "Gentle exfoliating toner"
        ],
        cosmeticServices: [
          "Glow Signature Facial",
          "AI Matched Haircut",
          "Dermal Infusion Therapy"
        ],
        generalTips: [
          "Maintain daily SPF 50+ protection",
          "Stay hydrated for natural skin elasticity",
          "Use cool-toned styling products"
        ]
      };

      setAnalysis(mockResult);
      setRecommendations(mockRecs);
      setIsAnalyzing(false);
    }, 2500);
  };

  if (analysis && recommendations) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="glass rounded-[2.5rem] overflow-hidden aspect-[3/4] relative shadow-2xl border-white/40">
              <Image src={image!} alt="Analyzed Selfie" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold w-fit shadow-lg">
                  <CheckCircle2 className="w-4 h-4" /> AI ANALYSIS COMPLETE
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border-white/40 bg-gradient-to-br from-white/60 to-primary/5 shadow-xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-headline font-bold text-gradient">AI Beauty Report</h2>
                  <p className="text-muted-foreground">Personalized Analysis & Profile</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Confidence</div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className="text-2xl font-bold text-primary">{analysis.confidenceScore}%</div>
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Beauty Score</div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className="text-2xl font-bold text-accent">{analysis.beautyScore}%</div>
                      <Star className="w-5 h-5 text-accent fill-accent" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReportMetric 
                  icon={<User className="w-5 h-5 text-primary" />} 
                  label="Skin Type" 
                  value={analysis.skinType} 
                />
                <ReportMetric 
                  icon={<Palette className="w-5 h-5 text-accent" />} 
                  label="Skin Tone" 
                  value={analysis.skinTone} 
                />
                <ReportMetric 
                  icon={<Maximize2 className="w-5 h-5 text-primary" />} 
                  label="Face Shape" 
                  value={analysis.faceShape} 
                />
              </div>

              <div className="mt-8 space-y-4">
                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Expert Insights</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-sm text-muted-foreground leading-relaxed p-4 rounded-2xl bg-white/30 border border-white/40">
                    <span className="font-bold text-foreground block mb-1">Tone Analysis:</span>
                    {analysis.skinToneAnalysis}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed p-4 rounded-2xl bg-white/30 border border-white/40">
                    <span className="font-bold text-foreground block mb-1">Structure Analysis:</span>
                    {analysis.facialStructureAnalysis}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-primary/10" />
            <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" /> Curated Recommendations
            </h3>
            <div className="h-px flex-1 bg-primary/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecommendationCard 
              title="Recommended Hairstyle" 
              icon={<Scissors className="w-6 h-6" />}
              items={recommendations.hairstyles}
              color="primary"
            />
            <RecommendationCard 
              title="Targeted Treatments" 
              icon={<Zap className="w-6 h-6" />}
              items={recommendations.cosmeticServices}
              color="accent"
            />
            <RecommendationCard 
              title="Skincare Routine" 
              icon={<Palette className="w-6 h-6" />}
              items={recommendations.skincareRoutine}
              color="primary"
            />
            <RecommendationCard 
              title="Professional Tips" 
              icon={<Sparkles className="w-6 h-6" />}
              items={recommendations.generalTips}
              color="accent"
            />
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button size="lg" className="rounded-2xl h-16 px-12 bg-primary shadow-2xl shadow-primary/30 gap-3 text-lg font-bold group" asChild>
            <Link href="/salons">
              Book Your AI Match <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {!image ? (
        <div className="glass aspect-square rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-primary/30 group hover:border-primary transition-all cursor-pointer relative overflow-hidden shadow-2xl">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
            <Camera className="w-12 h-12 text-primary" />
          </div>
          <h3 className="font-headline text-3xl font-bold mb-3">Upload a Selfie</h3>
          <p className="text-muted-foreground text-lg mb-8">Let our AI analyze your unique features in natural light.</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-white/40 px-4 py-2 rounded-full border border-white/40 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> NATURAL LIGHT
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-white/40 px-4 py-2 rounded-full border border-white/40 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> CLEAR VIEW
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="relative aspect-square rounded-[3.5rem] overflow-hidden glass shadow-2xl border-white/40 group">
            <Image src={image} alt="Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <Button 
              variant="secondary" 
              className="absolute top-6 right-6 rounded-full bg-white/80 backdrop-blur-md border-white/40" 
              onClick={() => setImage(null)}
            >
              Change Photo
            </Button>
          </div>
          <Button 
            className="w-full h-20 rounded-[2rem] text-2xl font-bold bg-primary gap-4 shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all"
            onClick={startAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin" />
                Analyzing Features...
              </>
            ) : (
              <>
                <Sparkles className="w-8 h-8" />
                Generate Beauty Report
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function ReportMetric({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
      <div className="text-lg font-bold text-foreground truncate">{value}</div>
    </div>
  );
}

function RecommendationCard({ title, icon, items, color }: { title: string, icon: React.ReactNode, items: string[], color: 'primary' | 'accent' }) {
  const colorClass = color === 'primary' ? 'text-primary bg-primary/10' : 'text-accent bg-accent/10';
  const borderClass = color === 'primary' ? 'border-primary/20' : 'border-accent/20';

  return (
    <div className={`glass p-8 rounded-[2.5rem] border-white/40 shadow-lg ${borderClass}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
        <h4 className="font-headline text-xl font-bold">{title}</h4>
      </div>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-4 items-start group">
            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${color === 'primary' ? 'bg-primary' : 'bg-accent'} group-hover:scale-150 transition-transform`} />
            <span className="text-muted-foreground leading-snug group-hover:text-foreground transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
