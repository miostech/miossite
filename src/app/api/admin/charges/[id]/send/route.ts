import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { getCurrentAdmin } from "@/lib/auth";
import { sendChargePaymentEmail } from "@/lib/charge-email";

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

  const baseUrl = process.env.SITE_URL || new URL(request.url).origin;
  const result = await sendChargePaymentEmail({
    id: row.charge.id,
    description: row.charge.description,
    amount: row.charge.amount,
    currency: row.charge.currency,
    dueDate: row.charge.dueDate,
    clientName: row.clientName,
    clientEmail: row.clientEmail,
    baseUrl,
  });

  if (!result.ok) {
    const status = result.error === "not_configured" ? 503 : 502;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }
  return NextResponse.json({ ok: true });
}
