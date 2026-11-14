import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="page-hero container">
      <Eyebrow>404 / Page not found</Eyebrow>
      <h1>This path ends here.</h1>
      <p>
        The page may have moved, or the address may be incorrect. Explore our
        services to find your next step.
      </p>
      <div className="actions">
        <Button href="/">Return home</Button>
        <Button href="/services" secondary>
          Explore services
        </Button>
      </div>
    </section>
  );
}
