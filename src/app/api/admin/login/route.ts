import { NextResponse, type NextRequest } from "next/server";
import { and, eq, gte, sql } from "drizzle-orm";
import { db, admins, loginAttempts } from "@/db";
import { verifyPassword, createSession } from "@/lib/auth";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const fail = () =>
    NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  const locked = () =>
    NextResponse.redirect(new URL("/admin/login?error=locked", request.url), 303);

  if (!email || !password) return fail();

  // Rate limit: too many recent failures for this email → reject.
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
  const [{ count } = { count: 0 }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(loginAttempts)
    .where(
      and(eq(loginAttempts.email, email), gte(loginAttempts.attemptedAt, since)),
    );
  if (count >= MAX_ATTEMPTS) return locked();

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    await db.insert(loginAttempts).values({ email, ip });
    return fail();
  }

  // Success: clear this email's failed attempts and start a session.
  await db.delete(loginAttempts).where(eq(loginAttempts.email, email));
  await createSession(admin.id);
  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
