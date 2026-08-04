import { Reveal } from "@/components/Reveal";
import type { Proposal } from "@/data/proposals/types";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Delivery timeline (e.g. POC de 90 dias) and its phases. */
export function ProposalTimeline({
  index,
  timeline,
}: {
  index: string;
  timeline: Proposal["timeline"];
}) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <ProposalSectionHeader index={index} label={timeline.title} />
          <p className="display text-3xl leading-tight sm:text-4xl">
            {timeline.durationLabel}
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="border-t border-line">
            {timeline.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60}>
                <div className="flex items-baseline gap-6 border-b border-line py-6">
                  <span className="display text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg">{item}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
