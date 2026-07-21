import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site, whatsappLink } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <section className="pt-40 pb-28 sm:pt-48">
      <div className="container-x">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            &#8594;
          </span>
          <span className="label">{dict.contact.eyebrow}</span>
        </div>

        <div className="grid gap-16 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h1 className="display text-5xl leading-[0.98] sm:text-6xl">
              {dict.contact.title}
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              {dict.contact.subtitle}
            </p>

            <div className="mt-12 border-t border-line">
              <a
                href={`mailto:${site.email}`}
                className="hover-row group flex items-center justify-between border-b border-line py-5 hover:pl-3"
              >
                <span className="label">{dict.contact.channels.email}</span>
                <span className="text-lg text-ink">{site.email}</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-row group flex items-center justify-between border-b border-line py-5 hover:pl-3"
              >
                <span className="label">{dict.contact.channels.whatsapp}</span>
                <span className="text-lg text-ink">{site.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm lang={lang} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
