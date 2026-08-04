/** Editorial section header: mono number + uppercase label, optional title/intro. */
export function ProposalSectionHeader({
  index,
  label,
  title,
  intro,
  tone = "ink",
}: {
  index: string;
  label: string;
  title?: string;
  intro?: string;
  tone?: "ink" | "paper";
}) {
  const inverse = tone === "paper";
  return (
    <div className="mb-12 sm:mb-16">
      <div
        className={`flex items-center gap-4 border-t pt-4 ${
          inverse ? "border-inverse-line" : "border-line"
        }`}
      >
        <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
          {index}
        </span>
        <span
          className="label"
          style={inverse ? { color: "rgba(243,241,236,0.7)" } : undefined}
        >
          {label}
        </span>
      </div>
      {title && (
        <h2 className="display mt-7 max-w-3xl text-4xl leading-[1.02] sm:text-5xl">
          {title}
        </h2>
      )}
      {intro && (
        <p
          className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
            inverse ? "text-paper/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
