import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { PayCheckout } from "@/components/PayCheckout";

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [row] = await db
    .select({ charge: charges, clientName: clients.name })
    .from(charges)
    .innerJoin(clients, eq(charges.clientId, clients.id))
    .where(eq(charges.id, id))
    .limit(1);

  if (!row) notFound();
  const { charge, clientName } = row;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        Mios · Pagamento
      </span>
      <h1 className="display mt-3 text-3xl">{charge.description}</h1>
      <p className="mt-2 text-muted">
        {clientName} · {formatAmount(charge.amount, charge.currency)}
      </p>

      <div className="mt-10">
        {charge.status === "paid" ? (
          <div className="border border-line bg-paper-2/40 p-8">
            <p className="display text-xl">Pagamento confirmado</p>
            <p className="mt-2 text-sm text-muted">
              Esta cobrança já foi paga. Obrigado!
            </p>
          </div>
        ) : (
          <PayCheckout chargeId={charge.id} />
        )}
      </div>
    </main>
  );
}
