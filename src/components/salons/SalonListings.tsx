"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock, ArrowRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

interface Salon {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  lat: number;
  lng: number;
  tags: string[];
  image: string;
  imageHint: string;
  address: string;
}

interface SalonWithDistance extends Salon {
  calculatedDistance: string;
}

const HYDERABAD_CENTER = { lat: 17.3850, lng: 78.4867 };

const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'Mirrors Luxury Salon & Spa',
    rating: 4.7,
    reviews: 842,
    lat: 17.4326,
    lng: 78.4071,
    tags: ['Luxury Spa', 'Skin Care', 'Bridal'],
    image: PlaceHolderImages.find(img => img.id === 'mirrors-luxury')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'mirrors-luxury')?.imageHint || 'luxury spa',
    address: 'Jubilee Hills, Hyderabad'
  },
  {
    id: '2',
    name: 'Naturals Salon',
    rating: 4.5,
    reviews: 1250,
    lat: 17.4123,
    lng: 78.4324,
    tags: ['Haircut', 'Facials', 'Makeup'],
    image: PlaceHolderImages.find(img => img.id === 'naturals-salon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'naturals-salon')?.imageHint || 'beauty salon',
    address: 'Banjara Hills, Hyderabad'
  },
  {
    id: '3',
    name: 'Green Trends Salon',
    rating: 4.4,
    reviews: 920,
    lat: 17.4933,
    lng: 78.3914,
    tags: ['Eco Skincare', 'Hair Color', 'Spa'],
    image: PlaceHolderImages.find(img => img.id === 'green-trends')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'green-trends')?.imageHint || 'facial treatment',
    address: 'Kukatpally, Hyderabad'
  },
  {
    id: '4',
    name: 'Toni & Guy',
    rating: 4.6,
    reviews: 512,
    lat: 17.4448,
    lng: 78.3498,
    tags: ['Global Styling', 'Advanced Color'],
    image: PlaceHolderImages.find(img => img.id === 'toni-guy')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'toni-guy')?.imageHint || 'hair styling',
    address: 'Gachibowli, Hyderabad'
  },
  {
    id: '5',
    name: 'Jawed Habib Hair & Beauty',
    rating: 4.4,
    reviews: 1560,
    lat: 17.3993,
    lng: 78.4842,
    tags: ['Hair Design', 'Bridal Makeup'],
    image: PlaceHolderImages.find(img => img.id === 'jawed-habib')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'jawed-habib')?.imageHint || 'hair stylist',
    address: 'Himayat Nagar, Hyderabad'
  },
  {
    id: '6',
    name: 'Lakmé Salon',
    rating: 4.5,
    reviews: 1100,
    lat: 17.4483,
    lng: 78.3915,
    tags: ['Lakme Expert', 'Makeover', 'Skin'],
    image: PlaceHolderImages.find(img => img.id === 'lakme-salon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'lakme-salon')?.imageHint || 'makeup artist',
    address: 'Madhapur, Hyderabad'
  },
  {
    id: '7',
    name: 'Bounce Salon & Spa',
    rating: 4.6,
    reviews: 740,
    lat: 17.4623,
    lng: 78.3587,
    tags: ['Premium Spa', 'Wellness', 'Styling'],
    image: PlaceHolderImages.find(img => img.id === 'bounce-salon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'bounce-salon')?.imageHint || 'wellness spa',
    address: 'Kondapur, Hyderabad'
  },
  {
    id: '8',
    name: 'Page 3 Luxury Salon',
    rating: 4.5,
    reviews: 630,
    lat: 17.4150,
    lng: 78.4400,
    tags: ['Celebrity Style', 'Red Carpet', 'Nails'],
    image: PlaceHolderImages.find(img => img.id === 'page3-salon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'page3-salon')?.imageHint || 'bridal makeup',
    address: 'Banjara Hills, Hyderabad'
  }
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default function SalonListings() {
  const [salons, setSalons] = useState<SalonWithDistance[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(HYDERABAD_CENTER);
        }
      );
    } else {
      setUserLocation(HYDERABAD_CENTER);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const updatedSalons = MOCK_SALONS.map(salon => {
        const dist = calculateDistance(userLocation.lat, userLocation.lng, salon.lat, salon.lng);
        return {
          ...salon,
          calculatedDistance: dist < 1 ? `${(dist * 1000).toFixed(0)} m` : `${dist.toFixed(1)} km`
        };
      });
      // Sort by distance
      updatedSalons.sort((a, b) => parseFloat(a.calculatedDistance) - parseFloat(b.calculatedDistance));
      setSalons(updatedSalons);
    }
  }, [userLocation]);

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
            <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-bold shadow-lg">
              <Navigation className="w-3 h-3 text-primary" />
              <span>{salon.calculatedDistance}</span>
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
