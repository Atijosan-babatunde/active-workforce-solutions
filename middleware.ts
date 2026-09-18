import { NextResponse, type NextRequest } from "next/server";

// Must match AUTH_COOKIE_NAME in server/src/lib/jwt.ts — that's where this
// cookie is actually set. This is a presence-only check: it can't verify
// the JWT's signature (Edge middleware can't use the `jsonwebtoken`
// package), so a present-but-expired/tampered cookie still passes through
// here. That's fine — /portal's Server Component makes the authoritative
// check via a real call to the API's /auth/me and redirects if that fails,
// the same defense-in-depth shape this middleware already had.
const AUTH_COOKIE_NAME = "auth_token";

// Must match ADMIN_COOKIE_NAME in server/src/lib/adminJwt.ts — a deliberately
// separate cookie from the client session above, so a client login can never
// pass as an admin session or vice versa.
const ADMIN_COOKIE_NAME = "admin_token";

function gate(request: NextRequest, cookieName: string, prefix: string, loginPath: string) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith(prefix) || pathname === loginPath) return null;
  if (request.cookies.has(cookieName)) return null;

  const url = request.nextUrl.clone();
  url.pathname = loginPath;
  return NextResponse.redirect(url);
}

export function middleware(request: NextRequest) {
  return (
    gate(request, AUTH_COOKIE_NAME, "/portal", "/portal/login") ??
    gate(request, ADMIN_COOKIE_NAME, "/admin", "/admin/login") ??
    NextResponse.next()
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
