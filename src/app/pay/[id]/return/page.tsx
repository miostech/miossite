import Link from "next/link";
import { eq } from "drizzle-orm";
import { db, charges } from "@/db";
import { stripe } from "@/lib/stripe";

export default async function PayReturnPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { id } = await params;
  const { session_id } = await searchParams;

  let paid = false;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid =
        session.status === "complete" && session.payment_status === "paid";
    } catch {
      paid = false;
    }
  }

  // Convenience reflection; the webhook (phase 5) is the authoritative update.
  if (paid) {
    const [c] = await db
      .select({ status: charges.status })
      .from(charges)
      .where(eq(charges.id, id))
      .limit(1);
    if (c && c.status !== "paid") {
      await db
        .update(charges)
        .set({ status: "paid", paidAt: new Date() })
        .where(eq(charges.id, id));
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      {paid ? (
        <>
          <span aria-hidden className="text-4xl text-accent">
            →
          </span>
          <h1 className="display mt-4 text-3xl">Pagamento confirmado</h1>
          <p className="mt-3 text-muted">
            Recebemos o seu pagamento. Obrigado!
          </p>
        </>
      ) : (
        <>
          <h1 className="display text-3xl">Pagamento pendente</h1>
          <p className="mt-3 text-muted">
            Ainda não confirmamos este pagamento. Se você concluiu agora, pode
            levar alguns instantes.
          </p>
          <Link
            href={`/pay/${id}`}
            className="mt-6 inline-flex items-center bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Voltar ao pagamento
          </Link>
        </>
      )}
    </main>
  );
}
