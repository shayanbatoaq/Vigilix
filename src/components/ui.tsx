import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      href={href}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <Arrow diagonal />
    </Link>
  );
}
export function Logo() {
  return (
    <span className="logo-set" aria-hidden="true">
      <Image src="/brand/logo-light.svg" width={218} height={33} alt="" className="logo logo-on-light" />
      <Image src="/brand/logo-dark.svg" width={218} height={33} alt="" className="logo logo-on-dark" />
    </span>
  );
}
export function Eyebrow({
  children,
  tone = "",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <p className={`eyebrow ${tone}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function ClosingCTA() {
  return (
    <section className="closing">
      <div className="container closing-inner">
        <div>
          <Eyebrow>READY TO BEGIN</Eyebrow>
          <h2>Let’s Strengthen<br />Your Security.</h2>
          <p>
            Tell us what you’re working on. We’ll explore the right place to
            start.
          </p>
        </div>
        <Button href="/contact">Start a conversation</Button>
      </div>
    </section>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 55vw"
        preload={priority}
      />
    </div>
  );
}
