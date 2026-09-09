import type { ErrorRequestHandler } from "express";

// Catches anything an async route handler throws (e.g. an unexpected Prisma
// error) that isn't already handled inline, so a bug never leaks a stack
// trace to the client or crashes the process.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
