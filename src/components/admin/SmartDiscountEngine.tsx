import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Settings, Save } from "lucide-react";

interface DiscountRule {
  id: string;
  name: string;
  condition: string;
  discount: number;
  isActive: boolean;
  category: string;
}

const SmartDiscountEngine = ({ setTab }: { setTab?: (tab: string) => void }) => {
  const [rules, setRules] = useState<DiscountRule[]>([
    {
      id: "1",
      name: "Same Day Expiry",
      condition: "Less than 6 hours to expiry",
      discount: 50,
      isActive: true,
      category: "Time-based"
    },
    {
      id: "2",
      name: "High Quantity Alert",
      condition: "More than 20 items remaining",
      discount: 30,
      isActive: true,
      category: "Quantity-based"
    },
    {
      id: "3",
      name: "Weekend Clearance",
      condition: "Saturday & Sunday",
      discount: 25,
      isActive: false,
      category: "Schedule-based"
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: "",
    condition: "",
    discount: 20,
    category: "Time-based"
  });

  const [aiSuggestions] = useState([
    {
      rule: "Rainy Day Boost",
      reasoning: "Weather data shows rain increases surplus demand by 35%",
      suggestedDiscount: 15,
      confidence: 87
    },
    {
      rule: "Evening Rush Hour",
      reasoning: "Customer traffic peaks at 5-7 PM for discounted items",
      suggestedDiscount: 40,
      confidence: 92
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const updateDiscount = (id: string, discount: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, discount } : rule
    ));
  };

  const handleApplyRule = () => {
    if (setTab) setTab("surprise-bags");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Smart Discount Engine</h2>
          <p className="text-muted-foreground">AI-powered dynamic pricing for surplus inventory</p>
        </div>
        <Button className="bg-gradient-primary">
          <Zap className="h-4 w-4 mr-2" />
          AI Auto-Price
        </Button>
      </div>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{suggestion.rule}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.reasoning}</p>
                  <Badge variant="secondary" className="mt-2">
                    {suggestion.confidence}% Confidence
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-2xl text-success">{suggestion.suggestedDiscount}%</p>
                    <p className="text-sm text-muted-foreground">Suggested</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleApplyRule}>
                    Apply Rule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Active Discount Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{rule.name}</h3>
                    <Badge variant="outline">{rule.category}</Badge>
                    <Switch 
                      checked={rule.isActive}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.condition}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Label className="text-sm">Discount: {rule.discount}%</Label>
                    <Slider
                      value={[rule.discount]}
                      onValueChange={([value]) => updateDiscount(rule.id, value)}
                      max={70}
                      min={5}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create New Rule */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Discount Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input
                id="ruleName"
                placeholder="e.g., Flash Sale Thursday"
                value={newRule.name}
                onChange={(e) => setNewRule({...newRule, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                placeholder="e.g., Every Thursday 3-6 PM"
                value={newRule.condition}
                onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Discount Percentage: {newRule.discount}%</Label>
              <Slider
                value={[newRule.discount]}
                onValueChange={([value]) => setNewRule({...newRule, discount: value})}
                max={70}
                min={5}
                step={5}
              />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Rule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">₹12,450</p>
              <p className="text-sm text-muted-foreground">Revenue Recovered Today</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">85%</p>
              <p className="text-sm text-muted-foreground">Items Sold vs Discarded</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">142</p>
              <p className="text-sm text-muted-foreground">Meals Saved Today</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartDiscountEngine;