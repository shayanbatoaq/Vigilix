import { notFound } from "next/navigation";
import Link from "next/link";
import { disciplines } from "@/lib/services";
import { pageMetadata } from "@/lib/site";
import { ServiceDetails } from "@/components/service-details";
import { Button, ClosingCTA, Eyebrow, Arrow } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return disciplines.map((d) => ({ category: d.id }));
}
type Props = { params: Promise<{ category: string }> };
export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const d = disciplines.find((d) => d.id === category);
  return d ? pageMetadata(d.name, d.description, `/services/${category}`) : {};
}
export default async function Category({ params }: Props) {
  const { category } = await params;
  const d = disciplines.find((d) => d.id === category);
  if (!d) notFound();
  return (
    <div className={`category-page ${d.tone}`}>
      <section className="category-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{d.short}</span>
          </nav>
          <div className="category-hero-grid">
            <div>
              <Eyebrow tone={d.tone}>{d.name}</Eyebrow>
              <h1>
                {d.id === "vapt" ? (
                  <>
                    Know your
                    <br /><em>exposure.</em>
                  </>
                ) : d.id === "grc" ? (
                  <>
                    Turn risk into
                    <br /><em>direction.</em>
                  </>
                ) : (
                  <>
                    Build a<br /><em>stronger</em><br />
                    defense.
                  </>
                )}
              </h1>
              <p>{d.description}</p>
              <Button href={`/contact?service=${encodeURIComponent(d.short)}`}>
                Discuss your requirements
              </Button>
            </div>
            <div className={`category-visual category-art ${d.id}`} role="img" aria-label={`${d.short} capability overview graphic`}>
              <span className="category-art-label">VIGILIX / {d.short.toUpperCase()}</span>
              <div className="category-art-grid"><i/><i/><i/><b/><b/><em>{d.id === "vapt" ? "ASSESS" : d.id === "grc" ? "GOVERN" : "DEFEND"}</em></div>
              <span className="category-art-footer">01 — 03&nbsp;&nbsp; / &nbsp;&nbsp;SECURITY DISCIPLINES</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>Explore the services</Eyebrow>
            <h2>
              {d.id === "vapt"
                ? "What do we / test /"
                : d.id === "grc"
                  ? "Structure for / progress /"
                  : "Technology for / defense /"}
            </h2>
          </div>
          <p>
            Select a service to explore the security questions it addresses.
          </p>
        </div>
        <ServiceDetails services={d.services} interest={d.short} />
      </section>
      <section className="related-section container">
        <h2>Connected capabilities</h2>
        <div>
          {disciplines
            .filter((o) => o.id !== d.id)
            .map((o) => (
              <Link href={`/services/${o.id}`} key={o.id} className={o.tone}>
                <span>{o.label}</span>
                <strong>{o.short}</strong>
                <Arrow diagonal />
              </Link>
            ))}
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
