import type { Locale } from "@/i18n/config";
import { Logo } from "@/components/Logo";
import { whatsappLink } from "@/lib/site";

/** Minimal sticky top bar for standalone proposal pages. */
export function ProposalHeader({
  lang,
  clientName,
}: {
  lang: Locale;
  clientName: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo lang={lang} tone="ink" />
          <span aria-hidden className="h-4 w-px bg-line" />
          <span className="label hidden sm:inline">Proposta · {clientName}</span>
        </div>
        <a
          href={whatsappLink(
            `Olá! Gostaria de falar sobre a proposta da ${clientName}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-xs font-medium text-paper transition-opacity hover:opacity-90 sm:text-sm"
        >
          Falar com consultor
          <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </header>
  );
}
