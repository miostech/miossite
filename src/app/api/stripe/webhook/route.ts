import type { NextRequest } from "next/server";
import type Stripe from "stripe";
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
    return new Response(`Webhook signature verification failed`, {
      status: 400,
    });
  }

  // Phase 5 will update the matching charge in the database here. For now the
  // endpoint verifies the signature and acknowledges receipt.
  switch (event.type) {
    case "checkout.session.completed":
    case "invoice.paid":
    case "invoice.payment_failed":
    case "customer.subscription.deleted":
      console.log("Stripe webhook:", event.type, event.id);
      break;
    default:
      console.log("Stripe webhook (unhandled):", event.type, event.id);
  }

  return Response.json({ received: true });
}
