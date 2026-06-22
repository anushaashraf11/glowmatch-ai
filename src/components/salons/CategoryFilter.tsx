"use client";

import { useState } from 'react';
import { Scissors, Palette, Smile, Sparkles, Heart, Droplets, Flower2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'haircut', name: 'Haircut', icon: Scissors },
  { id: 'hair-color', name: 'Hair Color', icon: Palette },
  { id: 'facial', name: 'Facial', icon: Smile },
  { id: 'makeup', name: 'Makeup', icon: Sparkles },
  { id: 'bridal', name: 'Bridal', icon: Heart },
  { id: 'skincare', name: 'Skincare', icon: Droplets },
  { id: 'spa', name: 'Spa', icon: Flower2 },
];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(isActive ? null : category.id)}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 min-w-[100px] border shadow-sm",
                isActive 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105" 
                  : "glass hover:border-primary/40 text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isActive ? "bg-white/20" : "bg-primary/10"
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-primary")} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
