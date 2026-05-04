import { notFound } from "next/navigation";
import { updateSubscriptionAction } from "@/app/actions";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { prisma } from "@/lib/db";

type EditSubscriptionPageProps = {
  params: {
    id: string;
  };
};

export default async function EditSubscriptionPage({ params }: EditSubscriptionPageProps) {
  const subscription = await prisma.subscription.findUnique({
    where: { id: params.id }
  });

  if (!subscription) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Edit subscription</h1>
        <p className="mt-2 text-muted">Update price, renewal date, status or notes.</p>
      </div>
      <SubscriptionForm
        action={updateSubscriptionAction.bind(null, subscription.id)}
        subscription={subscription}
        submitLabel="Update subscription"
      />
    </div>
  );
}
