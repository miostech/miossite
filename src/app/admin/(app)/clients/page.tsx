import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, clients } from "@/db";

export default async function ClientsPage() {
  const rows = await db.select().from(clients).orderBy(desc(clients.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl">Clientes</h1>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Novo cliente
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 text-muted">
          Nenhum cliente ainda. Crie o primeiro.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-2/40">
              <tr>
                <th className="px-5 py-3 font-medium">Nome</th>
                <th className="px-5 py-3 font-medium">E-mail</th>
                <th className="px-5 py-3 font-medium">Stripe</th>
                <th className="px-5 py-3 font-medium">Criado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 text-ink">{c.name}</td>
                  <td className="px-5 py-3 text-muted">{c.email}</td>
                  <td className="px-5 py-3">
                    {c.stripeCustomerId ? (
                      <span className="font-mono text-xs text-muted">
                        {c.stripeCustomerId}
                      </span>
                    ) : (
                      <span className="text-xs text-accent">pendente</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-muted">
                    {new Date(c.createdAt).toLocaleDateString("pt-BR")}
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
