import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("tmp/qa", { recursive: true });
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
const report = { pages: [], interactions: [], errors };
for (const width of [1440, 768, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of routes) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    // Scroll naturally to exercise and capture lazy-loaded photographs.
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 800
    ) {
      await page.evaluate((position) => window.scrollTo(0, position), y);
      await page.waitForTimeout(70);
    }
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.scrollTo(0, 0));
    const result = {
      route,
      width,
      status: response.status(),
      title: await page.title(),
      h1: await page.locator("h1").count(),
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      brokenImages: await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.src),
        ),
    };
    if (width === 1440) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      result.violations = axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      }));
    }
    report.pages.push(result);
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    await page.screenshot({
      path: `tmp/qa/${name}-${width}.png`,
      fullPage: true,
    });
    console.log(JSON.stringify(result));
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base);
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", {name:"Open navigation",exact:true}).click();
if (!(await page.locator("#mobile-navigation").isVisible())) throw new Error("Mobile navigation did not open");
await page.keyboard.press("Escape");
if (await page.locator("#mobile-navigation").isVisible()) throw new Error("Mobile navigation did not close");
if ((await page.evaluate(()=>document.activeElement?.getAttribute("aria-label")))!=="Open navigation") throw new Error("Navigation focus was not restored");
report.interactions.push("Mobile navigation opens; Escape closes and restores focus");
await page.setViewportSize({ width: 1440, height: 1000 });
for (const href of ["/services/vapt", "/services/grc", "/services/security-solutions"]) {
  if (!(await page.locator(`a[href="${href}"]`).count())) throw new Error(`Missing capability link ${href}`);
}
report.interactions.push("All three capability paths are linked from the homepage");
await page.goto(base + "/services/vapt#api-security-testing");
await page.waitForFunction(
  () => document.getElementById("api-security-testing")?.open,
);
report.interactions.push(
  "Direct service fragment opens the correct disclosure",
);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base);
await page.getByRole("button", { name: "Open navigation", exact: true }).click();
await page
  .getByRole("navigation", { name: "Mobile navigation" })
  .getByRole("link", { name: "About", exact: true })
  .click();
await page.waitForURL("**/about");
report.interactions.push("Mobile menu navigates and closes");
await page.goto(base + "/contact?service=VAPT");
if (
  !(await page
    .locator(".form-status")
    .filter({ hasText: "temporarily unavailable" })
    .count())
) {
  throw new Error(
    "Refusing to run synthetic submission against a configured email integration.",
  );
}
if ((await page.locator("#service").inputValue()) !== "VAPT")
  throw new Error("Service preselection failed");
await page.getByRole("button", { name: "Send inquiry" }).click();
await page.locator('.contact-form [role="alert"]').waitFor();
if ((await page.locator("[aria-invalid=true]").count()) !== 4)
  throw new Error("Expected four missing-field errors");
await page.locator("#name").fill("QA Example");
await page.locator("#email").fill("qa@example.com");
await page.locator("#organization").fill("Example Organization");
await page
  .locator("#message")
  .fill(
    "We would like to discuss a scoped security assessment for our application.",
  );
await page.waitForTimeout(2100);
await page.getByRole("button", { name: "Send inquiry" }).click();
await page
  .getByRole("alert")
  .filter({ hasText: "Your message has not been sent" })
  .waitFor();
if ((await page.locator("#name").inputValue()) !== "QA Example")
  throw new Error("Form data lost");
report.interactions.push(
  "Validation, service preselection, unavailable delivery, and retained values verified",
);
await page.screenshot({ path: "tmp/qa/contact-error-390.png", fullPage: true });
for (const width of [320, 375, 1024, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(base);
  if (
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    )
  )
    throw new Error(`Home overflow at ${width}`);
}
report.interactions.push(
  "Additional homepage widths 320, 375, 1024, and 1920 have no horizontal overflow",
);
await writeFile("tmp/qa/report.json", JSON.stringify(report, null, 2));
await browser.close();
const failures = report.pages.filter(
  (p) =>
    p.status !== 200 ||
    p.h1 !== 1 ||
    p.overflow ||
    p.brokenImages.length ||
    p.violations?.length,
);
console.log(
  JSON.stringify(
    { failures: failures.length, errors, interactions: report.interactions },
    null,
    2,
  ),
);
if (failures.length || errors.length) process.exitCode = 1;
