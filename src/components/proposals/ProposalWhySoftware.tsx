import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Editorial quote about owning software + supporting value points. */
export function ProposalWhySoftware({ index }: { index: string }) {
  const { label, quote, points } = proposalShared.whySoftware;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <ProposalSectionHeader index={index} label={label} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="display text-3xl leading-[1.15] sm:text-4xl">
              {quote}
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal as="li" key={point} delay={i * 50}>
                <div className="flex items-baseline gap-4 border-t border-line py-4">
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium">{point}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
