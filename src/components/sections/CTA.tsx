import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, site, whatsappLink } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function CTA({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section
      className="text-paper"
      style={{
        background:
          "radial-gradient(120% 140% at 85% -10%, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.28) 30%, rgba(20,19,15,0) 62%), var(--color-ink)",
      }}
    >
      <div className="container-x py-24 sm:py-36">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h2 className="display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
                {dict.cta.title}
              </h2>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="text-lg leading-relaxed text-paper/80">
                {dict.cta.subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href={localePath(lang, "contact")}
                  className="inline-flex items-center justify-center gap-2 bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
                >
                  {dict.cta.button}
                  <span aria-hidden>&rarr;</span>
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 py-3.5 text-sm font-medium text-paper"
                >
                  {dict.cta.secondary}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-inverse-line pt-6">
            <span className="label" style={{ color: "rgba(243,241,236,0.7)" }}>
              {dict.contact.channels.email}
            </span>
            <a href={`mailto:${site.email}`} className="link-underline text-paper">
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
