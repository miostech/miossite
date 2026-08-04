import { Reveal } from "@/components/Reveal";
import type { InfoBlock } from "@/data/proposals/types";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Generic titled section rendering a grid of feature groups. */
export function ProposalInfoBlocks({
  index,
  block,
}: {
  index: string;
  block: InfoBlock;
}) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader
          index={index}
          label={block.label}
          title={block.title}
          intro={block.intro}
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {block.groups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 60}>
              <div className="h-full bg-paper p-7">
                <h3 className="display text-xl sm:text-2xl">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
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
      </div>
    </section>
  );
}
