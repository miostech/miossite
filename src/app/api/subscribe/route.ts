import { NextResponse } from "next/server";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let email = "";
  let lang = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
    lang = String(body?.lang ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error(
      "Newsletter: RESEND_API_KEY and/or RESEND_AUDIENCE_ID are not configured.",
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          unsubscribed: false,
          first_name: lang ? `lang:${lang}` : undefined,
        }),
      },
    );

    const payload = await res.json().catch(() => ({}));

    // Resend returns an error when the contact already exists; treat that as success.
    const alreadyExists =
      !res.ok &&
      typeof payload?.message === "string" &&
      /already exists|duplicate/i.test(payload.message);

    if (!res.ok && !alreadyExists) {
      console.error("Newsletter: Resend contact error", res.status, payload);
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter: unexpected error", err);
    return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
