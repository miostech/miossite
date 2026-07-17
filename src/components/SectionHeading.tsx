import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  tone = "ink",
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  const titleColor = tone === "ink" ? "text-ink" : "text-paper";
  const subColor = tone === "ink" ? "text-muted" : "text-paper/60";
  const lineColor = tone === "ink" ? "border-line" : "border-inverse-line";

  return (
    <Reveal className={className}>
      {(eyebrow || index) && (
        <div
          className={`mb-6 flex items-center gap-4 border-t ${lineColor} pt-4`}
        >
          {index && (
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              {index}
            </span>
          )}
          {eyebrow && <span className="label">{eyebrow}</span>}
        </div>
      )}
      <h2
        className={`display max-w-3xl text-4xl sm:text-5xl lg:text-6xl ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-6 max-w-xl text-lg leading-relaxed ${subColor}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
