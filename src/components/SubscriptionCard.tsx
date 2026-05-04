import Link from "next/link";
import type { Subscription } from "@prisma/client";
import {
  advanceRenewalAction,
  deleteSubscriptionAction,
  updateSubscriptionStatusAction
} from "@/app/actions";
import { billingCycles, categories, labelFor, statuses } from "@/lib/constants";
import {
  calculateMonthlyEquivalent,
  daysUntil,
  formatCurrency,
  formatDate
} from "@/lib/subscription-utils";

export function SubscriptionCard({ subscription }: { subscription: Subscription }) {
  const monthlyEquivalent = calculateMonthlyEquivalent(subscription);
  const renewalDistance = daysUntil(subscription.nextRenewalDate);

  return (
    <article className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            {labelFor(categories, subscription.category)}
          </p>
          <h3 className="mt-1 text-xl font-black text-ink">{subscription.name}</h3>
          <p className="mt-2 text-sm text-muted">
            {formatCurrency(subscription.price, subscription.currency)} ·{" "}
            {labelFor(billingCycles, subscription.billingCycle)}
          </p>
        </div>
        <span className="rounded-full border border-line bg-soft px-3 py-1 text-sm font-bold text-muted">
          {labelFor(statuses, subscription.status)}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-muted">Renews next</p>
          <p className="font-bold text-ink">{formatDate(subscription.nextRenewalDate)}</p>
          <p className="text-sm text-muted">
            {renewalDistance >= 0 ? `${renewalDistance} day(s)` : "Overdue"}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted">Monthly equivalent</p>
          <p className="font-bold text-ink">
            {formatCurrency(monthlyEquivalent, subscription.currency)}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted">Reminder</p>
          <p className="font-bold text-ink">{subscription.reminderDaysBefore} day(s) before</p>
        </div>
      </div>

      {subscription.notes ? <p className="mt-4 text-sm text-muted">{subscription.notes}</p> : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/subscriptions/${subscription.id}/edit`}
          className="rounded-lg border border-line px-3 py-2 text-sm font-bold text-ink hover:border-brand"
        >
          Edit
        </Link>
        <form action={advanceRenewalAction.bind(null, subscription.id)}>
          <button className="rounded-lg border border-line px-3 py-2 text-sm font-bold text-ink hover:border-brand">
            Mark paid
          </button>
        </form>
        {["active", "paused", "cancelled"].map((status) => (
          <form key={status} action={updateSubscriptionStatusAction.bind(null, subscription.id, status)}>
            <button className="rounded-lg border border-line px-3 py-2 text-sm font-bold text-ink hover:border-brand">
              Mark {status}
            </button>
          </form>
        ))}
        <form action={deleteSubscriptionAction.bind(null, subscription.id)}>
          <button className="rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50">
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
