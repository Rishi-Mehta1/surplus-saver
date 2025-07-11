import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Star, Filter, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AuthCard from "@/components/auth/AuthCard";

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
}

interface Reservation {
  store: string;
  count: number;
}

const SurplusMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [surplusBags, setSurplusBags] = useState<SurplusBag[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);
  const [recommendation, setRecommendation] = useState<string>("");
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<SurplusBag | null>(null);
  const [userReservationsLive, setUserReservationsLive] = useState<Reservation[]>([]);

  const fetchSurplusBags = async () => {
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
      setSurplusBags(data || []);
    } catch (error) {
      console.error('Error fetching surplus bags:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load surplus bags"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurplusBags();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('surplus-bags-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'surplus_bags'
        },
        () => {
          fetchSurplusBags();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSurplusBags]);

  // Fetch recent reservations for personalization
  useEffect(() => {
    const fetchReservations = async () => {
      setRecommendationLoading(true);
      if (!user) {
        setRecentReservations([]);
        setRecommendation("");
        setRecommendationLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('reservations')
        .select('*, surplus_bags:surplus_bag_id(category, stores(store_id, name))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) {
        setRecentReservations([]);
        setRecommendation("");
        setRecommendationLoading(false);
        return;
      }
      setRecentReservations(data || []);
      // Analyze for favorite categories or stores
      const categories = (data || []).map((r: any) => r.surplus_bags?.category).filter(Boolean);
      const stores = (data || []).map((r: any) => r.surplus_bags?.stores?.name).filter(Boolean);
      let favCategories: string[] = [];
      let favStore = null;
      if (categories.length) {
        // Count frequency of each category
        const freq: Record<string, number> = {};
        categories.forEach(cat => { freq[cat] = (freq[cat] || 0) + 1; });
        // Sort by frequency
        favCategories = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([cat]) => cat);
      }
      if (stores.length) {
        favStore = stores.sort((a,b) => stores.filter(v=>v===a).length - stores.filter(v=>v===b).length).pop();
      }
      let name = user.user_metadata?.full_name || user.email || "there";
      if (favCategories.length > 1) {
        setRecommendation(`Hi ${name}, you seem to love '${favCategories[0]}' and '${favCategories[1]}' bags! Check out the latest deals in these categories.`);
      } else if (favCategories.length === 1) {
        setRecommendation(`Hi ${name}, based on your recent activity, we recommend checking out more '${favCategories[0]}' bags!`);
      } else if (favStore) {
        setRecommendation(`Hi ${name}, looks like you love shopping at '${favStore}'. Check out their latest surplus bags!`);
      } else {
        setRecommendation(`Hi ${name}, you haven't reserved a bag yet. Start your journey by grabbing your first surplus bag and help reduce food waste!`);
      }
      setRecommendationLoading(false);
    };
    fetchReservations();
  }, [user]);

  const filteredBags = surplusBags.filter(bag => {
    const matchesCategory = selectedCategory === "all" || bag.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = !searchTerm || 
      bag.stores?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bag.stores?.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getPickupTimeRange = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };

  const reserveBag = async (bagId: string, salePrice: number) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to reserve bags"
      });
      return;
    }

    try {
      const pickupCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const { error } = await supabase
        .from('reservations')
        .insert({
          user_id: user.id,
          surplus_bag_id: bagId,
          total_price: salePrice,
          pickup_code: pickupCode
        });

      if (error) throw error;

      // Update items left
      const bag = surplusBags.find(b => b.id === bagId);
      if (bag && bag.items_left > 0) {
        await supabase
          .from('surplus_bags')
          .update({ items_left: bag.items_left - 1 })
          .eq('id', bagId);
      }

      toast({
        title: "Bag Reserved!",
        description: `Your pickup code is: ${pickupCode}`
      });
    } catch (error) {
      console.error('Error reserving bag:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reserve bag"
      });
    }
  };

  const categories = ["all", "bakery", "produce", "deli & prepared", "dairy & frozen", "grocery"];

  const getDiscountPercentage = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const getTimeLeftColor = (timeLeft: string) => {
    const hours = parseInt(timeLeft.split('h')[0]);
    if (hours <= 1) return "text-destructive animate-countdown";
    if (hours <= 3) return "text-warning";
    return "text-muted-foreground";
  };

  // Auth handlers for modal
  const handleSignIn = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setLoginOpen(false);
      navigate("/user-dashboard");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setAuthLoading(false);
    }
  };
  const handleSignUp = async (email: string, password: string, fullName: string) => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: fullName, role: userType }
        }
      });
      if (error) throw error;
      toast({ title: "Check your email", description: "We've sent you a confirmation link to complete your registration." });
      setLoginOpen(false);
      navigate("/user-dashboard");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setAuthLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="marketplace" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl">Loading surplus bags...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="marketplace" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Surplus Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time surplus bags from Walmart stores near you. Prices drop as pickup time approaches!
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by store or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBags.map((bag) => (
            <Card key={bag.id} className="group bg-gradient-card hover:shadow-elegant transition-all duration-300 overflow-hidden">
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🛒</div>
                </div>
                
                {/* Discount Badge */}
                <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                  {getDiscountPercentage(bag.original_price, bag.sale_price)}% OFF
                </Badge>

                {/* Items Left Badge */}
                <Badge 
                  variant="secondary" 
                  className={`absolute top-3 right-3 ${
                    bag.items_left <= 3 ? 'bg-warning/20 text-warning border-warning/30' : ''
                  }`}
                >
                  {bag.items_left} left
                </Badge>
              </div>

              <div className="p-6">
                {/* Store Info */}
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                    {bag.stores?.name || 'Walmart Store'}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{bag.stores?.address || 'Address not available'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Near you</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-warning mr-1" fill="currentColor" />
                      <span className="text-muted-foreground">{bag.stores?.rating || 4.5}</span>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <Badge variant="outline" className="mb-4">
                  {bag.category}
                </Badge>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-foreground">₹{bag.sale_price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{bag.original_price}</span>
                  </div>
                </div>

                {/* Pickup Time */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Pickup: {getPickupTimeRange(bag.pickup_start_time, bag.pickup_end_time)}</span>
                  </div>
                  <div className={`text-sm font-medium ${getTimeLeftColor(getTimeLeft(bag.pickup_end_time))}`}>
                    Time left: {getTimeLeft(bag.pickup_end_time)}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="sm"
                  onClick={() => reserveBag(bag.id, bag.sale_price)}
                >
                  Reserve Bag
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredBags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No surplus bags available at the moment.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back later for new deals!</p>
          </div>
        )}

        {/* AI Recommendations */}
        <div className="mt-16 p-8 bg-gradient-hero rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Recommendations</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {user ? (
              recommendationLoading ? (
                <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Loading your personalized recommendations...</span>
              ) : (
                recommendation
              )
            ) :
              "Based on your preferences and today's weather, we recommend checking out bakery items. Perfect for a cozy evening!"}
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => {
              if (user) {
                navigate("/user-dashboard");
              } else {
                setLoginOpen(true);
              }
            }}
          >
            View Recommended Bags
          </Button>
        </div>
      </div>
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent>
          <AuthCard
            userType={userType}
            loading={authLoading}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SurplusMarketplace;