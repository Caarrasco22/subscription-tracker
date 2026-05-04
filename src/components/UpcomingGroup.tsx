import type { Subscription } from "@prisma/client";
import { formatCurrency, formatDate } from "@/lib/subscription-utils";

type UpcomingGroupProps = {
  title: string;
  subscriptions: Subscription[];
};

export function UpcomingGroup({ title, subscriptions }: UpcomingGroupProps) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-ink">{title}</h2>
        <span className="text-sm font-semibold text-muted">{subscriptions.length} item(s)</span>
      </div>

      {subscriptions.length === 0 ? (
        <p className="text-sm text-muted">Nothing here yet.</p>
      ) : (
        <div className="grid gap-3">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex flex-col gap-1 rounded-xl border border-line bg-soft p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-bold text-ink">{subscription.name}</p>
                <p className="text-sm text-muted">{formatDate(subscription.nextRenewalDate)}</p>
              </div>
              <p className="font-black text-ink">
                {formatCurrency(subscription.price, subscription.currency)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
