"use server";

import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { submitMealEntry } from "@/dal/mealPlans/submitMealEntry";
import { getUserId } from "@/functions/user/getUserId";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  date: z.string().date(),
  mealPlanId: z.string(),
  meal: z.string(),
});

export async function updateMealEntryAction(formData: FormData) {
  const data = schema.safeParse(formData);
  if (!data.success) {
    console.error(data.error);
    return;
  }

  const userId = await getUserId();
  if (userId == null) return;

  const { date, meal, mealPlanId } = data.data;

  const mealPlan = await getMealPlan(userId, mealPlanId);
  if (mealPlan == null) return;

  await submitMealEntry({
    mealPlanId,
    date: new Date(date),
    meal,
  });
}
