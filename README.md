# Vigilix

A complete, responsive cybersecurity website for Vigilix, with an integrated service model spanning vulnerability assessment and penetration testing, governance and risk, and security solutions.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
Copy-Item .env.example .env.local
npm run dev
```

PowerShell commands work in the project root. Open the local URL printed by Next.js (normally http://127.0.0.1:3000).

## Pages and content

- `/` — Kualitatem-inspired composition adapted to Vigilix: blue inset hero with original assurance map, portfolio overview, three service pillars, security challenges, illustrative capability scenarios, four-step approach, eight environments, five working principles, and contact CTA.
- `/services` — index for all three service disciplines and 15 offerings.
- `/services/vapt`, `/services/grc`, `/services/security-solutions` — discipline detail pages with deep-linkable service disclosures, scope considerations, and related capabilities.
- `/about`, `/approach`, `/contact`, `/privacy`.
- Custom not-found and error states; sitemap and robots routes.

The public-facing copy does not claim customer results, testimonials, certifications, or industry proof that Vigilix has not supplied. Capability scenarios are clearly labeled as illustrative. Engagement scope and outcomes are discussed with each organization. The header theme control switches every route between light and dark palettes, stores the choice locally, and follows the operating-system preference until the visitor chooses a mode.

## Architecture

Next.js 16.4.3 App Router, React 19.3.1, TypeScript, Tailwind CSS 4, and Zod. Content pages use Server Components; the header, theme toggle, service disclosures, and inquiry form use client-side interaction where needed. A small inline head initializer applies the saved or system theme before paint. The toggle persists its choice locally. The inquiry form remains a Server Action with schema validation, abuse controls, idempotency, timeouts, and Resend delivery. No database, tracking scripts, or UI component library are included.

Design tokens and responsive styles are in `src/app/globals.css`. Service content is in `src/lib/services.ts`; navigation and metadata are in `src/lib/site.ts`. Sora, Space Grotesk, and IBM Plex Mono Latin WOFF2 files are bundled locally in `public/fonts/` so production builds do not require a live font request. Responsive photographs are served with `next/image`. The logo preserves the supplied vector geometry and pairs the blue defensive mark with the existing red offensive accent (see `docs/ASSETS.md`).

## Configure inquiry delivery

Set the variables from `.env.example` in `.env.local` or the hosting environment. Without the required delivery configuration, online inquiries fail closed and the page displays a truthful status.
