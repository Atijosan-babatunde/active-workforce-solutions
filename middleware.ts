import { NextResponse, type NextRequest } from "next/server";

// Must match AUTH_COOKIE_NAME in server/src/lib/jwt.ts — that's where this
// cookie is actually set. This is a presence-only check: it can't verify
// the JWT's signature (Edge middleware can't use the `jsonwebtoken`
// package), so a present-but-expired/tampered cookie still passes through
// here. That's fine — /portal's Server Component makes the authoritative
// check via a real call to the API's /auth/me and redirects if that fails,
// the same defense-in-depth shape this middleware already had.
const AUTH_COOKIE_NAME = "auth_token";

export function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has(AUTH_COOKIE_NAME);

  if (!hasCookie && request.nextUrl.pathname.startsWith("/portal") && request.nextUrl.pathname !== "/portal/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
