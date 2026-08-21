import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";

/**
 * Multipage model: the homepage is a short landing — hero, the problem framing,
 * and the conversion action. Services, Approach, Industries, Work and About
 * each live on their own route, so no section appears in two places.
 */
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
        <FinalCta />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
