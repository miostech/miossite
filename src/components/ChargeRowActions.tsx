"use client";

import { useState } from "react";

export function ChargeRowActions({ chargeId }: { chargeId: string }) {
  const [copied, setCopied] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const payUrl = () =>
    typeof window !== "undefined" ? `${window.location.origin}/pay/${chargeId}` : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(payUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  async function send() {
    setSendState("sending");
    try {
      const res = await fetch(`/api/admin/charges/${chargeId}/send`, {
        method: "POST",
      });
      setSendState(res.ok ? "sent" : "error");
    } catch {
      setSendState("error");
    }
    setTimeout(() => setSendState("idle"), 2500);
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      <button
        type="button"
        onClick={copy}
        className="text-accent underline-offset-4 hover:underline"
      >
        {copied ? "Copiado!" : "Copiar link"}
      </button>
      <span className="text-line">·</span>
      <button
        type="button"
        onClick={send}
        disabled={sendState === "sending"}
        className="text-ink underline-offset-4 hover:underline disabled:opacity-50"
      >
        {sendState === "sending"
          ? "Enviando…"
          : sendState === "sent"
            ? "Enviado ✓"
            : sendState === "error"
              ? "Falhou"
              : "Enviar e-mail"}
      </button>
    </div>
  );
}
