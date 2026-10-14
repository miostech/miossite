import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

// --- Admin auth (private billing area) ---

export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  // scrypt hash, stored as "<saltHex>:<derivedHex>".
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable("sessions", {
  // sha256 of the random token held in the cookie (so a DB leak exposes no
  // usable session tokens).
  id: text("id").primaryKey(),
  adminId: uuid("admin_id")
    .notNull()
    .references(() => admins.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Failed login attempts, for rate limiting the admin login.
export const loginAttempts = pgTable("login_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  ip: text("ip"),
  attemptedAt: timestamp("attempted_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type Session = typeof sessions.$inferSelect;

// --- Clients & charges ---

export const chargeType = pgEnum("charge_type", ["one_off", "recurring"]);

export const chargeStatus = pgEnum("charge_status", [
  "draft", // created in our admin, no payment attempt yet
  "pending", // sent to the client / awaiting payment
  "paid", // confirmed via webhook
  "failed", // payment attempt failed
  "canceled", // charge/subscription canceled
  "refunded", // paid then refunded
]);

// Billing interval for recurring charges (null for one-off).
export const billingInterval = pgEnum("billing_interval", ["month", "year"]);

export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  // The client's project (free text, for our reference).
  project: text("project"),

  // Country (ISO-2) drives which tax document applies.
  country: text("country"),
  // Human label of the tax document, e.g. "CNPJ", "NIF", "EIN".
  taxIdType: text("tax_id_type"),
  taxId: text("tax_id"),

  // Billing address (mirrored to the Stripe customer).
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  addressCity: text("address_city"),
  addressState: text("address_state"),
  addressPostalCode: text("address_postal_code"),

  // Set once we create the matching Customer in Stripe.
  stripeCustomerId: text("stripe_customer_id").unique(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const charges = pgTable("charges", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "restrict" }),

  type: chargeType("type").notNull(),
  description: text("description").notNull(),
  // Amount in the currency's minor unit (e.g. cents), matching Stripe.
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("usd"),
  // Only set for recurring charges.
  interval: billingInterval("interval"),

  status: chargeStatus("status").notNull().default("draft"),

  // Due date for one-off charges (YYYY-MM-DD). A pending charge past this
  // date is considered overdue. Null = no due date.
  dueDate: date("due_date"),
  // When the last automatic overdue reminder was sent (throttles the cron).
  lastReminderAt: timestamp("last_reminder_at", { withTimezone: true }),

  // Stripe references — filled as the charge moves through its lifecycle.
  stripeCheckoutSessionId: text("stripe_checkout_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeInvoiceId: text("stripe_invoice_id"),
  // Hosted invoice page (with PDF) — the receipt we can share with the client.
  stripeInvoiceUrl: text("stripe_invoice_url"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type Charge = typeof charges.$inferSelect;
export type NewCharge = typeof charges.$inferInsert;
