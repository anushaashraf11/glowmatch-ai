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
  imageHint: string;
  address: string;
}

const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'Mirrors Luxury Salon & Spa',
    rating: 4.7,
    reviews: 842,
    distance: '0.8 km',
    tags: ['Luxury Spa', 'Skin Care', 'Bridal'],
    image: PlaceHolderImages.find(img => img.id === 'mirrors-luxury')?.imageUrl || '',
    imageHint: 'luxury spa interior',
    address: 'Jubilee Hills, Hyderabad'
  },
  {
    id: '2',
    name: 'Naturals Salon',
    rating: 4.5,
    reviews: 1250,
    distance: '1.2 km',
    tags: ['Haircut', 'Facials', 'Makeup'],
    image: PlaceHolderImages.find(img => img.id === 'naturals-salon')?.imageUrl || '',
    imageHint: 'modern hair salon',
    address: 'Banjara Hills, Hyderabad'
  },
  {
    id: '3',
    name: 'Green Trends Salon',
    rating: 4.4,
    reviews: 920,
    distance: '2.5 km',
    tags: ['Eco Skincare', 'Hair Color', 'Spa'],
    image: PlaceHolderImages.find(img => img.id === 'green-trends')?.imageUrl || '',
    imageHint: 'clean salon interior',
    address: 'Kukatpally, Hyderabad'
  },
  {
    id: '4',
    name: 'Toni & Guy',
    rating: 4.6,
    reviews: 512,
    distance: '3.1 km',
    tags: ['Global Styling', 'Advanced Color'],
    image: PlaceHolderImages.find(img => img.id === 'toni-guy')?.imageUrl || '',
    imageHint: 'high-end hair studio',
    address: 'Gachibowli, Hyderabad'
  },
  {
    id: '5',
    name: 'Jawed Habib Hair & Beauty',
    rating: 4.4,
    reviews: 1560,
    distance: '4.6 km',
    tags: ['Hair Design', 'Bridal Makeup'],
    image: PlaceHolderImages.find(img => img.id === 'jawed-habib')?.imageUrl || '',
    imageHint: 'professional hair care',
    address: 'Himayat Nagar, Hyderabad'
  },
  {
    id: '6',
    name: 'Lakmé Salon',
    rating: 4.5,
    reviews: 1100,
    distance: '5.2 km',
    tags: ['Lakme Expert', 'Makeover', 'Skin'],
    image: PlaceHolderImages.find(img => img.id === 'lakme-salon')?.imageUrl || '',
    imageHint: 'branded beauty salon',
    address: 'Madhapur, Hyderabad'
  },
  {
    id: '7',
    name: 'Bounce Salon & Spa',
    rating: 4.6,
    reviews: 740,
    distance: '6.0 km',
    tags: ['Premium Spa', 'Wellness', 'Styling'],
    image: PlaceHolderImages.find(img => img.id === 'bounce-salon')?.imageUrl || '',
    imageHint: 'premium spa room',
    address: 'Kondapur, Hyderabad'
  },
  {
    id: '8',
    name: 'Page 3 Luxury Salon',
    rating: 4.5,
    reviews: 630,
    distance: '2.5 km',
    tags: ['Celebrity Style', 'Red Carpet', 'Nails'],
    image: PlaceHolderImages.find(img => img.id === 'page3-salon')?.imageUrl || '',
    imageHint: 'luxury beauty aesthetic',
    address: 'Banjara Hills, Hyderabad'
  }
];

export default function SalonListings() {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
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
              data-ai-hint={salon.imageHint}
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
                  <MapPin className="w-3 h-3 text-primary" />
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
                <span>Available Today</span>
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