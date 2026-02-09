import { db } from "@/server/db";
import { mealPlanAssignments, mealPlans } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

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
  await db.transaction(async (tx) => {
    const deletedElement = await tx
      .select()
      .from(mealPlanAssignments)
      .where(
        and(
          eq(mealPlanAssignments.mealPlanId, mealPlanId),
          eq(mealPlanAssignments.userId, userId)
        )
      )
      .limit(1)
      .then((r) => r[0]);

    if (!deletedElement) {
      throw new Error("Assignment not found");
    }

    await tx
      .delete(mealPlanAssignments)
      .where(
        and(
          eq(mealPlanAssignments.mealPlanId, mealPlanId),
          eq(mealPlanAssignments.userId, userId)
        )
      );

    // Abort if it's the default
    if (deletedElement.userDefault && !force) {
      throw new Error("Cannot leave default meal plan");
    }

    // Check if there is any remaining member
    const remainingAssignments = await tx
      .select()
      .from(mealPlanAssignments)
      .where(eq(mealPlanAssignments.mealPlanId, mealPlanId));

    // Delete if this list has no participants
    if (remainingAssignments.length === 0) {
      await tx.delete(mealPlans).where(eq(mealPlans.id, mealPlanId));
    }
  });
}
