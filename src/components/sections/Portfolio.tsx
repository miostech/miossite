"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { portfolio } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type Status = "idle" | "loading" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const STORAGE_KEY = "mios-portfolio-unlocked";

const gradients = [
  "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
  "linear-gradient(135deg, #1b1a15 0%, #4c1d95 100%)",
  "linear-gradient(135deg, #3b1673 0%, #6d28d9 100%)",
];

export function Portfolio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.portfolio;
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!name || !company || !email || !phone) {
      setStatus("error");
      setError(t.required);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setError(t.invalidEmail);
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/portfolio-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, lang }),
      });
      if (!res.ok) throw new Error("request_failed");
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
    } catch {
      setStatus("error");
      setError(t.error);
    }
  }

  const fieldClass =
    "w-full border-b border-line bg-transparent py-2.5 text-base text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          className="mb-14"
        />

        <div className="relative">
          <div
            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
              unlocked ? "" : "pointer-events-none select-none blur-[6px]"
            }`}
            aria-hidden={!unlocked}
          >
            {portfolio.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="group flex h-full flex-col overflow-hidden border border-line">
                  <div
                    className="relative aspect-[4/3] w-full"
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    <span className="label absolute left-5 top-5 text-paper/80">
                      {item.category}
                    </span>
                    <span className="display absolute inset-x-5 bottom-5 text-2xl text-paper">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-muted">{item.category}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={unlocked ? 0 : -1}
                      className="link-underline text-sm font-medium text-ink"
                    >
                      {t.view} &rarr;
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-md border border-line bg-paper/95 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
                <h3 className="display text-2xl">{t.gateTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.gateSubtitle}
                </p>
                <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder={t.form.name}
                    required
                    className={fieldClass}
                  />
                  <input
                    name="company"
                    autoComplete="organization"
                    placeholder={t.form.company}
                    required
                    className={fieldClass}
                  />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.form.email}
                    required
                    className={fieldClass}
                  />
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.form.phone}
                    required
                    className={fieldClass}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-50"
                  >
                    {t.form.submit}
                    <span aria-hidden>&rarr;</span>
                  </button>
                  {status === "error" && (
                    <p className="text-sm" style={{ color: "#c0392b" }}>
                      {error}
                    </p>
                  )}
                  <p className="text-xs leading-relaxed text-faint">
                    {t.form.note}
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
