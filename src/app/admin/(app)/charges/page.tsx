import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";

const STATUS_LABEL: Record<string, string> = {
  draft: "Rascunho",
  pending: "Aguardando",
  paid: "Pago",
  failed: "Falhou",
  canceled: "Cancelado",
  refunded: "Reembolsado",
};

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function ChargesPage() {
  const rows = await db
    .select({
      id: charges.id,
      description: charges.description,
      amount: charges.amount,
      currency: charges.currency,
      status: charges.status,
      createdAt: charges.createdAt,
      clientName: clients.name,
    })
    .from(charges)
    .innerJoin(clients, eq(charges.clientId, clients.id))
    .orderBy(desc(charges.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl">Cobranças</h1>
        <Link
          href="/admin/charges/new"
          className="inline-flex items-center bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Nova cobrança
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 text-muted">Nenhuma cobrança ainda.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-2/40">
              <tr>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Descrição</th>
                <th className="px-5 py-3 font-medium">Valor</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 text-ink">{c.clientName}</td>
                  <td className="px-5 py-3 text-muted">{c.description}</td>
                  <td className="px-5 py-3 text-ink">
                    {formatAmount(c.amount, c.currency)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        c.status === "paid"
                          ? "text-green-700"
                          : c.status === "pending"
                            ? "text-accent"
                            : "text-muted"
                      }
                    >
                      {STATUS_LABEL[c.status] ?? c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {c.status === "paid" ? (
                      <span className="text-xs text-muted">—</span>
                    ) : (
                      <Link
                        href={`/pay/${c.id}`}
                        target="_blank"
                        className="font-mono text-xs text-accent underline-offset-4 hover:underline"
                      >
                        /pay/{c.id.slice(0, 8)}…
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
