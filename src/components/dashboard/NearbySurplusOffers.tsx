import React from "react";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Star, Search, Filter, Navigation, IndianRupee, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { CheckCircle, Loader2, Calendar, Share2, BadgeCheck, Gift, QrCode } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from '@/integrations/supabase/types';

interface SurplusBag {
  id: string;
  store_id: string;
  stores?: {
    name: string;
    address: string;
    rating: number;
  };
  category: string;
  original_price: number;
  sale_price: number;
  pickup_start_time: string;
  pickup_end_time: string;
  items_left: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  latitude?: number;
  longitude?: number;
}

const DEMO_STORES = [
  // Andhra Pradesh
  { state: "Andhra Pradesh", city: "Guntur", address: "S. No. 494/A, Mangalagiri Road, Guntur 520001", desc: "A large cash‑and‑carry servicing retailers, kiranas, HoReCa, etc." },
  { state: "Andhra Pradesh", city: "Kurnool", address: "Survey Nos. 570, 748 & 749, Birla Gaddagooty Road, Kallur Village, Kurnool 518002" },
  { state: "Andhra Pradesh", city: "Rajahmundry", address: "Beside ONGC Base Camp, NH‑5, Rajahmundry 533106" },
  { state: "Andhra Pradesh", city: "Tirupati", address: "Survey No. 840/1A, Thukivakkam Village, Renigunta Road, Tirupati 517506" },
  { state: "Andhra Pradesh", city: "Vijayawada", address: "125/1A, 125/1B, 125/2C, Tehsil Gunadala, Village Nidamanur, Vijayawada 520010" },
  { state: "Andhra Pradesh", city: "Visakhapatnam", address: "Survey Nos. 89/1–89/2, 89/5–89/6, 89/8, 89/17, Vadlapudi Village, Gajuwaka Mandal, Visakhapatnam 530026" },
  // Chhattisgarh
  { state: "Chhattisgarh", city: "Raipur", address: "Near Sandeep Cold Storage, Bhanpuri, Ring Road 2, Raipur 492008" },
  // Jammu & Kashmir
  { state: "Jammu & Kashmir", city: "Jammu", address: "Khasra Nos. 425, 426 & 428, Toposherkhania, Akhnoor Road, Jammu 180003" },
  // Madhya Pradesh
  { state: "Madhya Pradesh", city: "Bhopal-1", address: "Opp. Bhopal Memorial Hospital & Research Centre, Village Rasalkhedi, Huzur, Bhopal 462038" },
  { state: "Madhya Pradesh", city: "Bhopal-2", address: "Khasra Nos. 31/32, near Scope Engineering College, Hoshangabad Road, Bhopal 462047" },
  { state: "Madhya Pradesh", city: "Indore-1", address: "Near MR‑10 Bypass Road, opposite Malwa Institute of Technology, Indore 452016" },
  { state: "Madhya Pradesh", city: "Indore-2", address: "Survey Nos. 289/2/1/2 & 289/2/1/3, AB Road, near IPS Academy, Village Rau, Indore 453332" },
  // Maharashtra
  { state: "Maharashtra", city: "Amravati", address: "SQ No. 64/2, Mouje Nimbhora Khurd, opposite Hotel Mohini, Badnera Road, Amravati 444602" },
  { state: "Maharashtra", city: "Aurangabad", address: "Gut No. 86, S No. 54/3, Itkheda Paithan Road, Aurangabad 431005" },
  // Punjab
  { state: "Punjab", city: "Amritsar", address: "Plot Nos. 75/26–75/14, Ambuja Dream City, Manawala, GT Jalandhar Highway, Amritsar 140601" },
  { state: "Punjab", city: "Jalandhar", address: "Khasra Nos. 193–195, adjoining IOC petrol pump, near Toyota showroom, Paragpur, GT Road, Jalandhar 144004" },
  { state: "Punjab", city: "Ludhiana-1", address: "Aeren Business Complex, opposite Old Chungi Naka, Jalandhar GT Road, Ludhiana 141004" },
  { state: "Punjab", city: "Ludhiana-3", address: "Hampton Business Park, Mundian Khurd, Chandigarh Highway, Ludhiana 141015" },
  { state: "Punjab", city: "Zirakpur", address: "Khasra Nos. 444, 437, 438, NH‑22, Chandigarh‑Ambala Road, opposite Bristol Hotel, Zirakpur 140603" },
  // Rajasthan
  { state: "Rajasthan", city: "Kota", address: "A‑82, Indraprastha Industrial Area, Jhalawar Road, Kota 324005" },
  // Telangana
  { state: "Telangana", city: "Hyderabad", address: "Pillar No. 267, Shivaram­pally, Rajendra Nagar, Hyderabad 500052" },
  { state: "Telangana", city: "Karimnagar", address: "Survey No. 236, beside Paramita Residential School, Padamnagar Gram Panchayat, Chintakunta Village, Karimnagar 505001" },
  // Uttar Pradesh
  { state: "Uttar Pradesh", city: "Agra-1", address: "Khasra Nos. 814/2, 815, 816, 817/2, Village Chalesar, Tehsil Etmadpur, Agra 283202" },
  { state: "Uttar Pradesh", city: "Agra-2", address: "Site A, A‑1, UPSIDC Industrial Area, Mathura Road, Agra 282007" },
  { state: "Uttar Pradesh", city: "Lucknow", address: "Sushant Golf City, Amar Shaheed Park, Sultanpur Road, Lucknow 226002" },
  { state: "Uttar Pradesh", city: "Meerut", address: "Khata No. 344, Khasra No. 165, Village Nagla, Tehsil Kasampur, Pargana, Meerut 250001" },
];

// Demo Walmart/Best Price locations across India
const demoLocations = [
  { name: 'Walmart Best Price Amritsar', lat: 31.633979, lng: 74.872264, address: 'Amritsar, Punjab' },
  { name: 'Walmart Best Price Ludhiana', lat: 30.900965, lng: 75.857277, address: 'Ludhiana, Punjab' },
  { name: 'Walmart Best Price Zirakpur', lat: 30.642495, lng: 76.817825, address: 'Zirakpur, Punjab' },
  { name: 'Walmart Best Price Bhopal', lat: 23.259933, lng: 77.412615, address: 'Bhopal, MP' },
  { name: 'Walmart Best Price Indore', lat: 22.719568, lng: 75.857727, address: 'Indore, MP' },
  { name: 'Walmart Best Price Meerut', lat: 28.984463, lng: 77.706413, address: 'Meerut, UP' },
  { name: 'Walmart Best Price Agra', lat: 27.176670, lng: 78.008072, address: 'Agra, UP' },
  { name: 'Walmart Best Price Guntur', lat: 16.306652, lng: 80.436539, address: 'Guntur, AP' },
  { name: 'Walmart Best Price Rajahmundry', lat: 17.000538, lng: 81.804034, address: 'Rajahmundry, AP' },
  { name: 'Walmart Best Price Aurangabad', lat: 19.876165, lng: 75.343313, address: 'Aurangabad, MH' },
  { name: 'Walmart Best Price Nashik', lat: 19.997454, lng: 73.789803, address: 'Nashik, MH' },
  { name: 'Walmart Best Price Vijayawada', lat: 16.506174, lng: 80.648015, address: 'Vijayawada, AP' },
  { name: 'Walmart Best Price Jalandhar', lat: 31.326015, lng: 75.576180, address: 'Jalandhar, Punjab' },
  { name: 'Walmart Best Price Kota', lat: 25.213815, lng: 75.864753, address: 'Kota, Rajasthan' },
  { name: 'Walmart Best Price Gwalior', lat: 26.218287, lng: 78.182831, address: 'Gwalior, MP' },
  { name: 'Walmart Best Price Raipur', lat: 21.251384, lng: 81.629639, address: 'Raipur, Chhattisgarh' },
  { name: 'Walmart Best Price Amravati', lat: 20.937424, lng: 77.779549, address: 'Amravati, MH' },
  { name: 'Walmart Best Price Karimnagar', lat: 18.438555, lng: 79.128841, address: 'Karimnagar, Telangana' },
  { name: 'Walmart Best Price Warangal', lat: 17.978437, lng: 79.594055, address: 'Warangal, Telangana' },
  { name: 'Walmart Best Price Hyderabad', lat: 17.385044, lng: 78.486671, address: 'Hyderabad, Telangana' },
];

// Custom icon for map pins
const walmartIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/888/888879.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const offerImages: Record<string, string> = {
  'Walmart Supercenter - Mumbai Central': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  'Walmart Neighborhood Market - Pune': 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  'Walmart - Delhi Connaught Place': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'Walmart Supercenter - Bangalore Electronic City': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
};
const placeholderImg = 'https://cdn-icons-png.flaticon.com/512/888/888879.png';

function LocateMeButton({ onLocate }: { onLocate: () => void }) {
  return (
    <button
      onClick={onLocate}
      className="absolute z-[1000] right-4 top-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow rounded-full p-2 hover:bg-blue-50 transition"
      title="Locate Me"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
    >
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="#2563eb"/></svg>
    </button>
  );
}

function UserLocationMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();
  // Pan/zoom to user location when set
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.2 });
    }
  }, [position, map]);
  if (!position) return null;
  return (
    <CircleMarker center={position} radius={12} pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.5, weight: 2 }}>
      <Popup>You are here</Popup>
    </CircleMarker>
  );
}

// Helper: Haversine formula to calculate distance (km) between two lat/lng
function getDistanceKm([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Simple confetti effect (CSS-based for demo)
function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2000] flex items-center justify-center animate-fade-in" role="presentation">
      <div className="w-full h-full overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 8,
              height: 16,
              background: `hsl(${Math.random() * 360}, 80%, 60%)`,
              borderRadius: 2,
              opacity: 0.7,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Analytics event logging
// async function logAnalyticsEvent(event: string, details: Record<string, any> = {}, user: any) {
//   await supabase.from('analytics_events').insert({
//     event,
//     user_id: user?.id || null,
//     details,
//     created_at: new Date().toISOString(),
//   });
// }

const getShareUrl = (reservationId: string) => `${window.location.origin}/reservation/${reservationId}`;
const getShareMessage = (offer: any) => `I just rescued a Surprise Bag from ${offer.name} and saved food from going to waste! 🌱 Join me and make an impact: `;

const NearbySurplusOffers = () => {
  const [offers, setOffers] = useState<SurplusBag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const { toast } = useToast();
  const [selected, setSelected] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [reserving, setReserving] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const { user } = useAuth ? useAuth() : { user: null }; // fallback for demo
  // Simulate reservation history and reward progress
  const userReservations = [
    { store: 'Walmart Supercenter - Mumbai Central', count: 2 },
    { store: 'Walmart Neighborhood Market - Pune', count: 0 },
  ];
  const rewardThreshold = 3;
  const [addDrink, setAddDrink] = useState(false);
  const [addDonation, setAddDonation] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);
  const [bagsLeft, setBagsLeft] = useState<number | null>(null);
  const [fetchingBag, setFetchingBag] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [userReservationsLive, setUserReservationsLive] = useState<any[]>([]);
  const [reminder, setReminder] = useState(false);
  const [dataSource, setDataSource] = useState<'real' | 'demo+real' | 'custom'>('real');
  const CUSTOM_CITIES = [
    'Mumbai',
    'Delhi',
    'Hyderabad',
    'Bengaluru',
    'Bangalore'
  ];
  const [reservationData, setReservationData] = useState<any>(null);
  const badgeUnlocked = false; // Set to true if you want to show the badge, or add your real logic here

  useEffect(() => {
    fetchOffers();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('nearby-offers')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'surplus_bags'
        },
        () => {
          fetchOffers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('surplus_bags')
        .select(`
          *,
          stores (
            name,
            address,
            rating
          )
        `)
        .eq('is_active', true)
        .gt('items_left', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load nearby offers"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getDiscountPercentage = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const filteredStores = DEMO_STORES.filter(store => {
    const matchesSearch = !searchTerm ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "all" || store.state === selectedState;
    return matchesSearch && matchesState;
  });

  // Center map on India
  const center: [number, number] = [22.5937, 78.9629];

  const handleLocateMe = () => {
    setLocating(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      (err) => {
        setLocationError('Unable to retrieve your location.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Helper to extract city from store name/address (for real offers)
  function getCityFromOffer(offer: SurplusBag): string {
    const name = offer.stores?.name || '';
    const address = offer.stores?.address || '';
    for (const city of CUSTOM_CITIES) {
      if (name.toLowerCase().includes(city.toLowerCase()) || address.toLowerCase().includes(city.toLowerCase())) {
        return city;
      }
    }
    return '';
  }

  // Build realLocations from all offers (no filter)
  const realLocations = offers.map(offer => ({
    id: offer.id,
    name: offer.stores?.name || 'Walmart Store',
    address: offer.stores?.address || '',
    lat: offer.latitude || 0,
    lng: offer.longitude || 0,
    bag: offer,
    isDemo: false,
  }));
  const demoLocationsWithFlag = demoLocations.map(loc => ({ ...loc, isDemo: true }));
  const locations = [...demoLocationsWithFlag, ...realLocations];

  // If nearbyOnly is enabled, filter by userLocation
  let filteredLocations = locations;
  if (nearbyOnly) {
    if (userLocation) {
      filteredLocations = locations.filter(loc => getDistanceKm(userLocation, [loc.lat, loc.lng]) <= 10);
    } else {
      filteredLocations = [];
    }
  }

  // Handler to open modal with offer
  const handleReserveClick = (offer: any) => {
    setSelectedOffer(offer);
    setReserveModalOpen(true);
    setReservationSuccess(false);
    // logAnalyticsEvent('Reserve Bag Clicked', { offerId: offer.id, offerName: offer.name }, user);
  };

  // Fetch real bag count when modal opens
  useEffect(() => {
    const fetchBag = async () => {
      if (!selectedOffer) return;
      setFetchingBag(true);
      setReservationError(null);
      const { data, error } = await supabase
        .from('surplus_bags')
        .select('items_left, pickup_start_time, id')
        .eq('id', selectedOffer.id)
        .single();
      setFetchingBag(false);
      if (error) {
        setReservationError('Could not fetch bag info. Please try again.');
        setBagsLeft(null);
      } else {
        setBagsLeft(data?.items_left ?? null);
      }
    };
    if (reserveModalOpen && selectedOffer) {
      fetchBag();
    }
  }, [reserveModalOpen, selectedOffer]);

  // Fetch user reservation history live
  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('reservations')
        .select('surplus_bag_id, quantity')
        .eq('user_id', user.id);
      if (!error && data) {
        setUserReservationsLive(data);
      }
    };
    if (reserveModalOpen && user) {
      fetchReservations();
    }
  }, [reserveModalOpen, user]);

  // On confirm, create reservation and decrement bag count
  const handleConfirmReserve = async () => {
    setReserving(true);
    setReservationError(null);
    // Refetch bag count before reserving
    const { data: bagData, error: bagError } = await supabase
      .from('surplus_bags')
      .select('items_left, pickup_start_time, id')
      .eq('id', selectedOffer.id)
      .single();
    if (bagError || !bagData || bagData.items_left < 1) {
      setReserving(false);
      setReservationError('Sorry, all bags have been reserved!');
      setBagsLeft(0);
      return;
    }
    // Insert reservation
    const { data: reservationData, error: resError } = await supabase.from('reservations').insert({
      user_id: user.id,
      surplus_bag_id: selectedOffer.id,
      pickup_code: Math.random().toString(36).slice(2, 8).toUpperCase(),
      total_price: 199 + (addDrink ? 20 : 0) + (addDonation ? 10 : 0),
      quantity: 1,
      status: 'reserved',
    }).select().single();
    if (resError || !reservationData) {
      setReserving(false);
      setReservationError('Could not reserve bag. Please try again.');
      return;
    }
    // Decrement items_left
    const { error: updateError } = await supabase
      .from('surplus_bags')
      .update({ items_left: bagData.items_left - 1 })
      .eq('id', selectedOffer.id);
    if (updateError) {
      setReserving(false);
      setReservationError('Could not update bag count. Please try again.');
      return;
    }
    setBagsLeft(bagData.items_left - 1);
    setReserving(false);
    setReservationSuccess(true);
    setReservationData(reservationData);
    // logAnalyticsEvent('Reservation Confirmed', { offerId: selectedOffer.id, offerName: selectedOffer.name, addDrink, addDonation }, user);
    if (addDrink) {
      // logAnalyticsEvent('Add-on Selected', { type: 'drink', offerId: selectedOffer.id }, user);
    }
    if (addDonation) {
      // logAnalyticsEvent('Add-on Selected', { type: 'donation', offerId: selectedOffer.id }, user);
    }
    // Insert pickup reminder if requested
    if (reminder) {
      // Calculate send_time as 1 hour before pickup_start_time (for demo)
      let sendTime = null;
      if (bagData.pickup_start_time) {
        const pickupTime = new Date(bagData.pickup_start_time);
        sendTime = new Date(pickupTime.getTime() - 60 * 60 * 1000).toISOString();
      }
      await supabase.from('reminders').insert({
        user_id: user.id,
        reservation_id: reservationData.id,
        send_time: sendTime,
      });
    }
  };

  let userDisplayName = 'User';
  if (user && typeof user === 'object') {
    if ('name' in user && typeof user.name === 'string') userDisplayName = user.name;
    else if ('email' in user && typeof user.email === 'string') userDisplayName = user.email;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">Loading nearby offers...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Nearby Walmart Demo Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by city, state, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {[...new Set(DEMO_STORES.map(s => s.state))].map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
            >
              Map View
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Switch checked={nearbyOnly} onCheckedChange={setNearbyOnly} id="nearby-switch" />
            <label htmlFor="nearby-switch" className="text-sm font-medium select-none">Nearby Only</label>
            {nearbyOnly && !userLocation && (
              <span className="text-xs text-blue-600 ml-2">Use 'Locate Me' to find stores near you</span>
            )}
          </div>
          <Tabs value={viewMode} onValueChange={v => setViewMode(v as 'map' | 'list')}
            className="w-full">
            <TabsList className="mb-4 flex justify-center">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="map">
              <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <LocateMeButton onLocate={handleLocateMe} />
                {locationError && (
                  <div className="absolute z-[1001] right-4 top-20 bg-red-100 text-red-700 px-3 py-1 rounded shadow text-xs">{locationError}</div>
                )}
                <MapContainer
                  center={center}
                  zoom={5.2}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredLocations.length === 0 ? (
                    <></>
                  ) : (
                    filteredLocations.map((loc, idx) => (
                      <Marker key={loc.name} position={[loc.lat, loc.lng]} icon={walmartIcon} eventHandlers={{ click: () => setSelected(idx) }}>
                        <Popup minWidth={280} maxWidth={320}>
                          <div className="rounded-xl shadow border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden w-full">
                            <img
                              src={offerImages[loc.name] || placeholderImg}
                              alt={loc.name}
                              className="w-full h-32 object-cover bg-zinc-100"
                              style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                            />
                            <div className="p-3">
                              <div className="font-semibold text-base mb-1">{loc.name}</div>
                              <div className="text-xs text-zinc-500 mb-1">{loc.address}</div>
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{(4.2 + (idx % 5) * 0.1).toFixed(1)}</span>
                                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">{['Bakery', 'Produce', 'Dairy & Frozen', 'Deli & Prepared'][idx % 4]}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-green-700">₹{150 + idx * 20}</span>
                                <span className="text-xs line-through text-zinc-400">₹{450 + idx * 50}</span>
                              </div>
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-xs text-blue-600 hover:underline mb-2"
                              >
                                Get Directions
                              </a>
                              <Button className="w-full" size="sm" onClick={() => handleReserveClick('bag' in loc ? loc.bag : loc)}>Reserve Bag</Button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))
                  )}
                  <UserLocationMarker position={userLocation} />
                </MapContainer>
                {filteredLocations.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center z-[1002] pointer-events-none">
                    <div className="bg-white/90 dark:bg-zinc-900/90 rounded-lg px-6 py-4 shadow text-center text-zinc-700 dark:text-zinc-200 text-base font-medium">
                      {nearbyOnly && !userLocation ? 'Enable location to find stores near you.' : 'No stores found nearby.'}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="list">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.length === 0 ? (
                  <div className="col-span-full text-center text-muted-foreground py-8">{nearbyOnly && !userLocation ? 'Enable location to find stores near you.' : 'No stores found nearby.'}</div>
                ) : (
                  filteredLocations.map((loc, idx) => (
                    <div key={loc.name} className="rounded-xl shadow border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                      <img
                        src={offerImages[loc.name] || placeholderImg}
                        alt={loc.name}
                        className="w-full h-32 object-cover bg-zinc-100"
                        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                      />
                      <div className="p-3">
                        <div className="font-semibold text-base mb-1">{loc.name}</div>
                        <div className="text-xs text-zinc-500 mb-1">{loc.address}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{(4.2 + (idx % 5) * 0.1).toFixed(1)}</span>
                          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">{['Bakery', 'Produce', 'Dairy & Frozen', 'Deli & Prepared'][idx % 4]}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-green-700">₹{150 + idx * 20}</span>
                          <span className="text-xs line-through text-zinc-400">₹{450 + idx * 50}</span>
                        </div>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-600 hover:underline mb-2"
                        >
                          Get Directions
                        </a>
                        <Button className="w-full" size="sm" onClick={() => handleReserveClick('bag' in loc ? loc.bag : loc)}>Reserve Bag</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {/* Reserve Bag Modal */}
      <Dialog open={reserveModalOpen} onOpenChange={setReserveModalOpen}>
        <DialogContent className="max-w-md" aria-live="polite" role="dialog" aria-modal="true">
          {selectedOffer && !reservationSuccess && (
            <>
              <DialogHeader>
                <DialogTitle>Reserve Surprise Bag</DialogTitle>
                <DialogDescription>
                  {user ? (
                    <span>Hi, <span className="font-semibold">{userDisplayName}</span>! Reserve your bag below.</span>
                  ) : (
                    <span>Reserve a bag from <span className="font-semibold">{selectedOffer.name}</span></span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <img
                src={offerImages[selectedOffer.name] || placeholderImg}
                alt={selectedOffer.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-semibold text-lg">{selectedOffer.name}</div>
                  {user && userReservations.find(r => r.store === selectedOffer.name && r.count > 0) && (
                    <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">Welcome back!</Badge>
                  )}
                </div>
                <div className="text-xs text-zinc-500 mb-1">{selectedOffer.address}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{(4.2 + 0.1).toFixed(1)}</span>
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">Bakery</span>
                  {selectedOffer.isDemo ? (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">5 left</span>
                  ) : (
                    bagsLeft !== null && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">{bagsLeft} left</span>
                    )
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-700">₹199</span>
                  <span className="text-xs line-through text-zinc-400">₹450</span>
                </div>
                <div className="flex items-center gap-2 text-xs mb-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Pickup: {selectedOffer.isDemo ? '5:30–8:00pm' : `${selectedOffer.pickup_start_time || 'N/A'}–${selectedOffer.pickup_end_time || ''}`}
                </div>
                <div className="flex items-center gap-2 text-xs mb-2">
                  <BadgeCheck className="w-4 h-4 text-green-500" />
                  You save 2kg food, 5kg CO₂!
                </div>
                {user && (
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <Gift className="w-4 h-4 text-pink-500" />
                    {(() => {
                      const res = userReservations.find(r => r.store === selectedOffer.name);
                      const count = res ? res.count : 0;
                      return count < rewardThreshold
                        ? `Reserve ${rewardThreshold - count} more bag${rewardThreshold - count > 1 ? 's' : ''} to unlock a reward!`
                        : 'You unlocked a reward! 🎉';
                    })()}
                  </div>
                )}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer" htmlFor="add-drink">
                    <input id="add-drink" type="checkbox" checked={addDrink} onChange={e => setAddDrink(e.target.checked)} aria-label="Add a drink for ₹20" disabled={selectedOffer.isDemo} />
                    Add a drink for ₹20
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer" htmlFor="add-donation">
                    <input id="add-donation" type="checkbox" checked={addDonation} onChange={e => setAddDonation(e.target.checked)} aria-label="Donate ₹10 to food rescue" disabled={selectedOffer.isDemo} />
                    Donate ₹10 to food rescue
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer" htmlFor="pickup-reminder">
                    <input id="pickup-reminder" type="checkbox" checked={reminder} onChange={e => setReminder(e.target.checked)} aria-label="Send me a pickup reminder" disabled={selectedOffer.isDemo} />
                    Send me a pickup reminder
                  </label>
                </div>
                {/* Real-time bag count warning */}
                {!selectedOffer.isDemo && bagsLeft === 0 && (
                  <div className="mt-2 text-red-600 text-sm font-semibold">Sorry, all bags have been reserved!</div>
                )}
                {selectedOffer.isDemo && (
                  <div className="mt-2 text-blue-600 text-sm font-semibold">Demo store: Reservation is disabled in demo mode.</div>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleConfirmReserve} disabled={selectedOffer.isDemo || reserving || bagsLeft === 0} className="bg-green-600 hover:bg-green-700 text-white">
                  {reserving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                  {selectedOffer.isDemo ? 'Demo Only' : (reserving ? 'Reserving...' : 'Confirm Reservation')}
                </Button>
              </DialogFooter>
            </>
          )}
          {reservationSuccess && reservationData && (
            <div className="flex flex-col items-center justify-center py-8 relative">
              <Confetti />
              <span className="inline-flex items-center mb-2 animate-bounce" aria-label="Reservation confirmed">
                <CheckCircle className="w-12 h-12 text-green-600 mr-1" />
                <Leaf className="w-7 h-7 text-green-500 animate-spin-slow" aria-hidden="true" />
              </span>
              <div className="font-bold text-lg mb-1">Reservation Confirmed!</div>
              <div className="text-sm text-zinc-500 mb-3">Show this QR code at pickup</div>
              <div className="bg-white p-4 rounded-lg shadow mb-3">
                <QrCode className="w-16 h-16 text-zinc-700" />
              </div>
              {/* Social Share Buttons */}
              <div className="flex flex-wrap gap-2 mb-3 justify-center">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(getShareMessage(selectedOffer) + getShareUrl(reservationData.id))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition text-xs font-medium"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.92 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl(reservationData.id))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage(selectedOffer))}&url=${encodeURIComponent(getShareUrl(reservationData.id))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-blue-400 text-white rounded hover:bg-blue-500 transition text-xs font-medium"
                  aria-label="Share on X"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184C18.691 2.69 17.437 2 16.042 2c-2.675 0-4.515 2.18-3.946 4.737C7.728 6.617 4.1 4.884 1.671 1.965c-.293.5-.461 1.077-.461 1.693 0 1.17.6 2.205 1.513 2.81A4.904 4.904 0 0 1 .964 5.1v.062c0 1.633 1.163 2.995 2.828 3.304-.283.077-.581.118-.888.118-.217 0-.429-.021-.634-.061.43 1.34 1.675 2.316 3.149 2.343A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z"/></svg>
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getShareUrl(reservationData.id))}&title=${encodeURIComponent(getShareMessage(selectedOffer))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-blue-800 text-white rounded hover:bg-blue-900 transition text-xs font-medium"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
                  LinkedIn
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(getShareUrl(reservationData.id))}&text=${encodeURIComponent(getShareMessage(selectedOffer))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition text-xs font-medium"
                  aria-label="Share on Telegram"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.371 0 0 5.371 0 12c0 6.629 5.371 12 12 12s12-5.371 12-12c0-6.629-5.371-12-12-12zm5.707 8.293l-1.414 1.414-7.293 7.293-1.414-1.414 7.293-7.293 1.414 1.414zm-1.414 1.414l-7.293 7.293-1.414-1.414 7.293-7.293 1.414 1.414z"/></svg>
                  Telegram
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-700"><Gift className="w-4 h-4" /> You just saved a meal from waste!</div>
              {reminder && (
                <div className="mt-2 text-blue-600 text-xs font-medium">We'll remind you to pick up your bag!</div>
              )}
              {badgeUnlocked && (
                <div className="mt-2 flex items-center gap-2 text-pink-600 text-sm font-bold animate-bounce"><Gift className="w-5 h-5" /> Badge Unlocked! You're a Food Saver Star!</div>
              )}
              <DialogClose asChild>
                <Button className="mt-4" aria-label="Close reservation confirmation" tabIndex={0}>Done</Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NearbySurplusOffers;