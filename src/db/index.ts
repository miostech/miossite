import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DB = PostgresJsDatabase<typeof schema>;

let instance: DB | null = null;

function getDb(): DB {
  if (instance) return instance;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add the Supabase connection string to the environment.",
    );
  }

  // `prepare: false` is required for Supabase's transaction pooler (Supavisor,
  // port 6543), which is what serverless functions on Vercel should use.
  const client = postgres(connectionString, { prepare: false });
  instance = drizzle(client, { schema });
  return instance;
}

// Lazy proxy: importing this module never touches DATABASE_URL, so the build
// (and the marketing site) does not depend on the billing env being present.
// The connection is created — and any missing-env error thrown — on first use.
export const db = new Proxy({} as DB, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real as object, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export * from "./schema";
