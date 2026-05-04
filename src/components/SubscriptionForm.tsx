"use client";

import type { Subscription } from "@prisma/client";
import { useState } from "react";
import { billingCycles, categories, statuses } from "@/lib/constants";
import { toDateInputValue } from "@/lib/subscription-utils";

type SubscriptionFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  subscription?: Subscription;
  submitLabel: string;
};

export function SubscriptionForm({ action, subscription, submitLabel }: SubscriptionFormProps) {
  const initialCycle = subscription?.billingCycle ?? "monthly";
  const [billingCycle, setBillingCycle] = useState(initialCycle);
  const shouldOpenAdvanced =
    Boolean(subscription?.currency && subscription.currency !== "EUR") ||
    Boolean(subscription?.status && subscription.status !== "active") ||
    Boolean(subscription?.customCycleDays) ||
    Boolean(subscription?.notes);

  return (
    <form action={action} className="grid gap-6 rounded-3xl border border-line bg-panel p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-xl font-black text-ink">{submitLabel}</h2>
        <p className="mt-1 text-sm text-muted">Start with the basics. Advanced options are optional.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Name
          <input
            required
            name="name"
            defaultValue={subscription?.name}
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
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
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Billing cycle
          <select
            required
            name="billingCycle"
            value={billingCycle}
            onChange={(event) => setBillingCycle(event.target.value)}
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {billingCycles.map((cycle) => (
              <option key={cycle.value} value={cycle.value}>
                {cycle.label}
              </option>
            ))}
          </select>
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
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Category
          <select
            name="category"
            defaultValue={subscription?.category ?? "other"}
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <details
        open={shouldOpenAdvanced || billingCycle === "custom"}
        className="rounded-2xl border border-line bg-soft/70 p-4"
      >
        <summary className="cursor-pointer text-sm font-black text-ink">Advanced options</summary>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-ink">
            Currency
            <input
              name="currency"
              defaultValue={subscription?.currency ?? "EUR"}
              className="rounded-xl border border-line px-3 py-2.5 font-normal uppercase outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
            />
          </label>

          {billingCycle === "custom" ? (
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Custom cycle days
              <input
                min="1"
                type="number"
                name="customCycleDays"
                defaultValue={subscription?.customCycleDays ?? ""}
                className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
                placeholder="For example, 45"
              />
            </label>
          ) : null}

        <label className="grid gap-2 text-sm font-semibold text-ink">
          Status
          <select
            name="status"
            defaultValue={subscription?.status ?? "active"}
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
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
            className="rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>

          <label className="grid gap-2 text-sm font-semibold text-ink md:col-span-2">
            Notes
            <textarea
              name="notes"
              defaultValue={subscription?.notes ?? ""}
              className="min-h-28 rounded-xl border border-line px-3 py-2.5 font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
              placeholder="Optional cancellation notes, plan details or reminders."
            />
          </label>
        </div>
      </details>

      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-xl bg-brand px-5 py-2.5 font-bold text-white shadow-sm transition hover:opacity-90">
          {submitLabel}
        </button>
        <p className="text-sm text-muted">Your data stays local. No bank connection.</p>
      </div>
    </form>
  );
}
