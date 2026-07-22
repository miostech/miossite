import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { partners } from "@/lib/site";

export function Partners({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                03
              </span>
              <span className="label">{dict.partners.eyebrow}</span>
            </div>
            <h2 className="display max-w-2xl text-4xl sm:text-5xl">
              {dict.partners.title}
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-muted">
            {dict.partners.subtitle}
          </p>
        </div>
      </div>

      <div className="container-x">
        <ul className="grid grid-cols-2 border-y border-line md:grid-cols-5">
          {partners.map((partner, i) => {
            const n = partners.length;
            // Cell dividers, computed per breakpoint so partial rows stay clean.
            const rightBase = i % 2 !== 1 && i !== n - 1;
            const bottomBase = Math.floor(i / 2) < Math.floor((n - 1) / 2);
            const rightMd = i % 5 !== 4 && i !== n - 1;
            const bottomMd = Math.floor(i / 5) < Math.floor((n - 1) / 5);
            return (
            <li
              key={partner.name}
              className={`flex items-center justify-center border-line px-6 py-12 sm:py-16 ${
                rightBase ? "border-r " : ""
              }${rightMd ? "md:border-r" : "md:border-r-0"} ${
                bottomBase ? "border-b " : ""
              }${bottomMd ? "md:border-b" : "md:border-b-0"}`}
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={56}
                  style={
                    partner.scale
                      ? { transform: `scale(${partner.scale})` }
                      : undefined
                  }
                  className="h-11 w-auto max-w-full object-contain transition-all duration-300 sm:h-14"
                />
              ) : (
                <span className="display whitespace-nowrap text-3xl text-ink transition-colors duration-300 sm:text-4xl">
                  {partner.name}
                </span>
              )}
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
