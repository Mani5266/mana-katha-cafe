import CustomCursor from "@/components/CustomCursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import BrandEssence from "@/components/BrandEssence";
import MenuSection from "@/components/MenuSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import ReserveSection from "@/components/ReserveSection";
import AboutSection from "@/components/AboutSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <div className="grain-overlay min-h-screen w-full">
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />

      {/* Hero — no wrapper (has its own scroll parallax) */}
      <Hero />

      <SectionWrapper index={1}>
        <SocialProof />
      </SectionWrapper>

      <SectionWrapper index={2}>
        <BrandEssence />
      </SectionWrapper>

      <SectionWrapper index={3} glow>
        <MenuSection />
      </SectionWrapper>

      <SectionWrapper index={4}>
        <EventsSection />
      </SectionWrapper>

      <SectionWrapper index={5} glow>
        <GallerySection />
      </SectionWrapper>

      <SectionWrapper index={6} glow>
        <ReserveSection />
      </SectionWrapper>

      <SectionWrapper index={7}>
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper index={8}>
        <LocationSection />
      </SectionWrapper>

      <SectionWrapper index={9} noScale>
        <Footer />
      </SectionWrapper>

      <FloatingActionButton />
    </div>
  );
}
