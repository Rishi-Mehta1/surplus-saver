import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Gift, Plus, Clock, Upload, Sparkles, PartyPopper } from "lucide-react";

interface SurpriseBag {
  id: string;
  name: string;
  category: string;
  items: string[];
  quantity: number;
  originalPrice: number;
  salePrice: number;
  pickupStart: string;
  pickupEnd: string;
  limitPerUser: number;
  status: "draft" | "active" | "sold";
}

const SurpriseBagCreator = () => {
  const [bags, setBags] = useState<SurpriseBag[]>([
    {
      id: "1",
      name: "Bakery Surprise Mix",
      category: "Bakery",
      items: ["Fresh Bread", "Pastries", "Cookies"],
      quantity: 5,
      originalPrice: 200,
      salePrice: 80,
      pickupStart: "16:00",
      pickupEnd: "19:00",
      limitPerUser: 2,
      status: "active"
    },
    {
      id: "2",
      name: "Fresh Produce Bundle",
      category: "Produce",
      items: ["Seasonal Fruits", "Vegetables", "Herbs"],
      quantity: 3,
      originalPrice: 150,
      salePrice: 60,
      pickupStart: "17:00",
      pickupEnd: "20:00",
      limitPerUser: 1,
      status: "draft"
    }
  ]);

  const [newBag, setNewBag] = useState({
    name: "",
    category: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    quantity: 1,
    pickupStart: "",
    pickupEnd: "",
    limitPerUser: 1
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdBag, setCreatedBag] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const availableItems = [
    "Fresh Bread Loaves", "Pastries & Cakes", "Cookies & Biscuits",
    "Seasonal Fruits", "Fresh Vegetables", "Herbs & Greens",
    "Deli Sandwiches", "Prepared Salads", "Hot Food Items",
    "Dairy Products", "Frozen Items", "Packaged Goods"
  ];

  const categories = ["Bakery", "Produce", "Deli & Prepared", "Dairy & Frozen", "Mixed"];

  const handleItemToggle = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "draft": return "bg-warning text-warning-foreground";
      case "sold": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getDiscountPercentage = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  // --- Creative Bag Creation Handler ---
  const handleCreateBag = () => {
    if (!newBag.name || !newBag.category || selectedItems.length === 0 || !newBag.salePrice || !newBag.originalPrice) return;
    const bag: SurpriseBag = {
      id: (bags.length + 1).toString(),
      name: newBag.name,
      category: newBag.category,
      items: selectedItems,
      quantity: newBag.quantity,
      originalPrice: newBag.originalPrice,
      salePrice: newBag.salePrice,
      pickupStart: newBag.pickupStart,
      pickupEnd: newBag.pickupEnd,
      limitPerUser: newBag.limitPerUser,
      status: "active"
    };
    setBags([bag, ...bags]);
    setCreatedBag(bag);
    setShowSuccess(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    setNewBag({
      name: "",
      category: "",
      description: "",
      originalPrice: 0,
      salePrice: 0,
      quantity: 1,
      pickupStart: "",
      pickupEnd: "",
      limitPerUser: 1
    });
    setSelectedItems([]);
  };

  return (
    <div className="space-y-6 relative">
      {/* Creative Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
            {showConfetti && <div className="text-5xl animate-bounce mb-2">🎉✨🥳</div>}
            <div className="flex items-center gap-2 mb-2">
              <PartyPopper className="h-7 w-7 text-primary animate-pop" />
              <span className="text-2xl font-bold text-primary">Surprise Bag Created!</span>
            </div>
            <div className="text-lg mb-2 text-center">Your new bag <span className="font-semibold">{createdBag?.name}</span> is now live!</div>
            <div className="mb-3 text-center">
              <span className="inline-block bg-gradient-to-r from-green-200 to-blue-200 rounded px-3 py-1 text-sm font-medium mb-1">{createdBag?.category}</span>
              <div className="flex flex-wrap gap-1 justify-center mb-1">
                {createdBag?.items.map((item: string) => (
                  <Badge key={item} variant="outline" className="text-xs">{item}</Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Qty: {createdBag?.quantity} | ₹{createdBag?.salePrice} <span className="line-through text-zinc-400">₹{createdBag?.originalPrice}</span> | {getDiscountPercentage(createdBag?.originalPrice, createdBag?.salePrice)}% OFF</div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button className="bg-gradient-primary" onClick={() => setShowSuccess(false)}>Create Another</Button>
              <Button variant="outline" onClick={() => setShowSuccess(false)}>View All Bags</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Surprise Bag Creator</h2>
          <p className="text-muted-foreground">Group surplus items into attractive customer bundles</p>
        </div>
        <Button className="bg-gradient-primary">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Suggest Bundle
        </Button>
      </div>

      {/* Create New Bag */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Surprise Bag
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bagName">Bag Name</Label>
                <Input
                  id="bagName"
                  placeholder="e.g., Bakery Delight Mix"
                  value={newBag.name}
                  onChange={(e) => setNewBag({...newBag, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newBag.category} onValueChange={(value) => setNewBag({...newBag, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description or hints about contents..."
                  value={newBag.description}
                  onChange={(e) => setNewBag({...newBag, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={newBag.originalPrice}
                    onChange={(e) => setNewBag({...newBag, originalPrice: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price (₹)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={newBag.salePrice}
                    onChange={(e) => setNewBag({...newBag, salePrice: Number(e.target.value)})}
                  />
                </div>
              </div>

              {newBag.originalPrice > 0 && newBag.salePrice > 0 && (
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-success">
                    <strong>{getDiscountPercentage(newBag.originalPrice, newBag.salePrice)}% discount</strong> - Great value for customers!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Items to Include</Label>
                <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
                  {availableItems.map(item => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.includes(item)}
                        onCheckedChange={() => handleItemToggle(item)}
                      />
                      <Label className="text-sm">{item}</Label>
                    </div>
                  ))}
                </div>
                {selectedItems.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {selectedItems.length} items selected
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={newBag.quantity}
                    onChange={(e) => setNewBag({...newBag, quantity: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limitPerUser">Limit per Customer</Label>
                  <Input
                    id="limitPerUser"
                    type="number"
                    min="1"
                    value={newBag.limitPerUser}
                    onChange={(e) => setNewBag({...newBag, limitPerUser: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupStart">Pickup Start Time</Label>
                  <Input
                    id="pickupStart"
                    type="time"
                    value={newBag.pickupStart}
                    onChange={(e) => setNewBag({...newBag, pickupStart: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupEnd">Pickup End Time</Label>
                  <Input
                    id="pickupEnd"
                    type="time"
                    value={newBag.pickupEnd}
                    onChange={(e) => setNewBag({...newBag, pickupEnd: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button className="flex-1 bg-gradient-primary" onClick={handleCreateBag}>
                  <Gift className="h-4 w-4 mr-2" />
                  Create Bag
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Bags */}
      <Card>
        <CardHeader>
          <CardTitle>Current Surprise Bags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bags.map(bag => (
              <div key={bag.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{bag.name}</h3>
                    <Badge className={getStatusColor(bag.status)}>
                      {bag.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{bag.category}</Badge>
                    <Badge variant="secondary">
                      {getDiscountPercentage(bag.originalPrice, bag.salePrice)}% OFF
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Qty: {bag.quantity}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {bag.pickupStart} - {bag.pickupEnd}
                    </span>
                    <span>Limit: {bag.limitPerUser}/customer</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {bag.items.map(item => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{bag.salePrice}</p>
                    <p className="text-sm text-muted-foreground line-through">₹{bag.originalPrice}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button 
                      variant={bag.status === "active" ? "destructive" : "default"} 
                      size="sm"
                    >
                      {bag.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurpriseBagCreator;
