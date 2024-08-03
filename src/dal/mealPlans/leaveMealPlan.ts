import { prisma } from "@/server/db/client";

/**
 * Remove a user from a meal plan and delete the meal plan if there are no participants left
 * @param mealPlanId Meal Plan Id
 * @param userId User Id
 * @param force Should the user be removed from the meal plan even if it's the default
 */
export async function leaveMealPlan(
  mealPlanId: string,
  userId: string,
  force = false
) {
  await prisma.$transaction(async (tx) => {
    const deletedElement = await tx.mealPlanAssignment.delete({
      where: {
        mealPlanId_userId: {
          mealPlanId,
          userId,
        },
      },
    });

    // Abort if it's the default
    if (deletedElement.userDefault && !force) {
      throw new Error("Cannot leave default meal plan");
    }

    // Check if there is any remaining member
    const assignmentCount = await tx.mealPlanAssignment.count({
      where: {
        mealPlanId,
      },
    });

    // Delete if this list has no participants
    if (assignmentCount === 0) {
      await tx.mealPlan.delete({
        where: {
          id: mealPlanId,
        },
      });
    }
  });
}
