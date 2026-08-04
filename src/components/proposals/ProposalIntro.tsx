import { Reveal } from "@/components/Reveal";
import { proposalShared } from "@/data/proposals/shared";

/** "Olá" / about Mios. `body` overrides the shared boilerplate when provided. */
export function ProposalIntro({ body }: { body?: string }) {
  const { greeting, body: sharedBody } = proposalShared.intro;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="display text-5xl sm:text-6xl">{greeting}</h2>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {body ?? sharedBody}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
