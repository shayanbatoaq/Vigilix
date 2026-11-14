import { test } from "node:test";
import assert from "node:assert/strict";
import { inquirySchema, emailContent } from "../src/lib/inquiry";
import { consumeLocal } from "../src/lib/rate-limit";

const good = {
  name: "Alex Example",
  email: "alex@example.com",
  organization: "Example Organization",
  service: "VAPT",
  message: "We would like to discuss an application assessment.",
  website: "",
  startedAt: Date.now() - 5000,
  submissionId: "7c34395e-f92f-4b76-b11b-cc4a85ce2094",
};
test("valid inquiry preserves plain text without producing HTML", () => {
  const parsed = inquirySchema.parse({
    ...good,
    message:
      "Please assess <script>alert(1)</script> on our staging application.",
  });
  assert.match(emailContent(parsed), /<script>/);
  assert.equal(parsed.service, "VAPT");
});
test("rejects invalid, oversized, unapproved, and bot submissions", () => {
  for (const bad of [
    { email: "not-email" },
    { message: "short" },
    { message: "x".repeat(4001) },
    { service: "Managed SOC" },
    { website: "https://spam.example" },
    { name: "Alex\nBcc: someone@example.com" },
    { submissionId: "bad" },
  ])
    assert.equal(inquirySchema.safeParse({ ...good, ...bad }).success, false);
});
test("local development limit enforces window and expiry", () => {
  const key = "test-bucket";
  assert.equal(consumeLocal(key, 2, 10, 1000), true);
  assert.equal(consumeLocal(key, 2, 10, 1001), true);
  assert.equal(consumeLocal(key, 2, 10, 1002), false);
  assert.equal(consumeLocal(key, 2, 10, 11001), true);
});
