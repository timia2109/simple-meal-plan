"use server";

import { leaveMealPlan } from "@/dal/mealPlans/leaveMealPlan";
import { getUserId } from "@/functions/user/getUserId";
import { revalidateRoute } from "@/routes";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  mealPlanId: z.string().max(25),
});

export async function leaveMealPlanAction(formData: FormData) {
  const { mealPlanId } = schema.parse(formData);
  const user = await getUserId();
  if (user == null) return;

  await leaveMealPlan(mealPlanId, user);
  revalidateRoute("manage");
}
