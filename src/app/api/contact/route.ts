import { NextResponse } from "next/server";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let name = "";
  let email = "";
  let company = "";
  let message = "";
  let lang = "";
  let trap = "";
  try {
    const body = await request.json();
    name = String(body?.name ?? "").trim();
    email = String(body?.email ?? "").trim().toLowerCase();
    company = String(body?.company ?? "").trim();
    message = String(body?.message ?? "").trim();
    lang = String(body?.lang ?? "").trim();
    trap = String(body?.website ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: the field is hidden from humans, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and does not retry.
  if (trap) {
    console.warn("Contact: honeypot triggered", { email });
    return NextResponse.json({ ok: true });
  }

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  const to = process.env.CONTACT_TO ?? "hello@miostec.com";

  console.log("Contact:", { name, company, email, lang });

  if (!apiKey || !from) {
    console.error(
      "Contact: RESEND_API_KEY and/or NEWSLETTER_FROM are not configured.",
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Contato · ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Nome: ${name}`,
          `E-mail: ${email}`,
          `Empresa: ${company || "-"}`,
          `Idioma: ${lang || "-"}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      console.error("Contact: Resend email error", res.status, payload);
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact: unexpected error", err);
    return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
