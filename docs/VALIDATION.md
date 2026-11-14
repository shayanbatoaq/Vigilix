# Validation record

## Engineering checks

- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm test` — passed, 5 tests covering server validation, delivery outcomes, plain-text inquiry formatting, bot/invalid submissions, and local rate limits.
- `npx next build --webpack` — passed for all routes and static service category pages. The default Turbopack build panicked while spawning its CSS worker in this environment; the Webpack builder completed successfully.

## Browser and accessibility review

`npm run test:browser` passed against the local production server. Nine primary routes were checked at 1440, 768, and 390px: all returned 200, had exactly one H1, no horizontal overflow, and no broken images. Axe reported no WCAG 2.x AA violations on the nine desktop routes.

Interaction checks passed for mobile navigation opening, Escape dismissal and focus restoration; all three capability paths; direct service-fragment disclosure; mobile route navigation; contact service preselection; field errors and retained values when email delivery is unavailable; and homepage widths 320, 375, 1024, and 1920px.

Browser captures and the machine-readable report are written under ignored `tmp/qa/`. The live contact provider was not configured, so no message was sent externally. Email delivery still needs production credentials, sender verification, and mailbox confirmation.

## Preview

The final production preview is available locally at `http://127.0.0.1:3003` while the preview process remains running.

## Remaining launch checks

- Set the production origin and mail/rate-limit environment variables.
- Confirm sender verification, recipient mailbox, and production Redis connectivity.
- Review the privacy notice against the actual providers, retention practices, legal identity, and applicable jurisdiction.
- Confirm the service and approach copy with the Vigilix owner.
- Replace the supplied red/black/white wordmark only when the approved blue-accented master asset is available.
