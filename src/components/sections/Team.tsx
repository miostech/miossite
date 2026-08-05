import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";
import { TeamAvatar } from "@/components/TeamAvatar";
import { team } from "@/lib/team";

export function Team({
  dict,
  index = "05",
}: {
  dict: Dictionary;
  index?: string;
}) {
  const t = dict.team;
  const leads = team.filter((m) => m.lead);
  const rest = team.filter((m) => !m.lead);

  return (
    <section id="team" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 flex items-center gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            {index}
          </span>
          <span className="label">{t.eyebrow}</span>
        </div>

        <h2 className="display max-w-2xl text-4xl leading-[1.02] sm:text-5xl">
          {t.title}
        </h2>

        {/* Liderança */}
        <div className="mt-14">
          <span className="label text-accent">{t.leadLabel}</span>
          <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">
            {leads.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="bg-paper">
                <TeamAvatar src={m.photo} name={m.name} />
                <div className="p-6">
                  <h3 className="display text-xl">{m.name}</h3>
                  <p className="mt-1 text-sm text-accent">{m.role}</p>
                  {m.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {m.bio}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="mt-14">
          <span className="label">{t.teamLabel}</span>
          <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            {rest.map((m, i) => (
              <Reveal key={m.name} delay={i * 50} className="bg-paper">
                <TeamAvatar src={m.photo} name={m.name} />
                <div className="p-5">
                  <h3 className="display text-base sm:text-lg">{m.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {m.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
