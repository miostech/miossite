import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function Differentiators({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                02
              </span>
              <span className="label">{dict.differentiators.eyebrow}</span>
            </div>
            <h2 className="display text-4xl sm:text-5xl">
              {dict.differentiators.title}
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              {dict.differentiators.subtitle}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {dict.differentiators.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70}>
                <div className="grid grid-cols-1 gap-3 border-b border-line py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <span className="display text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-2xl sm:text-3xl">{item.title}</h3>
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
  );
}
