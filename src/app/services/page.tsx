import Link from "next/link";
import { disciplines } from "@/lib/services";
import { pageMetadata } from "@/lib/site";
import { Arrow, ClosingCTA, Eyebrow, TextLink } from "@/components/ui";

export const metadata = pageMetadata(
  "Cybersecurity services",
  "Explore Vigilix’s 15 services across penetration testing, governance and risk, and security technology deployment.",
  "/services",
);
export default function Services() {
  return (
    <>
      <section className="page-hero container">
        <Eyebrow>Our capabilities</Eyebrow>
        <h1>
          A stronger posture.
          <br />
          From every angle.
        </h1>
        <p>
          Understand your exposure. Establish effective governance. Put the
          right security technology to work.
        </p>
        <div className="category-jumps">
          {disciplines.map((d) => (
            <a href={`#${d.id}`} key={d.id} className={d.tone}>
              <i />
              {d.short}
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
      </section>
      <section className="container services-overview">
        {disciplines.map((d) => (
          <article key={d.id} id={d.id} className={`overview-row ${d.tone}`}>
            <div>
              <Eyebrow>{d.label}</Eyebrow>
              <h2>{d.name}</h2>
              <p>{d.description}</p>
              <TextLink href={`/services/${d.id}`}>Explore {d.short}</TextLink>
            </div>
            <div className="overview-list">
              {d.services.map((s) => (
                <Link key={s.id} href={`/services/${d.id}#${s.id}`}>
                  <span>{s.name}</span>
                  <Arrow diagonal />
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
      <ClosingCTA />
    </>
  );
}
