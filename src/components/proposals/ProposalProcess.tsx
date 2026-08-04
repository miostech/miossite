import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Six-step delivery process (boilerplate). */
export function ProposalProcess({ index }: { index: string }) {
  const { label, title, steps } = proposalShared.process;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader index={index} label={label} title={title} />
        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step} delay={(i % 3) * 60}>
              <div className="border-t border-line pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">
                  {i + 1}
                </span>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  {step}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
