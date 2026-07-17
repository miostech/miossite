"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/site";

const STORAGE_KEY = "mios-cookie-consent";

export function CookieConsent({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage errors (e.g. private mode) and just hide the banner.
    }
    setVisible(false);
  };

  if (!visible) return null;

  const c = dict.cookieConsent;

  return (
    <div
      role="region"
      aria-label={c.message}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 border border-inverse-line bg-ink px-6 py-5 text-paper shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-paper/80">
          {c.message}{" "}
          <Link
            href={localePath(lang, "cookies")}
            className="link-underline whitespace-nowrap text-paper"
          >
            {c.learnMore}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => dismiss("declined")}
            className="text-sm font-medium text-paper/70 transition-colors hover:text-paper"
          >
            {c.decline}
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="inline-flex items-center gap-2 bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
