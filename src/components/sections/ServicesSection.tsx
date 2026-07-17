import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIndex } from "@/components/ServiceIndex";

export function ServicesSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <SectionHeading
            index="01"
            eyebrow={dict.services.eyebrow}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
        </div>
        <div className="mt-16">
          <ServiceIndex lang={lang} dict={dict} />
        </div>
      </div>
    </section>
  );
}
