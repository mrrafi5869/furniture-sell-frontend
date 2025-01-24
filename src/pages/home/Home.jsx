import FeaturedSections from "@/components/FeaturedSection";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import ProductSlider from "@/components/ProductSlider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-5">
        <HeroCarousel />
        <FeaturedSections />
        <ProductSlider />
      </div>
    </div>
  );
};
export default Home;
