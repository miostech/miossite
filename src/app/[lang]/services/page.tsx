import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ServiceIndex } from "@/components/ServiceIndex";
import { CTA } from "@/components/sections/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  return {
    title: `${dict.services.title} · Mios Tech`,
    description: dict.services.subtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <section className="pt-40 sm:pt-48">
        <div className="container-x">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              01
            </span>
            <span className="label">{dict.services.eyebrow}</span>
          </div>
          <h1 className="display mt-8 max-w-4xl text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
            {dict.services.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <ServiceIndex lang={lang} dict={dict} />
        </div>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
