import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Leaf, ShoppingBag, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const handleFindSurplus = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Fresh groceries and food items" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Hero Badge */}
          <Badge className="mb-6 bg-success/10 text-success border-success/20 animate-fade-in">
            <Leaf className="h-3 w-3 mr-1" />
            Fighting Food Waste Together
          </Badge>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Save Good Food
            <span className="text-primary block">From Going to Waste</span>
          </h1>

          {/* Hero Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
            Discover surprise bags of surplus food from your local Walmart stores. 
            Get quality groceries at up to 80% off while helping the environment.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-scale-in">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6" onClick={handleFindSurplus}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Find Surplus Near You
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={() => setShowVideo(true)}>
              <Play className="h-5 w-5 mr-2" />
              Retail with Purpose: Walmart's Sustainable Future
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <p className="text-sm text-muted-foreground">Bags Available Today</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1.2M lbs</p>
                  <p className="text-sm text-muted-foreground">Food Rescued This Month</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4:23</p>
                  <p className="text-sm text-muted-foreground">Avg. Pickup Time</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Finder Quick Access */}
          <div className="mt-8 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Quick find:</span>
              <div className="flex flex-wrap gap-2">
                {["Manhattan", "Brooklyn", "Queens", "Bronx"].map((location) => (
                  <Button key={location} variant="ghost" size="sm" className="h-8 text-xs">
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse-glow">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <div className="w-12 h-12 bg-success/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-success" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Retail with Purpose: Walmart's Sustainable Future</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/4dae7f5LmO8"
              title="Retail with Purpose: Walmart's Sustainable Future"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;