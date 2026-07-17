import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function About({ dict }: { dict: Dictionary }) {
  const [lead, ...rest] = dict.about.paragraphs;

  return (
    <section id="about" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            05
          </span>
          <span className="label">{dict.about.eyebrow}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="display text-3xl leading-[1.15] sm:text-4xl lg:text-5xl">
                {lead}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <Reveal delay={120}>
              <div className="space-y-5">
                {rest.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
