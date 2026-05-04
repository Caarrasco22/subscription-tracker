import { UpcomingGroup } from "@/components/UpcomingGroup";
import { prisma } from "@/lib/db";
import { groupUpcomingRenewals } from "@/lib/subscription-utils";

export default async function UpcomingPage() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { nextRenewalDate: "asc" }
  });
  const upcoming = groupUpcomingRenewals(subscriptions);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Upcoming charges</h1>
        <p className="mt-2 text-muted">Renewals grouped by date. No notifications are sent in v0.1.</p>
      </div>
      <div className="grid gap-4">
        <UpcomingGroup title="Next 7 days" subscriptions={upcoming.next7Days} />
        <UpcomingGroup title="Next 30 days" subscriptions={upcoming.next30Days} />
        <UpcomingGroup title="Later" subscriptions={upcoming.later} />
      </div>
    </div>
  );
}
