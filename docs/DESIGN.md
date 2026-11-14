# Vigilix website design

## Audience and goal

The site serves enterprise decision makers, security leaders, and IT teams comparing cybersecurity partners. It makes the three Vigilix disciplines easy to understand, connects them as one security picture, and provides a clear path to a scoped inquiry.

## Visual system

The interface uses the approved Vigilix identity and the brief’s established palette: ink `#0B0D12`, charcoal `#1A1E26`, signal red `#E53935`, defense blue `#266EEB`, paper `#F5F7FA`, and steel `#8A919E`. Red identifies assessment and offense; blue identifies defensive technology; governance sits between them in neutral tones. Accessible shades are used for small text and CTA fills where the base brand color does not meet contrast requirements.

The intended type roles are a clean geometric sans for display and reading, with a mono face for technical labels. This environment could not fetch the specified Google Fonts, so the implementation self-hosts the Geist and Geist Mono font assets already installed with Next.js. This keeps builds offline and avoids third-party font requests.

The layout is editorial and technical rather than card-based: a split dark hero, a capability rail, an off-white priority selector, and three distinct service showcases. An original SVG topology diagram connects red assessment paths to a neutral risk-context center and blue defensive controls. Separate diagrams explain the red-team/blue-team relationship and the governance layer. Local photography supports the VAPT and security deployment sections.

The information flow is: hero, three capabilities, service selector, VAPT, integrated assessment/governance/defense relationship, GRC, security solutions, approach, company overview, and contact CTA. Dedicated category pages retain all 15 existing services as deep-linkable disclosures with descriptions, business challenges, focus areas, and contextual inquiry links. About, approach, contact, privacy, error, metadata, sitemap, and robots routes remain available.

## Interaction and accessibility

Desktop navigation exposes primary routes and a keyboard-accessible services dropdown. Mobile navigation uses a native modal dialog, Escape handling, focus restoration, and direct links to each discipline. Native disclosure elements support keyboard use and direct service anchors. The contact form retains its existing server validation, rate limiting, honeypot, idempotency, timeout, and Resend behavior.

Layouts adapt across desktop, tablet, and small mobile widths. The technical diagrams simplify naturally on narrow screens; navigation and service lists reflow; reduced-motion preferences are respected. The browser suite checks WCAG 2.x AA with axe, horizontal overflow, one H1 per route, image loading, service anchors, navigation behavior, and contact validation. The implementation avoids invented clients, statistics, certifications, or security operations claims.

## Reference and skill workflow

The brief’s four cybersecurity reference sites informed the information hierarchy, service organization, concise value proposition, and use of focused CTAs. Their brand assets and claims were not copied. The UI/UX search workflow informed the trust and clarity priorities; frontend-design guided the distinct art direction; Next.js best practices guided the App Router and image implementation; React review guidance informed the component and interaction checks.
