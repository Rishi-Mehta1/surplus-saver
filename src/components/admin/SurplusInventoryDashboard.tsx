import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, MapPin, Search, Filter } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  condition: string;
  expiry: string;
  urgency: "high" | "medium" | "low";
  price: number;
}

const SurplusInventoryDashboard = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Fresh Bread Loaves",
      category: "Bakery",
      quantity: 25,
      location: "Aisle 8, Shelf B2",
      condition: "Good",
      expiry: "2024-01-15T18:00:00",
      urgency: "high",
      price: 40
    },
    {
      id: "2", 
      name: "Organic Bananas",
      category: "Produce",
      quantity: 15,
      location: "Produce Section A",
      condition: "Fair",
      expiry: "2024-01-17T12:00:00",
      urgency: "medium",
      price: 60
    },
    {
      id: "3",
      name: "Packaged Sandwiches",
      category: "Deli",
      quantity: 8,
      location: "Deli Counter",
      condition: "Good",
      expiry: "2024-01-18T15:00:00",
      urgency: "low",
      price: 120
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTimeLeft = (expiry: string) => {
    const now = new Date();
    const expiryDate = new Date(expiry);
    const diff = expiryDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 0) return "Expired";
    if (hours < 24) return `${hours}h left`;
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h left`;
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Surplus Inventory Dashboard</h2>
          <p className="text-muted-foreground">Real-time tracking of items nearing expiry</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="bakery">Bakery</SelectItem>
              <SelectItem value="produce">Produce</SelectItem>
              <SelectItem value="deli">Deli</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Items</p>
                <p className="text-2xl font-bold text-destructive">{items.filter(i => i.urgency === 'high').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium Priority</p>
                <p className="text-2xl font-bold text-warning">{items.filter(i => i.urgency === 'medium').length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-foreground">{items.length}</p>
              </div>
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Recovery</p>
                <p className="text-2xl font-bold text-success">₹{items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</p>
              </div>
              <MapPin className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <Badge className={getUrgencyColor(item.urgency)}>
                      {item.urgency.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                    <span>Qty: {item.quantity}</span>
                    <span>Condition: {item.condition}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getTimeLeft(item.expiry)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Quick Discount
                  </Button>
                  <Button size="sm" className="bg-gradient-primary">
                    Create Bag
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurplusInventoryDashboard;