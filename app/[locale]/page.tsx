import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import Approach from "@/components/sections/Approach";
import Differentiators from "@/components/sections/Differentiators";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Fit from "@/components/sections/Fit";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";

/** Section order follows CLAUDE.md §4 exactly: 4.2 → 4.12. */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Preloader />
      <MobileMenu />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Differentiators />
        <Approach />
        <Services />
        <Industries />
        <Work />
        <Fit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
