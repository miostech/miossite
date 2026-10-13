import "server-only";
import { randomBytes, scryptSync, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db, admins, sessions, type Admin } from "@/db";

const COOKIE_NAME = "mios_admin_session";
const SESSION_DAYS = 7;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

// --- Password hashing (scrypt) ---

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

// --- Sessions ---

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(adminId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const id = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MS);

  await db.insert(sessions).values({ id, adminId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentAdmin(): Promise<Admin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const id = hashToken(token);
  const rows = await db
    .select({ admin: admins, expiresAt: sessions.expiresAt })
    .from(sessions)
    .innerJoin(admins, eq(sessions.adminId, admins.id))
    .where(eq(sessions.id, id))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  if (row.expiresAt.getTime() < Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, id));
    return null;
  }

  return row.admin;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await db.delete(sessions).where(eq(sessions.id, hashToken(token)));
  }
  cookieStore.delete(COOKIE_NAME);
}
