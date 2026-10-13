import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { getCurrentAdmin } from "@/lib/auth";

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [row] = await db
    .select({
      charge: charges,
      clientName: clients.name,
      clientEmail: clients.email,
    })
    .from(charges)
    .innerJoin(clients, eq(charges.clientId, clients.id))
    .where(eq(charges.id, id))
    .limit(1);

  if (!row) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  if (row.charge.status === "paid") {
    return NextResponse.json({ ok: false, error: "already_paid" }, { status: 409 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const origin = new URL(request.url).origin;
  const payUrl = `${origin}/pay/${row.charge.id}`;
  const amount = formatAmount(row.charge.amount, row.charge.currency);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: row.clientEmail,
        subject: `Mios · ${row.charge.description} — ${amount}`,
        html: [
          `<p>Olá, ${row.clientName},</p>`,
          `<p>Segue o link para pagamento de <strong>${row.charge.description}</strong> (${amount}):</p>`,
          `<p><a href="${payUrl}">${payUrl}</a></p>`,
          `<p>Obrigado,<br>Mios</p>`,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      console.error("Send charge email: Resend error", res.status, payload);
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send charge email failed:", err);
    return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
