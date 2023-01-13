import type { EventCallbacks } from "next-auth";

import { createMealPlan } from "../../dal/mealPlans/createMealPlan";
import { prisma } from "../../server/db/client";

/** Creates a meal plan for the current user */
export const onCreateUser: EventCallbacks["createUser"] = async ({ user }) => {
  const client = prisma;
  await createMealPlan(client, user.id);
};
