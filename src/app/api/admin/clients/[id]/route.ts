import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db, clients } from "@/db";
import { stripe } from "@/lib/stripe";
import { getCurrentAdmin } from "@/lib/auth";
import { resolveDoc } from "@/lib/tax";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // /api is outside the (app) layout guard — enforce auth here.
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await params;

  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, id))
    .limit(1);
  if (!client) {
    return NextResponse.redirect(new URL("/admin/clients", request.url), 303);
  }

  const form = await request.formData();
  const str = (k: string) => String(form.get(k) ?? "").trim();

  const name = str("name");
  const email = str("email").toLowerCase();
  const notes = str("notes");
  const project = str("project");
  const country = str("country").toUpperCase();
  const taxDoc = str("taxDoc");
  const taxId = str("taxId");
  const addressLine1 = str("addressLine1");
  const addressLine2 = str("addressLine2");
  const addressCity = str("addressCity");
  const addressState = str("addressState");
  const addressPostalCode = str("addressPostalCode");

  const back = (error: string) =>
    NextResponse.redirect(
      new URL(`/admin/clients/${id}?error=${error}`, request.url),
      303,
    );

  if (!name || !EMAIL_RE.test(email)) return back("invalid");

  const doc = country ? resolveDoc(country, taxDoc) : null;
  const taxIdType = taxId && doc ? doc.label : null;

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
    await db
      .update(clients)
      .set({
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
      })
      .where(eq(clients.id, id));

    const cid = client.stripeCustomerId;
    if (cid) {
      await stripe.customers.update(cid, {
        name,
        email,
        address,
        metadata: {
          clientId: id,
          project: project || "",
          taxId: taxId || "",
          taxIdType: taxIdType ?? "",
        },
      });

      // Reconcile the structured tax id on Stripe (best-effort; a format the
      // Stripe API rejects must not fail the save — it's stored in our DB).
      try {
        const existing = await stripe.customers.listTaxIds(cid, { limit: 10 });
        for (const t of existing.data) {
          if (!taxId || t.value !== taxId) {
            await stripe.customers.deleteTaxId(cid, t.id);
          }
        }
        const alreadyThere = existing.data.some((t) => t.value === taxId);
        if (taxId && doc?.stripeTaxType && !alreadyThere) {
          await stripe.customers.createTaxId(cid, {
            type: doc.stripeTaxType as Stripe.TaxIdCreateParams.Type,
            value: taxId,
          });
        }
      } catch (taxErr) {
        console.warn(
          "Stripe tax id reconcile failed (stored in DB only):",
          taxErr instanceof Error ? taxErr.message : taxErr,
        );
      }
    }

    return NextResponse.redirect(new URL("/admin/clients", request.url), 303);
  } catch (err) {
    console.error("Update client failed:", err);
    return back("server");
  }
}
