import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.mios.pt";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { ...languages, "x-default": `${siteUrl}/en` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteUrl}/${locale}`,
      siteName: "Mios Tech",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Header lang={lang} dict={dict} />
        <main>{children}</main>
        <Footer lang={lang} dict={dict} />
        <CookieConsent lang={lang} dict={dict} />
      </body>
    </html>
  );
}
