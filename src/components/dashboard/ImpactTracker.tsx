import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Droplets, Award, Share2, Target, TrendingUp, IndianRupee, Flame, Users, Package, Zap, Trophy, Star, Gift, Shield } from "lucide-react";
import React, { useState } from "react";
import { useImpactData } from "@/hooks/useImpactData";

const avatarAccessories = ["🧢", "🕶️", "🎒", "🌱", "🥕"];
const ecoPets = ["🐢", "🦜", "🐝", "🦋", "🐇"];

const ImpactTracker = () => {
  // --- Demo Data ---
  const [showConfetti, setShowConfetti] = useState(false);
  const impact = useImpactData();

  const funFacts = [
    "Saving 1kg of food saves 2.5kg CO₂!",
    "Each meal you save helps conserve 7L of water.",
    "Plastic saved = less ocean pollution!",
    "Your impact inspires others to join the rescue!",
    "A 7-day streak? You're a true eco-hero!"
  ];

  const ecoTips = [
    "Try composting your kitchen scraps for bonus eco-points!",
    "Bring your own bag to reduce plastic waste.",
    "Share your rescued meals with a neighbor.",
    "Plan a zero-waste day challenge!",
    "Switch to reusable water bottles."
  ];

  const challenges = [
    {
      title: "Rescue 3 Bags This Week!",
      progress: 2,
      target: 3,
      reward: "+100 XP & 'Bag Rescuer' badge",
      type: "weekly"
    },
    {
      title: "Share Your Impact on Social Media",
      progress: 0,
      target: 1,
      reward: "+50 XP",
      type: "daily"
    }
  ];

  const leaderboard = [
    { name: "You", avatar: "🧑‍🌾", score: 1850, rank: 3 },
    { name: "Aarav", avatar: "🦸‍♂️", score: 2200, rank: 1 },
    { name: "Priya", avatar: "👩‍🔬", score: 2100, rank: 2 },
    { name: "Riya", avatar: "🧑‍🍳", score: 1700, rank: 4 },
    { name: "Kabir", avatar: "🧑‍🚀", score: 1500, rank: 5 },
  ];

  const ecoQuests = [
    {
      name: "Plastic-Free Week",
      description: "Avoid single-use plastic for 7 days.",
      progress: 5,
      target: 7,
      badge: "🧴",
      reward: "+150 XP & 'Plastic-Free Hero' badge"
    },
    {
      name: "Zero Waste Month",
      description: "Divert 10 bags from landfill in a month.",
      progress: 8,
      target: 10,
      badge: "♻️",
      reward: "+200 XP & 'Zero Waste Hero' badge"
    }
  ];

  const referral = {
    invited: 3,
    target: 5,
    reward: "Unlock 'Eco Ambassador' badge & 200 XP"
  };

  const impactStories = [
    "This week, your rescued food helped 4 families in your community!",
    "You inspired 2 friends to join the food rescue movement.",
    "Your plastic savings kept 20 bottles out of the ocean!"
  ];

  const streakFreeze = {
    available: true,
    description: "Protect your streak if you miss a day! Use your Streak Freeze power-up to keep your progress going.",
    icon: "🧊"
  };

  const achievements = [
    { id: 1, name: "Eco Warrior", description: "Saved 50kg CO₂", icon: "🌍", progress: 100, target: 50, current: 78.5 },
    { id: 2, name: "Water Guardian", description: "Saved 2000L water", icon: "💧", progress: 100, target: 2000, current: 2340 },
    { id: 3, name: "Meal Saver", description: "Saved 100 meals", icon: "🍽️", progress: 100, target: 100, current: 156 },
    { id: 4, name: "Smart Shopper", description: "Save ₹5000", icon: "💰", progress: 91, target: 5000, current: 4560 },
    { id: 5, name: "Plastic Buster", description: "Saved 10kg plastic", icon: "🧴", progress: 100, target: 10, current: 12.4 },
    { id: 6, name: "Landfill Saviour", description: "Diverted 30 bags from landfill", icon: "🗑️", progress: 100, target: 30, current: 38 },
    { id: 7, name: "Energy Saver", description: "Saved 200kWh energy", icon: "⚡", progress: 100, target: 200, current: 210 },
    { id: 8, name: "Community Helper", description: "Helped 20 families", icon: "🤝", progress: 100, target: 20, current: 24 },
    { id: 9, name: "Streak Star", description: "7-day rescue streak!", icon: "🔥", progress: 100, target: 7, current: 7 },
    { id: 10, name: "Bag Rescuer", description: "Rescued 3 bags in a week", icon: "🛍️", progress: 67, target: 3, current: 2 },
    { id: 11, name: "Plastic-Free Hero", description: "Completed Plastic-Free Quest", icon: "🧴", progress: 71, target: 7, current: 5 },
  ];

  const milestones = [
    { date: "2024-01-15", achievement: "First 10 meals saved", icon: "🎯" },
    { date: "2024-01-10", achievement: "₹1000 saved milestone", icon: "💸" },
    { date: "2024-01-05", achievement: "10kg CO₂ reduction", icon: "🌱" },
    { date: "2023-12-28", achievement: "50 orders completed", icon: "📦" },
    { date: "2023-12-20", achievement: "Zero Waste Hero badge", icon: "🦸" }
  ];

  // Pick a fun fact and eco tip based on streak
  const funFact = funFacts[impact.currentStreak % funFacts.length];
  const ecoTip = ecoTips[impact.currentStreak % ecoTips.length];
  const impactStory = impactStories[impact.currentStreak % impactStories.length];

  // XP Progress
  const xpProgress = (impact.xp / impact.nextLevelXp) * 100;
  const nextLevel = impact.level + 1;

  // Confetti celebration demo (triggered by button)
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Avatar/Eco-Pet Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
        <Card className="bg-gradient-card border-l-4 border-green-400 min-w-[220px] flex flex-col items-center">
          <CardContent className="flex flex-col items-center p-4">
            <div className="text-5xl mb-2">
              {impact.avatar}
              {impact.accessories.map(idx => <span key={idx}>{avatarAccessories[idx]}</span>)}
            </div>
            <div className="text-2xl mb-1">Level {impact.level}</div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="font-bold">{impact.xp} XP</span>
              <span className="text-xs text-muted-foreground">/ {impact.nextLevelXp} XP</span>
            </div>
            <Progress value={xpProgress} className="h-2 mb-2" />
            <div className="text-xs text-muted-foreground">Next: Level {nextLevel}</div>
            <div className="mt-2 flex flex-col items-center">
              <span className="text-2xl">{ecoPets[impact.ecoPet]}</span>
              <span className="text-xs text-muted-foreground">Eco-Pet</span>
            </div>
          </CardContent>
        </Card>
        {/* Animated Celebration Demo */}
        <div className="flex flex-col items-center">
          <Button className="bg-gradient-primary mb-2" onClick={triggerConfetti}>Demo Celebration</Button>
          {showConfetti && <div className="text-4xl animate-bounce">🎉🎊✨</div>}
        </div>
      </div>

      {/* Daily/Weekly Challenge Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((ch, idx) => (
          <Card key={idx} className="bg-gradient-card border-l-4 border-indigo-400">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold">{ch.type === "weekly" ? "Weekly Challenge" : "Daily Challenge"}</span>
              </div>
              <div className="font-bold text-lg">{ch.title}</div>
              <div className="text-xs text-muted-foreground mb-1">Reward: {ch.reward}</div>
              <Progress value={(ch.progress / ch.target) * 100} className="h-2" />
              <div className="text-xs">{ch.progress} / {ch.target} complete</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard Placeholder */}
      <Card className="bg-gradient-card border-l-4 border-yellow-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-yellow-500" />
            Leaderboard (Top Food Savers)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {leaderboard.map((user, idx) => (
              <div key={idx} className={`flex items-center gap-2 p-2 rounded ${user.name === "You" ? "bg-green-100" : ""}`}>
                <span className="text-2xl">{user.avatar}</span>
                <span className="font-semibold">{user.name}</span>
                <span className="ml-auto font-mono">{user.score} XP</span>
                <Badge className={user.rank === 1 ? "bg-yellow-300 text-yellow-900" : user.rank === 2 ? "bg-gray-300 text-gray-900" : user.rank === 3 ? "bg-orange-300 text-orange-900" : "bg-muted"}>{user.rank}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eco-Quests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ecoQuests.map((quest, idx) => (
          <Card key={idx} className="bg-gradient-card border-l-4 border-green-400">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Eco-Quest</span>
                <span className="text-xl">{quest.badge}</span>
              </div>
              <div className="font-bold text-lg">{quest.name}</div>
              <div className="text-xs text-muted-foreground mb-1">{quest.description}</div>
              <Progress value={(quest.progress / quest.target) * 100} className="h-2" />
              <div className="text-xs">{quest.progress} / {quest.target} days</div>
              <div className="text-xs text-green-700">Reward: {quest.reward}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Rewards */}
      <Card className="bg-gradient-card border-l-4 border-cyan-400">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-cyan-600" />
            <span className="font-semibold">Referral Rewards</span>
          </div>
          <div className="text-xs text-muted-foreground mb-1">Invite friends to join and earn rewards!</div>
          <Progress value={(referral.invited / referral.target) * 100} className="h-2" />
          <div className="text-xs">{referral.invited} / {referral.target} friends invited</div>
          <div className="text-xs text-cyan-700">Reward: {referral.reward}</div>
          <Button size="sm" className="w-fit mt-2" onClick={() => alert('Referral link copied!')}>Get Referral Link</Button>
        </CardContent>
      </Card>

      {/* Impact Story & Eco Tip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-l-4 border-orange-400">
          <CardContent className="p-4 flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="text-lg font-bold text-orange-700">Impact Story</p>
              <p className="text-xs text-muted-foreground">{impactStory}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-l-4 border-cyan-400">
          <CardContent className="p-4 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-lg font-bold text-cyan-700">Personalized Eco Tip</p>
              <p className="text-xs text-muted-foreground">{ecoTip}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streak Freeze Power-Up */}
      <Card className="bg-gradient-card border-l-4 border-blue-400">
        <CardContent className="p-4 flex items-center gap-3">
          <span className="text-3xl">{streakFreeze.icon}</span>
          <div>
            <p className="text-lg font-bold text-blue-700">Streak Freeze Power-Up</p>
            <p className="text-xs text-muted-foreground">{streakFreeze.description}</p>
            <Button size="sm" className="mt-2" disabled={!streakFreeze.available} onClick={() => alert('Streak Freeze used!')}>Use Streak Freeze</Button>
          </div>
        </CardContent>
      </Card>

      {/* Impact Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="text-lg font-bold">{impact.mealsSaved}</div>
            <div className="text-xs text-muted-foreground">Meals Saved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-lg font-bold">₹{impact.moneySaved}</div>
            <div className="text-xs text-muted-foreground">Money Saved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-lg font-bold">{impact.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-lg font-bold">{impact.totalPurchases}</div>
            <div className="text-xs text-muted-foreground">Total Purchases</div>
          </CardContent>
        </Card>
      </div>

      {/* Creative Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-l-4 border-blue-400">
          <CardContent className="p-4 flex items-center gap-3">
            <Zap className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-lg font-bold text-blue-700">{impact.energySaved} kWh</p>
              <p className="text-xs text-muted-foreground">Energy Saved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-l-4 border-pink-400">
          <CardContent className="p-4 flex items-center gap-3">
            <Package className="h-5 w-5 text-pink-500" />
            <div>
              <p className="text-lg font-bold text-pink-700">{impact.plasticSaved} kg</p>
              <p className="text-xs text-muted-foreground">Plastic Saved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-l-4 border-green-400">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-lg font-bold text-green-700">{impact.landfillSaved}</p>
              <p className="text-xs text-muted-foreground">Bags Diverted from Landfill</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-l-4 border-orange-400">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-lg font-bold text-orange-700">{impact.communityHelped}</p>
              <p className="text-xs text-muted-foreground">Families Helped</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streak & Fun Fact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-l-4 border-yellow-400">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="h-7 w-7 text-yellow-500 animate-pulse" />
            <div>
              <p className="text-lg font-bold text-yellow-700">{impact.currentStreak} day streak</p>
              <p className="text-xs text-muted-foreground">Keep rescuing food every day!</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-l-4 border-cyan-400">
          <CardContent className="p-4 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-lg font-bold text-cyan-700">Eco Fun Fact</p>
              <p className="text-xs text-muted-foreground">{funFact}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="sharing">Share Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-warning" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`border rounded-lg p-4 space-y-3 ${achievement.progress >= 100 ? 'ring-2 ring-success/40 animate-pulse' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{achievement.icon}</div>
                      <Badge className={achievement.progress >= 100 ? "bg-success/20 text-success" : "bg-muted/20 text-muted-foreground"}>
                        {achievement.progress >= 100 ? "Earned" : "In Progress"}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{achievement.current}</span>
                        <span>{achievement.target}</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        {achievement.progress >= 100 ? "Achievement Unlocked! 🎉" : `${achievement.progress}% Complete`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                2024 Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Environmental Goals</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">CO₂ Reduction Goal</span>
                        <span className="text-sm font-medium">{impact.co2Saved}/{impact.co2Goal}kg</span>
                      </div>
                      <Progress value={(impact.co2Saved / impact.co2Goal) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Water Conservation Goal</span>
                        <span className="text-sm font-medium">{impact.waterSaved}/{impact.waterGoal}L</span>
                      </div>
                      <Progress value={(impact.waterSaved / impact.waterGoal) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Plastic Saved Goal</span>
                        <span className="text-sm font-medium">{impact.plasticSaved}/{impact.plasticGoal}kg</span>
                      </div>
                      <Progress value={(impact.plasticSaved / impact.plasticGoal) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Landfill Diversion Goal</span>
                        <span className="text-sm font-medium">{impact.landfillSaved}/{impact.landfillGoal} bags</span>
                      </div>
                      <Progress value={(impact.landfillSaved / impact.landfillGoal) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Energy Saved Goal</span>
                        <span className="text-sm font-medium">{impact.energySaved}/{impact.energyGoal} kWh</span>
                      </div>
                      <Progress value={(impact.energySaved / impact.energyGoal) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Social Goals</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Families Helped Goal</span>
                        <span className="text-sm font-medium">{impact.communityHelped}/{impact.communityGoal}</span>
                      </div>
                      <Progress value={(impact.communityHelped / impact.communityGoal) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Streak Goal</span>
                        <span className="text-sm font-medium">{impact.currentStreak}/{impact.streakGoal} days</span>
                      </div>
                      <Progress value={(impact.currentStreak / impact.streakGoal) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-success" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3 border-b pb-2 last:border-b-0">
                    <span className="text-xl">{m.icon}</span>
                    <div>
                      <p className="font-medium">{m.achievement}</p>
                      <p className="text-xs text-muted-foreground">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharing">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-cyan-600" />
                Share Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-lg font-semibold text-center">Proud of your journey? Share your eco-impact with friends and inspire them to join the rescue!</p>
              <Button className="bg-gradient-primary" onClick={() => alert('Share functionality coming soon!')}>Share on Social</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImpactTracker;