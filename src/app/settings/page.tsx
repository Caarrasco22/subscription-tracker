import { ThemeSettings } from "@/components/ThemeSettings";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Settings / About</h1>
        <p className="mt-2 text-muted">SubTrack v0.1 is intentionally small and local-first.</p>
      </div>

      <ThemeSettings />

      <section className="grid gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm">
        <h2 className="text-xl font-black text-ink">Privacy note</h2>
        <ul className="grid gap-2 text-muted">
          <li>No accounts.</li>
          <li>No bank connection.</li>
          <li>No email scraping.</li>
          <li>No payments.</li>
          <li>No external analytics.</li>
          <li>Your data stays in the local SQLite database.</li>
        </ul>
      </section>

      <section className="grid gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm">
        <h2 className="text-xl font-black text-ink">v0.1 limits</h2>
        <p className="text-muted">
          Reminders are only shown inside the app. Email, push reminders, imports and
          bank integrations are intentionally left for future versions.
        </p>
      </section>
    </div>
  );
}
