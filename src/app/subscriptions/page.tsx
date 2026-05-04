import Link from "next/link";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { prisma } from "@/lib/db";

export default async function SubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: [{ status: "asc" }, { nextRenewalDate: "asc" }]
  });

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink">Subscriptions</h1>
          <p className="mt-2 text-muted">Everything you track manually in one place.</p>
        </div>
        <Link
          href="/subscriptions/new"
          className="rounded-xl bg-brand px-5 py-2.5 text-center font-bold text-white shadow-sm transition hover:opacity-90"
        >
          Add subscription
        </Link>
      </div>

      {subscriptions.length === 0 ? (
        <section className="rounded-3xl border border-line bg-panel p-8 text-center shadow-sm">
          <h2 className="text-xl font-black text-ink">No subscriptions yet.</h2>
          <p className="mt-2 text-muted">Add your first subscription to see totals and upcoming charges.</p>
        </section>
      ) : (
        <div className="grid gap-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard key={subscription.id} subscription={subscription} />
          ))}
        </div>
      )}
    </div>
  );
}
