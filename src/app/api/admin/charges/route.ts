import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { getCurrentAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const clientId = String(form.get("clientId") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const currency = String(form.get("currency") ?? "usd").trim().toLowerCase();
  const amountRaw = String(form.get("amount") ?? "").trim().replace(",", ".");

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

  await db.insert(charges).values({
    clientId,
    type: "one_off",
    description,
    amount,
    currency,
    status: "pending",
  });

  return NextResponse.redirect(new URL("/admin/charges", request.url), 303);
}
