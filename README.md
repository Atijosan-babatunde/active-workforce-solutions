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

Active Workforce Recruitment's "Get Started" flow (`components/EmployerEngagementFlow.tsx`)
creates a real account and request record via [Supabase](https://supabase.com) (Postgres +
built-in email/password auth), so an employer can log back in at `/portal/login` and see the
status of what they submitted at `/portal`.

**One-time setup:**
1. Create a free project at supabase.com.
2. In the SQL editor, run:
   ```sql
   create table employer_requests (
     id uuid primary key default gen_random_uuid(),
     user_id uuid references auth.users(id) not null,
     postcode text,
     role_type text,
     number_needed text,
     urgency text,
     driver_required boolean default false,
     preferences text,
     organisation text,
     contact_name text,
     phone text,
     description text,
     status text not null default 'submitted', -- submitted | being_matched | candidates_proposed | filled
     created_at timestamptz not null default now()
   );

   alter table employer_requests enable row level security;

   create policy "Users can view their own requests"
     on employer_requests for select using (auth.uid() = user_id);

   create policy "Users can insert their own requests"
     on employer_requests for insert with check (auth.uid() = user_id);
   ```
3. In Authentication settings, disable "Confirm email" — this keeps sign-up a single step (no
   pending-confirmation state to build). Re-enable later if a real verification email flow is wanted.
4. Copy the Project URL and anon public key into `.env.local` / Vercel project env vars as
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).

**Updating a request's status:** there's no admin UI yet — open the Supabase Table Editor →
`employer_requests` and edit the `status` cell directly. The employer sees the change next time
they load `/portal`.

**Still to build:** real candidate matching (status is a manually-set label, not driven by any
matching logic), a proper staff admin view, and password reset. Submissions still also flow
through the existing `app/api/enquiry/route.ts` CRM webhook unchanged, so Supabase and the future
Zoho connection are independent of each other.

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
- Create the Supabase project and env vars for the client portal (see "Client accounts & portal" above) —
  without them, the "Get Started"/"Login" flow on Active Workforce Recruitment will error
- Real content for the five remaining divisions
- Final domain + hosting confirmation, then update `metadataBase` in
  `app/layout.tsx` and the base URL in `app/sitemap.ts`
- Legal review of privacy notice, cookie notice, terms and complaints page
- Real photography (brief specifies authentic, non-cliché imagery)
- Company number / registered office details in the footer
# active-workforce-solutions
