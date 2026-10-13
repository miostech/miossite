"use client";

import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export function PayCheckout({ chargeId }: { chargeId: string }) {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch(`/api/pay/${chargeId}/session`, { method: "POST" });
    if (!res.ok) throw new Error("session_failed");
    const data = await res.json();
    return data.clientSecret as string;
  }, [chargeId]);

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
