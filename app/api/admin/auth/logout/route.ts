import { NextResponse } from "next/server";
import { adminCookieOptions, ADMIN_COOKIE_NAME } from "@/lib/server/adminJwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

export const POST = withErrorHandling(async () => {
  const res = new NextResponse(null, { status: 204 });
  res.cookies.set(ADMIN_COOKIE_NAME, "", { ...adminCookieOptions(), maxAge: 0 });
  return res;
});
