import type { ReactNode } from "react";
import MobileMenu from "@/components/MobileMenu";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import Breadcrumb, {
  type BreadcrumbItem,
} from "@/components/inner/Breadcrumb";
import HeaderLayout1 from "@/components/inner/HeaderLayout1";
import Footer from "@/components/sections/Footer";

/**
 * Chrome shared by every inner page in the multipage model: the template's
 * header-layout1, the breadcrumb banner, and the PFC footer.
 *
 * The Aior demo Sidemenu is deliberately not included — its content (recent
 * blog posts, agency blurb) has no PFC equivalent, so the side-menu toggle was
 * removed from HeaderLayout1 rather than left opening an empty drawer.
 */
export default function PageShell({
  breadcrumbs,
  title,
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Preloader />
      <MobileMenu />
      <HeaderLayout1 />
      <Breadcrumb items={breadcrumbs} title={title} />
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </>
  );
}
