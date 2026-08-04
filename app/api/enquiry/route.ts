import { NextRequest, NextResponse } from "next/server";

// This route is the one integration point that changes once the client
// confirms which CRM they use (HubSpot, Zoho, Pipedrive, etc). Everything
// else in the site talks to this route only — nothing else needs to know
// about the CRM.
//
// Required env vars (set in Vercel project settings, never commit real values):
//   CRM_WEBHOOK_URL   - the CRM's inbound webhook / API endpoint
//   CRM_API_KEY       - auth token for that endpoint
//
// Until those are set, submissions are logged server-side only so the
// form can be tested end-to-end before the CRM is wired up.

export async function POST(req: NextRequest) {
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

  return NextResponse.json({ ok: true });
}
