import { Reveal } from "@/components/Reveal";
import type { Proposal } from "@/data/proposals/types";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/** Agile methodology (ceremonies) and the allocated project team. */
export function ProposalMethodology({
  index,
  methodology,
}: {
  index: string;
  methodology: NonNullable<Proposal["methodology"]>;
}) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader
          index={index}
          label={methodology.label}
          title={methodology.title}
          intro={methodology.summary}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="label">Cerimónias</span>
            <ul className="mt-4 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              {methodology.ceremonies.map((c, i) => (
                <Reveal as="li" key={c.name} delay={(i % 2) * 60}>
                  <div className="h-full bg-paper p-6">
                    <h3 className="display text-xl">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted">{c.cadence}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-accent">
                      {c.audience}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <span className="label">Equipa alocada</span>
            <ul className="mt-4 grid grid-cols-1 gap-px border border-line bg-line">
              {methodology.team.map((m, i) => (
                <Reveal as="li" key={m.name} delay={i * 40}>
                  <div className="flex h-full items-center gap-4 bg-paper p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-paper">
                      {initials(m.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{m.name}</p>
                      <p className="text-xs text-muted">{m.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {methodology.certifications &&
          methodology.certifications.length > 0 && (
            <div className="mt-10">
              <span className="label">Certificações</span>
              <ul className="mt-4 flex flex-wrap gap-3">
                {methodology.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </section>
  );
}
