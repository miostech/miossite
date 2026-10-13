import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, clients } from "@/db";

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export default async function NewChargePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const clientList = await db
    .select({ id: clients.id, name: clients.name, email: clients.email })
    .from(clients)
    .orderBy(desc(clients.createdAt));

  const message =
    error === "invalid"
      ? "Confira cliente, descrição e um valor maior que zero."
      : null;

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/charges"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        &larr; Cobranças
      </Link>
      <h1 className="display mt-4 text-3xl">Nova cobrança</h1>

      {clientList.length === 0 ? (
        <p className="mt-8 text-muted">
          Você precisa de um cliente primeiro.{" "}
          <Link href="/admin/clients/new" className="text-accent hover:underline">
            Criar cliente
          </Link>
          .
        </p>
      ) : (
        <form action="/api/admin/charges" method="post" className="mt-8 space-y-6">
          <div>
            <label htmlFor="clientId" className="label mb-1 block">
              Cliente
            </label>
            <select id="clientId" name="clientId" required className={FIELD}>
              {clientList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="label mb-1 block">
              Descrição
            </label>
            <input id="description" name="description" required className={FIELD} />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-6">
            <div>
              <label htmlFor="amount" className="label mb-1 block">
                Valor
              </label>
              <input
                id="amount"
                name="amount"
                inputMode="decimal"
                placeholder="100,00"
                required
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="currency" className="label mb-1 block">
                Moeda
              </label>
              <select id="currency" name="currency" className={FIELD}>
                <option value="usd">USD</option>
                <option value="brl">BRL</option>
                <option value="eur">EUR</option>
              </select>
            </div>
          </div>

          {message && (
            <p className="text-sm text-accent" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Criar cobrança
          </button>
        </form>
      )}
    </div>
  );
}
