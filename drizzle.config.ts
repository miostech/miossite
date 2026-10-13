import { loadEnvFile } from "node:process";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not read .env.local on its own; load it here so
// `npm run db:push` / `db:generate` pick up DATABASE_URL.
try {
  loadEnvFile(".env.local");
} catch {
  // no .env.local (e.g. CI) — rely on the ambient environment
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
