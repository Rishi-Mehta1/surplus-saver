import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, ShoppingBag, Leaf, Droplets, IndianRupee, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const PersonalizedDashboard = ({ setTab }: { setTab?: (tab: string) => void }) => {
  const [stats, setStats] = useState({
    totalPurchases: 23,
    mealsSaved: 156,
    co2Saved: 78.5,
    waterSaved: 2340,
    moneySaved: 4560,
    currentStreak: 12
  });
  const { user } = useAuth();
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareLink = user ? `https://eco-rescue.app/user/impact/${user.id}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const achievements = [
    { name: "Food Saver", description: "Saved 100+ meals", icon: "🌟", earned: true },
    { name: "Zero Waste Hero", description: "30-day saving streak", icon: "🦸", earned: true },
    { name: "Eco Warrior", description: "Saved 50kg CO₂", icon: "🌍", earned: true },
    { name: "Surplus Champion", description: "100+ purchases", icon: "🏆", earned: false },
  ];

  // For dynamic recommendations
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "there";
  const dynamicSuggestion = "Try a bakery bag for a cozy evening or keep your streak going for a special badge!";
  const ecoTips = [
    "Bring your own bag to reduce plastic waste!",
    "Compost your food scraps for a greener planet.",
    "Share surplus food with neighbors or friends.",
    "Plan your meals to avoid food waste.",
    "Support local farmers and eco-friendly brands.",
    "Try a plant-based meal once a week!",
    "Buy seasonal produce for fresher, greener meals.",
    "Store leftovers in reusable containers.",
    "Donate extra food to a local shelter.",
    "Grow herbs on your windowsill for fresh flavor!"
  ];
  const ecoFacts = [
    "Did you know? One third of all food produced is lost or wasted globally.",
    "Did you know? Saving one meal can save up to 2kg of CO₂!",
    "Did you know? India is among the top food-wasting countries, but you can help change that!",
    "Did you know? Composting can reduce household waste by up to 30%.",
    "Did you know? Sharing your impact inspires others to join the movement!"
  ];
  const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
  const randomFact = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];

  // Smarter recommendations
  const favoriteCategory = "bakery"; // mock for now
  const closeToBadge = stats.totalPurchases >= 20;
  const notShared = true; // mock as always true for now

  // Social share handlers
  const shareMsg = `🌱 I've helped save ${stats.mealsSaved} meals, reduced ${stats.co2Saved}kg CO₂, and saved ₹${stats.moneySaved} with Eco Rescue! Join me: ${shareLink}`;
  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`);
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMsg)}`);
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(shareMsg)}`);
  const shareLinkedIn = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`);
  const shareTelegram = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(shareMsg)}`);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Total Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalPurchases}</div>
            <p className="text-sm text-muted-foreground mt-1">This month: 8 bags</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Meals Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{stats.mealsSaved}</div>
            <p className="text-sm text-muted-foreground mt-1">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <IndianRupee className="h-4 w-4 mr-2" />
              Money Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">₹{stats.moneySaved}</div>
            <p className="text-sm text-muted-foreground mt-1">Average: ₹198/bag</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{stats.currentStreak}</div>
            <p className="text-sm text-muted-foreground mt-1">days saving food</p>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-success" />
            Your Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CO₂ Saved</span>
                <span className="text-2xl font-bold text-success">{stats.co2Saved}kg</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Goal: 100kg this year</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Water Saved</span>
                <span className="text-2xl font-bold text-primary">{stats.waterSaved}L</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">Goal: 3600L this year</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-warning" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.earned
                    ? "bg-success/10 border-success/30 hover:shadow-glow"
                    : "bg-muted/50 border-border opacity-60"
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">{achievement.icon}</div>
                  <h3 className="font-semibold text-sm">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-gradient-primary hover:shadow-glow h-12" onClick={() => setTab && setTab("offers")}>Find Nearby Offers</Button>
            <Button variant="outline" className="h-12" onClick={() => setRecModalOpen(true)}>View Recommendations</Button>
            <Button variant="outline" className="h-12" onClick={() => setShareModalOpen(true)}>Share Your Impact</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Modal */}
      <Dialog open={recModalOpen} onOpenChange={setRecModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personalized Recommendations</DialogTitle>
            <DialogDescription>We think you'll love these eco-friendly actions and offers!</DialogDescription>
          </DialogHeader>
          <div className="mb-2 font-semibold text-green-900 text-lg">Hi {userName}, here are some ideas for you:</div>
          <ul className="space-y-3 mt-2">
            <li className="bg-green-100/60 rounded-lg p-3 flex items-center gap-2">
              <Leaf className="text-green-600" /> Try a {favoriteCategory} bag for a cozy evening!
            </li>
            {closeToBadge && (
              <li className="bg-yellow-100/60 rounded-lg p-3 flex items-center gap-2">
                <Award className="text-yellow-600" /> You're just a few purchases away from your next badge!
              </li>
            )}
            <li className="bg-blue-100/60 rounded-lg p-3 flex items-center gap-2">
              <ShoppingBag className="text-blue-600" /> Reserve a bag from your favorite store this week.
            </li>
            <li className="bg-emerald-100/60 rounded-lg p-3 flex items-center gap-2">
              <TrendingUp className="text-emerald-600" /> Invite a friend and double your impact.
            </li>
            {notShared && (
              <li className="bg-pink-100/60 rounded-lg p-3 flex items-center gap-2">
                <Copy className="text-pink-600" /> Share your impact and inspire others!
              </li>
            )}
          </ul>
          <div className="mt-4 text-green-800 italic text-sm flex items-center gap-2">
            <Leaf className="h-4 w-4 text-green-500" /> Eco Tip: {randomTip}
          </div>
          <div className="mt-1 text-green-700 text-xs flex items-center gap-2">
            <span role="img" aria-label="bulb">💡</span> {randomFact}
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Impact Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Impact</DialogTitle>
            <DialogDescription>Show your friends how you're helping the planet!</DialogDescription>
          </DialogHeader>
          <div className="my-4 flex flex-col items-center">
            <div className="relative w-full max-w-xl">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4 animate-fadein-scale">
                <DialogClose asChild>
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none" aria-label="Close" onClick={() => setShareModalOpen(false)}>&times;</button>
                </DialogClose>
                <div className="bg-green-50 rounded-lg p-4 text-green-900 font-semibold text-center w-full">
                  🌱 I've helped save {stats.mealsSaved} meals, reduced {stats.co2Saved}kg CO₂, and saved ₹{stats.moneySaved} with Eco Rescue!
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 border w-full">
                  <span className="truncate text-sm text-gray-700">{shareLink}</span>
                  <button onClick={handleCopy} className="ml-2 p-1 rounded hover:bg-green-100 transition-colors">
                    <Copy className="h-4 w-4 text-green-700" />
                  </button>
                  <span className={`text-green-600 text-xs ml-1 transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>Copied!</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 justify-center w-full">
                  <button onClick={shareWhatsApp} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full font-semibold flex items-center gap-2 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.31A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Z" fill="#fff"/><path d="M16 5c5.523 0 10 4.477 10 10 0 5.523-4.477 10-10 10a9.96 9.96 0 0 1-5.1-1.39l-.36-.21-4.24 1.37 1.39-4.23-.22-.36A9.96 9.96 0 0 1 6 15c0-5.523 4.477-10 10-10Zm-2.13 5.47c-.23-.51-.47-.52-.68-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.21 3.37 5.44 4.59.76.29 1.35.46 1.81.59.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.6-.37-.31-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.68.08-.32-.16-1.34-.5-2.56-1.6-.95-.85-1.6-1.89-1.79-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56Z" fill="#25D366"/></svg>
                    WhatsApp
                  </button>
                  <button onClick={shareTwitter} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-full font-semibold flex items-center gap-2 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M32 6.076a13.14 13.14 0 0 1-3.769 1.031A6.601 6.601 0 0 0 31.115 4.1a13.195 13.195 0 0 1-4.169 1.594A6.563 6.563 0 0 0 22.155 3c-3.626 0-6.563 2.938-6.563 6.563 0 .514.058 1.016.17 1.496C10.272 10.89 5.444 8.13 2.228 4.161c-.564.97-.888 2.096-.888 3.301 0 2.277 1.159 4.287 2.924 5.463a6.573 6.573 0 0 1-2.975-.822v.083c0 3.181 2.263 5.834 5.267 6.437-.551.15-1.13.23-1.728.23-.423 0-.832-.041-1.232-.117.833 2.6 3.25 4.494 6.116 4.547A13.18 13.18 0 0 1 0 27.026 18.616 18.616 0 0 0 10.063 30c12.072 0 18.681-10.002 18.681-18.682 0-.285-.007-.568-.02-.85A13.348 13.348 0 0 0 32 6.076Z" fill="#fff"/></svg>
                    Twitter/X
                  </button>
                  <button onClick={shareFacebook} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-full font-semibold flex items-center gap-2 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h13V20h-4v-5h4v-3.5C16 8.57 18.239 7 20.857 7c1.104 0 2.243.195 2.243.195v4.07h-1.264c-1.246 0-1.636.771-1.636 1.562V15h4.5l-.72 5h-3.78v12h7c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3Z" fill="#fff"/></svg>
                    Facebook
                  </button>
                  <button onClick={shareLinkedIn} className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-full font-semibold flex items-center gap-2 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff"/><path d="M27 3H5C4.447 3 4 3.447 4 4v24c0 .553.447 1 1 1h22c.553 0 1-.447 1-1V4c0-.553-.447-1-1-1Zm-15 23H7V13h5v13Zm-2.5-15a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm17.5 15h-5v-6.5c0-1.104-.896-2-2-2s-2 .896-2 2V26h-5V13h5v1.561C18.09 13.21 19.02 13 20 13c3.314 0 6 2.686 6 6V26Z" fill="#0077B5"/></svg>
                    LinkedIn
                  </button>
                  <button onClick={shareTelegram} className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-full font-semibold flex items-center gap-2 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M25.707 7.293a1 1 0 0 0-1.02-.242l-16 6a1 1 0 0 0 .09 1.89l4.98 1.66 2.13 6.39a1 1 0 0 0 1.88.09l2.01-4.02 4.98 4.98a1 1 0 0 0 1.7-.71V8.293a1 1 0 0 0-.74-.97ZM23 23.59l-4.29-4.29a1 1 0 0 0-1.42 0l-2.29 2.29-1.42-4.26 10.29-3.86V23.59Z" fill="#229ED9"/></svg>
                    Telegram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalizedDashboard;