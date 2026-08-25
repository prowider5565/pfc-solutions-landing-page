import { getTranslations } from "next-intl/server";
import WorkflowTimelineList from "./WorkflowTimelineList";

/**
 * Homepage wrapper for the workflow timeline — CLAUDE.md §4.5 Block D, expanded
 * from a six-word grid into the full six-stage narrative.
 *
 * Reuses approach.title: this is the same "how we operate" story the /approach
 * page tells, so it carries the same heading. On /approach this wrapper is NOT
 * used — Approach.tsx renders WorkflowTimelineList directly, because that page's
 * own h2 already reads "Qanday ishlaymiz" and a second copy would duplicate it.
 */
export default async function WorkflowTimeline() {
  const t = await getTranslations("approach");

  return (
    <section
      className="workflow-area space overflow-hidden"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              {/* aria-label is not redundant here: main.js runs SplitText 3.6.1
                  over .text-anime-style-3, shredding the heading into one
                  element per character. That version predates SplitText's own
                  aria handling, so without this the aria-labelledby target
                  would have a character-by-character accessible name. */}
              <h2
                id="workflow-title"
                className="sec-title h3 text-anime-style-3"
                aria-label={t("title")}
              >
                {t("title")}
              </h2>
            </div>
          </div>
        </div>
        <WorkflowTimelineList />
      </div>
    </section>
  );
}
