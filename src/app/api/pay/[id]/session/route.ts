import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { stripe } from "@/lib/stripe";

// Public: a client opening their payment page creates an embedded Checkout
// Session on demand (always fresh, so it never hits the 24h expiry).
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [row] = await db
    .select({
      charge: charges,
      stripeCustomerId: clients.stripeCustomerId,
    })
    .from(charges)
    .innerJoin(clients, eq(charges.clientId, clients.id))
    .where(eq(charges.id, id))
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (row.charge.status === "paid") {
    return NextResponse.json({ error: "already_paid" }, { status: 409 });
  }

  const origin = new URL(request.url).origin;
  const recurring = row.charge.type === "recurring";

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: recurring ? "subscription" : "payment",
      customer: row.stripeCustomerId ?? undefined,
      line_items: [
        {
          price_data: {
            currency: row.charge.currency,
            product_data: { name: row.charge.description },
            unit_amount: row.charge.amount,
            ...(recurring
              ? { recurring: { interval: row.charge.interval ?? "month" } }
              : {}),
          },
          quantity: 1,
        },
      ],
      metadata: { chargeId: row.charge.id },
      // Carry the chargeId where the relevant lifecycle events can read it:
      // the payment intent (one-off) or the subscription + its invoices.
      // One-off: ask Stripe to issue an invoice so we have a receipt to share.
      // (Subscriptions already generate an invoice per cycle.)
      ...(recurring
        ? { subscription_data: { metadata: { chargeId: row.charge.id } } }
        : {
            payment_intent_data: { metadata: { chargeId: row.charge.id } },
            invoice_creation: { enabled: true },
          }),
      return_url: `${origin}/pay/${row.charge.id}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Keep the latest session id for webhook matching.
    await db
      .update(charges)
      .set({ stripeCheckoutSessionId: session.id })
      .where(eq(charges.id, row.charge.id));

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Create checkout session failed:", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 500 });
  }
}
