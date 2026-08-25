import { getTranslations } from "next-intl/server";
import WorkflowTimelineMotion from "./WorkflowTimelineMotion";

type Stage = { title: string; body: string[]; imageAlt: string };

/** Index-matched to workflow.stages. These are identifiers, not copy — they
 *  drive the DOM id and the image filename, so they must be byte-identical in
 *  every locale and therefore live here rather than in the message files. */
const STAGE_SLUGS = [
  "discovery",
  "planning",
  "development",
  "testing",
  "deployment",
  "support",
] as const;

const STAGE_IMAGES: Record<(typeof STAGE_SLUGS)[number], string> = {
  discovery: "/assets/img/approach-images/discovery.jpg",
  planning: "/assets/img/approach-images/planning.jpg",
  development: "/assets/img/approach-images/development.jpg",
  testing: "/assets/img/approach-images/testing.jpg",
  deployment: "/assets/img/approach-images/deployment.jpg",
  support: "/assets/img/approach-images/maintainance.jpg",
};

/**
 * The six delivery stages as a vertical timeline: a rail that draws itself on
 * scroll, a numbered dot per stage, and alternating text/image columns from
 * lg up (stage 1 image right, stage 2 reversed, and so on).
 *
 * Deliberately renders no <section>, no heading and no .container — both call
 * sites supply their own wrapper. WorkflowTimeline wraps it for the homepage;
 * Approach drops it straight into the container it already has.
 *
 * <ol> rather than a stack of divs: this is an ordered sequence, so screen
 * readers get "list, 6 items / item 3 of 6" for free. The visible 01-06 dots
 * duplicate that semantics and are therefore aria-hidden.
 */
export default async function WorkflowTimelineList() {
  const t = await getTranslations("workflow");
  const stages = t.raw("stages") as Stage[];

  return (
    <WorkflowTimelineMotion>
      {/* role="list" because Safari drops list semantics when list-style is
          set to none, which the CSS does. */}
      <ol className="wt-list" role="list">
        {stages.map((stage, i) => {
          const slug = STAGE_SLUGS[i];
          const image = STAGE_IMAGES[slug];
          const number = `0${i + 1}`;
          // Stage 1 keeps natural order (text left, image right). Even-indexed
          // stages flip, via grid-column on lg+ only — never a DOM reorder, so
          // reading order always matches the markup.
          const flip = i % 2 === 1;

          return (
            <li
              className={`wt-row${flip ? " wt-row--flip" : ""}`}
              id={`workflow-${slug}`}
              key={slug}
            >
              <span className="wt-dot" aria-hidden="true">
                {number}
              </span>

              <div className="wt-body">
                {/* wt-title cancels .box-title's text-transform:capitalize,
                    which would otherwise render "Этап Планирования". */}
                <h3 className="box-title wt-title">{stage.title}</h3>
                {stage.body.map((paragraph, p) => (
                  <p className="box-text wt-text" key={p}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="wt-media">
                <div className="ratio ratio-16x9 wt-media__frame">
                  <img
                    src={image}
                    alt={stage.imageAlt}
                    width={1600}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </WorkflowTimelineMotion>
  );
}
