import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DeckHeader } from "@/components/DeckHeader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Differentiators } from "@/components/sections/Differentiators";
import { Stats } from "@/components/sections/Stats";
import { Partners } from "@/components/sections/Partners";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Presence } from "@/components/sections/Presence";
import { CTA } from "@/components/sections/CTA";

const siteUrl = "https://www.mios.pt";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}/apresentacao`]),
  );

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/apresentacao`,
      languages: { ...languages, "x-default": `${siteUrl}/en/apresentacao` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteUrl}/${locale}/apresentacao`,
      siteName: "Mios Tech",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function ApresentacaoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <DeckHeader lang={lang} dict={dict} />
      <Hero lang={lang} dict={dict} />
      <About dict={dict} index="01" />
      <ServicesSection lang={lang} dict={dict} index="02" />
      <Differentiators dict={dict} index="03" />
      <Stats dict={dict} index="04" />
      <Partners dict={dict} index="05" />
      <Portfolio lang={lang} dict={dict} index="06" gated={false} caseStudies />
      <Process dict={dict} index="07" />
      <Presence dict={dict} index="08" />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
