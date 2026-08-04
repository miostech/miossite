import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/** Minimal sticky top bar for the standalone company-presentation deck. */
export function DeckHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo lang={lang} tone="ink" />
          <span aria-hidden className="h-4 w-px bg-line" />
          <span className="label hidden sm:inline">{dict.nav.about}</span>
        </div>
        <div className="flex items-center gap-5">
          <LanguageSwitcher lang={lang} />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent sm:text-sm"
          >
            {dict.hero.ctaPrimary}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  );
}
