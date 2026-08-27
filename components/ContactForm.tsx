"use client";

import { FormEvent, useEffect, useState } from "react";

type ContactFormProps = {
  labels: {
    /** Rendered as the form's own heading, the way the template does it —
     *  there is no separate title-area above the two-column contact area. */
    title: string;
    intro: string;
    name: string;
    company: string;
    industry: string;
    phone: string;
    problem: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
  };
  /** Id the enclosing section points at with aria-labelledby. */
  titleId: string;
  /** Built server-side from the `industries` messages so no copy ships in this
   *  client bundle. `value` is an IndustryKey; the API validates against the
   *  same list. */
  industries: { value: string; label: string }[];
};

export default function ContactForm({
  labels,
  titleId,
  industries,
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    if (status !== "success") return;

    const timeoutId = window.setTimeout(() => setStatus("idle"), 2_000);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          industry: formData.get("industry"),
          phone: formData.get("phone"),
          problem: formData.get("problem"),
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { ok?: boolean };
      if (!response.ok || !result.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* h2, not the template's h3: this is the section heading on both the
          homepage and /contact, and heading levels must not skip. `.h3` keeps
          the template's type scale, `.title` its 630px measure.

          aria-label is not redundant: main.js runs SplitText over
          .text-anime-style-3 and shreds the heading into one element per
          character, so without it the section's aria-labelledby target would
          have a character-by-character accessible name. Same reason as
          WorkflowTimeline. */}
      <h2
        className="title h3 text-anime-style-3"
        id={titleId}
        aria-label={labels.title}
      >
        {labels.title}
      </h2>
      <p className="contact-form__intro">{labels.intro}</p>
      <div className="row">
        <div className="form-group col-md-6">
          <label className="visually-hidden" htmlFor="contact-name">
            {labels.name}
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="contact-name"
            placeholder={labels.name}
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label className="visually-hidden" htmlFor="contact-company">
            {labels.company}
          </label>
          <input
            type="text"
            className="form-control"
            name="company"
            id="contact-company"
            placeholder={labels.company}
            autoComplete="organization"
            maxLength={120}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label className="visually-hidden" htmlFor="contact-phone">
            {labels.phone}
          </label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="contact-phone"
            placeholder={labels.phone}
            autoComplete="tel"
            minLength={7}
            maxLength={40}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label className="visually-hidden" htmlFor="contact-industry">
            {labels.industry}
          </label>
          {/* A bare <select> already inherits the template's input styling and
              chevron (style.css:1396, 1472). Deliberately NOT .nice-select:
              main.js:127 would replace it with a jQuery widget, which React
              would then be re-rendering around. Optional by design — "other"
              is there so nobody has to answer wrongly, and an empty value is
              accepted by the API. */}
          <select
            className="form-select"
            name="industry"
            id="contact-industry"
            defaultValue=""
          >
            <option value="">{labels.industry}</option>
            {industries.map((industry) => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-12">
          <label className="visually-hidden" htmlFor="contact-problem">
            {labels.problem}
          </label>
          <textarea
            className="form-control"
            name="problem"
            id="contact-problem"
            rows={3}
            placeholder={labels.problem}
            maxLength={1200}
            required
          />
        </div>

        {/* Spam trap: real visitors never see or fill this field. */}
        <div aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="contact-website">Website</label>
          <input
            type="text"
            name="website"
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Template layout: privacy note on the left, button on the right,
            stacking on small screens (style.css:17076). */}
        <div className="form-btn col-12">
          <p className="box-text">{labels.privacy}</p>
          <button type="submit" className="th-btn2" disabled={status === "sending"}>
            {status === "sending" ? labels.sending : labels.submit}
          </button>
        </div>
      </div>
      {status === "success" && (
        <div
          className="contact-success-popup"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="contact-success-popup__panel">
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            <p>{labels.success}</p>
          </div>
        </div>
      )}
      {status === "error" && (
        <p className="form-messages error mb-0 mt-3" role="alert">
          {labels.error}
        </p>
      )}
    </form>
  );
}
