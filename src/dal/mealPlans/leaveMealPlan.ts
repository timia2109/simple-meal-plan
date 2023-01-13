import { withMealListAccessGuard } from "./mealListAccessGuard";

/**
 * Removes a User from a meal plan
 */
export const leaveMealPlan = withMealListAccessGuard(
  async ({ client, mealPlanId, userId }) => {
    // Must exist, the guard will care
    await client.mealPlanAssignment.delete({
      where: {
        mealPlanId_userId: {
          mealPlanId,
          userId,
        },
      },
    });

    // Check if there is any remaining member
    const assignmentCount = await client.mealPlanAssignment.count({
      where: {
        mealPlanId,
      },
    });

    // Delete if this list has no participent
    if (assignmentCount === 0) {
      await client.mealPlan.delete({
        where: {
          id: mealPlanId,
        },
      });
    }
  }
);
