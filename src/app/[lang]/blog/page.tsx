import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/site";
import { formatBlogDate, getSortedBlogPosts } from "@/lib/blog";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/sections/CTA";

const siteUrl = "https://www.mios.pt";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}/blog`]),
  );

  return {
    title: `${dict.blog.eyebrow} · Mios Tech`,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: { ...languages, "x-default": `${siteUrl}/en/blog` },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const posts = getSortedBlogPosts();

  return (
    <>
      <section className="pt-40 sm:pt-48">
        <div className="container-x">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              /
            </span>
            <span className="label">{dict.blog.eyebrow}</span>
          </div>
          <h1 className="display mt-8 max-w-4xl text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
            {dict.blog.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {dict.blog.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <ul className="border-t border-line">
            {posts.map((post, i) => {
              const content = post.content[lang];
              return (
                <Reveal as="li" key={post.slug} delay={i * 60}>
                  <Link
                    href={localePath(lang, `blog/${post.slug}`)}
                    className="hover-row group grid grid-cols-1 gap-3 border-b border-line py-10 hover:bg-ink hover:pl-6 hover:text-paper md:grid-cols-12 md:gap-6"
                  >
                    <div className="flex items-center gap-4 md:col-span-3 md:flex-col md:items-start md:gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent group-hover:text-paper/60">
                        {dict.blog.categories[post.category]}
                      </span>
                      <span className="font-mono text-xs text-faint group-hover:text-paper/50">
                        {formatBlogDate(post.date, lang)}
                      </span>
                    </div>
                    <div className="md:col-span-8">
                      <h2 className="display text-3xl leading-tight sm:text-4xl">
                        {content.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted group-hover:text-paper/70">
                        {content.excerpt}
                      </p>
                      <span className="mt-4 inline-block font-mono text-[11px] text-faint group-hover:text-paper/50">
                        {post.readingMinutes} {dict.blog.readingTime}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="hidden justify-self-end text-2xl transition-transform duration-300 group-hover:translate-x-1 md:col-span-1 md:block"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
