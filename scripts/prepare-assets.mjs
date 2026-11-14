import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";

await mkdir("tmp/qa", { recursive: true });
for (const name of ["infrastructure", "network"]) {
  await sharp(`public/images/${name}.jpg`)
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/images/${name}.webp`);
}
await sharp("public/brand/logo-dark.svg", { density: 300 })
  .resize(680)
  .png()
  .toFile("tmp/qa/logo-extracted.png");
await sharp("public/brand/monogram.svg", { density: 300 })
  .resize(180, 180)
  .flatten({ background: "#0B0D12" })
  .png()
  .toFile("public/brand/apple-touch-icon.png");
const photo = await sharp("public/images/infrastructure.jpg")
  .resize(1200, 630, { fit: "cover" })
  .modulate({ brightness: 0.3 })
  .toBuffer();
const wordmark = await sharp("public/brand/logo-dark.svg", { density: 300 })
  .resize(290)
  .toBuffer();
const type = Buffer.from(
  '<svg width="1200" height="630"><path d="M64 0H600" stroke="#E53935" stroke-width="8"/><path d="M600 0H1136" stroke="#266EEB" stroke-width="8"/><text x="64" y="300" font-family="sans-serif" font-size="67" font-weight="600" fill="#F5F7FA">Know your risks.</text><text x="64" y="385" font-family="sans-serif" font-size="67" font-weight="600" fill="#F5F7FA">Strengthen your defense.</text><text x="67" y="530" font-family="sans-serif" font-size="22" fill="#c4cbd6">Security testing / Governance / Security solutions</text></svg>',
);
await sharp(photo)
  .composite([{ input: wordmark, left: 65, top: 70 }, { input: type }])
  .jpeg({ quality: 90 })
  .toFile("public/images/social.jpg");
// Use optimized local assets; retain original downloads as source material.
await writeFile("public/images/.gitkeep", "");
console.log(
  "Optimized photographs, logo preview, touch icon, and social image prepared.",
);
