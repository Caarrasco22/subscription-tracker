import type { Subscription } from "@prisma/client";

export type UpcomingGroups = {
  next7Days: Subscription[];
  next30Days: Subscription[];
  later: Subscription[];
};

const dayMs = 24 * 60 * 60 * 1000;

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function addMonthsClamped(date: Date, months: number) {
  const nextDate = new Date(date);
  const originalDay = nextDate.getDate();
  const targetMonth = nextDate.getMonth() + months;
  const targetYear = nextDate.getFullYear() + Math.floor(targetMonth / 12);
  const normalizedTargetMonth = ((targetMonth % 12) + 12) % 12;
  const targetDay = Math.min(originalDay, daysInMonth(targetYear, normalizedTargetMonth));

  nextDate.setDate(1);
  nextDate.setFullYear(targetYear, normalizedTargetMonth, targetDay);

  return nextDate;
}

export function startOfToday(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateMonthlyEquivalent(subscription: Pick<Subscription, "price" | "billingCycle" | "customCycleDays">) {
  switch (subscription.billingCycle) {
    case "weekly":
      return (subscription.price * 52) / 12;
    case "monthly":
      return subscription.price;
    case "quarterly":
      return subscription.price / 3;
    case "yearly":
      return subscription.price / 12;
    case "custom": {
      const days = subscription.customCycleDays;
      if (!days || days < 1) {
        return 0;
      }
      return (subscription.price * 365) / days / 12;
    }
    default:
      return subscription.price;
  }
}

export function calculateYearlyEquivalent(subscription: Pick<Subscription, "price" | "billingCycle" | "customCycleDays">) {
  return calculateMonthlyEquivalent(subscription) * 12;
}

export function calculateNextRenewalDate(
  currentDate: Date,
  billingCycle: string,
  customCycleDays?: number | null
) {
  switch (billingCycle) {
    case "weekly":
      return addDays(currentDate, 7);
    case "monthly":
      return addMonthsClamped(currentDate, 1);
    case "quarterly":
      return addMonthsClamped(currentDate, 3);
    case "yearly":
      return addMonthsClamped(currentDate, 12);
    case "custom":
      return addDays(currentDate, Math.max(customCycleDays ?? 1, 1));
    default:
      return addMonthsClamped(currentDate, 1);
  }
}

export function daysUntil(date: Date) {
  const today = startOfToday();
  const target = startOfToday(date);
  return Math.ceil((target.getTime() - today.getTime()) / dayMs);
}

export function groupUpcomingRenewals(subscriptions: Subscription[]): UpcomingGroups {
  const active = subscriptions
    .filter((subscription) => subscription.status === "active")
    .sort((a, b) => a.nextRenewalDate.getTime() - b.nextRenewalDate.getTime());

  return {
    next7Days: active.filter((subscription) => {
      const days = daysUntil(subscription.nextRenewalDate);
      return days >= 0 && days <= 7;
    }),
    next30Days: active.filter((subscription) => {
      const days = daysUntil(subscription.nextRenewalDate);
      return days > 7 && days <= 30;
    }),
    later: active.filter((subscription) => daysUntil(subscription.nextRenewalDate) > 30)
  };
}

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function summarizeSubscriptions(subscriptions: Subscription[]) {
  const active = subscriptions.filter((subscription) => subscription.status === "active");
  const monthlyTotal = active.reduce(
    (total, subscription) => total + calculateMonthlyEquivalent(subscription),
    0
  );
  const yearlyTotal = active.reduce(
    (total, subscription) => total + calculateYearlyEquivalent(subscription),
    0
  );
  const nextRenewal = active
    .slice()
    .sort((a, b) => a.nextRenewalDate.getTime() - b.nextRenewalDate.getTime())[0];
  const mostExpensive = active
    .slice()
    .sort((a, b) => calculateMonthlyEquivalent(b) - calculateMonthlyEquivalent(a))[0];

  const categoryTotals = active.reduce<Record<string, number>>((totals, subscription) => {
    totals[subscription.category] =
      (totals[subscription.category] ?? 0) + calculateMonthlyEquivalent(subscription);
    return totals;
  }, {});

  const mostExpensiveCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return {
    active,
    monthlyTotal,
    yearlyTotal,
    nextRenewal,
    mostExpensive,
    mostExpensiveCategory,
    upcoming: groupUpcomingRenewals(subscriptions),
    projectedYearlyWithCancelledExcluded: yearlyTotal
  };
}
