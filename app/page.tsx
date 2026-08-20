import BrandSlider from "@/components/BrandSlider";
import CtaOne from "@/components/CtaOne";
import CtaTwo from "@/components/CtaTwo";
import Faq from "@/components/Faq";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileMenu from "@/components/MobileMenu";
import PopupSearch from "@/components/PopupSearch";
import Preloader from "@/components/Preloader";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import ScrollTop from "@/components/ScrollTop";
import Service from "@/components/Service";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Preloader />
      <PopupSearch />
      <MobileMenu />
      <Header />
      <Hero />
      <BrandSlider />
      <Feature />
      <Process />
      <CtaOne />
      <CtaTwo />
      <Service />
      <Testimonial />
      <Pricing />
      <Faq />
      <Footer />
      <ScrollTop />
    </>
  );
}
