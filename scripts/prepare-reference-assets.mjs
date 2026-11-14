import sharp from "sharp";
for (const name of ["security-core", "security-lock"]) {
  await sharp(`public/images/${name}-source.png`)
    .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 95 })
    .toFile(`public/images/${name}.webp`);
}
