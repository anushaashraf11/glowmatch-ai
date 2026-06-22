"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

interface Salon {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  tags: string[];
  image: string;
  address: string;
}

const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'Orchid Beauty Studio',
    rating: 4.9,
    reviews: 128,
    distance: '0.8 miles',
    tags: ['Hair', 'Skin Care'],
    image: PlaceHolderImages.find(img => img.id === 'salon-1')?.imageUrl || '',
    address: '123 Bloom St, Downtown'
  },
  {
    id: '2',
    name: 'The Glass House Spa',
    rating: 4.8,
    reviews: 215,
    distance: '1.2 miles',
    tags: ['Facials', 'Massage'],
    image: PlaceHolderImages.find(img => img.id === 'salon-2')?.imageUrl || '',
    address: '456 Crystal Ave'
  },
  {
    id: '3',
    name: 'Prism Nail Art',
    rating: 4.7,
    reviews: 94,
    distance: '2.4 miles',
    tags: ['Nails', 'Lashes'],
    image: PlaceHolderImages.find(img => img.id === 'salon-3')?.imageUrl || '',
    address: '789 Rainbow Blvd'
  },
  {
    id: '4',
    name: 'Elite Grooming Co.',
    rating: 5.0,
    reviews: 56,
    distance: '3.1 miles',
    tags: ['Barber', 'Treatments'],
    image: 'https://picsum.photos/seed/salon4/600/400',
    address: '101 King St'
  },
  {
    id: '5',
    name: 'Radiance Aesthetic',
    rating: 4.6,
    reviews: 142,
    distance: '3.8 miles',
    tags: ['Skin Care', 'HydraFacial'],
    image: 'https://picsum.photos/seed/salon5/600/400',
    address: '202 Sun Plaza'
  },
  {
    id: '6',
    name: 'Velvet Hair Lounge',
    rating: 4.9,
    reviews: 312,
    distance: '4.5 miles',
    tags: ['Color', 'Balayage'],
    image: 'https://picsum.photos/seed/salon6/600/400',
    address: '303 Velvet Way'
  }
];

export default function SalonListings() {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    // Mimic distance loading
    setSalons(MOCK_SALONS);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {salons.map((salon) => (
        <div key={salon.id} className="group glass rounded-[2rem] overflow-hidden flex flex-col hover:translate-y-[-4px] transition-all duration-300">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image 
              src={salon.image} 
              alt={salon.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-bold shadow-lg">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{salon.rating} ({salon.reviews})</span>
            </div>
            <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs font-bold shadow-lg">
              {salon.distance}
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-headline text-xl font-bold mb-1">{salon.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{salon.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {salon.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/10">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Next available: 2 PM</span>
              </div>
              <Link href={`/booking/${salon.id}`}>
                <Button size="sm" className="rounded-xl px-4 gap-2 bg-primary hover:bg-primary/90">
                  Book <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
