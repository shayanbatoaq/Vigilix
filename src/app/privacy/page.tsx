import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Eyebrow } from "@/components/ui";
export const metadata = pageMetadata(
  "Website privacy",
  "How the Vigilix website handles inquiry information and technical data.",
  "/privacy",
);
export default function Privacy() {
  return (
    <div className="container privacy-page">
      <section className="page-hero">
        <Eyebrow>Website information</Eyebrow>
        <h1>Privacy policy.</h1>
        <p>
          This notice describes the information handled by this website and its
          inquiry form.
        </p>
      </section>
      <section>
        <h2>Information you provide</h2>
        <p>
          The inquiry form asks for your name, business email, organization,
          service of interest, and message. This information is used to
          understand and respond to your inquiry. Do not submit passwords,
          confidential system information, or other sensitive material.
        </p>
      </section>
      <section>
        <h2>How inquiries are handled</h2>
        <p>
          When online inquiries are available, form information is sent through
          an email delivery provider to the configured Vigilix inbox. The
          website does not maintain a separate database of inquiry messages.
          Copies may remain in the receiving mailbox and the email provider’s
          systems.
        </p>
        <p>
          If the service cannot confirm acceptance, the form displays an error.
          Information entered in the form remains in the current browser page so
          you can retry; it is not saved to browser storage by this application.
        </p>
      </section>
      <section>
        <h2>Technical and abuse-prevention data</h2>
        <p>
          The website uses temporary submission counters to limit abuse. Email
          addresses are converted to keyed hashes for these counters rather than
          stored in plain text. Counters expire within one hour. The hosting and
          email services may also process technical request and delivery
          information to operate their services.
        </p>
      </section>
      <section>
        <h2>Cookies and analytics</h2>
        <p>
          This website application does not set advertising cookies or load
          third-party analytics. Fonts and website images are served from the
          website itself. Infrastructure providers may handle technical
          information needed to serve requests.
        </p>
      </section>
      <section>
        <h2>Your questions</h2>
        <p>
          Use the{" "}
          <Link href="/contact?service=General%20Inquiry">contact page</Link> to
          ask about information you have submitted or request its correction or
          deletion. Include enough context to identify the inquiry, without
          adding sensitive information.
        </p>
      </section>
    </div>
  );
}
