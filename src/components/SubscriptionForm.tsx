import type { Subscription } from "@prisma/client";
import { billingCycles, categories, statuses } from "@/lib/constants";
import { toDateInputValue } from "@/lib/subscription-utils";

type SubscriptionFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  subscription?: Subscription;
  submitLabel: string;
};

export function SubscriptionForm({ action, subscription, submitLabel }: SubscriptionFormProps) {
  return (
    <form action={action} className="grid gap-5 rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Name
          <input
            required
            name="name"
            defaultValue={subscription?.name}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
            placeholder="Netflix, gym, domain..."
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Price
          <input
            required
            min="0"
            step="0.01"
            type="number"
            name="price"
            defaultValue={subscription?.price}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Currency
          <input
            name="currency"
            defaultValue={subscription?.currency ?? "EUR"}
            className="rounded-xl border border-line px-3 py-2 font-normal uppercase outline-none focus:border-brand"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Billing cycle
          <select
            required
            name="billingCycle"
            defaultValue={subscription?.billingCycle ?? "monthly"}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          >
            {billingCycles.map((cycle) => (
              <option key={cycle.value} value={cycle.value}>
                {cycle.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Custom cycle days
          <input
            min="1"
            type="number"
            name="customCycleDays"
            defaultValue={subscription?.customCycleDays ?? ""}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
            placeholder="Only for custom cycle"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Next renewal date
          <input
            required
            type="date"
            name="nextRenewalDate"
            defaultValue={
              subscription?.nextRenewalDate
                ? toDateInputValue(subscription.nextRenewalDate)
                : toDateInputValue(new Date())
            }
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Category
          <select
            name="category"
            defaultValue={subscription?.category ?? "other"}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Status
          <select
            name="status"
            defaultValue={subscription?.status ?? "active"}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Reminder days before renewal
          <input
            min="0"
            type="number"
            name="reminderDaysBefore"
            defaultValue={subscription?.reminderDaysBefore ?? 3}
            className="rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        Notes
        <textarea
          name="notes"
          defaultValue={subscription?.notes ?? ""}
          className="min-h-28 rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand"
          placeholder="Optional cancellation notes, plan details or reminders."
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-xl bg-brand px-4 py-2 font-bold text-white transition hover:bg-blue-700">
          {submitLabel}
        </button>
        <p className="text-sm text-muted">Your data stays local. No bank connection.</p>
      </div>
    </form>
  );
}
