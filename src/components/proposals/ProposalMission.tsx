import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Mission pillars (Atender / Criar / Entregar / Resultados). */
export function ProposalMission({ index }: { index: string }) {
  const { label, pillars } = proposalShared.mission;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader
          index={index}
          label={label}
          title="Nossa missão"
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.lead} delay={i * 60}>
              <div className="h-full bg-paper p-7">
                <span className="display text-2xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 text-lg leading-snug">
                  <span className="font-semibold text-ink">{p.lead}</span>{" "}
                  <span className="text-muted">{p.rest}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
