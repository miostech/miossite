import { defineConfig } from "drizzle-kit";

// Run migrations with DATABASE_URL in the environment, e.g.:
//   DATABASE_URL="postgres://..." npm run db:push
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
