import { NextResponse } from "next/server";
import { authCookieOptions, AUTH_COOKIE_NAME } from "@/lib/server/jwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

export const POST = withErrorHandling(async () => {
  const res = new NextResponse(null, { status: 204 });
  res.cookies.set(AUTH_COOKIE_NAME, "", { ...authCookieOptions(), maxAge: 0 });
  return res;
});
