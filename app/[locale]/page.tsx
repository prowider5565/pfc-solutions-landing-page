import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import BrandSlider from "@/components/sections/BrandSlider";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Technologies from "@/components/sections/Technologies";
import Testimonials from "@/components/sections/Testimonials";
import WorkflowTimeline from "@/components/sections/WorkflowTimeline";

/**
 * Multipage model: the homepage combines the core landing narrative with the
 * restored template proof, technology, testimonial, and FAQ sections. Services,
 * Industries, Work and About each continue to live on their own route.
 *
 * The workflow timeline is the one shared section: it appears here and on
 * /approach, but from a single component (WorkflowTimelineList) reading a
 * single `workflow` namespace, so the pipeline is described in exactly one
 * place in the codebase.
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
        <BrandSlider />
        <Problem />
        <WorkflowTimeline />
        <Technologies />
        <Testimonials />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
