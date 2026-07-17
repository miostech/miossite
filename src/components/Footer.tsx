import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, miosGroup, serviceSlugs, site } from "@/lib/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const companyLinks = [
    { label: dict.footer.companyLinks.about, href: localePath(lang, "vision") },
    {
      label: dict.footer.companyLinks.presence,
      href: `${localePath(lang)}#presence`,
    },
    { label: dict.footer.companyLinks.contact, href: localePath(lang, "contact") },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="container-x py-20">
        <div className="grid gap-8 border-b border-inverse-line pb-16 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h2 className="display text-3xl sm:text-4xl">
              {dict.newsletter.title}
            </h2>
            <p className="mt-3 max-w-sm text-paper/70">
              {dict.newsletter.subtitle}
            </p>
          </div>
          <NewsletterForm lang={lang} dict={dict} />
        </div>

        <div className="grid gap-12 border-b border-inverse-line py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo lang={lang} tone="paper" />
            <p className="mt-6 text-lg leading-relaxed text-paper/70">
              {dict.footer.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-block text-paper"
            >
              {site.email}
            </a>
          </div>

          <div>
            <h3 className="label" style={{ color: "var(--color-inverse-muted)" }}>
              {dict.footer.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={localePath(lang, `services/${slug}`)}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {dict.services.items[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label" style={{ color: "var(--color-inverse-muted)" }}>
              {dict.footer.companyTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label" style={{ color: "var(--color-inverse-muted)" }}>
              {dict.footer.resourcesTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href={localePath(lang, "blog")}
                  className="text-paper/70 transition-colors hover:text-paper"
                >
                  {dict.footer.resourceLinks.blog}
                </Link>
              </li>
            </ul>

            <h3
              className="label mt-10"
              style={{ color: "var(--color-inverse-muted)" }}
            >
              {dict.footer.groupTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {miosGroup.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-paper/70 transition-colors hover:text-paper"
                  >
                    {item.name}
                    <span aria-hidden className="text-xs text-paper/40">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-sm text-paper/50 sm:flex-row sm:items-center">
          <p>
            &copy; {year} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={localePath(lang, "privacy")}
              className="transition-colors hover:text-paper"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={localePath(lang, "cookies")}
              className="transition-colors hover:text-paper"
            >
              {dict.footer.cookies}
            </Link>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              LinkedIn
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
