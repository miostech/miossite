import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { db, clients } from "@/db";
import { stripe } from "@/lib/stripe";
import { getCurrentAdmin } from "@/lib/auth";
import { countryByCode } from "@/lib/tax";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: NextRequest) {
  // /api is outside the (app) layout guard — enforce auth here.
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const form = await request.formData();
  const str = (k: string) => String(form.get(k) ?? "").trim();

  const name = str("name");
  const email = str("email").toLowerCase();
  const notes = str("notes");
  const project = str("project");
  const country = str("country").toUpperCase();
  const taxId = str("taxId");
  const addressLine1 = str("addressLine1");
  const addressLine2 = str("addressLine2");
  const addressCity = str("addressCity");
  const addressState = str("addressState");
  const addressPostalCode = str("addressPostalCode");

  const back = (error: string) =>
    NextResponse.redirect(
      new URL(`/admin/clients/new?error=${error}`, request.url),
      303,
    );

  if (!name || !EMAIL_RE.test(email)) return back("invalid");

  const countryInfo = country ? countryByCode(country) : null;
  const taxIdType = taxId && countryInfo ? countryInfo.taxLabel : null;

  // Only build a Stripe address if something was provided.
  const address: Stripe.AddressParam | undefined =
    addressLine1 || addressCity || addressPostalCode || country
      ? {
          line1: addressLine1 || undefined,
          line2: addressLine2 || undefined,
          city: addressCity || undefined,
          state: addressState || undefined,
          postal_code: addressPostalCode || undefined,
          country: country || undefined,
        }
      : undefined;

  try {
    // Create the Stripe customer first — if it fails, no client row is left
    // behind. Every client in the DB therefore has a Stripe customer.
    const customer = await stripe.customers.create({ name, email, address });

    const [client] = await db
      .insert(clients)
      .values({
        name,
        email,
        project: project || null,
        country: country || null,
        taxIdType,
        taxId: taxId || null,
        addressLine1: addressLine1 || null,
        addressLine2: addressLine2 || null,
        addressCity: addressCity || null,
        addressState: addressState || null,
        addressPostalCode: addressPostalCode || null,
        notes: notes || null,
        stripeCustomerId: customer.id,
      })
      .returning();

    // Link back, and keep project/tax visible on the Stripe side too.
    await stripe.customers.update(customer.id, {
      metadata: {
        clientId: client.id,
        ...(project ? { project } : {}),
        ...(taxId ? { taxId, taxIdType: taxIdType ?? "" } : {}),
      },
    });

    // Best-effort: register the tax id in Stripe's structured field so it
    // shows on invoices. Stripe validates the format, so a mismatch must not
    // fail client creation — we still have it stored in our DB.
    if (taxId && countryInfo?.stripeTaxType) {
      try {
        await stripe.customers.createTaxId(customer.id, {
          type: countryInfo.stripeTaxType as Stripe.TaxIdCreateParams.Type,
          value: taxId,
        });
      } catch (taxErr) {
        console.warn(
          "Stripe tax id rejected (stored in DB only):",
          taxErr instanceof Error ? taxErr.message : taxErr,
        );
      }
    }

    return NextResponse.redirect(new URL("/admin/clients", request.url), 303);
  } catch (err) {
    console.error("Create client failed:", err);
    return back("server");
  }
}
