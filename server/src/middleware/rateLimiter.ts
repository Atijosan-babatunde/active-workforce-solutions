import rateLimit from "express-rate-limit";

// In-memory store — fine for a single Node process. If this API is ever
// horizontally scaled behind a load balancer, move this to a shared store
// (e.g. Redis) since per-instance limits stop being meaningful.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." },
});
