import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import DiscountBanner from "@/components/DiscountBanner";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ProductGrid from "@/components/ProductGrid";
import ReviewsSection from "@/components/ReviewsSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <DiscountBanner />
        <HeroSection />
        <FeaturedSection />
        <ProductGrid />
        <ReviewsSection />
        <AboutSection />
      </div>
    </>
  );
};

export default Index;
