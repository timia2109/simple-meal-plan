"use server";

import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { submitMealEntry } from "@/dal/mealPlans/submitMealEntry";
import { getUserId } from "@/functions/user/getUserId";
import { DateTime } from "luxon";

export async function updateMealEntry(
  date: string,
  mealPlanId: string,
  meal: string,
) {
  const userId = await getUserId();
  if (userId == null) return { success: false };

  const mealPlan = await getMealPlan(userId, mealPlanId);
  if (mealPlan == null) return;

  await submitMealEntry({
    mealPlanId,
    date: DateTime.fromSQL(date, {
      zone: "UTC",
    }).toJSDate(),
    meal,
  });
}
