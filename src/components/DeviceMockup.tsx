"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

type Kind = "browser" | "phone";

/**
 * A CSS-3D device mockup (browser window or phone) that tilts toward the
 * pointer. When no `image` is given it renders a branded gradient placeholder,
 * so case pages work before real screenshots exist. Honors reduced-motion by
 * staying at its resting angle.
 */
export function DeviceMockup({
  kind = "browser",
  image,
  name,
  gradient,
  url,
  className = "",
}: {
  kind?: Kind;
  image?: string;
  name: string;
  gradient: string;
  url?: string;
  className?: string;
}) {
  // Resting angle gives the static 3D look before any interaction.
  const rest = { rx: 6, ry: kind === "phone" ? -16 : -12 };
  const [t, setT] = useState(rest);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || e.pointerType === "touch") return;
    }
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: rest.rx - py * 14, ry: rest.ry + px * 18 });
  }

  const reset = () => setT(rest);

  const screen = image ? (
    <Image
      src={image}
      alt={name}
      fill
      sizes="(max-width: 768px) 90vw, 640px"
      className="object-cover object-top"
    />
  ) : (
    <div
      className="flex h-full w-full items-end p-5"
      style={{ background: gradient }}
    >
      <span className="display text-xl text-paper/90 sm:text-2xl">{name}</span>
    </div>
  );

  return (
    <div
      className={`[perspective:1400px] ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div
        className="transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        {kind === "browser" ? (
          <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              {url && (
                <span className="ml-3 truncate font-mono text-[10px] text-faint">
                  {url.replace(/^https?:\/\//, "")}
                </span>
              )}
            </div>
            <div className="relative aspect-[16/10] w-full">{screen}</div>
          </div>
        ) : (
          <div className="mx-auto w-[62%] max-w-[280px] overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-2xl">
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.75rem]">
              <span className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink/80" />
              {screen}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
