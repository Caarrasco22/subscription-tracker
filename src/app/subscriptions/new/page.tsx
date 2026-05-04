import { createSubscriptionAction } from "@/app/actions";
import { SubscriptionForm } from "@/components/SubscriptionForm";

export default function NewSubscriptionPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Add subscription</h1>
        <p className="mt-2 text-muted">Add only what you need. You can edit it later.</p>
      </div>
      <SubscriptionForm action={createSubscriptionAction} submitLabel="Save subscription" />
    </div>
  );
}
