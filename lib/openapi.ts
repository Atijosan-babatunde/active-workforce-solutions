// Hand-written OpenAPI 3.0 spec, kept as one plain object rather than
// JSDoc-per-route comments — with a handful of endpoints, one source of
// truth here is easier to keep accurate than annotations scattered across
// many route files.

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

const admin = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    name: { type: "string", nullable: true },
  },
  required: ["id", "email"],
};

const enquiry = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    enquiryType: { type: "string", example: "client" },
    division: { type: "string", nullable: true, example: "active-recovery-concierge" },
    fullName: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: "string", nullable: true },
    organisation: { type: "string", nullable: true },
    description: { type: "string", nullable: true },
    sourcePage: { type: "string", nullable: true },
    details: { type: "object", nullable: true, additionalProperties: true },
    status: { type: "string", enum: ["new", "contacted", "in_progress", "won", "lost"] },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "enquiryType", "fullName", "email", "status", "createdAt", "updatedAt"],
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Active Workforce Solutions API",
    version: "0.2.0",
    description:
      "Client accounts, service-request tracking, and the admin dashboard for the Active Workforce " +
      "Solutions website — all served from this same Next.js app's /api routes. Auth uses an " +
      "httpOnly session cookie set by /api/auth/login and /api/auth/signup — 'Try it out' in this " +
      "UI works directly, since docs and API are always same-origin.",
  },
  servers: [{ url: "/", description: "This server" }],
  tags: [
    { name: "Auth", description: "Signup, login, logout, current user" },
    { name: "Requests", description: "A client's own service requests" },
    { name: "Admin", description: "Legacy staff status updates — gated by ADMIN_API_KEY" },
    { name: "Admin Auth", description: "Staff dashboard login (separate from client accounts)" },
    { name: "Enquiries", description: "Every form submission site-wide — the admin dashboard's data source" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "auth_token",
        description: "Set automatically by /api/auth/login or /api/auth/signup.",
      },
      adminSessionAuth: {
        type: "apiKey",
        in: "cookie",
        name: "admin_token",
        description: "Set automatically by /api/admin/auth/login. Separate from the client auth_token cookie.",
      },
      adminKey: {
        type: "http",
        scheme: "bearer",
        description: "The ADMIN_API_KEY env var, sent as: Authorization: Bearer <key>",
      },
    },
    schemas: { Error: errorResponse, User: user, ServiceRequest: serviceRequest, Admin: admin, Enquiry: enquiry },
  },
  paths: {
    "/api/health": {
      get: {
        tags: ["Auth"],
        summary: "Liveness check",
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "object", properties: { ok: { type: "boolean" } } } } } } },
      },
    },
    "/api/auth/signup": {
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
    "/api/auth/login": {
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
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out",
        description: "Clears the auth_token cookie. Always succeeds, even if not logged in.",
        responses: { "204": { description: "Logged out" } },
      },
    },
    "/api/auth/me": {
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
    "/api/requests": {
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
    "/api/admin/requests/{id}/status": {
      patch: {
        tags: ["Admin"],
        summary: "Update a service request's status (staff, scriptable)",
        description: "For ServiceRequest / the /portal self-service view. Use /api/admin/enquiries/{id}/status for the main dashboard instead.",
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
    "/api/admin/auth/signup": {
      post: {
        tags: ["Admin Auth"],
        summary: "Create a staff account",
        description: "Gated by ADMIN_API_KEY, not open signup — this is how the first (and any later) staff account gets created.",
        security: [{ adminKey: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { email: { type: "string", format: "email" }, password: { type: "string", minLength: 6 }, name: { type: "string" } },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { type: "object", properties: { admin: { $ref: "#/components/schemas/Admin" } } } } } },
          "401": { description: "Missing or wrong admin key", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "409": { description: "Email already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/admin/auth/login": {
      post: {
        tags: ["Admin Auth"],
        summary: "Staff log in",
        description: "Sets the admin_token cookie on success. Rate-limited.",
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
          "200": { description: "Logged in", content: { "application/json": { schema: { type: "object", properties: { admin: { $ref: "#/components/schemas/Admin" } } } } } },
          "401": { description: "Incorrect email or password", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/admin/auth/logout": {
      post: {
        tags: ["Admin Auth"],
        summary: "Staff log out",
        responses: { "204": { description: "Logged out" } },
      },
    },
    "/api/admin/auth/me": {
      get: {
        tags: ["Admin Auth"],
        summary: "Get the current logged-in staff member",
        security: [{ adminSessionAuth: [] }],
        responses: {
          "200": { description: "Logged in", content: { "application/json": { schema: { type: "object", properties: { admin: { $ref: "#/components/schemas/Admin" } } } } } },
          "401": { description: "Not authenticated", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/admin/enquiries": {
      get: {
        tags: ["Enquiries"],
        summary: "List enquiries (staff)",
        description: "Newest first. Supports filtering and pagination. This is the admin dashboard's data source — populated automatically by /api/enquiry on every form submission site-wide.",
        security: [{ adminSessionAuth: [] }],
        parameters: [
          { name: "status", in: "query", schema: { type: "string", enum: ["new", "contacted", "in_progress", "won", "lost"] } },
          { name: "division", in: "query", schema: { type: "string" } },
          { name: "enquiryType", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 200, default: 50 } },
          { name: "offset", in: "query", schema: { type: "integer", minimum: 0, default: 0 } },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { type: "object", properties: { enquiries: { type: "array", items: { $ref: "#/components/schemas/Enquiry" } }, total: { type: "integer" } } },
              },
            },
          },
          "401": { description: "Not authenticated", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/admin/enquiries/{id}": {
      get: {
        tags: ["Enquiries"],
        summary: "Get one enquiry (staff)",
        security: [{ adminSessionAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { type: "object", properties: { enquiry: { $ref: "#/components/schemas/Enquiry" } } } } } },
          "401": { description: "Not authenticated", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/admin/enquiries/{id}/status": {
      patch: {
        tags: ["Enquiries"],
        summary: "Update an enquiry's status (staff)",
        security: [{ adminSessionAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { status: { type: "string", enum: ["new", "contacted", "in_progress", "won", "lost"] } },
                required: ["status"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Updated", content: { "application/json": { schema: { type: "object", properties: { enquiry: { $ref: "#/components/schemas/Enquiry" } } } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Not authenticated", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
  },
};
