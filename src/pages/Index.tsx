import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SurplusMarketplace from "@/components/SurplusMarketplace";
import HowItWorks from "@/components/HowItWorks";
import ImpactDashboard from "@/components/ImpactDashboard";
import BusinessSection from "@/components/BusinessSection";
import Footer from "@/components/Footer";
import EcoChat from "@/components/EcoChat";
import { useEcoChat } from "@/hooks/useEcoChat";

const Index = () => {
  const { isChatOpen, toggleChat } = useEcoChat();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SurplusMarketplace />
      <HowItWorks />
      <ImpactDashboard />
      <BusinessSection />
      <Footer />
      <EcoChat isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
};

export default Index;
