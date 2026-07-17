import Image from "next/image";
import Link from "next/link";
import { localePath } from "@/lib/site";

export function Logo({
  lang,
  tone = "ink",
  className = "",
  priority = false,
}: {
  lang: string;
  tone?: "ink" | "paper" | "accent";
  className?: string;
  priority?: boolean;
}) {
  if (tone === "accent") {
    return (
      <Link
        href={localePath(lang)}
        aria-label="Mios Tech"
        className={`inline-flex items-center ${className}`}
      >
        <span
          aria-hidden
          className="inline-block h-6 sm:h-[26px]"
          style={{
            aspectRatio: "1072 / 343",
            backgroundColor: "var(--color-accent)",
            WebkitMaskImage: "url(/logo-mios.png)",
            maskImage: "url(/logo-mios.png)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
      </Link>
    );
  }

  return (
    <Link
      href={localePath(lang)}
      aria-label="Mios Tech"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/logo-mios.png"
        alt="Mios Tech"
        width={1072}
        height={343}
        priority={priority}
        className={`h-6 w-auto sm:h-[26px] ${tone === "ink" ? "logo-ink" : ""}`}
      />
    </Link>
  );
}
