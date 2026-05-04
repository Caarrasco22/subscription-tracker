import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { UpcomingGroup } from "@/components/UpcomingGroup";
import { prisma } from "@/lib/db";
import { categories, labelFor } from "@/lib/constants";
import {
  calculateMonthlyEquivalent,
  formatCurrency,
  formatDate,
  groupUpcomingRenewals,
  summarizeSubscriptions
} from "@/lib/subscription-utils";

export default async function DashboardPage() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { nextRenewalDate: "asc" }
  });
  const summary = summarizeSubscriptions(subscriptions);
  const upcoming = groupUpcomingRenewals(subscriptions);
  const mostExpensiveMonthly = summary.mostExpensive
    ? calculateMonthlyEquivalent(summary.mostExpensive)
    : 0;

  return (
    <div className="grid gap-8">
      <section className="rounded-3xl border border-line bg-panel p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-brand">Privacy-first v0.1</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-ink">See what you pay.</h1>
            <p className="mt-3 max-w-2xl text-muted">
              Track subscriptions manually, spot upcoming renewals, and decide what you could
              cancel. No bank connection. Your data stays local.
            </p>
          </div>
          <Link
            href="/subscriptions/new"
            className="rounded-xl bg-brand px-4 py-3 text-center font-bold text-white transition hover:bg-blue-700"
          >
            Add subscription
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Monthly total" value={formatCurrency(summary.monthlyTotal)} />
        <MetricCard label="Yearly total" value={formatCurrency(summary.yearlyTotal)} />
        <MetricCard label="Active subscriptions" value={String(summary.active.length)} />
        <MetricCard
          label="Renews next"
          value={summary.nextRenewal ? summary.nextRenewal.name : "None"}
          hint={summary.nextRenewal ? formatDate(summary.nextRenewal.nextRenewalDate) : "Add your first item."}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <MetricCard label="Next 7 days" value={String(upcoming.next7Days.length)} />
        <MetricCard label="Next 30 days" value={String(upcoming.next30Days.length)} />
        <MetricCard
          label="Could save"
          value={
            summary.mostExpensive
              ? formatCurrency(mostExpensiveMonthly, summary.mostExpensive.currency)
              : "None"
          }
          hint={summary.mostExpensive ? `Most expensive: ${summary.mostExpensive.name}` : "No subscriptions yet."}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
          <h2 className="text-xl font-black text-ink">Simple insights</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-muted">Most expensive subscription</dt>
              <dd className="font-bold text-ink">{summary.mostExpensive?.name ?? "None"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-muted">Most expensive category</dt>
              <dd className="font-bold text-ink">
                {summary.mostExpensiveCategory
                  ? `${labelFor(categories, summary.mostExpensiveCategory[0])} (${formatCurrency(summary.mostExpensiveCategory[1])}/mo)`
                  : "None"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Yearly projected cost</dt>
              <dd className="font-bold text-ink">{formatCurrency(summary.projectedYearlyWithCancelledExcluded)}</dd>
            </div>
          </dl>
        </article>

        <UpcomingGroup title="Renewing in next 7 days" subscriptions={upcoming.next7Days} />
      </section>
    </div>
  );
}
