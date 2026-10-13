#!/usr/bin/env node
// Create (or update) an admin for the private billing area.
//
// Usage:
//   npm run create:admin                       (pergunta tudo, senha oculta)
//   npm run create:admin <email> "<nome>"      (pergunta só a senha)
//   npm run create:admin <email> "<nome>" <senha>
//
// The password hash format matches src/lib/auth.ts (scrypt, "<saltHex>:<derivedHex>").

import { randomBytes, scryptSync } from "node:crypto";
import { loadEnvFile } from "node:process";
import readline from "node:readline";
import postgres from "postgres";

try {
  loadEnvFile(".env.local");
} catch {
  // sem .env.local — usa o ambiente atual
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não definida (verifique o .env.local).");
  process.exit(1);
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    if (hidden) {
      // Oculta o que é digitado (sem eco dos caracteres).
      rl._writeToOutput = (s) => {
        if (s.includes(question)) rl.output.write(question);
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

function hashPassword(pw) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

const [argEmail, argName, argPassword] = process.argv.slice(2);

const email = argEmail ?? (await ask("E-mail: "));
const name = argName ?? (await ask("Nome: "));
const password = argPassword ?? (await ask("Senha: ", { hidden: true }));

if (!email || !name || !password) {
  console.error("E-mail, nome e senha são obrigatórios.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false });

try {
  const passwordHash = hashPassword(password);
  const normalizedEmail = email.toLowerCase();

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
