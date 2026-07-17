import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/site";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const capabilities = dict.capabilities ?? [];

  return (
    <section className="relative pt-32 sm:pt-40">
      <div className="container-x">
        <div className="flex items-center justify-between border-t border-line py-4">
          <span className="label flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {dict.hero.trust}
          </span>
          <span className="label">{dict.hero.since}</span>
        </div>

        <div className="grid gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <h1 className="display text-[2.75rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem]">
              {dict.hero.title}
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <p className="text-base leading-relaxed text-muted">
              {dict.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={localePath(lang, "contact")}
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {dict.hero.ctaPrimary}
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href={localePath(lang, "services")}
                className="link-underline text-sm font-medium text-ink"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-y border-line py-4">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              className="flex shrink-0 items-center"
              aria-hidden={dup === 1}
            >
              {capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-muted"
                >
                  <span className="mx-6 text-accent">&#8901;</span>
                  {cap}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
