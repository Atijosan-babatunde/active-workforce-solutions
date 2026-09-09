import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { env } from "./lib/env";
import { openApiSpec } from "./openapi";
import { authRouter } from "./routes/auth.routes";
import { requestsRouter } from "./routes/requests.routes";
import { adminRouter } from "./routes/admin.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(
  cors({
    // credentials:true + a literal origin (never "*") — both required for
    // the auth cookie to be set/sent cross-origin at all.
    origin: env.frontendOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true }));

// Served from the same origin as the API itself, so Swagger UI's "Try it
// out" hits these routes same-origin — no CORS/credentials wiring needed
// for the docs page to actually exercise cookie-authenticated endpoints.
//
// swagger-ui-express's assets are referenced with paths relative to /docs/
// (trailing slash) — visiting the bare /docs loads the HTML shell but every
// CSS/JS request resolves one level up and 404s, rendering a blank page.
// Redirect explicitly so both work. Checked against req.path (the literal
// incoming path) rather than an app.get("/docs") route — Express's default
// non-strict routing treats "/docs" and "/docs/" as the same route, which
// would make that handler catch its own redirect target and loop forever.
app.use((req, res, next) => {
  if (req.path === "/docs") return res.redirect(301, "/docs/");
  next();
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use("/auth", authRouter);
app.use("/requests", requestsRouter);
app.use("/admin", adminRouter);

app.use(errorHandler);
