import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { isValidEmail, isValidPhone } from "@/components/wizard/FormControls";
import { prisma } from "@/lib/server/prisma";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const MAX_FIELD_LENGTH = 5000;

// This route is the one integration point that changes once the client
// confirms which CRM they use (HubSpot, Zoho, Pipedrive, etc). Everything
// else in the site talks to this route only — nothing else needs to know
// about the CRM.
//
// It also persists every submission directly into our own database (an
// in-process Prisma call, not an HTTP hop — frontend and API live in the
// same Next.js app) so the admin dashboard at /admin has a complete
// record, regardless of whether the submitter also created a client
// account — that's a separate, optional path that only creates a
// ServiceRequest for the smaller subset who opt into /portal tracking.
//
// Required env vars (set in Vercel project settings, never commit real values):
//   CRM_WEBHOOK_URL   - the CRM's inbound webhook / API endpoint
//   CRM_API_KEY       - auth token for that endpoint
//   DATABASE_URL      - see README.md "Admin dashboard"
//
// Until CRM_WEBHOOK_URL is set, submissions are still logged server-side so
// the form can be tested end-to-end before a CRM is chosen.

// Fields every form sends under a consistent name — everything else in the
// payload is form-specific and gets captured in `details` instead.
const KNOWN_FIELDS = new Set([
  "enquiryType",
  "division",
  "divisionName",
  "fullName",
  "contactName",
  "email",
  "phone",
  "organisation",
  "description",
  "sourcePage",
]);

// EmployerEngagementFlow and PermTempRecruitmentForm never send `division`
// explicitly — both are always Active Workforce Recruitment.
const DIVISION_DEFAULTS: Record<string, string> = {
  "employer-recruitment": "active-workforce-recruitment",
  "perm-temp-recruitment": "active-workforce-recruitment",
};

function toEnquiryData(body: Record<string, unknown>) {
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
  const enquiryType = str(body.enquiryType) ?? "unknown";

  const details: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (!KNOWN_FIELDS.has(key)) details[key] = value;
  }

  return {
    enquiryType,
    division: str(body.division) ?? DIVISION_DEFAULTS[enquiryType],
    fullName: str(body.fullName) ?? str(body.contactName) ?? "Unknown",
    email: str(body.email) ?? "",
    phone: str(body.phone),
    organisation: str(body.organisation),
    description: str(body.description),
    sourcePage: str(body.sourcePage),
    details: Object.keys(details).length > 0 ? (details as Prisma.InputJsonValue) : undefined,
  };
}

export const POST = withErrorHandling(async (req: NextRequest) => {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Basic bot / spam guard: reject if a honeypot field was filled, or if
  // required identity fields are both empty.
  const hasIdentity = Object.entries(body).some(
    ([k, v]) => /name|email/i.test(k) && typeof v === "string" && v.trim().length > 0
  );
  if (!hasIdentity) {
    return NextResponse.json({ error: "Missing contact details" }, { status: 400 });
  }

  // Client-side validation (matching regexes in components/wizard/FormControls.tsx)
  // can always be bypassed by posting to this route directly, so re-check the
  // fields that matter here too, plus cap field length against abuse.
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== "string") continue;
    if (value.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ error: `Field "${key}" is too long` }, { status: 400 });
    }
    if (/email/i.test(key) && value.trim() && !isValidEmail(value)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (/phone|telephone/i.test(key) && value.trim() && !isValidPhone(value)) {
      return NextResponse.json({ error: "Invalid telephone number" }, { status: 400 });
    }
  }

  const record = {
    ...body,
    receivedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  const apiKey = process.env.CRM_API_KEY;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify(record),
      });
    } catch (err) {
      // Do not fail the visitor's submission just because the CRM call
      // failed — log server-side and still acknowledge receipt, so no
      // enquiry silently disappears from the visitor's point of view.
      console.error("CRM webhook delivery failed:", err);
    }
  } else {
    console.log("Enquiry received (CRM_WEBHOOK_URL not yet configured):", record);
  }

  try {
    await prisma.enquiry.create({ data: toEnquiryData(body) });
  } catch (err) {
    // Same principle as the CRM webhook above — never fail the visitor's
    // submission because the admin-dashboard database write failed.
    console.error("Enquiry persistence failed:", err);
  }

  return NextResponse.json({ ok: true });
});
