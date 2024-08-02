import type { User } from "next-auth";

import { createMealPlan } from "../../dal/mealPlans/createMealPlan";

/** Creates a meal plan for the current user */
export const onCreateUser: (message: { user: User }) => Promise<void> = async ({
  user,
}) => {
  await createMealPlan(user.id!, "", true);
};
