import { approach } from "@/lib/services";
import { pageMetadata } from "@/lib/site";
import { ClosingCTA, Eyebrow, TextLink } from "@/components/ui";
export const metadata = pageMetadata(
  "Our approach",
  "A context-led perspective on cybersecurity: understand the environment, assess the need, recommend priorities, and strengthen security.",
  "/approach",
);
export default function Approach() {
  return (
    <>
      <section className="page-hero container">
        <Eyebrow>Our approach</Eyebrow>
        <h1>
          Start with context.
          <br />
          Move with purpose.
        </h1>
        <p>
          Effective security work starts with the right questions. The business,
          the environment, and the priorities should shape the engagement.
        </p>
      </section>
      <section className="container approach-editorial">
        {approach.map((s, i) => (
          <article key={s.title}>
            <span className="editorial-number">0{i + 1}</span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </div>
            <p>
              {
                [
                  "Which systems and information matter most? What is changing? Where is uncertainty affecting decisions? Establishing context gives the work a useful direction.",
                  "The right assessment depends on the question. It may concern technical exposure, security responsibilities, or the configuration and integration of a technology environment.",
                  "Useful recommendations connect security observations with business priorities. Clear language and a practical sequence help teams decide what deserves attention.",
                  "Improvement can take different forms: addressing weaknesses, clarifying ownership, or implementing security controls. The appropriate next step follows from the agreed objectives.",
                ][i]
              }
            </p>
          </article>
        ))}
      </section>
      <section className="section container scope-note">
        <Eyebrow>Shaped around your organization</Eyebrow>
        <h2>
          A framework for the conversation.
          <br />A scope built for the engagement.
        </h2>
        <p>
          These principles explain how we think about security. They are not a
          fixed delivery process. Activities, timing, deliverables, and
          responsibilities are defined and agreed for each engagement.
        </p>
        <TextLink href="/contact">Tell us what you’re working on</TextLink>
      </section>
      <ClosingCTA />
    </>
  );
}
