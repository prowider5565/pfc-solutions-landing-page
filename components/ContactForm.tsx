"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  labels: {
    name: string;
    company: string;
    phone: string;
    problem: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
    botInstruction: string;
  };
};

export default function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

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
          phone: formData.get("phone"),
          problem: formData.get("problem"),
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { botUrl?: string };
      if (!response.ok || !result.botUrl) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setStatus("success");
      window.setTimeout(() => window.location.assign(result.botUrl!), 600);
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
          <p className="box-text mt-20 mb-0">{labels.botInstruction}</p>
          <p className="box-text mt-2 mb-0">{labels.privacy}</p>
        </div>
      </div>
      <p
        className={`form-messages mb-0 mt-3 ${status === "success" ? "success" : ""} ${status === "error" ? "error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status === "success" && labels.success}
        {status === "error" && labels.error}
      </p>
    </form>
  );
}
