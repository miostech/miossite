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
async function markPaid(
  chargeId: string,
  extra: { paymentIntentId?: string | null; subscriptionId?: string | null } = {},
) {
  await db
    .update(charges)
    .set({
      status: "paid",
      paidAt: new Date(),
      ...(extra.paymentIntentId
        ? { stripePaymentIntentId: extra.paymentIntentId }
        : {}),
      ...(extra.subscriptionId
        ? { stripeSubscriptionId: extra.subscriptionId }
        : {}),
    })
    .where(and(eq(charges.id, chargeId), ne(charges.status, "paid")));
}

async function setStatus(chargeId: string, status: "failed" | "canceled") {
  // A recurring charge that later fails or is canceled should move off "paid".
  await db.update(charges).set({ status }).where(eq(charges.id, chargeId));
}

function idOf(
  v: string | { id: string } | null | undefined,
): string | null {
  if (!v) return null;
  return typeof v === "string" ? v : v.id;
}

// Renewal invoices don't carry our metadata, so match the charge by its
// subscription id instead.
async function chargeIdForSubscription(
  subscriptionId: string | null,
): Promise<string | null> {
  if (!subscriptionId) return null;
  const [row] = await db
    .select({ id: charges.id })
    .from(charges)
    .where(eq(charges.stripeSubscriptionId, subscriptionId))
    .limit(1);
  return row?.id ?? null;
}

// Save the Stripe invoice reference (id + hosted page) so the admin can pull
// up the receipt later.
async function storeInvoice(
  chargeId: string,
  invoiceId: string | null,
  invoiceUrl: string | null,
) {
  if (!invoiceId && !invoiceUrl) return;
  await db
    .update(charges)
    .set({
      ...(invoiceId ? { stripeInvoiceId: invoiceId } : {}),
      ...(invoiceUrl ? { stripeInvoiceUrl: invoiceUrl } : {}),
    })
    .where(eq(charges.id, chargeId));
}

type InvoiceWithSub = Stripe.Invoice & {
  subscription?: string | { id: string } | null;
};

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
        await markPaid(chargeId, {
          paymentIntentId: idOf(session.payment_intent),
          subscriptionId: idOf(session.subscription),
        });
        // One-off sessions issue an invoice; fetch its hosted page to store.
        const invoiceId = idOf(session.invoice);
        if (invoiceId) {
          try {
            const inv = await stripe.invoices.retrieve(invoiceId);
            await storeInvoice(chargeId, inv.id, inv.hosted_invoice_url ?? null);
          } catch (invErr) {
            console.warn("Webhook: could not fetch invoice", invErr);
          }
        }
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

    // Recurring renewals: keep the charge marked paid each cycle.
    case "invoice.paid": {
      const invoice = event.data.object as InvoiceWithSub;
      const chargeId =
        invoice.metadata?.chargeId ??
        (await chargeIdForSubscription(idOf(invoice.subscription)));
      if (chargeId) {
        await markPaid(chargeId);
        await storeInvoice(chargeId, invoice.id, invoice.hosted_invoice_url ?? null);
        console.log("Webhook: invoice paid -> charge", chargeId);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as InvoiceWithSub;
      const chargeId =
        invoice.metadata?.chargeId ??
        (await chargeIdForSubscription(idOf(invoice.subscription)));
      if (chargeId) {
        await setStatus(chargeId, "failed");
        console.log("Webhook: invoice failed -> charge", chargeId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const chargeId = await chargeIdForSubscription(sub.id);
      if (chargeId) {
        await setStatus(chargeId, "canceled");
        console.log("Webhook: subscription canceled -> charge", chargeId);
      }
      break;
    }

    default:
      // Unhandled events are acknowledged (200) without action.
      break;
  }
}
