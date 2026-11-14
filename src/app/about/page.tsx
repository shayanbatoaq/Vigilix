import { Eyebrow, Photo, ClosingCTA, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About Vigilix",
  "Vigilix brings security testing, governance, and enterprise technology deployment together to support informed security decisions.",
  "/about",
);
export default function About() {
  return (
    <>
      <section className="page-hero container about-hero">
        <Eyebrow>About Vigilix</Eyebrow>
        <h1>
          Security Built on
          <br />
          Understanding.
        </h1>
        <p>
          Technical precision. Business context.
          <br />A connected view of cybersecurity.
        </p>
      </section>
      <div className="container about-stats" aria-label="Vigilix service portfolio">
        <div><strong>03</strong><span>core disciplines</span></div>
        <div><strong>15</strong><span>defined services</span></div>
        <div><strong><span>O</span><i aria-hidden="true"> ↔ </i><b>D</b></strong><span>offensive and defensive capabilities</span></div>
      </div>
      <div className="container">
        <Photo
          src="/images/infrastructure.webp"
          alt="Interconnected infrastructure in a data center"
          className="about-photo"
          priority
        />
        <div className="photo-caption">
          <span>
            The systems are connected. Your security thinking should be, too.
          </span>
          <span>Infrastructure / perspective</span>
        </div>
      </div>
      <section className="section container intro-grid">
        <Eyebrow>Who we are</Eyebrow>
        <div>
          <h2>
            Understanding risk <br />
            is where progress begins.
          </h2>
          <div className="intro-copy">
            <p>
              Vigilix is a cybersecurity company providing vulnerability
              assessment and penetration testing, governance and risk
              consulting, and enterprise security solutions.
            </p>
            <p>
              We bring these disciplines into one conversation: what needs
              protecting, where the weaknesses are, and what meaningful
              improvement could look like.
            </p>
          </div>
          <TextLink href="/services">Explore our capabilities</TextLink>
        </div>
      </section>
      <section className="section philosophy">
        <div className="container">
          <Eyebrow>Our perspective</Eyebrow>
          <h2>Clarity is a security capability.</h2>
          <div className="principles">
            <article>
              <h3>Precision over noise.</h3>
              <p>
                Security information becomes useful when it is specific,
                understandable, and connected to the environment it describes.
              </p>
            </article>
            <article>
              <h3>Context before conclusions.</h3>
              <p>
                A technical weakness, a policy decision, and a deployment choice
                each need to be considered in their business context.
              </p>
            </article>
            <article>
              <h3>Progress with purpose.</h3>
              <p>
                The objective is a more informed path forward: clearer
                priorities, better governance, and more effective use of
                security technology.
              </p>
            </article>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
