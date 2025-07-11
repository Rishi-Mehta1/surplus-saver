import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, MapPin, Heart, Shield, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    bio: "",
    dietaryPreferences: ["vegetarian"],
    notifications: {
      newOffers: true,
      pickupReminders: true,
      weeklyReport: true,
      marketing: false
    },
    preferences: {
      language: "en",
      currency: "INR",
      deliveryRadius: "5",
      pickupTime: "evening"
    }
  });

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "halal", label: "Halal" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
    { value: "organic", label: "Organic Only" }
  ];

  const userStats = {
    memberSince: "December 2023",
    totalOrders: 23,
    level: "Food Saver Level 3",
    badges: ["Eco Warrior", "Zero Waste Hero", "Smart Shopper"]
  };

  const handleSave = () => {
    // Save profile logic here
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {(profile.fullName || user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{profile.fullName || "User"}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Award className="h-3 w-3 mr-1" />
                  {userStats.level}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Member since {userStats.memberSince}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{userStats.totalOrders}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-success">{userStats.badges.length}</p>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 12345 67890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    placeholder="Your delivery address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us a bit about yourself and your food preferences..."
                  rows={3}
                />
              </div>

              <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-glow">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-accent" />
                Food & Delivery Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Dietary Preferences</Label>
                <p className="text-sm text-muted-foreground mb-3">Select all that apply to get better recommendations</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dietaryOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.dietaryPreferences.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile({
                              ...profile,
                              dietaryPreferences: [...profile.dietaryPreferences, option.value]
                            });
                          } else {
                            setProfile({
                              ...profile,
                              dietaryPreferences: profile.dietaryPreferences.filter(p => p !== option.value)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Language</Label>
                  <Select
                    value={profile.preferences.language}
                    onValueChange={(value) => setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, language: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Radius</Label>
                  <Select
                    value={profile.preferences.deliveryRadius}
                    onValueChange={(value) => setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, deliveryRadius: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 km</SelectItem>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="15">15 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Pickup Time</Label>
                <Select
                  value={profile.preferences.pickupTime}
                  onValueChange={(value) => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, pickupTime: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 9 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-glow">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-warning" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">New Surplus Offers</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new offers are available nearby</p>
                  </div>
                  <Switch
                    checked={profile.notifications.newOffers}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, newOffers: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Pickup Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for your scheduled pickups</p>
                  </div>
                  <Switch
                    checked={profile.notifications.pickupReminders}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, pickupReminders: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Weekly Impact Report</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of your environmental impact</p>
                  </div>
                  <Switch
                    checked={profile.notifications.weeklyReport}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, weeklyReport: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">Tips, promotions, and app updates</p>
                  </div>
                  <Switch
                    checked={profile.notifications.marketing}
                    onCheckedChange={(checked) => setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, marketing: checked }
                    })}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-glow">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-accent" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Account Security</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Data & Privacy</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Privacy Settings
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Deactivate Account
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;