import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageShell from "@/components/inner/PageShell";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { getServiceDetailContent } from "@/lib/service-detail-content";
import { SERVICE_DEFINITIONS, getServiceIndex } from "@/lib/services";

type ServiceItem = { name: string; duration: string };
type ServicePageParams = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return SERVICE_DEFINITIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ServicePageParams;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const serviceIndex = getServiceIndex(slug);
  if (serviceIndex < 0) return {};

  const t = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as ServiceItem[];
  return { title: items[serviceIndex].name };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: ServicePageParams;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const serviceIndex = getServiceIndex(slug);
  if (serviceIndex < 0) notFound();

  const t = await getTranslations("services");
  const navT = await getTranslations("nav");
  const items = t.raw("items") as ServiceItem[];
  const service = items[serviceIndex];
  const definition = SERVICE_DEFINITIONS[serviceIndex];
  const content = getServiceDetailContent(definition.slug, locale);

  return (
    <PageShell
      breadcrumbs={[
        { href: "/services", label: navT("services") },
        { label: service.name },
      ]}
      title={service.name}
    >
      <ServiceDetail
        content={content}
        duration={service.duration}
        title={service.name}
      />
    </PageShell>
  );
}
