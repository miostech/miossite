import "server-only";
import Stripe from "stripe";

let instance: Stripe | null = null;

function getStripe(): Stripe {
  if (instance) return instance;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add your Stripe secret key to the environment.",
    );
  }

  // apiVersion omitted on purpose: the SDK pins its own supported version.
  instance = new Stripe(key);
  return instance;
}

// Lazy proxy: importing this module never touches STRIPE_SECRET_KEY, so the
// build does not depend on the billing env being present. The client is created
// — and any missing-env error thrown — on first use.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const real = getStripe();
    const value = Reflect.get(real as object, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
