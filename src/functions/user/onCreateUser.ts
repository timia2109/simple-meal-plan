import type { User } from "next-auth";

import { createMealPlan } from "../../dal/mealPlans/createMealPlan";
import { prisma } from "../../server/db/client";

/** Creates a meal plan for the current user */
export const onCreateUser: (message: { user: User }) => Promise<void> = async ({
  user,
}) => {
  const client = prisma;
  await createMealPlan(client, user.id!, "", true);
};
