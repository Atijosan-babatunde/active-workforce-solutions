// A simple in-memory limiter for the signup/login routes — no new
// infrastructure dependency, and still meaningfully slows down a
// single-instance brute-force attempt in dev/low-traffic production.
//
// Known limitation: on Vercel, each serverless function instance has its
// own memory, so this doesn't enforce one global limit across instances,
// and a cold start clears it entirely. That's an acceptable gap for this
// site's scale — if this ever becomes a real abuse target, the correct
// upgrade is a shared store (e.g. Upstash Redis + @upstash/ratelimit),
// not a bigger version of this in-memory map.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

const attempts = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export function rateLimitKeyFromRequest(req: Request): string {
  // Vercel/most proxies set this; falls back to a constant so local dev
  // (no proxy) still rate-limits per-process rather than throwing.
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}
