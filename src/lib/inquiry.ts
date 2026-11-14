import { z } from "zod";

export const interests = [
  "VAPT",
  "GRC",
  "Security Solutions",
  "General Inquiry",
] as const;
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Use 100 characters or fewer.")
    .refine((v) => !/[\r\n]/.test(v), "Enter your name on one line."),
  email: z
    .email("Enter a valid business email.")
    .trim()
    .max(254, "Use a shorter email address."),
  organization: z
    .string()
    .trim()
    .min(2, "Enter your organization.")
    .max(160, "Use 160 characters or fewer."),
  service: z.enum(interests, { error: "Select a service of interest." }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(4000, "Keep your message under 4,000 characters."),
  website: z.string().max(0, "This submission could not be accepted."),
  startedAt: z.coerce.number().finite().positive(),
  submissionId: z.uuid(),
});
export type Inquiry = z.infer<typeof inquirySchema>;
export type FormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Record<string, string>;
};
export function fieldErrors(error: z.ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues.map((i) => [String(i.path[0]), i.message]),
  );
}
export function emailContent(data: Inquiry) {
  return `New Vigilix website inquiry\n\nName: ${data.name}\nBusiness email: ${data.email}\nOrganization: ${data.organization}\nService: ${data.service}\n\nMessage:\n${data.message}`;
}
