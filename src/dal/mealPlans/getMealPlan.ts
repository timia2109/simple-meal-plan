import { prisma } from "@/server/db";

/**
 * Gets the given mealplan if this user is allowed
 * @param client Prisma Client
 * @param userId Id of current user
 * @param mealPlanId Id of the mealplan or null if the default should used
 * @returns The MealPlan if the user is allowed (else null)
 */
export function getMealPlan(userId: string, mealPlanId: string | null) {
  if (mealPlanId === null) {
    return prisma.mealPlan.findFirst({
      where: {
        mealPlanAssignments: {
          some: {
            userId: userId,
            userDefault: true,
          },
        },
      },
    });
  }

  return prisma.mealPlan.findFirst({
    where: {
      mealPlanAssignments: {
        some: {
          userId: userId,
        },
      },
      id: mealPlanId,
    },
  });
}
