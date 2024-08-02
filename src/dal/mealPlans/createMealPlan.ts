import { prisma } from "@/server/db/client";

/**
 * Creates a empty MealPlan and assign it to the user
 * @param client Prisma Client
 * @param userId Current user id
 * @param title Title of the MealPlan (optional)
 * @returns The created MealPlan
 */
export async function createMealPlan(
  userId: string,
  title = "",
  isDefault = false
) {
  const mealPlan = await prisma.mealPlan.create({
    data: {
      title,
    },
  });

  await prisma.mealPlanAssignment.create({
    data: {
      userId: userId,
      userDefault: isDefault,
      mealPlanId: mealPlan.id,
    },
  });

  return mealPlan;
}
