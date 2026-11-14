"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { Arrow } from "./ui";

export function ServiceDetails({
  services,
  interest,
}: {
  services: Service[];
  interest: string;
}) {
  useEffect(() => {
    const openHash = () => {
      let id = location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        return;
      }
      const node = document.getElementById(id);
      if (node instanceof HTMLDetailsElement) node.open = true;
    };
    openHash();
    window.addEventListener("hashchange", openHash);
    return () => window.removeEventListener("hashchange", openHash);
  }, []);
  return (
    <div className="service-details">
      {services.map((s, i) => (
        <details key={s.id} id={s.id} open={i === 0}>
          <summary>
            <span>{s.name}</span>
            <span className="disclosure-symbol" aria-hidden="true" />
          </summary>
          <div className="service-detail-content">
            <div>
              <p className="service-summary">{s.summary}</p>
              <p>{s.challenge}</p>
              <Link
                className="text-link"
                href={`/contact?service=${encodeURIComponent(interest)}`}
              >
                Discuss this service
                <Arrow diagonal />
              </Link>
            </div>
            <div className="service-focus">
              <h3>Potential areas to explore</h3>
              <ul>
                {s.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="small">
                Illustrative discussion points. Testing activities, technology
                choices, and deliverables are agreed for each engagement.
              </p>
              <a href={`#${s.id}`} className="small permalink">
                Link to this service ↗
              </a>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
