import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const isProduction = process.env.NODE_ENV === "production";

// Fail loudly at boot rather than mysteriously at runtime — a missing
// FRONTEND_ORIGIN in production means CORS silently rejects every request
// and the auth cookie never gets set, with no obvious client-side error.
if (isProduction && !process.env.FRONTEND_ORIGIN) {
  throw new Error("FRONTEND_ORIGIN must be set in production");
}

export const env = {
  isProduction,
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET"),
  adminApiKey: required("ADMIN_API_KEY"),
  frontendOrigins: (process.env.FRONTEND_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
};
