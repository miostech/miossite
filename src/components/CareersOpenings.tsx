"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

type Careers = Dictionary["careers"];
type Opening = Careers["openings"][number];

function applyLink(email: string, subject: string, role?: string) {
  const full = role ? `${subject}: ${role}` : subject;
  return `mailto:${email}?subject=${encodeURIComponent(full)}`;
}

export function CareersOpenings({
  careers,
  email,
}: {
  careers: Careers;
  email: string;
}) {
  const c = careers;
  const [active, setActive] = useState<Opening | null>(null);

  useEffect(() => {
    if (!active) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (c.openings.length === 0) {
    return (
      <Reveal>
        <div className="border-t border-line py-8">
          <h3 className="display text-2xl sm:text-3xl">{c.emptyTitle}</h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            {c.emptyBody}
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <>
      <ul className="border-t border-line">
        {c.openings.map((job, i) => (
          <Reveal as="li" key={job.role} delay={i * 70}>
            <div className="border-b border-line py-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <button
                  type="button"
                  onClick={() => setActive(job)}
                  className="hover-row group -mx-3 flex-1 rounded-none px-3 py-1 text-left transition-[padding] hover:pl-5"
                  aria-haspopup="dialog"
                >
                  <h3 className="display text-2xl sm:text-3xl">{job.role}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="label text-accent">{job.type}</span>
                    <span className="label text-faint">{job.location}</span>
                  </div>
                </button>
                <a
                  href={applyLink(email, c.emailSubject, job.role)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 self-start bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  {c.applyRole}
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => setActive(job)}
                className="mt-4 block max-w-xl text-left"
              >
                <span className="text-base leading-relaxed text-muted">
                  {job.description}
                </span>
                <span className="link-underline mt-3 inline-block text-sm font-medium text-ink">
                  {c.detailsLabel} &rarr;
                </span>
              </button>
            </div>
          </Reveal>
        ))}
      </ul>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.role}
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-line bg-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-6 sm:px-8">
              <div>
                <h3 className="display text-2xl sm:text-3xl">{active.role}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="label text-accent">{active.type}</span>
                  <span className="label text-faint">{active.location}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={c.close}
                className="-mr-2 shrink-0 p-2 text-2xl leading-none text-muted transition-colors hover:text-ink"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <p className="text-base leading-relaxed text-muted">
                {active.description}
              </p>

              <h4 className="label mt-8 text-accent">
                {c.responsibilitiesTitle}
              </h4>
              <ul className="mt-4 space-y-3">
                {active.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="label mt-8 text-accent">{c.requirementsTitle}</h4>
              <ul className="mt-4 space-y-3">
                {active.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-6 py-5 sm:px-8">
              <a
                href={applyLink(email, c.emailSubject, active.role)}
                className="inline-flex items-center justify-center gap-2 bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {c.applyRole}
                <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
