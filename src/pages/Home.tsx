import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
// Removed incorrect import as it is unnecessary and causing an error

const Home = () => {

  console.log("Home component is rendering");

  return (
    <MainLayout>
      {/* Hero Section avec bannière et texte accrocheur */}
      <HeroSection />

      {/* Section - Comment ça fonctionne */}
      <HowItWorksSection />

      {/* Section - Présentation des équipements */}
      <FacilitiesSection />
    </MainLayout>
  );
};

export default Home;
