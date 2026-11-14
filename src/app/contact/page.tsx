import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
import { interests } from "@/lib/inquiry";
import { isInquiryConfigured } from "@/lib/rate-limit";
export const metadata = pageMetadata(
  "Contact",
  "Discuss your organization’s security testing, governance, or technology deployment requirements with Vigilix.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = interests.find((i) => i === service) || "";
  return (
    <section className="contact-page"><div className="container contact-layout">
      <div className="contact-copy">
        <Eyebrow>Start a conversation</Eyebrow>
        <h1>
          Let’s talk
          <br />
          security.
        </h1>
        <p>
          Tell us what you’re working on, where you need clarity, and what you’d
          like to strengthen.
        </p>
        <div className="contact-aside">
          <h2>A useful place to start</h2>
          <p>A little context helps shape a more useful conversation.</p>
          <ul>
            <li>Your current security priorities</li>
            <li>The systems or teams involved</li>
            <li>Your expected scope and timing</li>
          </ul>
          <p>
            We’ll use your inquiry to discuss the requirements and next steps.
            No fixed scope or delivery commitment is implied.
          </p>
        </div>
      </div>
      <ContactForm
        initialService={initialService}
        available={isInquiryConfigured()}
      />
    </div></section>
  );
}
