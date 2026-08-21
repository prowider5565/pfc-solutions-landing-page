import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageShell from "@/components/inner/PageShell";
import Industries from "@/components/sections/Industries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("industries") };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <PageShell title={t("industries")}>
      <Industries />
    </PageShell>
  );
}
