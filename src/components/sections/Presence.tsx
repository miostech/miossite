import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Presence({ dict }: { dict: Dictionary }) {
  return (
    <section id="presence" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <SectionHeading
            index="07"
            eyebrow={dict.presence.eyebrow}
            title={dict.presence.title}
            subtitle={dict.presence.subtitle}
          />
        </div>

        <div className="mt-16 border-t border-line">
          {dict.presence.countries.map((country, i) => {
            const soon = country.status === dict.presence.comingSoon;
            return (
              <Reveal key={country.name} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-6">
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`display text-3xl sm:text-4xl ${
                      soon ? "text-faint" : "text-ink"
                    }`}
                  >
                    {country.name}
                  </span>
                  <span
                    className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
                      soon ? "text-faint" : "text-ink"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        soon ? "bg-faint" : "bg-accent"
                      }`}
                    />
                    {country.status}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
