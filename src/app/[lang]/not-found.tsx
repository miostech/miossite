import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="container-x">
        <span className="font-mono text-xs tracking-[0.18em] text-accent">
          404
        </span>
        <h1 className="display mt-4 text-5xl sm:text-7xl">Page not found.</h1>
        <p className="mt-6 max-w-md text-lg text-muted">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Back home <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
