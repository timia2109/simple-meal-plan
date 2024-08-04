"use server";

import { setMealPlanAsDefault } from "@/dal/mealPlans/setMealPlanAsDefault";
import { getUserId } from "@/functions/user/getUserId";
import { getLinkWithLocale } from "@/functions/user/redirectWithLocale";
import { revalidatePath } from "next/cache";

export async function setDefaultMealPlanAction(mealPlanId: string) {
  const userId = await getUserId();
  if (userId == null)
    return {
      message: "Login expected",
    };

  await setMealPlanAsDefault(userId, mealPlanId);
  revalidatePath(getLinkWithLocale("/manage"));
}
