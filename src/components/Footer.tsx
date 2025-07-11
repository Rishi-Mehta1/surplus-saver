import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Impact", href: "#impact" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" }
    ],
    business: [
      { name: "For Stores", href: "#business" },
      { name: "Admin Login", href: "#" },
      { name: "API Documentation", href: "#" },
      { name: "Business Resources", href: "#" },
      { name: "Case Studies", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Community", href: "#" },
      { name: "Safety Guidelines", href: "#" },
      { name: "Food Safety", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated on Surplus Deals
              </h3>
              <p className="text-muted-foreground mb-4">
                Get notifications about the best surplus deals near you and learn about our impact on reducing food waste.
              </p>
              <Badge className="bg-success/10 text-success border-success/20">
                <Leaf className="h-3 w-3 mr-1" />
                Join 50,000+ eco-conscious savers
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email address" 
                  className="flex-1"
                />
                <Button className="bg-gradient-primary hover:shadow-glow">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src={logo} alt="Walmart Surplus Saver" className="h-10 w-10" />
                <div>
                  <h4 className="text-lg font-bold text-foreground">Surplus Saver</h4>
                  <p className="text-sm text-muted-foreground">by Walmart</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                A social impact platform on a mission to inspire and empower everyone to fight food waste together. 
                Rescue good food, save money, and help the environment.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>702 SW 8th Street, Bentonville, AR 72716</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@surplussaver.walmart.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>1-800-SURPLUS (1-800-787-7587)</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Business</h4>
              <ul className="space-y-3">
                {footerLinks.business.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              <p>© 2024 Walmart Inc. All rights reserved. | Surplus Saver Platform</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>

            {/* Additional Info */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="border-success/30 text-success">
                <Leaf className="h-3 w-3 mr-1" />
                Certified B Corp
              </Badge>
              <span>|</span>
              <span>Carbon Neutral Platform</span>
            </div>
          </div>
        </div>

        {/* Environmental Impact Footer */}
        <div className="py-4 bg-gradient-to-r from-success/5 to-primary/5 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              🌱 This month our community prevented <span className="font-semibold text-foreground">2.4M lbs of CO₂</span> from entering the atmosphere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;