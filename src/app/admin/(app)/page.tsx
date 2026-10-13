import { getCurrentAdmin } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  return (
    <div>
      <h1 className="display text-3xl">Painel</h1>
      <p className="mt-3 text-muted">
        Bem-vindo, {admin?.name}. A gestão de clientes e cobranças entra nas
        próximas fases.
      </p>

      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
        <div className="bg-paper p-8">
          <h2 className="display text-xl">Clientes</h2>
          <p className="mt-2 text-sm text-muted">Em breve (fase 3).</p>
        </div>
        <div className="bg-paper p-8">
          <h2 className="display text-xl">Cobranças</h2>
          <p className="mt-2 text-sm text-muted">Em breve (fase 4).</p>
        </div>
      </div>
    </div>
  );
}
