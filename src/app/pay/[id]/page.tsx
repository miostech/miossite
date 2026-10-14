import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { PayCheckout } from "@/components/PayCheckout";
import { whatsappLink } from "@/lib/site";

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

      {charge.status !== "paid" && (
        <footer className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span>
            Ambiente seguro. O pagamento é processado pela Stripe — a Mios não
            tem acesso aos dados do seu cartão. Qualquer dúvida,{" "}
            <a
              href={whatsappLink("Olá! Tenho uma dúvida sobre um pagamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-accent"
            >
              fale com a gente no WhatsApp
            </a>
            .
          </span>
        </footer>
      )}
    </main>
  );
}
