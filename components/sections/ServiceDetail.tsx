import type {
  ServiceDetailBlock,
  ServiceDetailContent,
} from "@/lib/service-detail-content";

type ServiceDetailProps = {
  content: ServiceDetailContent;
  duration: string;
  title: string;
};

function formatInlineText(text: string) {
  return text
    .split(/([“«][^”»]+[”»]|"[^"]+")/g)
    .filter(Boolean)
    .map((part, index) =>
      /^[“«"]/.test(part) ? <em key={`${part}-${index}`}>{part}</em> : part,
    );
}

function DetailBlock({ block, lead }: { block: ServiceDetailBlock; lead: boolean }) {
  if (block.kind === "feature") {
    return (
      <div className="service-detail__feature">
        <strong>{block.label}</strong>
        <p>{formatInlineText(block.text)}</p>
      </div>
    );
  }

  if (block.kind === "callout") {
    return (
      <blockquote className="service-detail__callout">
        <p>{formatInlineText(block.text)}</p>
      </blockquote>
    );
  }

  return (
    <p className={`blog-desc${lead ? " service-detail__lead" : ""}`}>
      {formatInlineText(block.text)}
    </p>
  );
}

export default function ServiceDetail({
  content,
  duration,
  title,
}: ServiceDetailProps) {
  return (
    <section className="th-case-wrapper case-details service-detail overflow-hidden space">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="blog-wrapp service-detail__header mb-60">
              <div className="blog-content">
                <div className="blog-meta mb-20">
                  <span>PFC Solutions</span>
                  <span>{duration}</span>
                </div>
                <h2 className="case-text h3 mb-0">{title}</h2>
              </div>
            </div>

          </div>
        </div>

        <div className="row gx-40">
          <div className="col-lg-4">
            <aside className="sidebar-area style2 service-detail__sidebar">
              <div className="widget widget_info">
                <h3 className="widget_title">{content.contentsLabel}:</h3>
                <nav className="info-list" aria-label={content.contentsLabel}>
                  <ul>
                    {content.sections.map((section, index) => (
                      <li key={`${section.heading ?? "overview"}-${index}`}>
                        <a href={`#service-section-${index}`}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          {section.heading ?? content.overviewLabel}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>

          <div className="col-lg-8">
            <div className="th-blog blog-single service-detail__content mb-0">
              <div className="blog-content">
                {content.sections.map((section, sectionIndex) => (
                  <section
                    className="service-detail__section"
                    id={`service-section-${sectionIndex}`}
                    key={`${section.heading ?? "overview"}-${sectionIndex}`}
                  >
                    {section.heading && (
                      <h3 className="blog-title h4">{section.heading}</h3>
                    )}

                    <div className="service-detail__blocks">
                      {section.blocks.map((block, blockIndex) => (
                        <DetailBlock
                          block={block}
                          lead={sectionIndex === 0 && blockIndex === 0}
                          key={
                            block.kind === "feature"
                              ? `${block.label}-${blockIndex}`
                              : `${block.text.slice(0, 48)}-${blockIndex}`
                          }
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
