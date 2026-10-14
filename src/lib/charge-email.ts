import "server-only";

export type ChargeEmailInput = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  dueDate: string | null; // "YYYY-MM-DD"
  clientName: string;
  clientEmail: string;
  baseUrl: string; // origin for the payment link
};

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

// Sends the payment link to the client. Phrases itself as a reminder when the
// charge is overdue. Returns a result instead of throwing so callers (manual
// send and the cron) can decide what to do.
export async function sendChargePaymentEmail(
  c: ChargeEmailInput,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  if (!apiKey || !from) return { ok: false, error: "not_configured" };

  const payUrl = `${c.baseUrl.replace(/\/$/, "")}/pay/${c.id}`;
  const amount = formatAmount(c.amount, c.currency);

  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = !!c.dueDate && c.dueDate < today;
  const dueBr = c.dueDate ? c.dueDate.split("-").reverse().join("/") : null;

  const subject = isOverdue
    ? `Lembrete · ${c.description} — ${amount} (em atraso)`
    : `Mios · ${c.description} — ${amount}`;

  const intro = isOverdue
    ? `<p>Passando para lembrar do pagamento de <strong>${c.description}</strong> (${amount}):</p>`
    : `<p>Segue o link para pagamento de <strong>${c.description}</strong> (${amount}):</p>`;
  const dueLine = dueBr
    ? isOverdue
      ? `<p>Esta cobrança venceu em <strong>${dueBr}</strong>.</p>`
      : `<p>Vencimento: <strong>${dueBr}</strong>.</p>`
    : "";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: c.clientEmail,
        subject,
        html: [
          `<p>Olá, ${c.clientName},</p>`,
          intro,
          dueLine,
          `<p><a href="${payUrl}">${payUrl}</a></p>`,
          `<p>Obrigado,<br>Mios</p>`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      console.error("Charge email: Resend error", res.status, payload);
      return { ok: false, error: "provider_error" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Charge email failed:", err);
    return { ok: false, error: "unexpected" };
  }
}
