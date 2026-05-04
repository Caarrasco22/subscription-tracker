type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-ink">{value}</p>
      {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
    </article>
  );
}
