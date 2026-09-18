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

## Client accounts & portal

Any client-path enquiry — the division wizard on `/contact` (`components/EnquiryWizard.tsx`),
Active Workforce Recruitment's "Get Started" flow (`components/EmployerEngagementFlow.tsx`), and
the Perm & Temp Recruitment form (`components/PermTempRecruitmentForm.tsx`) — can optionally
create a real account and request record via the standalone API in `server/` (Express + Prisma +
PostgreSQL, with its own email/password auth), so the client can log back in at `/portal/login`
and see the status of what they submitted at `/portal`, whichever of the six divisions it was for.
The "professional" (careers) path never creates an account — that's a job application, not a
trackable service request.

**One-time setup:**
1. Get a PostgreSQL connection string — any host works: a free instance on
   [Neon](https://neon.tech) or [Railway](https://railway.app), Supabase's free Postgres used as a
   plain database, or a local `postgres` (e.g. via Docker).
2. In `server/`, copy `.env.example` to `.env` and fill in `DATABASE_URL`, plus generate
   `JWT_SECRET` and `ADMIN_API_KEY` (e.g. `openssl rand -base64 48`). Leave `FRONTEND_ORIGIN` as
   `http://localhost:3000` for local dev.
3. `cd server && npm install && npm run prisma:migrate` — creates the `User` and `ServiceRequest`
   tables from `server/prisma/schema.prisma`.
4. `npm run dev` in `server/` (defaults to `http://localhost:4000`), and separately `npm run dev`
   at the repo root for the Next.js app. Set `NEXT_PUBLIC_API_URL=http://localhost:4000` in the
   root `.env.local` (see `.env.example`) so the frontend knows where to send requests.

**API docs:** every endpoint is documented at `<api-url>/docs` (Swagger UI, e.g.
`http://localhost:4000/docs` locally) — request/response shapes, which are auth-protected, and a
"Try it out" button that works directly against a running server.

In production, `server/` deploys as its own Node service (Railway/Render/Fly/a VPS — anywhere Node
runs), with `NODE_ENV=production`, a real `FRONTEND_ORIGIN` (the deployed site's exact origin —
required for the auth cookie to work cross-domain), and `NEXT_PUBLIC_API_URL` on the Next.js side
pointed at that service's URL.

**Updating a request's status:** there's still no UI specifically for `service_requests` (the
`/portal` self-service view) — call `PATCH <api-url>/admin/requests/:id/status` with header
`Authorization: Bearer <ADMIN_API_KEY>` and body `{"status": "in_review"}` (one of `submitted` /
`in_review` / `in_progress` / `completed`), e.g. via curl or Postman. The client sees the change
next time they load `/portal`. (For the separate, complete picture of every enquiry site-wide —
including the ones that never created an account — see "Admin dashboard" below, which does have a
real UI.)

**Still to build:** real candidate matching for recruitment (status is a manually-set label, not
driven by any matching logic) and password reset. Submissions still also flow through the existing
`app/api/enquiry/route.ts` CRM webhook unchanged, independent of this API — so the future Zoho
connection and this login system don't depend on each other.

## Admin dashboard

Every form submission site-wide — regardless of division, and regardless of whether the submitter
created a client account — is recorded and visible at `/admin`. This is what closes the gap the
client originally wanted Zoho for: one place to see every lead/enquiry, filter by status, and move
it through a pipeline (New → Contacted → In Progress → Won/Lost).

**How it's populated:** `app/api/enquiry/route.ts` — the one route every form already posts to —
forwards a normalised copy of each submission to the API's `POST /enquiries` endpoint. Nothing in
any form component needed to change for this; it was already the single point every submission
already passed through.

**Creating the first (or another) staff account** — there's no public admin signup, deliberately.
Create one via the key-gated endpoint:
```bash
curl -X POST <api-url>/admin/auth/signup \
  -H "Authorization: Bearer <ADMIN_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"email":"staff@activeworkforcesolutions.com","password":"choose-a-real-password","name":"Staff Name"}'
```
Then log in normally at `/admin/login` with that email and password — it's a real session (its own
`admin_token` cookie, entirely separate from client logins), not the shared key.

**Env vars needed beyond what "Client accounts & portal" already covers:** the Next.js app now
also needs `ADMIN_API_KEY` (must match `server/.env`'s value exactly) so `/api/enquiry` can
authenticate its call to `POST /enquiries` — see `.env.example`.

**Still to build:** per-admin roles/permissions (every staff account currently has full access),
pagination on the dashboard list beyond the first 50 (fine for launch volume, revisit once real
traffic arrives), and a division filter alongside the existing status filter.

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
- Provision a PostgreSQL database and deploy `server/` (see "Client accounts & portal" above) —
  without them, every "Get Started"/"Login" flow across the site will error
- Real content for the five remaining divisions
- Final domain + hosting confirmation, then update `metadataBase` in
  `app/layout.tsx` and the base URL in `app/sitemap.ts`
- Legal review of privacy notice, cookie notice, terms and complaints page
- Real photography (brief specifies authentic, non-cliché imagery)
- Registered office address in the footer (currently omitted; company number is in place)
# active-workforce-solutions
