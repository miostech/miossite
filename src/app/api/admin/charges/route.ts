import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { getCurrentAdmin } from "@/lib/auth";
import { sendChargePaymentEmail } from "@/lib/charge-email";

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const clientId = String(form.get("clientId") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const currency = String(form.get("currency") ?? "brl").trim().toLowerCase();
  const amountRaw = String(form.get("amount") ?? "").trim().replace(",", ".");
  const type = form.get("type") === "recurring" ? "recurring" : "one_off";
  const interval = form.get("interval") === "year" ? "year" : "month";
  // "YYYY-MM-DD" from the date input; only kept for one-off charges.
  const dueRaw = String(form.get("dueDate") ?? "").trim();
  const dueDate = type === "one_off" && /^\d{4}-\d{2}-\d{2}$/.test(dueRaw)
    ? dueRaw
    : null;
  // Checkbox: notify the client by e-mail on creation (default on in the form).
  const notify = form.get("notify") === "on";

  const back = (error: string) =>
    NextResponse.redirect(
      new URL(`/admin/charges/new?error=${error}`, request.url),
      303,
    );

  // Major unit (e.g. 100.50) -> minor unit (cents) to match Stripe.
  const amountMajor = Number(amountRaw);
  const amount = Math.round(amountMajor * 100);

  if (!clientId || !description || !Number.isFinite(amountMajor) || amount <= 0) {
    return back("invalid");
  }

  // Ensure the client exists (and belongs to us).
  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, clientId))
    .limit(1);
  if (!client) return back("invalid");

  const [charge] = await db
    .insert(charges)
    .values({
      clientId,
      type,
      description,
      amount,
      currency,
      interval: type === "recurring" ? interval : null,
      dueDate,
      status: "pending",
    })
    .returning();

  // Notify the client with the payment link (best-effort: a mail failure must
  // not undo the charge). The admin can still resend from the list.
  if (notify) {
    const baseUrl = process.env.SITE_URL || new URL(request.url).origin;
    const result = await sendChargePaymentEmail({
      id: charge.id,
      description,
      amount,
      currency,
      dueDate,
      clientName: client.name,
      clientEmail: client.email,
      baseUrl,
    });
    if (!result.ok) {
      console.warn("Charge created but notification failed:", result.error);
    }
  }

  return NextResponse.redirect(new URL("/admin/charges", request.url), 303);
}
