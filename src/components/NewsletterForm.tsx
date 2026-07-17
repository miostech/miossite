"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function NewsletterForm({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.newsletter;
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage(t.invalid);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      setMessage(t.success);
    } catch {
      setStatus("error");
      setMessage(t.error);
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-paper/80">
        <span aria-hidden className="text-accent">→</span>
        {t.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex items-end gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder={t.placeholder}
          aria-label={t.title}
          className="min-w-0 flex-1 border-b border-inverse-line bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-paper"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {t.button}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-paper/60">{message}</p>
      )}
    </form>
  );
}
