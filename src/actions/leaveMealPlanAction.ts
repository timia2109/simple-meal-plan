"use server";

import { leaveMealPlan } from "@/dal/mealPlans/leaveMealPlan";
import { getUserId } from "@/functions/user/getUserId";
import { getLinkWithLocale } from "@/functions/user/redirectWithLocale";
import { revalidatePath } from "next/cache";

export async function leaveMealPlanAction(mealPlanId: string) {
  const user = await getUserId();
  if (user == null) return;

  await leaveMealPlan(mealPlanId, user);
  revalidatePath(getLinkWithLocale("/manage"));
}
