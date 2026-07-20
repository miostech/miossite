import { NextResponse } from "next/server";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let name = "";
  let company = "";
  let email = "";
  let phone = "";
  let lang = "";
  try {
    const body = await request.json();
    name = String(body?.name ?? "").trim();
    company = String(body?.company ?? "").trim();
    email = String(body?.email ?? "").trim().toLowerCase();
    phone = String(body?.phone ?? "").trim();
    lang = String(body?.lang ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (!name || !company || !phone || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  const to =
    process.env.PORTFOLIO_LEADS_TO ?? process.env.CONTACT_TO ?? "hello@miostec.com";
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  console.log("Portfolio lead:", { name, company, email, phone, lang });

  if (apiKey && from) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject: `Portfólio · novo lead: ${name}${
            company ? ` (${company})` : ""
          }`,
          text: [
            `Nome: ${name}`,
            `Empresa: ${company}`,
            `E-mail: ${email}`,
            `Telefone: ${phone}`,
            `Idioma: ${lang || "-"}`,
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("Portfolio lead: email send failed", err);
    }
  } else {
    console.warn(
      "Portfolio lead: RESEND_API_KEY and/or NEWSLETTER_FROM not set; lead only logged.",
    );
  }

  if (apiKey && audienceId) {
    try {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: name,
          last_name: company,
          unsubscribed: false,
        }),
      });
    } catch (err) {
      console.error("Portfolio lead: audience add failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
