import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale, type Locale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

function parseAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? parseFloat(q.split("=")[1]) : 1;
      return { lang: tag.toLowerCase(), quality: Number.isNaN(quality) ? 1 : quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { lang } of ranked) {
    const base = lang.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }
  return parseAcceptLanguage(request.headers.get("accept-language"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
