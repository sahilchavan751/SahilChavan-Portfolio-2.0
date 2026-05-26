import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProfileSection from "@/components/ProfileSection";
import ToolsSection from "@/components/ToolsSection";
import CategoriesSection from "@/components/CategoriesSection";
import GlassButton from "@/components/GlassButton";
import GlassPopup from "@/components/GlassPopup";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProfileSection />
      <ToolsSection />
      <CategoriesSection />
      <GlassButton />
      <GlassPopup />
      <Footer />
    </>
  );
}
