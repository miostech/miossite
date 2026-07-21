"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/site";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { label: dict.nav.services, href: localePath(lang, "services") },
    { label: dict.nav.about, href: localePath(lang, "vision") },
    { label: dict.nav.presence, href: `${localePath(lang)}#presence` },
    { label: dict.nav.contact, href: localePath(lang, "contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo lang={lang} tone="accent" priority />
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-sm text-ink/75 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} />
          </div>
          <Link
            href={localePath(lang, "contact")}
            className="hidden items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent sm:inline-flex"
          >
            {dict.nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-ink transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-6 bg-ink transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-ink transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="container-x flex flex-col py-4">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line-soft py-4 text-2xl text-ink"
              >
                <span className="font-mono text-[11px] text-faint">
                  0{i + 1}
                </span>
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center justify-between">
              <LanguageSwitcher lang={lang} />
              <Link
                href={localePath(lang, "contact")}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-paper"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
