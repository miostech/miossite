import { Reveal } from "@/components/Reveal";
import type { ScopeBlock } from "@/data/proposals/types";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Renders one scope deliverable (e.g. "Aplicativo Cliente") and its feature groups. */
export function ProposalScope({
  index,
  block,
}: {
  index: string;
  block: ScopeBlock;
}) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader
          index={index}
          label="Escopo do projeto"
          title={block.title}
          intro={block.intro}
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {block.groups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 60}>
              <div>
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
