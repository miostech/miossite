import { Reveal } from "@/components/Reveal";
import type { Proposal } from "@/data/proposals/types";

const mutedLabel = { color: "rgba(243,241,236,0.7)" };

/** Investment: cost breakdown → total, then payment plans and adjudicação terms. */
export function ProposalInvestment({
  index,
  investment,
}: {
  index: string;
  investment: Proposal["investment"];
}) {
  const hasBreakdown =
    !!investment.breakdown && investment.breakdown.length > 0;

  return (
    <section
      className="text-paper"
      style={{
        background:
          "radial-gradient(120% 140% at 15% -10%, rgba(124,58,237,0.4) 0%, rgba(76,29,149,0.3) 32%, rgba(20,19,15,0) 64%), var(--color-ink)",
      }}
    >
      <div className="container-x py-24 sm:py-32">
        <div className="flex items-center gap-4 border-t border-inverse-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            {index}
          </span>
          <span className="label" style={mutedLabel}>
            Investimento
          </span>
        </div>

        {/* Composição → Total */}
        <div className="mt-12 max-w-3xl">
          {hasBreakdown && (
            <>
              <span className="label" style={mutedLabel}>
                Composição do investimento
              </span>
              <ul className="mt-5 border-t border-inverse-line">
                {investment.breakdown!.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-baseline justify-between gap-6 border-b border-inverse-line-soft py-4"
                  >
                    <span className="text-sm text-paper/80 sm:text-base">
                      {line.label}
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium tabular-nums sm:text-base">
                      {line.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <Reveal>
            <div className="mt-1 border-t-2 border-inverse-line pt-7">
              <span className="label" style={mutedLabel}>
                {hasBreakdown ? "Total" : "Investimento total"}
              </span>
              <p className="display mt-3 whitespace-nowrap text-5xl sm:text-6xl">
                {investment.total}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/70">
                {investment.includes}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Condições de pagamento */}
        <div className="mt-16 sm:mt-20">
          <h3 className="display text-2xl sm:text-3xl">
            Condições de pagamento
          </h3>

          {investment.specialPayments && (
            <span className="label mt-8 block" style={mutedLabel}>
              Padrão
            </span>
          )}
          <ul className="mt-3 grid grid-cols-1 gap-px border border-inverse-line bg-inverse-line sm:grid-cols-3">
            {investment.payments.map((stage) => (
              <li
                key={stage.label}
                className="p-5"
                style={{ backgroundColor: "var(--color-ink)" }}
              >
                <span className="display text-3xl text-accent">
                  {stage.percent}
                </span>
                <p className="mt-3 text-sm text-paper/70">{stage.label}</p>
                <p className="mt-1 font-medium tabular-nums">{stage.amount}</p>
              </li>
            ))}
          </ul>

          {investment.specialPayments && (
            <>
              <span className="label mt-8 block" style={mutedLabel}>
                {investment.specialPayments.label}
              </span>
              <ul className="mt-3 grid grid-cols-1 gap-px border border-inverse-line bg-inverse-line sm:grid-cols-3">
                {investment.specialPayments.stages.map((stage) => (
                  <li
                    key={stage.percent}
                    className="p-5"
                    style={{ backgroundColor: "var(--color-ink)" }}
                  >
                    <span className="display text-3xl text-accent">
                      {stage.percent}
                    </span>
                    <p className="mt-3 text-sm text-paper/70">{stage.label}</p>
                    <p className="mt-1 font-medium tabular-nums">
                      {stage.amount}
                    </p>
                  </li>
                ))}
              </ul>
              {investment.specialPayments.note && (
                <p className="mt-3 max-w-3xl text-sm text-paper/60">
                  {investment.specialPayments.note}
                </p>
              )}
            </>
          )}
        </div>

        {/* Termos */}
        <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          {investment.terms.map((term) => (
            <li
              key={term}
              className="flex gap-3 text-sm leading-relaxed text-paper/60"
            >
              <span
                aria-hidden
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
