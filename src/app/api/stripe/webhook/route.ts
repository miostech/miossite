import type { NextRequest } from "next/server";
import type Stripe from "stripe";
import { and, eq, ne } from "drizzle-orm";
import { db, charges } from "@/db";
import { stripe } from "@/lib/stripe";

// Stripe needs the raw request body to verify the signature, so this must run
// on the Node runtime (not edge) and read the body as text.
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Stripe webhook: STRIPE_WEBHOOK_SECRET is not set.");
    return new Response("Webhook not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid payload";
    console.error("Stripe webhook: signature verification failed", message);
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  try {
    await handleEvent(event);
  } catch (err) {
    // Log and return 500 so Stripe retries the delivery.
    console.error("Stripe webhook: handler error", event.type, err);
    return new Response("Handler error", { status: 500 });
  }

  return Response.json({ received: true });
}

// Mark a charge paid once, without overwriting an already-paid record.
async function markPaid(chargeId: string, paymentIntentId: string | null) {
  await db
    .update(charges)
    .set({
      status: "paid",
      paidAt: new Date(),
      ...(paymentIntentId ? { stripePaymentIntentId: paymentIntentId } : {}),
    })
    .where(and(eq(charges.id, chargeId), ne(charges.status, "paid")));
}

async function setStatus(
  chargeId: string,
  status: "failed" | "canceled",
) {
  await db
    .update(charges)
    .set({ status })
    .where(and(eq(charges.id, chargeId), ne(charges.status, "paid")));
}

function piId(pi: string | { id: string } | null | undefined): string | null {
  if (!pi) return null;
  return typeof pi === "string" ? pi : pi.id;
}

async function handleEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      const chargeId = session.metadata?.chargeId;
      const paid =
        session.payment_status === "paid" ||
        session.payment_status === "no_payment_required";
      if (chargeId && paid) {
        await markPaid(chargeId, piId(session.payment_intent));
        console.log("Webhook: charge paid", chargeId);
      }
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const chargeId = session.metadata?.chargeId;
      if (chargeId) {
        await setStatus(chargeId, "failed");
        console.log("Webhook: charge failed", chargeId);
      }
      break;
    }

    // Recurring (phase 6): invoices carry the chargeId in metadata when we set it.
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const chargeId = invoice.metadata?.chargeId;
      if (chargeId) {
        await markPaid(chargeId, null);
        console.log("Webhook: invoice paid -> charge", chargeId);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const chargeId = invoice.metadata?.chargeId;
      if (chargeId) {
        await setStatus(chargeId, "failed");
        console.log("Webhook: invoice failed -> charge", chargeId);
      }
      break;
    }

    default:
      // Unhandled events are acknowledged (200) without action.
      break;
  }
}
