import Link from "next/link";
import { ClientFiscalFields } from "@/components/ClientFiscalFields";

const FIELD =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export default async function NewClientPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const message =
    error === "invalid"
      ? "Confira o nome e um e-mail válido."
      : error === "server"
        ? "Não foi possível criar no Stripe. Tente novamente."
        : null;

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/clients"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        &larr; Clientes
      </Link>
      <h1 className="display mt-4 text-3xl">Novo cliente</h1>
      <p className="mt-2 text-sm text-muted">
        Cria o cliente e o Customer correspondente no Stripe.
      </p>

      <form action="/api/admin/clients" method="post" className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="label mb-1 block">
            Nome
          </label>
          <input id="name" name="name" required className={FIELD} />
        </div>
        <div>
          <label htmlFor="email" className="label mb-1 block">
            E-mail
          </label>
          <input id="email" name="email" type="email" required className={FIELD} />
        </div>
        <div>
          <label htmlFor="project" className="label mb-1 block">
            Projeto (opcional)
          </label>
          <input id="project" name="project" className={FIELD} />
        </div>

        <ClientFiscalFields />

        <fieldset className="space-y-6 border-t border-line pt-6">
          <legend className="label text-muted">Endereço (opcional)</legend>
          <div>
            <label htmlFor="addressLine1" className="label mb-1 block">
              Endereço
            </label>
            <input id="addressLine1" name="addressLine1" className={FIELD} />
          </div>
          <div>
            <label htmlFor="addressLine2" className="label mb-1 block">
              Complemento
            </label>
            <input id="addressLine2" name="addressLine2" className={FIELD} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="addressCity" className="label mb-1 block">
                Cidade
              </label>
              <input id="addressCity" name="addressCity" className={FIELD} />
            </div>
            <div>
              <label htmlFor="addressState" className="label mb-1 block">
                Estado / Província
              </label>
              <input id="addressState" name="addressState" className={FIELD} />
            </div>
          </div>
          <div>
            <label htmlFor="addressPostalCode" className="label mb-1 block">
              CEP / Código postal
            </label>
            <input id="addressPostalCode" name="addressPostalCode" className={FIELD} />
          </div>
        </fieldset>

        <div>
          <label htmlFor="notes" className="label mb-1 block">
            Notas (opcional)
          </label>
          <textarea id="notes" name="notes" rows={3} className={`${FIELD} resize-none`} />
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
          Criar cliente
        </button>
      </form>
    </div>
  );
}
