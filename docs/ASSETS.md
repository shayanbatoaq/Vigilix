# Asset provenance

## Brand

Source: `Vigilix_Brand_Identity_Guidelines.pdf`, supplied by the project owner. All 13 pages reviewed as rendered images. `scripts/extract-brand.py` extracts the original vector path data from page 5, preserving proportions, internal negative space, and fills. The website omits the tiny descriptor at navigation scale, as directed on page 8.

- `public/brand/logo-dark.svg`: reversed horizontal lockup.
- `public/brand/logo-light.svg`: full-color horizontal lockup for light backgrounds.
- `public/brand/logo-mono.svg`: monochrome alternative supplied in the PDF.
- `public/brand/monogram.svg`, `favicon.svg`, `apple-touch-icon.png`: extracted compact symbol, with clear space.

The supplied PDF contains only the older red/black/white colorway. At the owner's request, the site variants recolor the existing mark path blue while retaining its geometry and the existing red mark. VAPT uses red as the offensive-team color; security solutions use blue as the defensive-team color. No logo geometry or path placement was invented. The monochrome source asset remains unchanged.

## Photography

Both photographs were downloaded, visually inspected, and stored locally. They illustrate infrastructure, not Vigilix facilities or client environments. No stock people are presented as team members.

| Local source | Photographer | Original page | License |
| --- | --- | --- | --- |
| `public/images/infrastructure.jpg` | Taylor Vick | https://unsplash.com/photos/cable-network-M5tzZtFCOfs | Unsplash License; photo page marked free to use |
| `public/images/network.jpg` | Jordan Harrison | https://unsplash.com/photos/blue-utp-cord-40XgDxBfYXM | Unsplash License; photo page marked free to use |

License source checked October 27, 2026: https://unsplash.com/license. The license permits commercial use and modification; attribution is appreciated. No endorsement is claimed. Original CDN IDs: `photo-1558494949-ef010cbdcc31` and `photo-1544197150-b99a580bb7a8`.

`scripts/prepare-assets.mjs` creates 1800px WebP derivatives, the touch icon, and social sharing image. Next Image provides responsive delivery. The social card combines the infrastructure photograph with the supplied logo and website messaging.

## Fonts and diagrams

Sora, Space Grotesk, and IBM Plex Mono Latin WOFF2 files are self-hosted in `public/fonts/` and loaded with `next/font/local`. The files were fetched from the Google Fonts CDN on November 14, 2026. The two sans-serif files are variable weight (400–700). IBM Plex Mono is provided at weights 400 and 500. This keeps the website independent of live font requests. All diagrams are original SVG/CSS work for this website. Capability scenarios are labeled illustrative and contain no claimed live telemetry or invented client outcomes.
