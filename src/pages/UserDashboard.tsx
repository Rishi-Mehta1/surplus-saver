import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Calendar, Bell, User, Award, ShoppingBag, TrendingUp, UtensilsCrossed, Leaf, IndianRupee, TreePine, Trash2 } from "lucide-react";
import PersonalizedDashboard from "@/components/dashboard/PersonalizedDashboard";
import NearbySurplusOffers from "@/components/dashboard/NearbySurplusOffers";
import SmartRecommendations from "@/components/dashboard/SmartRecommendations";
import OrderHistory from "@/components/dashboard/OrderHistory";
import UserProfile from "@/components/dashboard/UserProfile";
import ImpactTracker from "@/components/dashboard/ImpactTracker";
import EcoChat from "@/components/EcoChat";
import { useEcoChat } from "@/hooks/useEcoChat";
import { supabase } from "@/integrations/supabase/client";
import clsx from "clsx";
import { useImpactData } from "@/hooks/useImpactData";

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const { isChatOpen, toggleChat } = useEcoChat();
  const [reservationCount, setReservationCount] = useState<number | null>(null);
  const [activeBagCount, setActiveBagCount] = useState<number | null>(null);
  const prevBagCount = useRef<number | null>(null);
  const [tab, setTab] = useState("overview");
  const impact = useImpactData();

  useEffect(() => {
    const fetchReservationCount = async () => {
      if (!user) {
        setReservationCount(null);
        return;
      }
      const { count, error } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      if (!error) setReservationCount(count || 0);
    };
    fetchReservationCount();
  }, [user]);

  // Fetch active surplus bags for new offers badge
  useEffect(() => {
    const fetchActiveBags = async () => {
      const { count, error } = await supabase
        .from('surplus_bags')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gt('items_left', 0);
      if (!error) setActiveBagCount(count || 0);
    };
    fetchActiveBags();
  }, []);

  // Animated count-up for stats
  function useCountUp(target: number | null, duration = 1000) {
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (target === null) return;
      let start = 0;
      let startTime: number | null = null;
      function animate(ts: number) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        setValue(Math.floor(progress * (target - start) + start));
        if (progress < 1) requestAnimationFrame(animate);
        else setValue(target);
      }
      requestAnimationFrame(animate);
      // eslint-disable-next-line
    }, [target]);
    return value;
  }

  const animatedBags = useCountUp(reservationCount, 800);
  const animatedMeals = useCountUp(reservationCount !== null ? reservationCount * 2 : null, 800);
  const animatedCO2 = useCountUp(reservationCount !== null ? reservationCount * 2 : null, 800);
  const animatedMoney = useCountUp(reservationCount !== null ? reservationCount * 100 : null, 800);
  const animatedTrees = useCountUp(reservationCount !== null ? Math.floor(reservationCount / 20) : null, 800);
  const animatedWaste = useCountUp(reservationCount !== null ? Math.round(reservationCount * 1.5) : null, 800);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Please sign in to access your dashboard.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-300/60 via-blue-200/40 to-green-400/60 text-white p-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-900 drop-shadow-md" style={{textShadow: '0 2px 8px rgba(0,0,0,0.10)'}}>
                Welcome back, {user.user_metadata?.full_name || user.email}! <span role="img" aria-label="sprout">🌱</span>
              </h1>
              <p className="mt-2 text-lg font-medium text-green-800 drop-shadow-sm" style={{textShadow: '0 1px 6px rgba(0,0,0,0.08)'}}>
                Your personal food waste warrior dashboard
              </p>
              <div className="flex items-center mt-1 mb-2">
                <span className="text-green-600 text-2xl">🍃</span>
              </div>
              <p className="text-green-900/80 font-semibold mt-3 text-lg tracking-wide">
                You're making a difference!
              </p>
              {reservationCount !== null && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                  {/* Stat Card */}
                  <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-lg flex flex-col items-center py-4 px-2">
                    <div className="bg-green-200/80 rounded-full p-3 mb-2 shadow-inner">
                      <ShoppingBag className="h-7 w-7 text-yellow-600" />
                    </div>
                    <span className="font-bold text-2xl text-green-900/90" style={{fontFamily: 'inherit', letterSpacing: 1}}>{impact.bagsReserved}</span>
                    <span className="text-green-900/80 font-medium mt-1">bags reserved <span className="ml-1">🍃</span></span>
                  </div>
                  <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-lg flex flex-col items-center py-4 px-2">
                    <div className="bg-green-100/80 rounded-full p-3 mb-2 shadow-inner">
                      <UtensilsCrossed className="h-7 w-7 text-pink-600" />
                    </div>
                    <span className="font-bold text-2xl text-green-900/90" style={{fontFamily: 'inherit', letterSpacing: 1}}>{impact.mealsSaved}</span>
                    <span className="text-green-900/80 font-medium mt-1">meals saved <span className="ml-1">🥗</span></span>
                  </div>
                  <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-lg flex flex-col items-center py-4 px-2">
                    <div className="bg-green-300/80 rounded-full p-3 mb-2 shadow-inner">
                      <Leaf className="h-7 w-7 text-green-700" />
                    </div>
                    <span className="font-bold text-2xl text-green-900/90" style={{fontFamily: 'inherit', letterSpacing: 1}}>{impact.co2Reduced}</span>
                    <span className="text-green-900/80 font-medium mt-1">kg CO₂ reduced <span className="ml-1">🌿</span></span>
                  </div>
                  <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-lg flex flex-col items-center py-4 px-2">
                    <div className="bg-green-100/80 rounded-full p-3 mb-2 shadow-inner">
                      <IndianRupee className="h-7 w-7 text-blue-700" />
                    </div>
                    <span className="font-bold text-2xl text-green-900/90" style={{fontFamily: 'inherit', letterSpacing: 1}}>&#8377;{impact.moneySaved}</span>
                    <span className="text-green-900/80 font-medium mt-1">saved <span className="ml-1">💸</span></span>
                  </div>
                  <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-lg flex flex-col items-center py-4 px-2">
                    <div className="bg-green-400/80 rounded-full p-3 mb-2 shadow-inner">
                      <TreePine className="h-7 w-7 text-green-900" />
                    </div>
                    <span className="font-bold text-2xl text-green-900/90" style={{fontFamily: 'inherit', letterSpacing: 1}}>{impact.treesSaved}</span>
                    <span className="text-green-900/80 font-medium mt-1">trees saved <span className="ml-1">🌳</span></span>
                  </div>
                  <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl shadow-lg flex flex-col items-center py-4 px-2">
                    <div className="bg-green-200/80 rounded-full p-3 mb-2 shadow-inner">
                      <Trash2 className="h-7 w-7 text-gray-700" />
                    </div>
                    <span className="font-bold text-2xl text-green-900/90" style={{fontFamily: 'inherit', letterSpacing: 1}}>{impact.wasteDiverted}</span>
                    <span className="text-green-900/80 font-medium mt-1">kg waste diverted <span className="ml-1">🍂</span></span>
                  </div>
                  {activeBagCount !== null && activeBagCount > 0 && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-400 to-green-600 text-white border-none animate-pulse flex items-center gap-2 mt-2">
                      <Leaf className="h-4 w-4" />
                      {activeBagCount} new surplus bag{activeBagCount === 1 ? '' : 's'} available!
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="secondary" className="bg-white text-black border border-black/10 rounded-full px-5 py-2 font-semibold flex items-center gap-2 shadow-sm">
                <Award className="h-4 w-4 mr-2 text-black/70" />
                Food Saver Level 3
              </Badge>
              <Badge variant="secondary" className="bg-white text-black border border-black/10 rounded-full px-5 py-2 font-semibold flex items-center gap-2 shadow-sm">
                <Bell className="h-4 w-4 mr-2 text-black/70" />
                Notifications
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Nearby Offers</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>For You</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Impact</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PersonalizedDashboard setTab={setTab} />
          </TabsContent>

          <TabsContent value="offers">
            <NearbySurplusOffers />
          </TabsContent>

          <TabsContent value="recommendations">
            <SmartRecommendations />
          </TabsContent>

          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="impact">
            <ImpactTracker />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
      <EcoChat isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
};

export default UserDashboard;