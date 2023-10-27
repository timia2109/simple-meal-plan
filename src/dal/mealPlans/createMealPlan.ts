import type { PrismaClient } from "@prisma/client";

/**
 * Creates a empty MealPlan and assign it to the user
 * @param client Prisma Client
 * @param userId Current user id
 * @param title Title of the MealPlan (optional)
 * @returns The created MealPlan
 */
export const createMealPlan = async (
  client: PrismaClient,
  userId: string,
  title = "",
  isDefault = false
) => {
  const mealPlan = await client.mealPlan.create({
    data: {
      title,
    },
  });

  await client.mealPlanAssignment.create({
    data: {
      userId: userId,
      userDefault: isDefault,
      mealPlanId: mealPlan.id,
    },
  });

  return mealPlan;
};
