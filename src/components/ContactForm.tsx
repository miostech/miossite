"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "loading" | "success" | "error";
type ErrorKind = "retry" | "invalid" | "unavailable";

export function ContactForm({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>("retry");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
          lang,
        }),
      });
      if (!res.ok) {
        // 503 means the site itself cannot send right now, so retrying is
        // pointless; anything else is worth another attempt.
        setErrorKind(
          res.status === 503 ? "unavailable" : res.status === 400 ? "invalid" : "retry",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorKind("retry");
      setStatus("error");
    }
  }

  const errorMessage =
    errorKind === "unavailable"
      ? t.errorUnavailable
      : errorKind === "invalid"
        ? t.errorInvalid
        : t.error;

  const fieldClass =
    "w-full border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";
  const labelClass = "label mb-1 block";

  if (status === "success") {
    return (
      <p className="flex items-start gap-3 text-lg leading-relaxed text-ink">
        <span aria-hidden className="text-accent">
          &rarr;
        </span>
        {t.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Honeypot: hidden from humans and from assistive tech; bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

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
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-50"
        >
          {status === "loading" ? t.sending : t.submit}
          <span aria-hidden>&rarr;</span>
        </button>
        <p
          className={`max-w-xs text-xs leading-relaxed ${
            status === "error" ? "text-ink" : "text-faint"
          }`}
          role={status === "error" ? "alert" : undefined}
        >
          {status === "error" ? errorMessage : t.note}
        </p>
      </div>
    </form>
  );
}
