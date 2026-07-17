import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  return {
    title: `${dict.privacy.title} · Mios Tech`,
    description: dict.privacy.lead,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { privacy, legal } = dict;

  const sections: LegalSection[] = [
    { body: [...privacy.intro] },
    {
      title: legal.commitment.title,
      body: [legal.commitment.intro],
      items: [...legal.commitment.items],
    },
    { title: legal.moreInfo.title, body: [...legal.moreInfo.body] },
    { title: legal.termsTitle },
    ...legal.terms,
  ];

  return (
    <LegalPage
      eyebrow={privacy.eyebrow}
      title={privacy.title}
      updated={privacy.updated}
      lead={privacy.lead}
      sections={sections}
    />
  );
}
