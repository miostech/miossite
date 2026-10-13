#!/usr/bin/env node
// Create (or update) an admin for the private billing area.
//
// Usage:
//   DATABASE_URL="postgres://..." node scripts/create-admin.mjs <email> "<nome>" <senha>
//
// The password hash format matches src/lib/auth.ts (scrypt, "<saltHex>:<derivedHex>").

import { randomBytes, scryptSync } from "node:crypto";
import postgres from "postgres";

const [email, name, password] = process.argv.slice(2);

if (!email || !name || !password) {
  console.error(
    'Uso: node scripts/create-admin.mjs <email> "<nome>" <senha>',
  );
  process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não definida no ambiente.");
  process.exit(1);
}

function hashPassword(pw) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

const sql = postgres(url, { prepare: false });

try {
  const passwordHash = hashPassword(password);
  const normalizedEmail = email.trim().toLowerCase();

  await sql`
    INSERT INTO admins (email, name, password_hash)
    VALUES (${normalizedEmail}, ${name}, ${passwordHash})
    ON CONFLICT (email)
    DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash
  `;

  console.log(`Admin pronto: ${normalizedEmail}`);
} catch (err) {
  console.error("Falhou:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
