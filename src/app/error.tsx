"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="page-hero container">
      <p className="eyebrow">Page unavailable</p>
      <h1>Let’s try that again.</h1>
      <p>Something interrupted this page. Reload it to continue.</p>
      <button className="button button-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
