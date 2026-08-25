export const SERVICE_DEFINITIONS = [
  { slug: "internal-management-systems", image: "internal-management-systems.jpg" },
  { slug: "process-automation", image: "process-automation.jpg" },
  { slug: "ai-solutions-and-agents", image: "ai-solutions-and-agents.jpg" },
  { slug: "integration-and-data", image: "integration-and-data.jpg" },
  { slug: "websites-and-web-solutions", image: "websites-and-web-solutions.jpg" },
  { slug: "support-and-development", image: "support-and-development.jpg" },
] as const;

export type ServiceSlug = (typeof SERVICE_DEFINITIONS)[number]["slug"];

export function getServiceIndex(slug: string): number {
  return SERVICE_DEFINITIONS.findIndex((service) => service.slug === slug);
}
