import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WorkflowTimeline from "@/components/sections/WorkflowTimeline";

/**
 * Multipage model: the homepage is a short landing — hero, the problem framing,
 * how we deliver, and the conversion action. Services, Industries, Work and
 * About each live on their own route.
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
        <Problem />
        <WorkflowTimeline />
        <FinalCta />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
