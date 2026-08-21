import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageShell from "@/components/inner/PageShell";
import Services from "@/components/sections/Services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("services") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <PageShell title={t("services")}>
      <Services />
    </PageShell>
  );
}
