
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedPostsSection from "@/components/home/FeaturedPostsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedPostsSection />
        <TestimonialsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
