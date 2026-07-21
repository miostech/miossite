import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Differentiators } from "@/components/sections/Differentiators";
import { Partners } from "@/components/sections/Partners";
// import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Presence } from "@/components/sections/Presence";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <ServicesSection lang={lang} dict={dict} />
      <Differentiators dict={dict} />
      <Partners dict={dict} />
      {/* <Portfolio lang={lang} dict={dict} /> */}
      <Stats dict={dict} />
      <About dict={dict} />
      <Process dict={dict} />
      <Presence dict={dict} />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
