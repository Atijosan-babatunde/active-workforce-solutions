import { NextResponse } from "next/server";

// Next.js Route Handlers have no built-in equivalent of Express's global
// error-handling middleware — an uncaught exception (e.g. Prisma throwing
// because the database is unreachable) returns an empty response body, not
// clean JSON. Every route handler is wrapped with this so failures always
// come back as a normal { error } response the frontend already knows how
// to parse, instead of a silent empty 500.
export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<Response>
): (...args: Args) => Promise<Response> {
  return async (...args: Args) => {
    try {
      return await handler(...args);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}
