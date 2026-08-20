const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2sAngfuztheme!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd";

// The marquee repeats one line eight times; two of the eight use a variant
// spelling in the source, so the pattern is kept exactly (contact.html:580-587).
const MARQUEE_BASE = "Empowering Every Industry By Trusworthy AIu";
const MARQUEE_ALT = "Empowering Every Industry By Trusworthy AIus";
const MARQUEE_ITEMS = [
  MARQUEE_BASE,
  MARQUEE_ALT,
  MARQUEE_BASE,
  MARQUEE_BASE,
  MARQUEE_BASE,
  MARQUEE_ALT,
  MARQUEE_BASE,
  MARQUEE_BASE,
];

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="marquee-group style6"
      {...(ariaHidden ? { "aria-hidden": "true" as const } : {})}
    >
      {MARQUEE_ITEMS.map((text, i) => (
        // Alternating trailing space on the class is preserved from the source.
        <div className={i % 2 === 0 ? "item " : "item"} key={i}>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

/** Source: contact.html:568-602 — map embed plus the scrolling text band. */
export default function MapArea() {
  return (
    <>
      <div className="overflow-hidden">
        <div className="contact-map">
          <iframe src={MAP_SRC} allowFullScreen={true} loading="lazy"></iframe>
          <div className="contact-icon">
            <img src="/assets/img/icon/location-dot.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="position-relative space  overflow-hidden">
        <div className="marquee-content positive-relative overflow-hidden">
          <div className="marquee">
            <MarqueeGroup />
            <MarqueeGroup ariaHidden />
          </div>
        </div>
      </div>
    </>
  );
}
