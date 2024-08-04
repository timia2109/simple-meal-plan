"use server";

import { createMealPlan } from "@/dal/mealPlans/createMealPlan";
import { getUserId } from "@/functions/user/getUserId";
import { revalidateRoute } from "@/routes";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  mealPlanName: z.string(),
});

export async function createMealPlanAction(formData: FormData) {
  const { mealPlanName } = schema.parse(formData);
  const user = await getUserId(null);

  await createMealPlan(user, mealPlanName, false);
  revalidateRoute("manage");
}
