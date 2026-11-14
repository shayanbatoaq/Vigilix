"use client";
import { useState } from "react";
import Link from "next/link";
import { Arrow } from "./ui";
const needs = [
  {
    name: "Test your\nattack surface",
    text: "Understand weaknesses across networks, applications, APIs, cloud, and wireless environments.",
    link: "/services/vapt",
    label: "Explore VAPT",
    tone: "red",
    shape: "sphere",
  },
  {
    name: "Build security\ninto the business",
    text: "Connect security policies, program design, and leadership with the decisions your organization needs to make.",
    link: "/services/grc",
    label: "Explore GRC",
    tone: "neutral",
    shape: "torus",
  },
  {
    name: "Put protection\ninto practice",
    text: "Deploy and integrate security technologies that fit your infrastructure and operational priorities.",
    link: "/services/security-solutions",
    label: "Explore solutions",
    tone: "blue",
    shape: "diamond",
  },
];
export function NeedExplorer() {
  const [active, setActive] = useState(0);
  const need = needs[active];
  return (
    <div className="need-explorer">
      <div
        className="need-controls"
        role="group"
        aria-label="Choose a security priority"
      >
        {needs.map((n, i) => (
          <button
            key={n.link}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {["Assess", "Govern", "Strengthen"][i]}
          </button>
        ))}
      </div>
      <div className={`need-card ${need.tone}`}>
        <div className={`solid-shape shape-${need.shape}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="need-card-copy" aria-live="polite">
          <span className="section-kicker">Your next move</span>
          <h3>{need.name}</h3>
          <p>{need.text}</p>
          <Link className="button" href={need.link}>
            {need.label}
            <Arrow />
          </Link>
        </div>
      </div>
      <div className="need-pagination">
        <span>0{active + 1} / 03</span>
        <button
          aria-label="Next security priority"
          onClick={() => setActive((active + 1) % needs.length)}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}
