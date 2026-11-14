const origin = process.env.QA_BASE_URL || "http://127.0.0.1:3002";
const routes = [
  "/",
  "/services",
  "/services/vapt",
  "/services/grc",
  "/services/security-solutions",
  "/about",
  "/approach",
  "/contact",
  "/privacy",
];
const pages = new Map();
for (const path of routes) {
  const response = await fetch(origin + path);
  if (response.status !== 200) throw new Error(`${path}: ${response.status}`);
  pages.set(path, await response.text());
  for (const header of [
    "content-security-policy",
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
    "permissions-policy",
  ]) {
    if (!response.headers.has(header)) throw new Error(`Missing ${header}`);
  }
}
let count = 0;
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    const url = new URL(href, origin + path);
    if (url.origin !== origin) continue;
    const target = pages.get(url.pathname);
    if (!target) throw new Error(`Unknown internal route: ${href}`);
    if (
      url.hash &&
      !target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)
    )
      throw new Error(`Missing fragment: ${href}`);
    count++;
  }
}
for (const route of ["/this-page-does-not-exist", "/services/unknown"]) {
  const response = await fetch(origin + route);
  if (
    response.status !== 404 ||
    !(await response.text()).includes("This path ends here")
  )
    throw new Error(`404 failed: ${route}`);
}
const robots = await (await fetch(origin + "/robots.txt")).text();
if (!robots.includes("Disallow: /"))
  throw new Error("Unconfigured preview must disallow crawling");
console.log(
  `${count} internal links and fragment targets verified across ${pages.size} pages. Security headers, both 404 routes, and preview robots behavior verified.`,
);
