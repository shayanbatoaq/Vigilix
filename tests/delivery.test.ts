import { test } from "node:test";
import assert from "node:assert/strict";
import { submitInquiry } from "../src/app/contact/actions";

function form() {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: "QA Example",
    email: "synthetic@example.com",
    organization: "Test Organization",
    service: "VAPT",
    message: "A synthetic inquiry to verify the local delivery adapter.",
    website: "",
    startedAt: String(Date.now() - 5000),
    submissionId: crypto.randomUUID(),
  }))
    data.set(key, value);
  return data;
}

test("delivery fails closed without configuration and validates on the server", async () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const result = await submitInquiry(form());
    assert.equal(result.status, "error");
    assert.match(result.message, /not been sent/);
    const bad = form();
    bad.set("email", "invalid");
    assert.ok((await submitInquiry(bad)).errors?.email);
  } finally {
    if (previous) process.env.RESEND_API_KEY = previous;
  }
});

test("provider rejection, missing receipt, and acceptance use truthful states", async () => {
  const originalFetch = globalThis.fetch;
  const keys = [
    "NODE_ENV",
    "RESEND_API_KEY",
    "CONTACT_FROM",
    "CONTACT_TO",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
  ];
  const previous = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  Object.assign(process.env, {
    NODE_ENV: "test",
    RESEND_API_KEY: "synthetic-test-key",
    CONTACT_FROM: "test@example.com",
    CONTACT_TO: "recipient@example.com",
  });
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    globalThis.fetch = async () => new Response("{}", { status: 503 });
    assert.equal((await submitInquiry(form())).status, "error");
    globalThis.fetch = async () => Response.json({});
    assert.equal((await submitInquiry(form())).status, "error");
    globalThis.fetch = async (_url, options) => {
      const body = JSON.parse(String(options?.body));
      assert.equal(body.reply_to, "synthetic@example.com");
      assert.equal(body.html, undefined);
      assert.match(body.text, /QA Example/);
      return Response.json({ id: "mock-provider-receipt" });
    };
    const accepted = await submitInquiry(form());
    assert.equal(accepted.status, "success");
    assert.match(accepted.message, /accepted for delivery/);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});
