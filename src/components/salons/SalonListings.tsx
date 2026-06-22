"use client";

import { useEffect, useState } from 'react';
import { Star, MapPin, Clock, ArrowRight, Navigation, Scissors, Sparkles, Flower2, Palette, Heart, Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Salon {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  lat: number;
  lng: number;
  tags: string[];
  address: string;
  icon: React.ElementType;
  gradient: string;
}

interface SalonWithDistance extends Salon {
  calculatedDistance: string;
}

// Hyderabad Center (Abids/Secretariat Area)
const HYDERABAD_CENTER = { lat: 17.4065, lng: 78.4691 };

const MOCK_SALONS: Salon[] = [
  {
    id: '1',
    name: 'Mirrors Luxury Salon & Spa',
    rating: 4.7,
    reviews: 842,
    lat: 17.4326,
    lng: 78.4071,
    tags: ['Luxury Spa', 'Skin Care', 'Bridal'],
    address: 'Road No. 1, Jubilee Hills',
    icon: Flower2,
    gradient: 'from-pink-100 to-rose-200'
  },
  {
    id: '2',
    name: 'Naturals Salon',
    rating: 4.5,
    reviews: 1250,
    lat: 17.4123,
    lng: 78.4324,
    tags: ['Haircut', 'Facials', 'Makeup'],
    address: 'Banjara Hills, Hyderabad',
    icon: Sparkles,
    gradient: 'from-purple-100 to-indigo-200'
  },
  {
    id: '3',
    name: 'Green Trends Salon',
    rating: 4.4,
    reviews: 920,
    lat: 17.4933,
    lng: 78.3914,
    tags: ['Eco Skincare', 'Hair Color', 'Spa'],
    address: 'KPN Colony, Kukatpally',
    icon: Droplets,
    gradient: 'from-emerald-50 to-teal-100'
  },
  {
    id: '4',
    name: 'Toni & Guy',
    rating: 4.6,
    reviews: 512,
    lat: 17.4448,
    lng: 78.3498,
    tags: ['Global Styling', 'Advanced Color'],
    address: 'Financial District, Gachibowli',
    icon: Scissors,
    gradient: 'from-slate-100 to-blue-200'
  },
  {
    id: '5',
    name: 'Jawed Habib Hair & Beauty',
    rating: 4.4,
    reviews: 1560,
    lat: 17.3993,
    lng: 78.4842,
    tags: ['Hair Design', 'Bridal Makeup'],
    address: 'Main Road, Himayat Nagar',
    icon: Scissors,
    gradient: 'from-orange-50 to-amber-100'
  },
  {
    id: '6',
    name: 'Lakmé Salon',
    rating: 4.5,
    reviews: 1100,
    lat: 17.4483,
    lng: 78.3915,
    tags: ['Lakme Expert', 'Makeover', 'Skin'],
    address: 'Cyber Towers Area, Madhapur',
    icon: Palette,
    gradient: 'from-violet-100 to-fuchsia-100'
  },
  {
    id: '7',
    name: 'Bounce Salon & Spa',
    rating: 4.6,
    reviews: 740,
    lat: 17.4623,
    lng: 78.3587,
    tags: ['Premium Spa', 'Wellness', 'Styling'],
    address: 'Sarath City Mall Area, Kondapur',
    icon: Zap,
    gradient: 'from-sky-50 to-cyan-100'
  },
  {
    id: '8',
    name: 'Page 3 Luxury Salon',
    rating: 4.5,
    reviews: 630,
    lat: 17.4150,
    lng: 78.4400,
    tags: ['Celebrity Style', 'Red Carpet', 'Nails'],
    address: 'Road No. 12, Banjara Hills',
    icon: Heart,
    gradient: 'from-pink-50 to-rose-100'
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
          // If denied or error, default to Hyderabad City Center
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
        // Display in meters if less than 1km, otherwise in km
        const formattedDist = dist < 1 
          ? `${(dist * 1000).toFixed(0)} m` 
          : `${dist.toFixed(1)} km`;
        
        return {
          ...salon,
          calculatedDistance: formattedDist
        };
      });

      // Sort by actual numeric distance
      updatedSalons.sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
      
      setSalons(updatedSalons);
    }
  }, [userLocation]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {salons.map((salon) => {
        const IconComponent = salon.icon;
        
        return (
          <div key={salon.id} className="group glass rounded-[2rem] overflow-hidden flex flex-col hover:translate-y-[-4px] transition-all duration-300">
            {/* Gradient Visual Header */}
            <div className={cn("relative aspect-[16/10] bg-gradient-to-br flex items-center justify-center p-8", salon.gradient)}>
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-white/60 flex items-center justify-center shadow-xl border border-white group-hover:scale-110 transition-transform duration-500">
                <IconComponent className="w-12 h-12 text-primary/80" />
              </div>
              
              <div className="absolute top-4 left-4 glass-dark text-white rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold shadow-lg">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{salon.rating} • {salon.reviews} reviews</span>
              </div>
              <div className="absolute top-4 right-4 glass text-primary rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold shadow-lg">
                <Navigation className="w-3 h-3" />
                <span>{salon.calculatedDistance}</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-headline text-xl font-bold mb-1 group-hover:text-primary transition-colors">{salon.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span>{salon.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {salon.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/5 text-primary/70 border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary/60" />
                  <span>Available Today</span>
                </div>
                <Link href={`/booking/${salon.id}`}>
                  <Button size="sm" className="rounded-xl px-5 h-9 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Book Now <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}