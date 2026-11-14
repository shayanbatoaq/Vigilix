import { createHmac } from "node:crypto";

const localBuckets = new Map<string, { count: number; expires: number }>();
const MAX_LOCAL_BUCKETS = 2000;

export function consumeLocal(
  key: string,
  limit: number,
  windowSeconds: number,
  now = Date.now(),
) {
  for (const [id, bucket] of localBuckets)
    if (bucket.expires <= now) localBuckets.delete(id);
  const existing = localBuckets.get(key);
  if (!existing && localBuckets.size >= MAX_LOCAL_BUCKETS) return false;
  const bucket = existing ?? { count: 0, expires: now + windowSeconds * 1000 };
  bucket.count += 1;
  localBuckets.set(key, bucket);
  return bucket.count <= limit;
}

export function isInquiryConfigured() {
  const mailReady = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_FROM &&
    process.env.CONTACT_TO,
  );
  const limitReady =
    process.env.NODE_ENV !== "production" ||
    Boolean(
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      process.env.RATE_LIMIT_SECRET,
    );
  return mailReady && limitReady;
}

export async function allowInquiry(email: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.RATE_LIMIT_SECRET;
  if (process.env.NODE_ENV === "production" && (!url || !token || !secret))
    throw new Error("Shared abuse protection is not configured.");
  const hash = createHmac("sha256", secret || "local-development-only")
    .update(email.toLowerCase())
    .digest("hex");
  const keys = [
    `vigilix:contact:address:${hash}`,
    "vigilix:contact:global:minute",
    "vigilix:contact:global:hour",
  ];
  const limits = [3, 20, 200];
  const windows = [600, 60, 3600];
  if (!url || !token)
    return keys
      .map((key, i) => consumeLocal(key, limits[i], windows[i]))
      .every(Boolean);
  // One atomic script: limit checks happen before consuming all three buckets.
  const script =
    "for i=1,3 do local n=tonumber(redis.call('GET',KEYS[i]) or '0'); if n>=tonumber(ARGV[i]) then return 0 end end; for i=1,3 do local n=redis.call('INCR',KEYS[i]); if n==1 then redis.call('EXPIRE',KEYS[i],ARGV[i+3]) end end; return 1";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      script,
      "3",
      ...keys,
      ...limits.map(String),
      ...windows.map(String),
    ]),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Abuse protection unavailable.");
  const body = await res.json();
  if (body.error || typeof body.result !== "number")
    throw new Error("Unexpected limiter response.");
  return body.result === 1;
}
