import { setRequestLocale } from "next-intl/server";
import AboutStory from "@/components/about/AboutStory";
import AboutTestimonial from "@/components/about/AboutTestimonial";
import Award from "@/components/about/Award";
import Choose from "@/components/about/Choose";
import Gallery from "@/components/about/Gallery";
import History from "@/components/about/History";
import Team from "@/components/about/Team";
import Breadcrumb from "@/components/inner/Breadcrumb";
import FooterLayout1 from "@/components/inner/FooterLayout1";
import HeaderLayout1 from "@/components/inner/HeaderLayout1";
import Sidemenu from "@/components/inner/Sidemenu";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Preloader />
      <Sidemenu />
      <MobileMenu />
      <HeaderLayout1 />
      <Breadcrumb title="About Us" />
      <AboutStory />
      <History />
      <Award />
      <Choose />
      <Team />
      <AboutTestimonial />
      <Gallery />
      <FooterLayout1 />
      <ScrollTop />
    </>
  );
}
