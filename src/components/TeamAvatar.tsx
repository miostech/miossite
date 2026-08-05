"use client";

import { useState } from "react";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// Shows the photo when the file exists; falls back to an initials monogram
// (so the section works before photos are dropped into public/team/).
export function TeamAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden
        className="flex aspect-square w-full items-center justify-center bg-paper-2"
      >
        <span className="display text-3xl text-accent sm:text-4xl">
          {initials(name)}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-square w-full object-cover"
    />
  );
}
