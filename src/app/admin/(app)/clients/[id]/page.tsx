import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, clients } from "@/db";
import { ClientFiscalFields } from "@/components/ClientFiscalFields";
import { SubmitButton } from "@/components/SubmitButton";

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export default async function EditClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, id))
    .limit(1);

  if (!client) notFound();

  const message =
    error === "invalid"
      ? "Confira o nome e um e-mail válido."
      : error === "server"
        ? "Não foi possível salvar no Stripe. Tente novamente."
        : null;

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/clients"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        &larr; Clientes
      </Link>
      <h1 className="display mt-4 text-3xl">Editar cliente</h1>
      {client.stripeCustomerId && (
        <p className="mt-2 font-mono text-xs text-muted">
          {client.stripeCustomerId}
        </p>
      )}

      <form
        action={`/api/admin/clients/${client.id}`}
        method="post"
        className="mt-8 space-y-6"
      >
        <div>
          <label htmlFor="name" className="label mb-1 block">
            Nome
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={client.name}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="email" className="label mb-1 block">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={client.email}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="project" className="label mb-1 block">
            Projeto (opcional)
          </label>
          <input
            id="project"
            name="project"
            defaultValue={client.project ?? ""}
            className={FIELD}
          />
        </div>

        <ClientFiscalFields
          defaults={{
            country: client.country,
            taxIdType: client.taxIdType,
            taxId: client.taxId,
            addressLine1: client.addressLine1,
            addressLine2: client.addressLine2,
            addressCity: client.addressCity,
            addressState: client.addressState,
            addressPostalCode: client.addressPostalCode,
          }}
        />

        <div>
          <label htmlFor="notes" className="label mb-1 block">
            Notas (opcional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={client.notes ?? ""}
            className={`${FIELD} resize-none`}
          />
        </div>

        {message && (
          <p className="text-sm text-accent" role="alert">
            {message}
          </p>
        )}

        <div className="flex items-center gap-4">
          <SubmitButton pendingLabel="Salvando…">Salvar</SubmitButton>
          <Link
            href="/admin/clients"
            className="text-sm text-muted underline-offset-4 hover:underline"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
