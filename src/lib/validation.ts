import { billingCycleValues, categoryValues, statusValues } from "./constants";
import { parseDateInput } from "./subscription-utils";

export type SubscriptionInput = {
  name: string;
  price: number;
  currency: string;
  billingCycle: string;
  customCycleDays: number | null;
  nextRenewalDate: Date;
  category: string;
  status: string;
  reminderDaysBefore: number;
  notes: string | null;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function parseSubscriptionForm(formData: FormData): SubscriptionInput {
  const name = getString(formData, "name");
  const price = Number(getString(formData, "price"));
  const currency = getString(formData, "currency") || "EUR";
  const billingCycle = getString(formData, "billingCycle");
  const customCycleDaysRaw = getString(formData, "customCycleDays");
  const nextRenewalDateRaw = getString(formData, "nextRenewalDate");
  const category = getString(formData, "category") || "other";
  const status = getString(formData, "status") || "active";
  const reminderDaysBefore = Number(getString(formData, "reminderDaysBefore") || 3);
  const notes = getString(formData, "notes");

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Price must be a valid positive number.");
  }

  if (!billingCycleValues.includes(billingCycle as never)) {
    throw new Error("Billing cycle is invalid.");
  }

  const customCycleDays = customCycleDaysRaw ? Number(customCycleDaysRaw) : null;
  if (billingCycle === "custom" && (!customCycleDays || customCycleDays < 1)) {
    throw new Error("Custom billing cycle requires at least 1 day.");
  }

  if (!nextRenewalDateRaw) {
    throw new Error("Next renewal date is required.");
  }

  if (!categoryValues.includes(category as never)) {
    throw new Error("Category is invalid.");
  }

  if (!statusValues.includes(status as never)) {
    throw new Error("Status is invalid.");
  }

  if (!Number.isFinite(reminderDaysBefore) || reminderDaysBefore < 0) {
    throw new Error("Reminder days must be zero or higher.");
  }

  return {
    name,
    price,
    currency: currency.toUpperCase(),
    billingCycle,
    customCycleDays: billingCycle === "custom" ? customCycleDays : null,
    nextRenewalDate: parseDateInput(nextRenewalDateRaw),
    category,
    status,
    reminderDaysBefore,
    notes: notes || null
  };
}
