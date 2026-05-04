export const billingCycles = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
  { value: "custom", label: "Custom days" }
] as const;

export const statuses = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "cancelled", label: "Cancelled" }
] as const;

export const categories = [
  { value: "streaming", label: "Streaming" },
  { value: "music", label: "Music" },
  { value: "software", label: "Software" },
  { value: "gaming", label: "Gaming" },
  { value: "cloud", label: "Cloud" },
  { value: "fitness", label: "Fitness" },
  { value: "finance", label: "Finance" },
  { value: "utilities", label: "Utilities" },
  { value: "other", label: "Other" }
] as const;

export const billingCycleValues = billingCycles.map((cycle) => cycle.value);
export const statusValues = statuses.map((status) => status.value);
export const categoryValues = categories.map((category) => category.value);

export function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}
