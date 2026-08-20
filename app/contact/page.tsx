import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapArea from "@/components/contact/MapArea";
import Breadcrumb from "@/components/inner/Breadcrumb";
import FooterLayout1 from "@/components/inner/FooterLayout1";
import HeaderLayout1 from "@/components/inner/HeaderLayout1";
import Sidemenu from "@/components/inner/Sidemenu";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";

export const metadata: Metadata = {
  title: "Aior - AI & SaaS - Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <Preloader />
      <Sidemenu />
      <MobileMenu />
      <HeaderLayout1 />
      <Breadcrumb title="Contact Us" />
      <ContactInfo />
      <ContactForm />
      <MapArea />
      <FooterLayout1 />
      <ScrollTop />
    </>
  );
}
