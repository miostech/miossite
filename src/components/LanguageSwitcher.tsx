"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

function persistLocale(next: Locale) {
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function LanguageSwitcher({
  lang,
  tone = "ink",
}: {
  lang: Locale;
  tone?: "ink" | "paper";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    persistLocale(next);
    const segments = (pathname || `/${lang}`).split("/");
    segments[1] = next;
    const target = segments.join("/") || `/${next}`;
    setOpen(false);
    router.push(target);
    router.refresh();
  }

  const trigger =
    tone === "ink"
      ? "text-ink/70 hover:text-ink"
      : "text-paper/70 hover:text-paper";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${trigger}`}
      >
        {lang}
        <span className="mx-1 opacity-40">/</span>
        <span className="opacity-40">
          {locales.filter((l) => l !== lang).join(" ")}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 z-50 mt-3 w-40 border border-ink bg-paper py-1 sm:left-auto sm:right-0"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === lang}
                onClick={() => switchTo(l)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-ink hover:text-paper ${
                  l === lang ? "text-ink" : "text-muted"
                }`}
              >
                <span>{localeNames[l]}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
                  {l}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
