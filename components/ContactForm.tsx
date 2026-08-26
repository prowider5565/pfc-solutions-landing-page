"use client";

import { FormEvent, useEffect, useState } from "react";

type ContactFormProps = {
  labels: {
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
  /** Built server-side from the `industries` messages so no copy ships in this
   *  client bundle. `value` is an IndustryKey; the API validates against the
   *  same list. */
  industries: { value: string; label: string }[];
};

export default function ContactForm({ labels, industries }: ContactFormProps) {
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
        {/* Full width, not col-md-6: five fields in a two-up grid would leave
            the last one stranded beside a gap, and this is the one field whose
            answer is a sentence. */}
        <div className="form-group col-12">
          <label className="visually-hidden" htmlFor="contact-problem">
            {labels.problem}
          </label>
          <input
            type="text"
            className="form-control"
            name="problem"
            id="contact-problem"
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

        <div className="form-btn col-12 text-center">
          <button type="submit" className="th-btn2" disabled={status === "sending"}>
            {status === "sending" ? labels.sending : labels.submit}
          </button>
          <p className="box-text mt-2 mb-0">{labels.privacy}</p>
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
