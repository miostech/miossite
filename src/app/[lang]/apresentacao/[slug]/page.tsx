import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projectSlugs } from "@/data/projects";
import { localePath } from "@/lib/site";
import { DeckHeader } from "@/components/DeckHeader";
import { DeviceMockup } from "@/components/DeviceMockup";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/sections/CTA";

const siteUrl = "https://www.mios.pt";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projectSlugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const project = getProject(slug);
  if (!project) return { title: "Mios Tech" };

  const copy = project.copy[locale];
  const title = `${project.name} · Mios Tech`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}/apresentacao/${slug}`]),
  );

  return {
    title,
    description: copy.tagline,
    alternates: {
      canonical: `${siteUrl}/${locale}/apresentacao/${slug}`,
      languages: { ...languages, "x-default": `${siteUrl}/en/apresentacao/${slug}` },
    },
    openGraph: {
      title,
      description: copy.tagline,
      url: `${siteUrl}/${locale}/apresentacao/${slug}`,
      siteName: "Mios Tech",
      locale,
      type: "article",
    },
  };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const dict = await getDictionary(lang);
  const t = dict.caseStudy;
  const copy = project.copy[lang];

  const overview = [
    { label: t.challenge, text: copy.challenge },
    { label: t.solution, text: copy.solution },
    { label: t.result, text: copy.result },
  ];

  return (
    <>
      <DeckHeader lang={lang} dict={dict} />

      {/* Back link */}
      <div className="container-x pt-8">
        <Link
          href={localePath(lang, "apresentacao")}
          className="link-underline inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <span aria-hidden>&larr;</span>
          {t.back}
        </Link>
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
                <span className="label text-accent">{t.eyebrow}</span>
                <span className="label">{copy.category}</span>
              </div>
              <h1 className="display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
                {project.name}
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="text-lg leading-relaxed text-muted">
                {copy.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
                {project.year && (
                  <span className="font-mono text-[11px] tracking-[0.18em] text-faint">
                    {project.year}
                  </span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm font-medium text-ink"
                  >
                    {t.visit} &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D mockup showcase */}
      <section
        className="text-paper"
        style={{
          background:
            "radial-gradient(120% 140% at 85% -10%, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.28) 30%, rgba(20,19,15,0) 62%), var(--color-ink)",
        }}
      >
        <div className="container-x py-20 sm:py-28">
          <div className="grid items-center gap-12 sm:grid-cols-2 sm:gap-8">
            {project.mockups.map((m, i) => (
              <Reveal key={i} delay={i * 120}>
                <DeviceMockup
                  kind={m.kind}
                  image={m.image}
                  name={project.name}
                  gradient={project.gradient}
                  url={m.kind === "browser" ? project.url : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview: challenge / solution / result */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x grid gap-x-8 gap-y-12 lg:grid-cols-3">
          {overview.map((block, i) => (
            <Reveal key={block.label} delay={i * 80}>
              <div className="border-t border-ink pt-5">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display mt-5 text-2xl sm:text-3xl">
                  {block.label}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <div className="mb-8 flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              04
            </span>
            <span className="label">{t.stack}</span>
          </div>
          <ul className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
