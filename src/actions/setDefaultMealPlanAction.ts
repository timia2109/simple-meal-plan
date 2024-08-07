"use server";

import { setMealPlanAsDefault } from "@/dal/mealPlans/setMealPlanAsDefault";
import { getUserId } from "@/functions/user/getUserId";
import { revalidateRoute } from "@/routes";

export async function setDefaultMealPlanAction(mealPlanId: string) {
  const userId = await getUserId();
  if (userId == null)
    return {
      message: "Login expected",
    };

  await setMealPlanAsDefault(userId, mealPlanId);
  revalidateRoute("manage");
}
