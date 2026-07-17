import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";
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
    title: `${dict.vision.title} · Mios Tech`,
    description: dict.vision.intro,
  };
}

export default async function VisionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const [lead, ...story] = dict.vision.story;

  return (
    <>
      <section className="pt-40 sm:pt-48">
        <div className="container-x">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              01
            </span>
            <span className="label">{dict.vision.eyebrow}</span>
          </div>
          <h1 className="display mt-8 max-w-4xl text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
            {dict.vision.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {dict.vision.intro}
          </p>
        </div>
      </section>

      <section className="mt-24 border-t border-line py-24 sm:mt-28 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  02
                </span>
                <span className="label">{dict.vision.storyTitle}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="display text-3xl leading-[1.15] sm:text-4xl lg:text-5xl">
                {lead}
              </p>
            </Reveal>
            <div className="mt-10 max-w-2xl space-y-5">
              {story.map((paragraph, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className="text-base leading-relaxed text-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  03
                </span>
                <span className="label">{dict.vision.principlesTitle}</span>
              </div>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                {dict.vision.principlesIntro}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {dict.vision.principles.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 70}>
                  <div className="grid grid-cols-1 gap-3 border-b border-line py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <span className="display text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display text-2xl sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
