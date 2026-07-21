import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  localePath,
  serviceSlugs,
  whatsappLink,
  type ServiceSlug,
} from "@/lib/site";

function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    serviceSlugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  if (!isServiceSlug(slug)) return {};
  const dict = await getDictionary(locale);
  const service = dict.services.items[slug];
  return {
    title: `${service.name} · Mios Tech`,
    description: service.short,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) notFound();

  const dict = await getDictionary(lang);
  const service = dict.services.items[slug];
  const index = serviceSlugs.indexOf(slug);
  const others = serviceSlugs.filter((s) => s !== slug);

  return (
    <>
      <section className="pt-40 sm:pt-48">
        <div className="container-x">
          <Link
            href={localePath(lang, "services")}
            className="link-underline text-sm text-muted"
          >
            &larr; {dict.services.title}
          </Link>

          <div className="mt-10 flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="label">{service.tagline}</span>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-12">
            <h1 className="display text-[2rem] leading-[1.05] break-words sm:text-7xl sm:leading-[0.98] lg:col-span-8 lg:text-8xl">
              {service.name}
            </h1>
            <p className="self-end text-lg leading-relaxed text-muted lg:col-span-4">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-line py-20 sm:mt-24 sm:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label">/ {dict.services.overviewTitle}</span>
          </div>
          <div className="max-w-2xl space-y-5 lg:col-span-8">
            {service.overview.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label">/ {dict.services.capabilitiesTitle}</span>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {service.features.map((feature, i) => (
              <li
                key={feature}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-line py-6"
              >
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-ink">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label">/ {dict.services.outcomesTitle}</span>
          </div>
          <ul className="lg:col-span-8">
            {service.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-4 border-b border-line py-6 text-lg leading-relaxed text-ink"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label">/ {dict.services.useCasesTitle}</span>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {service.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="bg-paper p-6 text-base leading-relaxed text-muted"
                >
                  {useCase}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href={localePath(lang, "contact")}
                className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {dict.cta.button}
                <span aria-hidden>&rarr;</span>
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 py-3.5 text-sm font-medium text-ink"
              >
                {dict.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <span className="label">{dict.services.eyebrow}</span>
          <ul className="mt-8 border-t border-line">
            {others.map((s) => {
              const oIndex = serviceSlugs.indexOf(s);
              return (
                <li key={s}>
                  <Link
                    href={localePath(lang, `services/${s}`)}
                    className="hover-row group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-b border-line py-6 hover:bg-ink hover:pl-6 hover:text-paper"
                  >
                    <span className="font-mono text-xs text-faint group-hover:text-paper/50">
                      {String(oIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-2xl sm:text-3xl">
                      {dict.services.items[s].name}
                    </span>
                    <span
                      aria-hidden
                      className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
