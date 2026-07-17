import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, serviceSlugs } from "@/lib/site";
import { Reveal } from "./Reveal";

export function ServiceIndex({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  return (
    <ul className="border-t border-line">
      {serviceSlugs.map((slug, i) => {
        const service = dict.services.items[slug];
        return (
          <Reveal as="li" key={slug} delay={i * 60}>
            <Link
              href={localePath(lang, `services/${slug}`)}
              className="hover-row group grid grid-cols-1 items-baseline gap-3 border-b border-line py-8 hover:bg-ink hover:pl-6 hover:text-paper md:grid-cols-12 md:gap-6"
            >
              <span className="col-span-1 font-mono text-xs text-faint group-hover:text-paper/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-5">
                <h3 className="display text-3xl sm:text-4xl">{service.name}</h3>
                <p className="mt-2 text-sm text-muted group-hover:text-paper/60 md:hidden">
                  {service.short}
                </p>
              </div>
              <p className="hidden max-w-md text-sm leading-relaxed text-muted group-hover:text-paper/70 md:col-span-5 md:block">
                {service.short}
              </p>
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
  );
}
