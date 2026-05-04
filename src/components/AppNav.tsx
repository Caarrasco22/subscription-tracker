import Link from "next/link";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/settings", label: "Settings" }
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-panel/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-xl font-black tracking-tight text-ink">
            SubTrack
          </Link>
          <p className="text-xs font-semibold text-muted">Local subscription tracker</p>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-semibold text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-line bg-soft px-3 py-1.5 transition hover:border-brand hover:bg-brandSoft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
