import type { PrismaClient } from "@prisma/client";

/**
 * Returns the default Meal Plan for this user
 * @param client PrismaClient
 * @param userId UserId
 * @returns The Id for the default meal plan
 */
export const getDefaultMealPlanId = (client: PrismaClient, userId: string) => {
  return client.mealPlanAssignment
    .findFirst({
      where: {
        userId,
        userDefault: true,
      },
      select: {
        mealPlanId: true,
      },
    })
    .then((e) => e?.mealPlanId);
};
