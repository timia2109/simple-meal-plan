"use server";

import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { renameMealPlan } from "@/dal/mealPlans/renameMealPlan";
import { getUserId } from "@/functions/user/getUserId";
import { revalidateRoute } from "@/routes";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  mealPlanName: z.string(),
  mealPlanId: z.string().length(25),
});

export async function renameMealPlanAction(formData: FormData) {
  const { mealPlanName, mealPlanId } = schema.parse(formData);
  const user = await getUserId(null);

  const mealPlan = await getMealPlan(user, mealPlanId);
  if (mealPlan === null) {
    throw new Error("Meal plan not found");
  }

  await renameMealPlan(mealPlanId, mealPlanName);
  revalidateRoute("manage");
}
