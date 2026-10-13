import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db, admins } from "@/db";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  const fail = () =>
    NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);

  if (!email || !password) return fail();

  const rows = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);
  const admin = rows[0];

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return fail();
  }

  await createSession(admin.id);
  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
