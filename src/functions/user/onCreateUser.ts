import type { User } from "next-auth";

import { getMealPlans } from "@/dal/mealPlans/getMealPlans";
import { createMealPlan } from "../../dal/mealPlans/createMealPlan";

/** Creates a meal plan for the current user */
export const onCreateUser: (message: { user: User }) => Promise<void> = async ({
  user,
}) => {
  const mealPlanAssignments = await getMealPlans(user.id!);

  if (mealPlanAssignments.length == 0) await createMealPlan(user.id!, "", true);
};
