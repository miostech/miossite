"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Mios Tech · ${name}${company ? ` (${company})` : ""}`;
    const body = `${message}\n\n${name}\n${email}\n${company}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const fieldClass =
    "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";
  const labelClass = "label mb-1 block";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t.name}
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {t.company}
        </label>
        <input id="company" name="company" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          {sent ? `${t.submit} ✓` : t.submit}
          <span aria-hidden>&rarr;</span>
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-faint">{t.note}</p>
      </div>
    </form>
  );
}
