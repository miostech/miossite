"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps the site's global chrome (header, footer, cookie banner) and hides it on
 * standalone routes that render their own minimal chrome — proposal pages
 * (`/{lang}/propostas/...`) and the company-presentation deck
 * (`/{lang}/apresentacao`). Header/Footer/CookieConsent are passed as
 * already-rendered nodes so this client boundary only decides visibility.
 */
export function SiteChrome({
  header,
  footer,
  cookieConsent,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  cookieConsent: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isStandalone =
    (pathname?.includes("/propostas/") ||
      pathname?.includes("/apresentacao")) ??
    false;

  return (
    <>
      {!isStandalone && header}
      <main>{children}</main>
      {!isStandalone && footer}
      {!isStandalone && cookieConsent}
    </>
  );
}
