import { timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Checks the Authorization: Bearer <ADMIN_API_KEY> header used by the
// admin-signup endpoint (creating the first/any staff account) and the
// legacy scriptable status-update endpoint — a trusted-caller secret, not a
// browser session (that's ADMIN_COOKIE_NAME / adminJwt.ts instead).
export function checkAdminKey(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  return scheme === "Bearer" && !!token && safeEqual(token, process.env.ADMIN_API_KEY!);
}
