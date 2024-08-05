import { prisma } from "@/server/db";

/**
 * Gets all mealplans for this user
 * @param client Prisma Client
 * @param userId User Id of the current user
 * @returns List of available Meal Plans
 */
export function getMealPlans(userId: string) {
  return prisma.mealPlanAssignment.findMany({
    where: {
      userId,
    },
    include: { mealPlan: true },
    orderBy: {
      mealPlan: {
        title: "asc",
      },
    },
  });
}
