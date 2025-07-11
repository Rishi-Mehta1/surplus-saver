import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, MapPin, Smartphone, Clock, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Discover",
      description: "Browse surprise bags from nearby Walmart stores with AI-powered recommendations based on your preferences and location.",
      details: ["Real-time inventory updates", "Smart filtering by category", "Price drop notifications"]
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Reserve",
      description: "Secure your surprise bag with a few taps. Watch prices drop in real-time as pickup time approaches.",
      details: ["Instant QR code generation", "Flexible pickup windows", "Dynamic pricing system"]
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Pickup",
      description: "Visit the store during your pickup window, scan your QR code, and collect your discounted groceries.",
      details: ["Contactless pickup process", "Integration with Walmart POS", "Eco points earned automatically"]
    }
  ];

  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Smart App Integration",
      description: "Seamless integration with Walmart's existing systems for real-time inventory and pricing."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Dynamic Pricing",
      description: "AI-powered pricing that adjusts based on demand, time left, and historical data."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Guaranteed",
      description: "All surplus items meet Walmart's quality standards - just approaching best-by dates."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Retail with Purpose
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Retail with Purpose: Walmart's Sustainable Future
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how Walmart is transforming surplus into sustainability—empowering communities, reducing waste, and building a brighter, greener future for all.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" />
              )}
              
              <Card className="relative z-10 p-8 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>

                {/* Details */}
                <div className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full mr-3" />
                      {detail}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            Advanced Features
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

        {/* Process Timeline */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Behind the Scenes: AI-Powered Waste Prediction
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">AI Waste Prediction</h4>
                <p className="text-muted-foreground">Our machine learning algorithms analyze sales data, weather patterns, and historical trends to predict which items might go unsold.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Dynamic Pricing Engine</h4>
                <p className="text-muted-foreground">Prices automatically adjust based on demand, time remaining, and inventory levels to maximize rescue potential while maintaining value.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Real-time Optimization</h4>
                <p className="text-muted-foreground">The system continuously learns from rescue patterns to improve predictions and create better surprise bag combinations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Saving?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of users who are already making a difference while saving money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              Download the App
            </Button>
            <Button variant="outline" size="lg">
              Sign Up for Web Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;