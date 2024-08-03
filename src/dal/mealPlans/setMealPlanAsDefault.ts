import { prisma } from "@/server/db/client";

/**
 * Sets a MealPlan as default for a User
 * @param userId Affected UserId
 * @param mealPlanId Affected MealPlanId
 */
export async function setMealPlanAsDefault(userId: string, mealPlanId: string) {
  await prisma.$transaction([
    prisma.mealPlanAssignment.updateMany({
      where: {
        userId,
      },
      data: {
        userDefault: false,
      },
    }),
    prisma.mealPlanAssignment.update({
      where: {
        mealPlanId_userId: {
          mealPlanId,
          userId,
        },
      },
      data: {
        userDefault: true,
      },
    }),
  ]);
}
