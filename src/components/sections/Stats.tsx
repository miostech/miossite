import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x py-24 sm:py-32">
        <div className="mb-16 flex items-center gap-4 border-t border-inverse-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            04
          </span>
          <span className="label" style={{ color: "var(--color-inverse-muted)" }}>
            {dict.stats.title}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-inverse-line bg-inverse-line sm:grid-cols-2 lg:grid-cols-4">
          {dict.stats.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="h-full bg-ink p-8">
                <div className="display text-6xl sm:text-7xl">{item.value}</div>
                <div className="mt-4 text-sm text-paper/60">{item.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
