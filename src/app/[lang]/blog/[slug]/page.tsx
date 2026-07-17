import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/site";
import {
  blogSlugs,
  formatBlogDate,
  getBlogPost,
  getSortedBlogPosts,
} from "@/lib/blog";

const siteUrl = "https://www.mios.pt";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    blogSlugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const post = getBlogPost(slug);
  if (!post) return {};

  const content = post.content[locale];
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}/blog/${slug}`]),
  );

  return {
    title: `${content.title} · Mios Tech`,
    description: content.excerpt,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: { ...languages, "x-default": `${siteUrl}/en/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      title: content.title,
      description: content.excerpt,
      url: `${siteUrl}/${locale}/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const post = getBlogPost(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const content = post.content[lang];
  const related = getSortedBlogPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <header className="pt-40 sm:pt-48">
          <div className="container-x">
            <Link
              href={localePath(lang, "blog")}
              className="link-underline text-sm text-muted"
            >
              &larr; {dict.blog.backToBlog}
            </Link>

            <div className="mt-10 flex items-center gap-4 border-t border-line pt-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {dict.blog.categories[post.category]}
              </span>
              <span className="font-mono text-xs text-faint">
                {formatBlogDate(post.date, lang)}
              </span>
              <span className="font-mono text-xs text-faint">
                {post.readingMinutes} {dict.blog.readingTime}
              </span>
            </div>

            <h1 className="display mt-8 max-w-4xl text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
              {content.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
              {content.excerpt}
            </p>
          </div>
        </header>

        <div className="py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-2xl">
              {content.body.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="display mt-14 text-2xl leading-snug sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="mt-6 space-y-3">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="grid grid-cols-[auto_1fr] gap-4 text-lg leading-relaxed text-ink/80"
                        >
                          <span
                            aria-hidden
                            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="mt-6 text-lg leading-relaxed text-ink/80"
                  >
                    {block.text}
                  </p>
                );
              })}

              <div className="mt-16 border-t border-line pt-6">
                <h2 className="label">{dict.blog.sourcesTitle}</h2>
                <ul className="mt-4 space-y-2">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-sm text-muted"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <span className="label">{dict.blog.relatedTitle}</span>
          <ul className="mt-8 border-t border-line">
            {related.map((p) => {
              const c = p.content[lang];
              return (
                <li key={p.slug}>
                  <Link
                    href={localePath(lang, `blog/${p.slug}`)}
                    className="hover-row group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-b border-line py-6 hover:bg-ink hover:pl-6 hover:text-paper"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent group-hover:text-paper/60">
                      {dict.blog.categories[p.category]}
                    </span>
                    <span className="display text-2xl sm:text-3xl">
                      {c.title}
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

          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="display text-2xl sm:text-3xl">{dict.blog.ctaTitle}</p>
            <Link
              href={localePath(lang, "contact")}
              className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              {dict.blog.ctaButton}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
