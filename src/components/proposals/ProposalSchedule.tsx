import { Reveal } from "@/components/Reveal";
import type { Proposal } from "@/data/proposals/types";
import { ProposalSectionHeader } from "./ProposalSectionHeader";

/** Delivery schedule rendered as a lightweight CSS Gantt chart. */
export function ProposalSchedule({
  index,
  schedule,
}: {
  index: string;
  schedule: NonNullable<Proposal["schedule"]>;
}) {
  const { label, title, intro, unitLabel, totalUnits, bars } = schedule;
  const units = Array.from({ length: totalUnits }, (_, i) => i + 1);
  const gridCols = {
    gridTemplateColumns: `minmax(150px, 200px) repeat(${totalUnits}, minmax(24px, 1fr))`,
  };
  // A bar over weeks s..e occupies grid lines (s+1)..(e+2); column 1 is the label.
  const col = (s: number, e: number) => `${s + 1} / ${e + 2}`;

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <ProposalSectionHeader
          index={index}
          label={label}
          title={title}
          intro={intro}
        />

        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Axis: unit numbers */}
            <div className="grid items-end" style={gridCols}>
              <div className="pb-2 text-[11px] uppercase tracking-[0.14em] text-faint">
                {unitLabel}
              </div>
              {units.map((u) => (
                <div
                  key={u}
                  className="border-l border-line-soft pb-2 text-center text-[10px] text-faint"
                >
                  {u}
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="border-t border-line">
              {bars.map((bar, i) => (
                <Reveal key={bar.label} delay={i * 50}>
                  <div
                    className="grid items-center border-b border-line-soft"
                    style={gridCols}
                  >
                    <div className="py-3 pr-4 text-sm leading-tight">
                      {bar.label}
                    </div>
                    <div className="py-1.5" style={{ gridColumn: col(bar.start, bar.end) }}>
                      <div
                        className="flex h-9 items-center rounded-md bg-accent px-3 text-paper"
                        title={bar.detail}
                      >
                        <span className="truncate text-xs font-medium">
                          {bar.detail ?? bar.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
