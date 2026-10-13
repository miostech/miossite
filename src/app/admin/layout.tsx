import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
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

export const metadata: Metadata = {
  title: "Admin · Mios",
  robots: { index: false, follow: false },
};

// Own root layout for the private billing area — no site header/footer.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
