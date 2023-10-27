import type { PrismaClient } from "@prisma/client";

/**
 * Gets the given mealplan if this user is allowed
 * @param client Prisma Client
 * @param userId Id of current user
 * @param mealPlanId Id of the mealplan
 * @returns The MealPlan if the user is allowed (else null)
 */
export const getMealPlan = (
  client: PrismaClient,
  userId: string,
  mealPlanId: string
) => {
  return client.mealPlan.findFirst({
    where: {
      mealPlanAssignments: {
        some: {
          userId: userId,
        },
      },
      id: mealPlanId,
    },
  });
};
