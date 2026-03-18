import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import MarqueeBar from "../components/Home/MarqueeBar";
import FeaturedSection from "../components/Home/FeaturedSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import TopSellers from "../components/Home/TopSellers";
import ShopByGender from "../components/Home/ShopByGender";
import GiftableByDesign from "../components/Home/GiftableByDesign";
import ExploreByFragranceFamily from "../components/Home/ExploreByFragranceFamily";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <MarqueeBar />
      <FeaturedSection />
      <WhyChooseUs />
      <TopSellers />
      <ShopByGender />
      <GiftableByDesign />
      <ExploreByFragranceFamily />
    </>
  );
}
