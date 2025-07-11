import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Leaf, ShoppingBag, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

// Demo data
const analytics = {
  totalSales: 12800,
  bagsRescued: 320,
  wasteReduced: 540, // kg
  pickupRate: 92, // %
  salesTrend: [1200, 1500, 1800, 1600, 2000, 2200, 2500], // per week
  wasteTrend: [80, 75, 70, 68, 65, 60, 55], // per week
  pickupTrend: [85, 88, 90, 91, 92, 93, 94], // % per week
  weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"]
};

const AnalyticsReporting = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reporting</h2>
        <p className="text-muted-foreground">Track performance metrics and generate reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Bags Rescued</p>
              <p className="text-2xl font-bold text-primary">{analytics.bagsRescued}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold text-success">₹{analytics.totalSales}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Waste Reduced</p>
              <p className="text-2xl font-bold text-green-700">{analytics.wasteReduced}kg</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Clock className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">Pickup Success Rate</p>
              <p className="text-2xl font-bold text-warning">{analytics.pickupRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sales Trend (Last 7 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {analytics.salesTrend.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-primary/70 rounded-t w-6"
                    style={{ height: `${val / 30}px`, minHeight: 10 }}
                    title={`₹${val}`}
                  ></div>
                  <span className="text-xs mt-1">{analytics.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Waste Reduction Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Waste Reduction (kg)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {analytics.wasteTrend.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-green-500/70 rounded-t w-6"
                    style={{ height: `${val * 2}px`, minHeight: 10 }}
                    title={`${val}kg`}
                  ></div>
                  <span className="text-xs mt-1">{analytics.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickup Rate Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Pickup Success Rate (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 flex items-end gap-2">
              {analytics.pickupTrend.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div
                    className="bg-yellow-400/70 rounded-t w-6"
                    style={{ height: `${val * 2}px`, minHeight: 10 }}
                    title={`${val}%`}
                  ></div>
                  <span className="text-xs mt-1">{analytics.weeks[idx]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Export Button */}
        <Card className="flex flex-col justify-center items-center">
          <CardContent className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-lg font-semibold">Export Full Report</p>
            <Button className="bg-gradient-primary flex items-center gap-2" onClick={() => alert('Report downloaded!')}>
              <Download className="h-5 w-5" />
              Download CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsReporting;