"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60";

// Submit button that disables itself on the first submit (click or Enter) and
// shows a pending label, so a slow POST can't be double-submitted.
export function SubmitButton({
  children,
  pendingLabel = "Enviando…",
  className,
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = ref.current?.closest("form");
    if (!form) return;
    const onSubmit = () => setPending(true);
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending}
      className={className ?? BASE}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
