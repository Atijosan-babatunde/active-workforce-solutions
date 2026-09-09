import type { NextFunction, Request, RequestHandler, Response } from "express";

// Express 4 doesn't forward a rejected promise from an async handler to the
// error middleware on its own — without this, a thrown Prisma error becomes
// an unhandled rejection instead of a clean 500.
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
