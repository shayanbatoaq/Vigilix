"use server";

import { createHash } from "node:crypto";

import {
  inquirySchema,
  fieldErrors,
  emailContent,
  type FormState,
} from "@/lib/inquiry";
import { allowInquiry, isInquiryConfigured } from "@/lib/rate-limit";

export async function submitInquiry(formData: FormData): Promise<FormState> {
  const parsed = inquirySchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsed.success)
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      errors: fieldErrors(parsed.error),
    };
  const data = parsed.data;
  const elapsed = Date.now() - data.startedAt;
  if (elapsed < 2000 || elapsed > 86400000)
    return {
      status: "error",
      message:
        "Please take a moment to review your inquiry. If this page has been open for a day, reload it before trying again.",
    };
  if (!isInquiryConfigured())
    return {
      status: "error",
      message:
        "Online inquiries are temporarily unavailable. Your message has not been sent. Please try again later.",
    };
  try {
    if (!(await allowInquiry(data.email)))
      return {
        status: "error",
        message:
          "Too many inquiries have been submitted recently. Your message has not been sent. Please try again in 10 minutes.",
      };
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `vigilix-${data.submissionId}-${createHash("sha256").update(emailContent(data)).digest("hex").slice(0, 16)}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: data.email,
        subject: `Website inquiry: ${data.service}`,
        text: emailContent(data),
      }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!response.ok)
      return {
        status: "error",
        message:
          "The email service could not accept your inquiry. Your message has not been confirmed. Please try again later.",
      };
    const receipt = await response.json();
    if (!receipt.id)
      return {
        status: "error",
        message: "Delivery could not be confirmed. Please try again later.",
      };
    return {
      status: "success",
      message:
        "Thank you. Your inquiry has been accepted for delivery to Vigilix. Keep an eye on your business email for a response.",
    };
  } catch {
    return {
      status: "error",
      message:
        "We could not confirm delivery. Please try again later; your form details have been kept here.",
    };
  }
}
