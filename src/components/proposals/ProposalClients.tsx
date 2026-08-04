import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";
import { partners } from "@/lib/site";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Social proof: client logos, each with a one-line summary of the project. */
export function ProposalClients({ index }: { index: string }) {
  const { label, title } = proposalShared.clients;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader index={index} label={label} title={title} />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col bg-paper p-7">
                <div className="flex h-12 items-center">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={200}
                      height={56}
                      style={
                        partner.scale
                          ? {
                              transform: `scale(${partner.scale})`,
                              transformOrigin: "left center",
                            }
                          : undefined
                      }
                      className="h-9 w-auto max-w-[70%] object-contain object-left"
                    />
                  ) : (
                    <span className="display text-2xl text-ink">
                      {partner.name}
                    </span>
                  )}
                </div>
                {partner.summary && (
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    {partner.summary}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
