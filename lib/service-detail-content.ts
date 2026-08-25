import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ServiceSlug } from "@/lib/services";

export type ServiceDetailLocale = "uz" | "ru" | "en";

export type ServiceDetailBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "feature"; label: string; text: string }
  | { kind: "callout"; text: string };

export type ServiceDetailSection = {
  heading: string | null;
  blocks: ServiceDetailBlock[];
};

export type ServiceDetailContent = {
  contentsLabel: string;
  overviewLabel: string;
  sections: ServiceDetailSection[];
};

type SourceService = {
  marker: string;
  slug: ServiceSlug;
  skippedLines?: Partial<Record<ServiceDetailLocale, string[]>>;
};

const SOURCE_FILE = "texts to place in services pages.txt";

const SOURCE_SERVICES: SourceService[] = [
  { marker: "Internal digital system", slug: "internal-management-systems" },
  {
    marker: "Avtomatlashtirish servisi",
    slug: "process-automation",
    skippedLines: { uz: ["Tizimlarni avtomatlashtirish"] },
  },
  { marker: "Integratsiya va ma’lumot", slug: "integration-and-data" },
  { marker: "AI yechimlari va agentlar", slug: "ai-solutions-and-agents" },
  { marker: "Sayt va veb yechimlar", slug: "websites-and-web-solutions" },
  {
    marker: "Qo‘llab-quvvatlash va rivojlantirish",
    slug: "support-and-development",
  },
];

const LOCALE_MARKERS: Record<ServiceDetailLocale, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

const UI_LABELS: Record<
  ServiceDetailLocale,
  Pick<ServiceDetailContent, "contentsLabel" | "overviewLabel">
> = {
  uz: { contentsLabel: "Mundarija", overviewLabel: "Umumiy ma’lumot" },
  ru: { contentsLabel: "Содержание", overviewLabel: "Об услуге" },
  en: { contentsLabel: "Contents", overviewLabel: "Service overview" },
};

const FEATURE_LABELS = new Set([
  "Process Mapping",
  "Automation Logic",
  "System Integration",
  "Human-in-the-Loop",
  "Monitoring & Reliability",
  "API Integration",
  "Data Synchronization",
  "Event-Based Communication",
  "Data Transformation",
  "Reliability",
  "AI Assistants",
  "AI Agents",
  "Document Intelligence",
  "Intelligent Search",
  "AI-powered Workflows",
  "User Experience",
  "Performance",
  "Responsive Architecture",
  "Security",
  "Scalability",
  "Bug Fixing",
  "Monitoring",
  "Performance Optimization",
  "Security & Maintenance",
  "Continuous Development",
]);

let parsedSource:
  | Record<ServiceSlug, Record<ServiceDetailLocale, ServiceDetailSection[]>>
  | undefined;

function isHeading(line: string): boolean {
  if (line.length > 80 || line.includes(":") || line.includes("→")) {
    return false;
  }

  if (/[“”"«»]/.test(line) || /[.!…]$/.test(line)) {
    return false;
  }

  return true;
}

function toBlock(line: string): ServiceDetailBlock {
  const colonIndex = line.indexOf(":");
  if (colonIndex > 0) {
    const label = line.slice(0, colonIndex).trim();
    if (FEATURE_LABELS.has(label)) {
      return {
        kind: "feature",
        label,
        text: line.slice(colonIndex + 1).trim(),
      };
    }
  }

  if (line.includes("→") || /^[“"«].*[”"»]$/.test(line)) {
    return { kind: "callout", text: line };
  }

  return { kind: "paragraph", text: line };
}

function toSections(lines: string[]): ServiceDetailSection[] {
  const sections: ServiceDetailSection[] = [];
  let current: ServiceDetailSection = { heading: null, blocks: [] };

  for (const line of lines) {
    if (isHeading(line)) {
      if (current.heading !== null || current.blocks.length > 0) {
        sections.push(current);
      }
      current = { heading: line, blocks: [] };
      continue;
    }

    current.blocks.push(toBlock(line));
  }

  if (current.heading !== null || current.blocks.length > 0) {
    sections.push(current);
  }

  return sections.filter((section) => section.blocks.length > 0);
}

function getLocaleLines(
  service: SourceService,
  sourceLines: string[],
  locale: ServiceDetailLocale,
): string[] {
  const localePositions = Object.entries(LOCALE_MARKERS).map(
    ([language, marker]) => ({
      language: language as ServiceDetailLocale,
      position: sourceLines.indexOf(marker),
    }),
  );
  const ownMarker = localePositions.find(({ language }) => language === locale);

  // The automation section begins directly in Uzbek and has no O‘zbekcha label.
  const start =
    ownMarker && ownMarker.position >= 0
      ? ownMarker.position + 1
      : locale === "uz"
        ? 0
        : -1;

  if (start < 0) return [];

  const end = localePositions.reduce((nearest, entry) => {
    if (entry.position > start && entry.position < nearest) {
      return entry.position;
    }
    return nearest;
  }, sourceLines.length);

  const skippedLines = new Set(service.skippedLines?.[locale] ?? []);

  return sourceLines
    .slice(start, end)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !skippedLines.has(line));
}

function parseSource() {
  const filePath = join(process.cwd(), SOURCE_FILE);
  const sourceLines = readFileSync(filePath, "utf8")
    .replace(/\r\n/g, "\n")
    .split("\n");

  const parsed = {} as Record<
    ServiceSlug,
    Record<ServiceDetailLocale, ServiceDetailSection[]>
  >;

  SOURCE_SERVICES.forEach((service, serviceIndex) => {
    const start = sourceLines.indexOf(service.marker);
    const nextMarker = SOURCE_SERVICES[serviceIndex + 1]?.marker;
    const end = nextMarker ? sourceLines.indexOf(nextMarker) : sourceLines.length;

    if (start < 0 || end < 0) {
      throw new Error(`Unable to find service copy for ${service.slug}`);
    }

    const serviceLines = sourceLines.slice(start + 1, end);
    parsed[service.slug] = {
      uz: toSections(getLocaleLines(service, serviceLines, "uz")),
      ru: toSections(getLocaleLines(service, serviceLines, "ru")),
      en: toSections(getLocaleLines(service, serviceLines, "en")),
    };
  });

  return parsed;
}

export function getServiceDetailContent(
  slug: ServiceSlug,
  locale: string,
): ServiceDetailContent {
  parsedSource ??= parseSource();
  const normalizedLocale: ServiceDetailLocale =
    locale === "ru" || locale === "en" ? locale : "uz";

  return {
    ...UI_LABELS[normalizedLocale],
    sections: parsedSource[slug][normalizedLocale],
  };
}
