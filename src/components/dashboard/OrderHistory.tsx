import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Calendar, MapPin, Star, Download, IndianRupee, Clock } from "lucide-react";

const OrderHistory = () => {
  const [filter, setFilter] = useState("all");

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      store: "Walmart Superstore - Bandra",
      category: "Bakery Surprise Bag",
      originalPrice: 399,
      paidPrice: 149,
      status: "completed",
      pickupTime: "6:30 PM",
      rating: 5,
      items: ["Fresh Bread x2", "Croissants x4", "Danish Pastry x3"],
      savings: 250,
      environmental: {
        co2Saved: 2.1,
        mealsSaved: 3
      }
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-12",
      store: "Walmart Express - Andheri",
      category: "Fresh Produce Mix",
      originalPrice: 299,
      paidPrice: 99,
      status: "completed",
      pickupTime: "7:00 PM",
      rating: 4,
      items: ["Mixed Vegetables 2kg", "Seasonal Fruits 1kg"],
      savings: 200,
      environmental: {
        co2Saved: 1.8,
        mealsSaved: 4
      }
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-10",
      store: "Walmart Neighborhood - Juhu",
      category: "Deli & Prepared Foods",
      originalPrice: 499,
      paidPrice: 199,
      status: "completed",
      pickupTime: "5:45 PM",
      rating: 5,
      items: ["Ready Meals x3", "Sandwiches x2", "Salad Bowl x1"],
      savings: 300,
      environmental: {
        co2Saved: 3.2,
        mealsSaved: 6
      }
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-08",
      store: "Walmart Superstore - Powai",
      category: "Dairy & Frozen",
      originalPrice: 449,
      paidPrice: 169,
      status: "completed",
      pickupTime: "4:15 PM",
      rating: 4,
      items: ["Yogurt Variety Pack", "Frozen Meals x2", "Ice Cream 500ml"],
      savings: 280,
      environmental: {
        co2Saved: 2.5,
        mealsSaved: 4
      }
    },
    {
      id: "ORD-2024-005",
      date: "2024-01-05",
      store: "Walmart Express - Malad",
      category: "Grocery Items",
      originalPrice: 359,
      paidPrice: 129,
      status: "completed",
      pickupTime: "6:00 PM",
      rating: 5,
      items: ["Snacks Variety", "Beverages x3", "Pantry Items"],
      savings: 230,
      environmental: {
        co2Saved: 1.9,
        mealsSaved: 2
      }
    }
  ];

  const totalStats = {
    totalOrders: orders.length,
    totalSavings: orders.reduce((sum, order) => sum + order.savings, 0),
    totalCO2Saved: orders.reduce((sum, order) => sum + order.environmental.co2Saved, 0),
    totalMealsSaved: orders.reduce((sum, order) => sum + order.environmental.mealsSaved, 0),
    averageRating: orders.reduce((sum, order) => sum + order.rating, 0) / orders.length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/20 text-success border-success/30";
      case "picked-up": return "bg-primary/20 text-primary border-primary/30";
      case "ready": return "bg-warning/20 text-warning border-warning/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalStats.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">₹{totalStats.totalSavings}</p>
                <p className="text-sm text-muted-foreground">Total Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-accent">🌱</div>
              <div>
                <p className="text-2xl font-bold">{totalStats.totalCO2Saved.toFixed(1)}kg</p>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{totalStats.averageRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Order History
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="this-month">This Month</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-4 mt-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6 hover:shadow-card transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{order.category}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status === "completed" ? "✓ Completed" : order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {order.pickupTime}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {order.store}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < order.rating ? "text-warning fill-current" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Items */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Items Received:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Pricing:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Original:</span>
                          <span className="line-through">₹{order.originalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">You Paid:</span>
                          <span className="font-semibold">₹{order.paidPrice}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-success">Saved:</span>
                          <span className="font-semibold text-success">₹{order.savings}</span>
                        </div>
                      </div>
                    </div>

                    {/* Environmental Impact */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Environmental Impact:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CO₂ Saved:</span>
                          <span className="text-accent">{order.environmental.co2Saved}kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Meals Saved:</span>
                          <span className="text-accent">{order.environmental.mealsSaved}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    </div>
                    {order.status === "completed" && (
                      <Button variant="outline" size="sm">
                        Rate & Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;