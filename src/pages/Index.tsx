import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import DiscountBanner from "@/components/DiscountBanner";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ProductGrid from "@/components/ProductGrid";
import ReviewsSection from "@/components/ReviewsSection";
import NewsletterSection from "@/components/NewsletterSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <DiscountBanner />
      <HeroSection />
      <FeaturedSection />
      <ProductGrid />
      <ReviewsSection />
      <NewsletterSection />
      <AboutSection />
    </>
  );
};

export default Index;
