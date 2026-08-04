import { site } from "@/lib/site";

/**
 * Shared chrome for the standalone company-presentation deck. The global site
 * Header/Footer are suppressed on `/apresentacao` by SiteChrome; this layout
 * adds only a minimal institutional footer. The deck's own top bar (DeckHeader)
 * is rendered by the page.
 */
export default function ApresentacaoLayout({
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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              LinkedIn
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
