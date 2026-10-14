import { NextResponse, type NextRequest } from "next/server";
import { and, eq, isNotNull, lt, or, isNull } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { sendChargePaymentEmail } from "@/lib/charge-email";

// Don't email the same overdue charge more often than this.
const REMINDER_INTERVAL_DAYS = 3;

// Scheduled by Vercel Cron (see vercel.json). Vercel attaches
// `Authorization: Bearer <CRON_SECRET>` when the CRON_SECRET env is set, so we
// require it — otherwise anyone could trigger a batch of client emails.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const cutoff = new Date(Date.now() - REMINDER_INTERVAL_DAYS * 86400_000);

  // Pending, overdue, and not reminded within the interval.
  const rows = await db
    .select({
      charge: charges,
      clientName: clients.name,
      clientEmail: clients.email,
    })
    .from(charges)
    .innerJoin(clients, eq(charges.clientId, clients.id))
    .where(
      and(
        eq(charges.status, "pending"),
        isNotNull(charges.dueDate),
        lt(charges.dueDate, today),
        or(
          isNull(charges.lastReminderAt),
          lt(charges.lastReminderAt, cutoff),
        ),
      ),
    );

  const baseUrl = process.env.SITE_URL || new URL(request.url).origin;
  let sent = 0;

  for (const r of rows) {
    const result = await sendChargePaymentEmail({
      id: r.charge.id,
      description: r.charge.description,
      amount: r.charge.amount,
      currency: r.charge.currency,
      dueDate: r.charge.dueDate,
      clientName: r.clientName,
      clientEmail: r.clientEmail,
      baseUrl,
    });
    if (result.ok) {
      await db
        .update(charges)
        .set({ lastReminderAt: new Date() })
        .where(eq(charges.id, r.charge.id));
      sent++;
    }
  }

  console.log(`Cron reminders: ${sent}/${rows.length} sent`);
  return NextResponse.json({ ok: true, candidates: rows.length, sent });
}
