import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-16 flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            06
          </span>
          <span className="label">{dict.process.eyebrow}</span>
          <h2 className="display ml-auto hidden text-right text-2xl sm:block">
            {dict.process.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="border-t border-ink pt-5">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-6 text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
