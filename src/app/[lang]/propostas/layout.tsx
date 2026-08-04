/**
 * Shared chrome for standalone proposal pages. The global site Header/Footer are
 * suppressed on `/propostas/*` by SiteChrome; this layout adds only a minimal
 * proposal-scoped footer note. The per-proposal top bar is rendered by the page.
 */
export default function PropostasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer className="border-t border-line bg-paper">
        <div className="container-x flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Mios Tech · www.mios.pt</p>
          <p>Documento confidencial — proposta comercial.</p>
        </div>
      </footer>
    </>
  );
}
