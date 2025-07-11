import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, ShoppingBag, Package, Trash2, TrendingUp } from "lucide-react";
import React from "react";

// Demo data
const impact = {
  co2: 540,
  water: 3200,
  meals: 1280,
  plastic: 42,
  landfill: 110,
  trend: {
    weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
    co2: [60, 70, 80, 75, 85, 90, 80],
    water: [400, 420, 450, 430, 470, 500, 530],
    meals: [120, 140, 160, 150, 180, 200, 210],
    plastic: [5, 6, 7, 6, 8, 9, 8],
    landfill: [12, 14, 16, 15, 18, 20, 15],
  },
  stores: [
    { name: "Mumbai Supercenter", co2: 180, water: 1100, meals: 420, plastic: 15, landfill: 35 },
    { name: "Delhi Hypermart", co2: 140, water: 900, meals: 320, plastic: 12, landfill: 28 },
    { name: "Hyderabad Greens", co2: 120, water: 700, meals: 270, plastic: 8, landfill: 22 },
    { name: "Bengaluru Freshmart", co2: 100, water: 500, meals: 270, plastic: 7, landfill: 25 },
  ]
};

const SustainabilityImpact = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Sustainability Impact</h2>
        <p className="text-muted-foreground">Track environmental impact metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              <p className="text-2xl font-bold text-green-700">{impact.co2}kg</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Droplets className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Water Saved</p>
              <p className="text-2xl font-bold text-blue-700">{impact.water}L</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Meals Provided</p>
              <p className="text-2xl font-bold text-primary">{impact.meals}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Package className="h-8 w-8 text-pink-500" />
            <div>
              <p className="text-sm text-muted-foreground">Plastic Saved</p>
              <p className="text-2xl font-bold text-pink-700">{impact.plastic}kg</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Trash2 className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Landfill Diverted</p>
              <p className="text-2xl font-bold text-orange-700">{impact.landfill}kg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Trend Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CO₂ Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              CO₂ Saved (Last 7 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {impact.trend.co2.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-green-500/70 rounded-t w-6"
                    style={{ height: `${val * 2}px`, minHeight: 10 }}
                    title={`${val}kg`}
                  ></div>
                  <span className="text-xs mt-1">{impact.trend.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Water Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              Water Saved (Last 7 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {impact.trend.water.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-blue-400/70 rounded-t w-6"
                    style={{ height: `${val / 2}px`, minHeight: 10 }}
                    title={`${val}L`}
                  ></div>
                  <span className="text-xs mt-1">{impact.trend.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meals Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Meals Provided (Last 7 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {impact.trend.meals.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-primary/70 rounded-t w-6"
                    style={{ height: `${val / 2}px`, minHeight: 10 }}
                    title={`${val}`}
                  ></div>
                  <span className="text-xs mt-1">{impact.trend.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Plastic Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-pink-500" />
              Plastic Saved (Last 7 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {impact.trend.plastic.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-pink-400/70 rounded-t w-6"
                    style={{ height: `${val * 8}px`, minHeight: 10 }}
                    title={`${val}kg`}
                  ></div>
                  <span className="text-xs mt-1">{impact.trend.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Landfill Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-orange-500" />
              Landfill Diverted (Last 7 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {impact.trend.landfill.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-orange-400/70 rounded-t w-6"
                    style={{ height: `${val * 8}px`, minHeight: 10 }}
                    title={`${val}kg`}
                  ></div>
                  <span className="text-xs mt-1">{impact.trend.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Store Impact Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Store</th>
                  <th className="p-2 text-left">CO₂</th>
                  <th className="p-2 text-left">Water</th>
                  <th className="p-2 text-left">Meals</th>
                  <th className="p-2 text-left">Plastic</th>
                  <th className="p-2 text-left">Landfill</th>
                </tr>
              </thead>
              <tbody>
                {impact.stores.map((s, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30">
                    <td className="p-2 font-semibold">{s.name}</td>
                    <td className="p-2">{s.co2}kg</td>
                    <td className="p-2">{s.water}L</td>
                    <td className="p-2">{s.meals}</td>
                    <td className="p-2">{s.plastic}kg</td>
                    <td className="p-2">{s.landfill}kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityImpact;