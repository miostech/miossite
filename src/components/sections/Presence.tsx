"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Presence({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="presence" className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <SectionHeading
            index="07"
            eyebrow={dict.presence.eyebrow}
            title={dict.presence.title}
            subtitle={dict.presence.subtitle}
          />
        </div>

        <div className="mt-16 border-t border-line">
          {dict.presence.countries.map((country, i) => {
            const soon = country.status === dict.presence.comingSoon;
            const address = "address" in country ? country.address : undefined;
            const isOpen = openIndex === i;
            const canOpen = Boolean(address);

            return (
              <Reveal key={country.name} delay={i * 60}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() =>
                      canOpen && setOpenIndex(isOpen ? null : i)
                    }
                    aria-expanded={isOpen}
                    disabled={!canOpen}
                    className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-6 text-left ${
                      canOpen ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-3xl sm:text-4xl ${
                        soon ? "text-faint" : "text-ink"
                      }`}
                    >
                      {country.name}
                    </span>
                    <span
                      className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
                        soon ? "text-faint" : "text-ink"
                      }`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          soon ? "bg-faint" : "bg-accent"
                        }`}
                      />
                      {country.status}
                      {canOpen && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {address && (
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <address className="grid grid-cols-[auto_1fr] gap-6 not-italic">
                          <span aria-hidden="true" />
                          <p className="whitespace-pre-line pb-6 font-mono text-sm leading-relaxed text-faint">
                            {address}
                          </p>
                        </address>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
