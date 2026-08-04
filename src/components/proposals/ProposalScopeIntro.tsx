/** Full-bleed divider that opens the scope section. */
export function ProposalScopeIntro({ intro }: { intro: string }) {
  return (
    <section
      className="text-paper"
      style={{
        background:
          "radial-gradient(120% 140% at 85% -10%, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.28) 30%, rgba(20,19,15,0) 62%), var(--color-ink)",
      }}
    >
      <div className="container-x py-20 sm:py-28">
        <span className="label" style={{ color: "rgba(243,241,236,0.7)" }}>
          Escopo do projeto
        </span>
        <h2 className="display mt-6 max-w-4xl text-4xl leading-[1.02] sm:text-6xl">
          O que vamos construir
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
          {intro}
        </p>
      </div>
    </section>
  );
}
