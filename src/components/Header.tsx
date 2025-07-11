import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useImpactData } from "@/hooks/useImpactData";

const defaultLocation = { city: "New York", state: "NY", lat: 40.7128, lon: -74.0060 };

function LocationPicker({ onSelect, initialLat, initialLon }: { onSelect: (lat: number, lon: number) => void, initialLat: number, initialLon: number }) {
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLon]);
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  // @ts-expect-error: react-leaflet Marker icon prop type mismatch workaround
  return <Marker position={position} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] }) as L.Icon} />;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const [location, setLocation] = useState(defaultLocation);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mapLat, setMapLat] = useState(defaultLocation.lat);
  const [mapLon, setMapLon] = useState(defaultLocation.lon);
  const impact = useImpactData();

  // Auto-detect location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setMapLat(lat);
      setMapLon(lon);
      // Reverse geocode
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || "Unknown";
        const state = data.address.state || data.address.state_code || "";
        setLocation({ city, state, lat, lon });
      } catch {
        setLocation(defaultLocation);
      }
      setLoadingLocation(false);
    }, () => {
      setLoadingLocation(false);
    });
  }, []);

  // City search
  useEffect(() => {
    if (!search) return setSearchResults([]);
    const timeout = setTimeout(async () => {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(search)}&format=json&addressdetails=1&limit=5`);
      const data = await res.json();
      setSearchResults(data);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelectCity = (item) => {
    const city = item.address.city || item.address.town || item.address.village || item.address.hamlet || "Unknown";
    const state = item.address.state || item.address.state_code || "";
    setLocation({ city, state, lat: parseFloat(item.lat), lon: parseFloat(item.lon) });
    setMapLat(parseFloat(item.lat));
    setMapLon(parseFloat(item.lon));
    setShowLocationModal(false);
  };

  const handleMapSelect = async (lat, lon) => {
    setMapLat(lat);
    setMapLon(lon);
    // Reverse geocode
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();
    const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || "Unknown";
    const state = data.address.state || data.address.state_code || "";
    setLocation({ city, state, lat, lon });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Walmart Surplus Saver" className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Surplus Saver</h1>
              <p className="text-xs text-muted-foreground">by Walmart</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors">
              Impact
            </a>
            <a href="#business" className="text-foreground hover:text-primary transition-colors">
              For Business
            </a>
          </nav>

          {/* Location & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {loadingLocation ? (
                <span className="animate-pulse">Detecting...</span>
              ) : (
                <>
                  <span>{location.city}, {location.state}</span>
                  <Button variant="ghost" size="sm" className="ml-1 px-2 py-0.5 text-xs" onClick={() => setShowLocationModal(true)}>
                    Change
                  </Button>
                </>
              )}
            </div>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <ShoppingBag className="h-3 w-3" />
              <span>{impact.bagsReserved} bags reserved</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>₹{impact.moneySaved} saved</span>
            </Badge>
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )
            )}
            <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <a href="#marketplace" className="text-foreground hover:text-primary transition-colors py-2">
                Marketplace
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors py-2">
                How It Works
              </a>
              <a href="#impact" className="text-foreground hover:text-primary transition-colors py-2">
                Impact
              </a>
              <a href="#business" className="text-foreground hover:text-primary transition-colors py-2">
                For Business
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-primary">
                  Download App
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* Location Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Select your location</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search for city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-3"
          />
          <div className="space-y-2 mb-4">
            {searchResults.map(item => (
              <div key={item.place_id} className="cursor-pointer hover:bg-muted p-2 rounded" onClick={() => handleSelectCity(item)}>
                {item.display_name}
              </div>
            ))}
          </div>
          <div className="h-48 w-full rounded overflow-hidden">
            {/* @ts-expect-error: MapContainer center prop type workaround */}
            <MapContainer center={[mapLat, mapLon]} zoom={10} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker onSelect={handleMapSelect} initialLat={mapLat} initialLon={mapLon} />
            </MapContainer>
          </div>
          <DialogClose asChild>
            <Button className="mt-4 w-full">Done</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;