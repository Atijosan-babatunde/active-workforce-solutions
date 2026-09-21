# Active Workforce Solutions — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Built from the client's
Website Development Brief (Volume 1), Homepage Blueprint (Volume 2), and the
Active Recovery Concierge Blueprint (Volume 3).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's real vs placeholder

**Fully built from the client's blueprint (real copy):**
- Homepage — hero, trust bar, six divisions, why choose us, client journey,
  testimonials, resources, CTA (`app/page.tsx`)
- Active Recovery Concierge — all 9 pages, real content
  (`lib/content/recovery-concierge.ts`, rendered via
  `components/ServicePageTemplate.tsx`)

**Placeholder, awaiting client content:**
- The other five divisions (Active Quality Academy, Active Provider
  Solutions, Active Accommodation Solutions, Active Workforce Recruitment,
  Active Facilities) use generic but real, on-brand copy in
  `components/DivisionLandingTemplate.tsx` and `lib/content/divisions.ts`.
  Swap in real copy once the client provides a Volume-3-style blueprint for
  each — the page structure won't need to change, only the content.
- Legal pages (privacy, cookies, terms, complaints) are stubbed and flagged
  inline as needing legal/compliance review before launch — this matches the
  brief's own requirement that legal advisers review these before launch.

## CRM integration

All enquiry forms post to `app/api/enquiry/route.ts`. To connect a real CRM:

1. Set `CRM_WEBHOOK_URL` and `CRM_API_KEY` in your environment (Vercel
   project settings, or a local `.env.local` — never commit real values)
2. That's it — every form on every page already flows through this one route

Until those are set, submissions are logged server-side so the whole flow
can be tested end-to-end before the CRM is chosen.

## Client accounts, admin dashboard & the database

This is one Next.js app end to end — the frontend, the API routes (`app/api/**/route.ts`), and the
Prisma/PostgreSQL data layer all live in this one project and deploy together. There's no separate
backend service to run or deploy.

**What it powers:**
- Any client-path enquiry — the division wizard on `/contact` (`components/EnquiryWizard.tsx`),
  Active Workforce Recruitment's "Get Started" flow (`components/EmployerEngagementFlow.tsx`), and
  the Perm & Temp Recruitment form (`components/PermTempRecruitmentForm.tsx`) — can optionally
  create a real account, so the client can log back in at `/portal/login` and see the status of
  what they submitted at `/portal`. The "professional" (careers) path never creates an account —
  that's a job application, not a trackable service request.
- **Every** form submission site-wide, regardless of division and regardless of whether the
  submitter created an account, is recorded and visible to staff at `/admin` — filterable by
  status, moved through a pipeline (New → Contacted → In Progress → Won/Lost). This is what closes
  the gap originally intended for a CRM like Zoho: one place to see every lead/enquiry. It's
  populated automatically by `app/api/enquiry/route.ts` — the one route every form already posts
  to — so no form component needs to know the admin dashboard exists.

**One-time setup:**
1. Get a PostgreSQL connection string — any host works: a free instance on
   [Neon](https://neon.tech) or [Railway](https://railway.app), Supabase's free Postgres used as a
   plain database, or a local `postgres` (e.g. via Docker).
2. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL`, plus generate `JWT_SECRET` and
   `ADMIN_API_KEY` (e.g. `openssl rand -base64 48` for each).
3. `npm install` — runs `prisma generate` automatically via the `postinstall` script. Then
   `npm run prisma:migrate` to create the `User`, `ServiceRequest`, `AdminUser` and `Enquiry`
   tables from `prisma/schema.prisma`.
4. `npm run dev` — one command, one server, on `http://localhost:3000`.

**API docs:** every endpoint is documented at `/api-docs` (Swagger UI) — request/response shapes,
which are auth-protected, and a "Try it out" button that works directly, since the docs and the
API are always the same origin.

**Creating the first (or another) staff account** — there's no public admin signup, deliberately.
Create one via the key-gated endpoint:
```bash
curl -X POST <site-url>/api/admin/auth/signup \
  -H "Authorization: Bearer <ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"email":"staff@activeworkforcesolutions.com","password":"choose-a-real-password","name":"Staff Name"}'
```
Then log in normally at `/admin/login` — it's a real session (its own `admin_token` cookie,
entirely separate from client logins), not the shared key.

**Updating a `service_request`'s status** (the `/portal` self-service view specifically — for the
main admin dashboard, just use the `/admin` UI): call
`PATCH <site-url>/api/admin/requests/:id/status` with header `Authorization: Bearer <ADMIN_API_KEY>`
and body `{"status": "in_review"}` (one of `submitted` / `in_review` / `in_progress` / `completed`),
e.g. via curl or Postman.

**Deploying:** one Vercel project, same as any Next.js app. Set `DATABASE_URL`, `JWT_SECRET`, and
`ADMIN_API_KEY` in the project's environment variables — nothing else to stand up or point at each
other.

**Still to build:** real candidate matching for recruitment (status is a manually-set label, not
driven by any matching logic), password reset, per-admin roles/permissions (every staff account
currently has full access), and pagination on the dashboard list beyond the first 50 (fine for
launch volume, revisit once real traffic arrives). Submissions still also flow through the existing
`app/api/enquiry/route.ts` CRM webhook unchanged, independent of the database — so the future Zoho
connection and this login/dashboard system don't depend on each other.

## Content model

Adding a new division page or editing copy does not require touching any
component. Content lives in:
- `lib/content/divisions.ts` — the six divisions
- `lib/content/recovery-concierge.ts` — the 9 Recovery Concierge pages
  (hero copy, sections, FAQs, form fields)

This is a deliberate step toward the "easy-to-update content management"
requirement in the brief — a proper CMS (e.g. Sanity) can later replace these
files without changing any page component.

## Design system

- Colours are the client's actual brand palette, sampled directly from their
  logo: navy `#0B1836`, gold `#C9962E`, silver `#9AA7B5` (`tailwind.config.ts`).
  Existing component code still references `teal`/`brass` class names — these
  are aliased to navy/gold in the Tailwind config, so the whole site inherited
  the real brand colours from a single config change.
- The client's actual logo is at `public/logo.png` (full lockup) and
  `public/icon.png` (app-icon mark), used in the header.
- Display face: Fraunces · Body/UI face: Inter (loaded via Google Fonts link
  in `app/layout.tsx`, not `next/font`, so the build has no dependency on
  build-time internet access)
- Signature motif: `components/ConvergeMark.tsx` — converging coordination
  lines in the brand gold, used once per major hero

## Photography

Every hero, division card, and major section now uses real photography from
Pexels (free for commercial use, no attribution required —
https://www.pexels.com/license/), matched to the specific page: senior-care
imagery on the 9 Recovery Concierge pages, apartment interiors on
Accommodation Solutions, handshakes/office imagery on Provider Solutions and
Recruitment, classroom imagery on Quality Academy, cleaning/maintenance
imagery on Facilities. All image URLs are centralised in
`lib/content/images.ts` — swapping in the client's own photography later is a
one-line change per entry, not a hunt through every page component.


## Still needed before launch

- Confirm CRM and wire up `CRM_WEBHOOK_URL`
- Provision a PostgreSQL database and set `DATABASE_URL`/`JWT_SECRET`/`ADMIN_API_KEY` in Vercel
  (see "Client accounts, admin dashboard & the database" above) — without them, every
  "Get Started"/"Login" flow across the site will error
- Real content for the five remaining divisions
- Final domain + hosting confirmation, then update `metadataBase` in
  `app/layout.tsx` and the base URL in `app/sitemap.ts`
- Legal review of privacy notice, cookie notice, terms and complaints page
- Real photography (brief specifies authentic, non-cliché imagery)
- Registered office address in the footer (currently omitted; company number is in place)
# active-workforce-solutions
