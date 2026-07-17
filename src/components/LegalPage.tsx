import { Reveal } from "@/components/Reveal";

export type LegalSection = {
  title?: string;
  body?: string[];
  items?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  updated,
  lead,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  lead?: string;
  sections: LegalSection[];
}) {
  return (
    <section className="pt-40 pb-28 sm:pt-48">
      <div className="container-x">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            01
          </span>
          <span className="label">{eyebrow}</span>
        </div>

        <h1 className="display mt-8 max-w-3xl text-5xl leading-[0.98] sm:text-6xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {updated}
          </p>
        )}
        {lead && (
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
            {lead}
          </p>
        )}

        <div className="mt-16 max-w-2xl space-y-14">
          {sections.map((section, i) => (
            <Reveal as="section" key={i} delay={Math.min(i, 4) * 60}>
              {section.title && (
                <h2 className="display text-2xl sm:text-3xl">{section.title}</h2>
              )}
              {section.body?.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-4 text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-5 space-y-3">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-base leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
