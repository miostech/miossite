import type { Proposal } from "@/data/proposals/types";

/** Cover section: proposal title, client, sent date and validity. */
export function ProposalHero({ proposal }: { proposal: Proposal }) {
  const { hero, client, meta } = proposal;
  const facts = [
    { label: "Cliente", value: client.name },
    { label: "Data de envio", value: meta.sentDate },
    { label: "Validade", value: `${meta.validityDays} dias` },
  ];

  return (
    <section className="pt-24 sm:pt-32">
      <div className="container-x">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            00
          </span>
          <span className="label">Proposta Comercial</span>
        </div>

        <h1 className="display mt-10 max-w-5xl text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-6 text-2xl text-muted sm:text-3xl">{hero.subtitle}</p>

        <div
          aria-hidden
          className="mt-10 h-px w-40 rounded"
          style={{
            background:
              "linear-gradient(90deg, var(--color-accent), rgba(124,58,237,0.35))",
          }}
        />

        <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="bg-paper p-5">
              <dt className="label">{f.label}</dt>
              <dd className="display mt-2 text-xl sm:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
