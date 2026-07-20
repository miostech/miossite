import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { CareersOpenings } from "@/components/CareersOpenings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  return {
    title: `${dict.careers.title} · Mios Tech`,
    description: dict.careers.intro,
  };
}

function applyLink(subject: string, role?: string) {
  const full = role ? `${subject}: ${role}` : subject;
  return `mailto:${site.email}?subject=${encodeURIComponent(full)}`;
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const c = dict.careers;

  return (
    <>
      <section className="pt-40 sm:pt-48">
        <div className="container-x">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              01
            </span>
            <span className="label">{c.eyebrow}</span>
          </div>
          <h1 className="display mt-8 max-w-4xl text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {c.intro}
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
                <span className="label">{c.cultureTitle}</span>
              </div>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                {c.cultureIntro}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {c.values.map((item, i) => (
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

      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  03
                </span>
                <span className="label">{c.openingsTitle}</span>
              </div>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                {c.openingsIntro}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <CareersOpenings careers={c} email={site.email} />
          </div>
        </div>
      </section>

      <section
        className="text-paper"
        style={{
          background:
            "radial-gradient(120% 140% at 85% -10%, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.28) 30%, rgba(20,19,15,0) 62%), var(--color-ink)",
        }}
      >
        <div className="container-x py-24 sm:py-32">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <h2 className="display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
                  {c.applyTitle}
                </h2>
              </div>
              <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
                <p className="text-lg leading-relaxed text-paper/80">
                  {c.applyBody}
                </p>
                <div className="mt-8">
                  <a
                    href={applyLink(c.emailSubject)}
                    className="inline-flex items-center justify-center gap-2 bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
                  >
                    {c.applyButton}
                    <span aria-hidden>&rarr;</span>
                  </a>
                </div>
                <p className="mt-4 max-w-sm text-xs leading-relaxed text-paper/50">
                  {c.applyNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
