import Link from "next/link";
import { disciplines } from "@/lib/services";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Vigilix home">
              <Logo />
            </Link>
            <p>Intelligence. Precision. Defense.</p>
            <p className="muted">
              Cybersecurity built around
              <br />a clearer understanding of risk.
            </p>
            <Link className="text-link" href="/contact">
              Let’s talk security <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {disciplines.map((d) => (
            <div className="footer-column" key={d.id}>
              <Link href={`/services/${d.id}`} className="footer-title">
                {d.short}
              </Link>
              {d.services.map((s) => (
                <Link href={`/services/${d.id}#${s.id}`} key={s.id}>
                  {s.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Vigilix. All rights reserved.
          </span>
          <div>
            <Link href="/about">About</Link>
            <Link href="/approach">Our approach</Link>
            <Link href="/privacy">Privacy policy</Link>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
