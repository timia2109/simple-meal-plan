"use server";

import { leaveMealPlan } from "@/dal/mealPlans/leaveMealPlan";
import { getUserId } from "@/functions/user/getUserId";
import { revalidateRoute } from "@/routes";

export async function leaveMealPlanAction(mealPlanId: string) {
  const user = await getUserId();
  if (user == null) return;

  await leaveMealPlan(mealPlanId, user);
  revalidateRoute("manage");
}
