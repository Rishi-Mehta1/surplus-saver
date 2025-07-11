import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, TrendingUp, AlertTriangle, Users, BarChart3, Gift, Bell, Settings, Truck, Leaf, Store } from "lucide-react";
import SurplusInventoryDashboard from "@/components/admin/SurplusInventoryDashboard";
import SmartDiscountEngine from "@/components/admin/SmartDiscountEngine";
import SurpriseBagCreator from "@/components/admin/SurpriseBagCreator";
import OrderPickupManagement from "@/components/admin/OrderPickupManagement";
import IoTAlertsPanel from "@/components/admin/IoTAlertsPanel";
import AnalyticsReporting from "@/components/admin/AnalyticsReporting";
import StaffAccessManagement from "@/components/admin/StaffAccessManagement";
import CustomerFeedback from "@/components/admin/CustomerFeedback";
import RedistributionSuggestions from "@/components/admin/RedistributionSuggestions";
import SustainabilityImpact from "@/components/admin/SustainabilityImpact";
import DonationMode from "@/components/admin/DonationMode";
import NotificationCenter from "@/components/admin/NotificationCenter";
import EcoChat from "@/components/EcoChat";
import { useEcoChat } from "@/hooks/useEcoChat";
import { BadgeAlert } from "lucide-react";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const { isChatOpen, toggleChat } = useEcoChat();

  // LIFTED TAB STATE
  const [tab, setTab] = useState("inventory");

  // Example: alert count (could be dynamic)
  const alertCount = 3;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading admin dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Please sign in to access admin dashboard.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      {/* Redesigned Header as Card */}
      <div className="relative max-w-6xl mx-auto mt-8 rounded-2xl shadow-lg bg-white/90 border border-gray-200 overflow-hidden">
        {/* SVG Pattern Background - Abstract Waves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:0}} aria-hidden="true">
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e9eef7" />
              <stop offset="100%" stopColor="#f7f9fa" />
            </linearGradient>
          </defs>
          <path d="M0,80 Q120,120 240,80 T480,80 T720,80 T960,80 V160 H0 Z" fill="url(#waveGradient)" opacity="0.25" />
          <circle cx="90" cy="40" r="18" fill="#e9eef7" opacity="0.18" />
          <circle cx="420" cy="110" r="10" fill="#e9eef7" opacity="0.13" />
          <circle cx="700" cy="60" r="14" fill="#e9eef7" opacity="0.12" />
        </svg>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-7">
          {/* Left: Icon & Title */}
          <div className="flex items-center gap-5">
            <div className="bg-[#f4f6fb] rounded-full p-4 shadow flex items-center justify-center border border-gray-200">
              <Store className="h-9 w-9 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                Admin Dashboard
                <span className="inline-block bg-[#e9eef7] rounded px-2 py-1 text-xs font-semibold text-primary ml-2">Store Manager</span>
              </h1>
              <p className="text-gray-600 mt-1 text-base font-medium">Manage surplus inventory, staff, and sustainability impact</p>
            </div>
          </div>
          {/* Right: Manager Card (Glassmorphism) */}
          <div className="flex items-center gap-4">
            <div className="backdrop-blur-md bg-white/60 border border-gray-200 rounded-xl px-6 py-3 flex flex-col items-center shadow-md min-w-[170px]" style={{boxShadow:'0 4px 24px 0 rgba(80,100,140,0.07)'}}>
              <div className="flex items-center gap-2 mb-1">
                <Store className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Store Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="relative" style={{ boxShadow: 'none' }}>
                  <Bell className="h-5 w-5 text-yellow-500" />
                  {alertCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">{alertCount}</span>
                  )}
                </Button>
                <span className="text-xs text-gray-500">Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={tab} onValueChange={setTab} defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
            <TabsTrigger value="inventory" className="flex items-center space-x-1">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="discounts" className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Discounts</span>
            </TabsTrigger>
            <TabsTrigger value="surprise-bags" className="flex items-center space-x-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Bags</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Staff</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="redistribution" className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Transfer</span>
            </TabsTrigger>
            <TabsTrigger value="sustainability" className="flex items-center space-x-1">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center space-x-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Donations</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notify</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <SurplusInventoryDashboard />
          </TabsContent>

          <TabsContent value="discounts">
            <SmartDiscountEngine setTab={setTab} />
          </TabsContent>

          <TabsContent value="surprise-bags">
            <SurpriseBagCreator />
          </TabsContent>

          <TabsContent value="orders">
            <OrderPickupManagement />
          </TabsContent>

          <TabsContent value="alerts">
            <IoTAlertsPanel />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsReporting />
          </TabsContent>

          <TabsContent value="staff">
            <StaffAccessManagement />
          </TabsContent>

          <TabsContent value="feedback">
            <CustomerFeedback />
          </TabsContent>

          <TabsContent value="redistribution">
            <RedistributionSuggestions />
          </TabsContent>

          <TabsContent value="sustainability">
            <SustainabilityImpact />
          </TabsContent>

          <TabsContent value="donations">
            <DonationMode />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
      <EcoChat isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
};

export default AdminDashboard;