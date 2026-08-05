import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function MissionVision({
  dict,
  index = "02",
}: {
  dict: Dictionary;
  index?: string;
}) {
  const t = dict.missionVision;
  const items = [
    { label: t.missionLabel, text: t.mission },
    { label: t.visionLabel, text: t.vision },
  ];

  return (
    <section id="mission-vision" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            {index}
          </span>
          <span className="label">{t.eyebrow}</span>
        </div>

        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 100} className="bg-paper p-8 sm:p-12">
              <span className="label text-accent">{item.label}</span>
              <p className="display mt-6 text-2xl leading-[1.2] sm:text-3xl">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
