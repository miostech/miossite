import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";
import { site, whatsappLink } from "@/lib/site";

/** Closing CTA — "Vamos tirar sua ideia do papel?" */
export function ProposalClosing({
  lang,
  clientName,
}: {
  lang: Locale;
  clientName: string;
}) {
  const { title, subtitle } = proposalShared.closing;
  return (
    <section
      className="text-paper"
      style={{
        background:
          "radial-gradient(120% 140% at 85% -10%, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.28) 30%, rgba(20,19,15,0) 62%), var(--color-ink)",
      }}
    >
      <div className="container-x py-24 sm:py-36">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <span className="label" style={{ color: "rgba(243,241,236,0.7)" }}>
                Mios Tech
              </span>
              <h2 className="display mt-6 text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
                {title}
              </h2>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="text-lg leading-relaxed text-paper/80">{subtitle}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={whatsappLink(
                    `Olá! Gostaria de avançar com a proposta da ${clientName}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
                >
                  Falar com consultor
                  <span aria-hidden>&rarr;</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline inline-flex items-center gap-2 py-3.5 text-sm font-medium text-paper"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-inverse-line pt-6">
            <span className="label" style={{ color: "rgba(243,241,236,0.7)" }}>
              www.mios.pt
            </span>
            <span className="text-paper/60">
              Proposta {clientName} · {lang.toUpperCase()}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
