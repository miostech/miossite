import { Reveal } from "@/components/Reveal";
import type { Proposal } from "@/data/proposals/types";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Solution overview: three pillars + the end-to-end operational flow. */
export function ProposalSolutionFlow({
  index,
  solution,
}: {
  index: string;
  solution: Proposal["solution"];
}) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader
          index={index}
          label="Fluxo da solução"
          title="Como a solução funciona"
        />

        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
          {solution.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div className="flex h-full flex-col bg-paper p-7">
                <h3 className="display text-2xl">{pillar.title}</h3>
                <p className="label mt-2">{pillar.subtitle}</p>
                <ul className="mt-6 space-y-2.5">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <span className="label">Fluxo operacional, ponta a ponta</span>
          <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {solution.flow.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 60}>
                <div className="border-t border-line pt-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
