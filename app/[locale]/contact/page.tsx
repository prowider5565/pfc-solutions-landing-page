import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageShell from "@/components/inner/PageShell";
import ContactInfoCards from "@/components/sections/ContactInfoCards";
import FinalCta from "@/components/sections/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("cta") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <PageShell title={t("cta")}>
      {/* Template order on contact.html: breadcrumb → contact info cards →
          contact form → map. The map ships inside FinalCta. */}
      <ContactInfoCards />
      <FinalCta />
    </PageShell>
  );
}
