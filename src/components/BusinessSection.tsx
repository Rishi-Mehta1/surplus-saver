import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Users, Zap, Shield, Smartphone } from "lucide-react";

const BusinessSection = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Revenue Recovery",
      description: "Convert potential waste into revenue streams with our AI-powered pricing engine.",
      metric: "+$5,000/month average per store"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Waste Reduction Analytics",
      description: "Real-time dashboards and predictive analytics to minimize future waste.",
      metric: "15% average waste reduction"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Engagement",
      description: "Build customer loyalty through sustainable initiatives and value offerings.",
      metric: "23% increase in customer visits"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Seamless Integration",
      description: "Direct integration with existing Walmart POS and inventory management systems.",
      metric: "< 2 hours setup time"
    }
  ];

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and encrypted data transmission."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Admin Dashboard",
      description: "Comprehensive analytics dashboard with real-time insights and automated reporting."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Performance KPIs",
      description: "Track waste reduction, revenue recovery, and customer satisfaction metrics."
    }
  ];

  const adminFeatures = [
    "AI-powered waste prediction alerts",
    "Automated discount suggestions",
    "Real-time inventory sync",
    "QR code pickup management",
    "Performance analytics dashboard",
    "Revenue optimization reports"
  ];

  return (
    <section id="business" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
            For Walmart Stores
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Transform Waste into Revenue
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade surplus management platform designed specifically for Walmart's ecosystem. 
            Reduce waste, increase revenue, and enhance customer satisfaction.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{benefit.description}</p>
              <Badge className="bg-success/20 text-success border-success/30">
                {benefit.metric}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Admin Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Intelligent Store Management
            </h3>
            <p className="text-muted-foreground mb-8">
              Our AI-powered admin panel integrates seamlessly with Walmart's existing systems, 
              providing real-time insights and automated waste management recommendations.
            </p>

            <div className="space-y-4 mb-8">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              Request Store Demo
            </Button>
          </div>

          <Card className="p-8 bg-gradient-card shadow-elegant">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-foreground mb-2">Today's AI Alerts</h4>
              <p className="text-muted-foreground text-sm">Predicted waste items for your review</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">High Risk: Bakery Items</p>
                    <p className="text-sm text-muted-foreground">25 bread loaves expiring today</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Auto-Discount 30%
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Medium Risk: Produce</p>
                    <p className="text-sm text-muted-foreground">15 banana bunches (2 days left)</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Create Bag
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Success: Deli Items</p>
                    <p className="text-sm text-muted-foreground">12/15 bags sold today</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30">
                    80% rescued
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">15%</p>
                  <p className="text-xs text-muted-foreground">Waste Reduction</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">$2,340</p>
                  <p className="text-xs text-muted-foreground">Revenue Recovered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Enterprise Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Process */}
        <div className="bg-background rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Implementation Roadmap
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h4 className="font-semibold text-foreground mb-2">System Integration</h4>
              <p className="text-sm text-muted-foreground">Connect with existing POS and inventory systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h4 className="font-semibold text-foreground mb-2">Staff Training</h4>
              <p className="text-sm text-muted-foreground">Quick 30-minute training session for store staff</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h4 className="font-semibold text-foreground mb-2">Pilot Launch</h4>
              <p className="text-sm text-muted-foreground">2-week pilot program with full support</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h4 className="font-semibold text-foreground mb-2">Full Deployment</h4>
              <p className="text-sm text-muted-foreground">Go live with ongoing analytics and support</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Store?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the growing network of Walmart stores using AI to reduce waste, increase revenue, and serve their communities better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              Schedule Store Demo
            </Button>
            <Button variant="outline" size="lg">
              Download Business Case
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;