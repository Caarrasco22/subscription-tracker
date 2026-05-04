"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { calculateNextRenewalDate } from "@/lib/subscription-utils";
import { parseSubscriptionForm } from "@/lib/validation";

function revalidateApp() {
  revalidatePath("/");
  revalidatePath("/subscriptions");
  revalidatePath("/upcoming");
}

export async function createSubscriptionAction(formData: FormData) {
  const data = parseSubscriptionForm(formData);
  await prisma.subscription.create({ data });
  revalidateApp();
  redirect("/subscriptions");
}

export async function updateSubscriptionAction(id: string, formData: FormData) {
  const data = parseSubscriptionForm(formData);
  await prisma.subscription.update({
    where: { id },
    data
  });
  revalidateApp();
  redirect("/subscriptions");
}

export async function deleteSubscriptionAction(id: string) {
  await prisma.subscription.delete({
    where: { id }
  });
  revalidateApp();
}

export async function updateSubscriptionStatusAction(id: string, status: string) {
  await prisma.subscription.update({
    where: { id },
    data: { status }
  });
  revalidateApp();
}

export async function advanceRenewalAction(id: string) {
  const subscription = await prisma.subscription.findUniqueOrThrow({
    where: { id }
  });

  await prisma.subscription.update({
    where: { id },
    data: {
      nextRenewalDate: calculateNextRenewalDate(
        subscription.nextRenewalDate,
        subscription.billingCycle,
        subscription.customCycleDays
      )
    }
  });

  revalidateApp();
}
