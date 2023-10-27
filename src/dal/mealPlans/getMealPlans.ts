import type { PrismaClient } from "@prisma/client";

/**
 * Gets all mealplans for this user
 * @param client Prisma Client
 * @param userId User Id of the current user
 * @returns List of available Meal Plans
 */
export const getMealPlans = (client: PrismaClient, userId: string) => {
  return client.mealPlan.findMany({
    where: {
      mealPlanAssignments: {
        some: {
          userId: userId,
        },
      },
    },
  });
};
