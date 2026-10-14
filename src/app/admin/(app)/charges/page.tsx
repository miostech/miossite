import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db, charges, clients } from "@/db";
import { ChargeRowActions } from "@/components/ChargeRowActions";

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

function formatDate(d: string) {
  // d is "YYYY-MM-DD"; render without timezone drift.
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

type Filter = "all" | "open" | "overdue" | "paid";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "open", label: "Em aberto" },
  { key: "overdue", label: "Atrasadas" },
  { key: "paid", label: "Pagas" },
];

export default async function ChargesPage({
  searchParams,
}: {
  searchParams: Promise<{ f?: string }>;
}) {
  const { f } = await searchParams;
  const filter: Filter = FILTERS.some((x) => x.key === f)
    ? (f as Filter)
    : "all";

  const rows = await db
    .select({
      id: charges.id,
      description: charges.description,
      amount: charges.amount,
      currency: charges.currency,
      status: charges.status,
      type: charges.type,
      interval: charges.interval,
      dueDate: charges.dueDate,
      createdAt: charges.createdAt,
      clientName: clients.name,
    })
    .from(charges)
    .innerJoin(clients, eq(charges.clientId, clients.id))
    .orderBy(desc(charges.createdAt));

  const today = new Date().toISOString().slice(0, 10);
  const overdue = (c: (typeof rows)[number]) =>
    c.status === "pending" && !!c.dueDate && c.dueDate < today;
  const bucket = (c: (typeof rows)[number]): Filter | "other" =>
    c.status === "paid"
      ? "paid"
      : overdue(c)
        ? "overdue"
        : c.status === "pending"
          ? "open"
          : "other";

  const counts = {
    all: rows.length,
    open: rows.filter((c) => bucket(c) === "open").length,
    overdue: rows.filter((c) => bucket(c) === "overdue").length,
    paid: rows.filter((c) => bucket(c) === "paid").length,
  };

  const visible =
    filter === "all" ? rows : rows.filter((c) => bucket(c) === filter);

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

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((t) => (
          <Link
            key={t.key}
            href={t.key === "all" ? "/admin/charges" : `/admin/charges?f=${t.key}`}
            className={`inline-flex items-center gap-2 border px-4 py-2 text-sm transition-colors ${
              filter === t.key
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {t.label}
            <span
              className={
                t.key === "overdue" && counts.overdue > 0 && filter !== t.key
                  ? "text-accent"
                  : "opacity-60"
              }
            >
              {counts[t.key]}
            </span>
          </Link>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-muted">Nenhuma cobrança nesta aba.</p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-2/40">
              <tr>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Descrição</th>
                <th className="px-5 py-3 font-medium">Tipo</th>
                <th className="px-5 py-3 font-medium">Valor</th>
                <th className="px-5 py-3 font-medium">Vencimento</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => {
                const isOverdue = overdue(c);
                return (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 text-ink">{c.clientName}</td>
                    <td className="px-5 py-3 text-muted">{c.description}</td>
                    <td className="px-5 py-3 text-muted">
                      {c.type === "recurring"
                        ? `Recorrente · ${c.interval === "year" ? "anual" : "mensal"}`
                        : "Avulsa"}
                    </td>
                    <td className="px-5 py-3 text-ink">
                      {formatAmount(c.amount, c.currency)}
                    </td>
                    <td
                      className={`px-5 py-3 ${isOverdue ? "text-accent" : "text-muted"}`}
                    >
                      {c.dueDate ? formatDate(c.dueDate) : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          c.status === "paid"
                            ? "text-green-700"
                            : isOverdue
                              ? "text-accent"
                              : c.status === "pending"
                                ? "text-ink"
                                : "text-muted"
                        }
                      >
                        {isOverdue ? "Atrasada" : (STATUS_LABEL[c.status] ?? c.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {c.status === "paid" ? (
                        <span className="text-xs text-muted">—</span>
                      ) : (
                        <ChargeRowActions chargeId={c.id} overdue={isOverdue} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
