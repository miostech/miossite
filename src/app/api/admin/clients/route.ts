import { NextResponse, type NextRequest } from "next/server";
import { db, clients } from "@/db";
import { stripe } from "@/lib/stripe";
import { getCurrentAdmin } from "@/lib/auth";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: NextRequest) {
  // /api is outside the (app) layout guard — enforce auth here.
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const notes = String(form.get("notes") ?? "").trim();

  const back = (error: string) =>
    NextResponse.redirect(
      new URL(`/admin/clients/new?error=${error}`, request.url),
      303,
    );

  if (!name || !EMAIL_RE.test(email)) return back("invalid");

  try {
    // Create the Stripe customer first — if it fails, no client row is left
    // behind. Every client in the DB therefore has a Stripe customer.
    const customer = await stripe.customers.create({ name, email });

    const [client] = await db
      .insert(clients)
      .values({
        name,
        email,
        notes: notes || null,
        stripeCustomerId: customer.id,
      })
      .returning();

    // Link back so the Stripe customer points at our record too.
    await stripe.customers.update(customer.id, {
      metadata: { clientId: client.id },
    });

    return NextResponse.redirect(new URL("/admin/clients", request.url), 303);
  } catch (err) {
    console.error("Create client failed:", err);
    return back("server");
  }
}
