"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitInquiry } from "@/app/contact/actions";
import {
  interests,
  inquirySchema,
  fieldErrors,
  type FormState,
} from "@/lib/inquiry";
import { Arrow } from "./ui";

const labels: Record<string, string> = {
  name: "Full name",
  email: "Business email",
  organization: "Organization",
  service: "Service of interest",
  message: "Message",
};
export function ContactForm({
  initialService,
  available,
}: {
  initialService: string;
  available: boolean;
}) {
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const [pending, setPending] = useState(false);
  const startedAt = useRef(0);
  const summary = useRef<HTMLDivElement>(null);
  const submissionId = useRef("");
  useEffect(() => {
    startedAt.current = Date.now();
    submissionId.current = crypto.randomUUID();
  }, []);
  useEffect(() => {
    if (state.status !== "idle") summary.current?.focus();
  }, [state]);
  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const data = new FormData(e.currentTarget);
    data.set("startedAt", String(startedAt.current));
    data.set("submissionId", submissionId.current);
    const parsed = inquirySchema.safeParse(Object.fromEntries(data));
    if (!parsed.success) {
      setState({
        status: "error",
        message: "Review the highlighted fields and try again.",
        errors: fieldErrors(parsed.error),
      });
      return;
    }
    setPending(true);
    try {
      setState(await submitInquiry(data));
    } catch {
      setState({
        status: "error",
        message:
          "The connection was interrupted. Your details are still here. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }
  const error = (name: string) => state.errors?.[name];
  return (
    <form
      className="contact-form"
      onSubmit={onSubmit}
      noValidate
      aria-label="Security inquiry"
      aria-busy={pending}
    >
      {!available && state.status === "idle" && (
        <div className="form-status">
          Online inquiries are temporarily unavailable. You can prepare your
          inquiry below, but it cannot be sent yet.
        </div>
      )}
      {state.message && (
        <div
          ref={summary}
          tabIndex={-1}
          role={state.status === "error" ? "alert" : "status"}
          className={`form-status ${state.status}`}
        >
          <p>{state.message}</p>
          {state.errors && (
            <ul>
              {Object.entries(state.errors)
                .filter(([key]) => labels[key])
                .map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      onClick={() => document.getElementById(key)?.focus()}
                    >
                      {labels[key]}: {value}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
      {state.status !== "success" && (
        <>
          <div className="form-grid">
            {(["name", "email", "organization"] as const).map((name) => (
              <div
                className={`field ${name === "organization" ? "full" : ""}`}
                key={name}
              >
                <label htmlFor={name}>
                  {labels[name]} <span aria-hidden="true">*</span>
                </label>
                <input
                  id={name}
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  autoComplete={
                    name === "name"
                      ? "name"
                      : name === "email"
                        ? "email"
                        : "organization"
                  }
                  required
                  maxLength={
                    name === "email" ? 254 : name === "name" ? 100 : 160
                  }
                  aria-invalid={Boolean(error(name))}
                  aria-describedby={error(name) ? `${name}-error` : undefined}
                />
                {error(name) && (
                  <p className="field-error" id={`${name}-error`}>
                    {error(name)}
                  </p>
                )}
              </div>
            ))}
            <div className="field full">
              <label htmlFor="service">
                Service of interest <span aria-hidden="true">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue={initialService}
                aria-invalid={Boolean(error("service"))}
                aria-describedby={
                  error("service") ? "service-error" : undefined
                }
              >
                <option value="">Select a service</option>
                {interests.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {error("service") && (
                <p className="field-error" id="service-error">
                  {error("service")}
                </p>
              )}
            </div>
            <div className="field full">
              <label htmlFor="message">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                maxLength={4000}
                placeholder="What are you looking to assess, improve, or deploy?"
                aria-invalid={Boolean(error("message"))}
                aria-describedby={`message-hint${error("message") ? " message-error" : ""}`}
              />
              <p id="message-hint" className="field-helper">
                Please don’t include passwords, sensitive system details, or
                confidential data. 4,000 characters maximum.
              </p>
              {error("message") && (
                <p className="field-error" id="message-error">
                  {error("message")}
                </p>
              )}
            </div>
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <p className="form-note">
            All fields are required. We use your details to respond to your
            inquiry. Read our <Link href="/privacy">privacy policy</Link>.
          </p>
          <button
            className="button button-primary"
            type="submit"
            disabled={pending}
          >
            {pending ? "Sending inquiry…" : "Send inquiry"}
            <Arrow />
          </button>
          <noscript>
            <p className="form-note">
              JavaScript is required to submit this form. Enable it and reload
              this page.
            </p>
          </noscript>
        </>
      )}
    </form>
  );
}
