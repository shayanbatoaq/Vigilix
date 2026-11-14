"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#0B0D12",
          color: "#F5F7FA",
          padding: "60px 24px",
          fontFamily: "sans-serif",
        }}
      >
        <h1>This page couldn’t load.</h1>
        <p>Please try again to continue to Vigilix.</p>
        <button onClick={reset} style={{ padding: "14px 24px", marginTop: 20 }}>
          Try again
        </button>
      </body>
    </html>
  );
}
