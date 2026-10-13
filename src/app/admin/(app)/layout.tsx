import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";

// Guards every page in the (app) group. The login page lives outside this
// group, so it is not affected.
export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Mios · Cobranças
          </span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">{admin.name}</span>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
