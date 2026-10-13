import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Mios · Cobranças
          </span>
          <h1 className="display mt-3 text-3xl">Entrar</h1>
        </div>

        <form action="/api/admin/login" method="post" className="space-y-5">
          <div>
            <label htmlFor="email" className="label mb-1 block">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="password" className="label mb-1 block">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
            />
          </div>

          {error === "locked" ? (
            <p className="text-sm text-accent" role="alert">
              Muitas tentativas. Aguarde alguns minutos e tente novamente.
            </p>
          ) : error ? (
            <p className="text-sm text-accent" role="alert">
              E-mail ou senha inválidos.
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
