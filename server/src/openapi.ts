// Hand-written OpenAPI 3.0 spec, kept as one plain object rather than
// JSDoc-per-route comments — with only 7 endpoints, one source of truth
// here is easier to keep accurate than annotations scattered across three
// route files.

const errorResponse = {
  type: "object",
  properties: { error: { type: "string" } },
  required: ["error"],
};

const user = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
  },
  required: ["id", "email"],
};

const serviceRequest = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    division: { type: "string", example: "active-recovery-concierge" },
    source: {
      type: "string",
      enum: ["contact-wizard", "employer-recruitment", "perm-temp-recruitment"],
    },
    description: { type: "string" },
    details: { type: "object", nullable: true, additionalProperties: true },
    status: {
      type: "string",
      enum: ["submitted", "in_review", "in_progress", "completed"],
    },
    createdAt: { type: "string", format: "date-time" },
  },
  required: ["id", "division", "source", "description", "status", "createdAt"],
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Active Workforce Solutions API",
    version: "0.1.0",
    description:
      "Client accounts and service-request tracking for the Active Workforce Solutions website. " +
      "Auth uses an httpOnly session cookie set by /auth/login and /auth/signup — 'Try it out' in " +
      "this UI works for the auth-cookie-protected endpoints as long as this docs page is served " +
      "from the same origin as the API (the default when running locally).",
  },
  servers: [{ url: "/", description: "This server" }],
  tags: [
    { name: "Auth", description: "Signup, login, logout, current user" },
    { name: "Requests", description: "A client's own service requests" },
    { name: "Admin", description: "Staff status updates — gated by ADMIN_API_KEY" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "auth_token",
        description: "Set automatically by /auth/login or /auth/signup.",
      },
      adminKey: {
        type: "http",
        scheme: "bearer",
        description: "The ADMIN_API_KEY configured in server/.env, sent as: Authorization: Bearer <key>",
      },
    },
    schemas: { Error: errorResponse, User: user, ServiceRequest: serviceRequest },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Auth"],
        summary: "Liveness check",
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "object", properties: { ok: { type: "boolean" } } } } } } },
      },
    },
    "/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Create an account",
        description: "Sets the auth_token cookie on success. Rate-limited (10 requests / 15 min per IP).",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { email: { type: "string", format: "email" }, password: { type: "string", minLength: 6 } },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Account created", content: { "application/json": { schema: { type: "object", properties: { user: { $ref: "#/components/schemas/User" } } } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "409": { description: "Email already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in",
        description: "Sets the auth_token cookie on success. Rate-limited (10 requests / 15 min per IP).",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { email: { type: "string", format: "email" }, password: { type: "string" } },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Logged in", content: { "application/json": { schema: { type: "object", properties: { user: { $ref: "#/components/schemas/User" } } } } } },
          "401": { description: "Incorrect email or password", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out",
        description: "Clears the auth_token cookie. Always succeeds, even if not logged in.",
        responses: { "204": { description: "Logged out" } },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the current logged-in user",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": { description: "Logged in", content: { "application/json": { schema: { type: "object", properties: { user: { $ref: "#/components/schemas/User" } } } } } },
          "401": { description: "Not authenticated — expected for a logged-out visitor, not an error state", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/requests": {
      post: {
        tags: ["Requests"],
        summary: "Create a service request",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  division: { type: "string", example: "active-recovery-concierge" },
                  source: { type: "string", enum: ["contact-wizard", "employer-recruitment", "perm-temp-recruitment"] },
                  description: { type: "string" },
                  details: { type: "object", additionalProperties: true },
                },
                required: ["division", "source", "description"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { type: "object", properties: { request: { $ref: "#/components/schemas/ServiceRequest" } } } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Not authenticated", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      get: {
        tags: ["Requests"],
        summary: "List my service requests",
        description: "Newest first. Scoped to the logged-in user — never returns another client's requests.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { type: "object", properties: { requests: { type: "array", items: { $ref: "#/components/schemas/ServiceRequest" } } } } } } },
          "401": { description: "Not authenticated", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/admin/requests/{id}/status": {
      patch: {
        tags: ["Admin"],
        summary: "Update a request's status (staff)",
        description: "The only way to change a request's status today — there's no staff UI yet.",
        security: [{ adminKey: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { status: { type: "string", enum: ["submitted", "in_review", "in_progress", "completed"] } },
                required: ["status"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Updated", content: { "application/json": { schema: { type: "object", properties: { request: { $ref: "#/components/schemas/ServiceRequest" } } } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Missing or wrong admin key", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "Request not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
  },
};
