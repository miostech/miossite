import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";
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

/** Leadership + team, rendered with monogram avatars (no photos required). */
export function ProposalTeam({ index }: { index: string }) {
  const { label, subtitle, leadership, members } = proposalShared.team;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader index={index} label={label} title={subtitle} />

        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {leadership.map((m, i) => (
            <Reveal key={m.name} delay={i * 60}>
              <div className="h-full bg-paper p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-semibold text-paper">
                  {initials(m.name)}
                </span>
                <h3 className="display mt-5 text-2xl">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {m.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-px grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 30}>
              <div className="flex h-full items-center gap-4 bg-paper p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-2 text-xs font-semibold text-accent">
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
    </section>
  );
}
