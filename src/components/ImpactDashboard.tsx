import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, Users, Award, MapPin, Zap } from "lucide-react";

const ImpactDashboard = () => {
  const personalStats = {
    bagsSaved: 47,
    moneySaved: 312.85,
    co2Prevented: 89.2,
    mealsRescued: 156,
    ecoPoints: 2340,
    rank: "Eco Warrior"
  };

  const globalStats = {
    totalBags: "2.4M",
    totalSavings: "$18.7M",
    co2Saved: "4.2M lbs",
    storesParticipating: 1247,
    communityMembers: "890K"
  };

  const achievements = [
    { icon: "🌱", title: "First Rescue", description: "Saved your first surplus bag", completed: true },
    { icon: "🔥", title: "Weekly Warrior", description: "Rescued food 7 days in a row", completed: true },
    { icon: "🌟", title: "Community Hero", description: "Shared 10 tips with community", completed: false },
    { icon: "🏆", title: "Century Club", description: "Rescued 100 meals", completed: true }
  ];

  return (
    <section id="impact" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-success/10 text-success border-success/20">
            <Leaf className="h-3 w-3 mr-1" />
            Environmental Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Impact Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your personal contribution to reducing food waste and see the collective impact of our community.
          </p>
        </div>

        {/* Personal Impact Dashboard */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <Award className="h-6 w-6 mr-2 text-warning" />
            Your Personal Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Bags Saved */}
            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary">{personalStats.rank}</Badge>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-2">{personalStats.bagsSaved}</h4>
              <p className="text-muted-foreground mb-3">Bags Rescued</p>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Next goal: 50 bags</p>
            </Card>

            {/* Money Saved */}
            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <Badge className="bg-success/20 text-success border-success/30">
                  +$47 this week
                </Badge>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-2">${personalStats.moneySaved}</h4>
              <p className="text-muted-foreground mb-3">Total Saved</p>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Average saving: $6.65/bag</p>
            </Card>

            {/* Environmental Impact */}
            <Card className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  CO₂ Offset
                </Badge>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-2">{personalStats.co2Prevented} lbs</h4>
              <p className="text-muted-foreground mb-3">CO₂ Prevented</p>
              <Progress value={89} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Equal to 45 miles of driving</p>
            </Card>
          </div>

          {/* Eco Points & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Eco Points */}
            <Card className="p-6 bg-gradient-primary">
              <div className="text-white">
                <h4 className="text-xl font-bold mb-2">Eco Points Balance</h4>
                <p className="text-3xl font-bold mb-4">{personalStats.ecoPoints.toLocaleString()}</p>
                <p className="text-white/80 mb-4">
                  Earn points for every rescue and redeem for discounts on future purchases.
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm font-medium">Next Reward: $5 Off</p>
                  <Progress value={74} className="h-2 mt-2 bg-white/20" />
                  <p className="text-xs text-white/70 mt-1">260 points to go</p>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 bg-gradient-card shadow-card">
              <h4 className="text-xl font-bold text-foreground mb-4">Recent Achievements</h4>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`text-2xl ${achievement.completed ? 'opacity-100' : 'opacity-30'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.completed && (
                      <Badge className="bg-success/20 text-success border-success/30">
                        ✓
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Global Impact Statistics */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            Community Impact
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{globalStats.totalBags}</div>
              <div className="text-sm text-muted-foreground">Total Bags Rescued</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{globalStats.totalSavings}</div>
              <div className="text-sm text-muted-foreground">Money Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{globalStats.co2Saved}</div>
              <div className="text-sm text-muted-foreground">CO₂ Prevented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{globalStats.storesParticipating}</div>
              <div className="text-sm text-muted-foreground">Stores Participating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{globalStats.communityMembers}</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
          </div>

          {/* Live Feed */}
          <div className="mt-8 p-4 bg-background/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Live Rescue Feed
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">🎯 Sarah just rescued a bakery bag in Manhattan</p>
              <p className="text-muted-foreground">🌱 Mike saved 3.2 lbs of CO₂ with a produce rescue in Brooklyn</p>
              <p className="text-muted-foreground">⭐ Emma earned 150 eco points from her deli rescue in Queens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactDashboard;