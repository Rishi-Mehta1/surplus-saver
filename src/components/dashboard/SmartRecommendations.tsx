import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Clock, IndianRupee, AlertTriangle } from "lucide-react";

// --- Static Demo Data ---
const aiData = {
  recommendations: {
    weatherTip: "It's hot and humid today! Grab a refreshing fruit bag or a light bakery snack.",
    recommendations: [
      {
        category: "Bakery",
        reason: "You often choose bakery items and there are fresh deals today!",
      },
      {
        category: "Vegetarian",
        reason: "Based on your preferences and today's weather, vegetarian bags are a great pick.",
      },
    ],
    urgentDeals: ["Bakery"],
  },
  availableBags: [
    {
      id: 1,
      category: "Bakery",
      sale_price: 79,
      original_price: 129,
      items_left: 2,
      pickup_start_time: "4:00pm",
      pickup_end_time: "7:00pm",
      stores: {
        name: "Delhi Hypermart",
        address: "Connaught Place, Delhi",
      },
    },
    {
      id: 2,
      category: "Vegetarian",
      sale_price: 99,
      original_price: 149,
      items_left: 3,
      pickup_start_time: "2:00pm",
      pickup_end_time: "6:00pm",
      stores: {
        name: "Mumbai Supercenter",
        address: "Andheri West, Mumbai",
      },
    },
    {
      id: 3,
      category: "Bakery",
      sale_price: 69,
      original_price: 119,
      items_left: 1,
      pickup_start_time: "5:00pm",
      pickup_end_time: "8:00pm",
      stores: {
        name: "Bengaluru Freshmart",
        address: "MG Road, Bengaluru",
      },
    },
    {
      id: 4,
      category: "Vegetarian",
      sale_price: 89,
      original_price: 139,
      items_left: 2,
      pickup_start_time: "3:00pm",
      pickup_end_time: "7:00pm",
      stores: {
        name: "Hyderabad Greens",
        address: "Banjara Hills, Hyderabad",
      },
    },
  ],
};

const SmartRecommendations = () => {
  const getDiscountPercentage = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const { recommendations, availableBags } = aiData;

  return (
    <div className="space-y-6">
      {/* Weather Tip */}
      {recommendations.weatherTip && (
        <Card className="bg-gradient-card border-l-4 border-blue-400">
          <CardContent className="py-3 flex items-center gap-3">
            <span className="font-medium text-blue-700">🌤️ Weather Tip:</span>
            <span>{recommendations.weatherTip}</span>
          </CardContent>
        </Card>
      )}

      {/* AI-Powered Recommendations */}
      {recommendations.recommendations && recommendations.recommendations.length > 0 && (
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-warning" />
              AI Recommendations Just for You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="border rounded-lg p-4 hover:shadow-card transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{rec.category}</h3>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30">AI Pick</Badge>
                </div>
                {/* Show matching available bags for this category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableBags.filter((bag: any) => bag.category === rec.category).map((bag: any) => (
                    <div key={bag.id} className="border rounded p-3 flex flex-col gap-2 bg-white/80">
                      <div className="font-semibold">{bag.stores?.name}</div>
                      <div className="text-xs text-muted-foreground">{bag.stores?.address}</div>
                      <Badge variant="outline" className="w-fit">{bag.category}</Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-700 flex items-center"><IndianRupee className="h-4 w-4" />{bag.sale_price}</span>
                        <span className="text-xs line-through text-zinc-400 flex items-center"><IndianRupee className="h-3 w-3" />{bag.original_price}</span>
                        <Badge variant="destructive">{getDiscountPercentage(bag.original_price, bag.sale_price)}% OFF</Badge>
                      </div>
                      <div className="text-xs">{bag.items_left} left</div>
                      <div className="text-xs flex items-center"><Clock className="h-3 w-3 mr-1" />Pickup: {bag.pickup_start_time}–{bag.pickup_end_time}</div>
                      <Button className="w-full bg-gradient-primary hover:shadow-glow" onClick={() => alert('This is a demo. Reservation not available.')}>Reserve Now</Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Urgent Deals */}
      {recommendations.urgentDeals && recommendations.urgentDeals.length > 0 && (
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Urgent Deals (Low Stock)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableBags.filter((bag: any) => recommendations.urgentDeals.includes(bag.category)).map((bag: any) => (
                <div key={bag.id} className="border rounded p-3 flex flex-col gap-2 bg-white/80">
                  <div className="font-semibold">{bag.stores?.name}</div>
                  <div className="text-xs text-muted-foreground">{bag.stores?.address}</div>
                  <Badge variant="outline" className="w-fit">{bag.category}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-700 flex items-center"><IndianRupee className="h-4 w-4" />{bag.sale_price}</span>
                    <span className="text-xs line-through text-zinc-400 flex items-center"><IndianRupee className="h-3 w-3" />{bag.original_price}</span>
                    <Badge variant="destructive">{getDiscountPercentage(bag.original_price, bag.sale_price)}% OFF</Badge>
                  </div>
                  <div className="text-xs">{bag.items_left} left</div>
                  <div className="text-xs flex items-center"><Clock className="h-3 w-3 mr-1" />Pickup: {bag.pickup_start_time}–{bag.pickup_end_time}</div>
                  <Button className="w-full bg-gradient-primary hover:shadow-glow" onClick={() => alert('This is a demo. Reservation not available.')}>Reserve Now</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartRecommendations;