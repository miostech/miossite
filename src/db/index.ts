import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add the Supabase connection string to .env.local.",
  );
}

// `prepare: false` is required for Supabase's transaction pooler (Supavisor,
// port 6543), which is what serverless functions on Vercel should use.
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
export * from "./schema";
