import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOfferForm, type OfferFormValues } from "@/lib/validate";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: OfferFormValues;
  try {
    body = (await request.json()) as OfferFormValues;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Server-side revalidation — never trust the client (design §10 shared validate).
  const errors = validateOfferForm(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const rows: [string, string][] = [
    ["Name", body.name],
    ["Email", body.email],
    ["Phone", body.phone || "—"],
    ["State", body.state],
    ["County", body.county],
    ["Parcel / address", body.parcel || "—"],
    ["Acreage", body.acreage || "—"],
    ["Reference code", body.referenceCode || "—"],
    ["Notes", body.message || "—"],
    ["Source", body.source],
  ];

  const html = `
    <h2>New land offer request</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:600">${escapeHtml(k)}</td><td>${escapeHtml(
              String(v)
            )}</td></tr>`
        )
        .join("")}
    </table>`;

  const apiKey = process.env.RESEND_API_KEY;
  // Leads land in the public contact inbox (lib/site.ts) unless an env var
  // overrides it — e.g. to route staging traffic somewhere else.
  const to = process.env.LEAD_NOTIFICATION_TO || site.email;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  // Pre-launch fallback: if email isn't configured yet, log and succeed so the
  // form is testable. Configure RESEND_API_KEY + sender before go-live.
  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] Email not configured; lead not delivered. Payload:",
      JSON.stringify(body)
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `New land offer request — ${body.county}, ${body.state}`,
      html,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: `Delivery failed. Email us at ${site.email}.` },
      { status: 502 }
    );
  }
}
