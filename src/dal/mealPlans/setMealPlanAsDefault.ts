import { db } from "@/server/db";
import { mealPlanAssignments } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Sets a MealPlan as default for a User
 * @param userId Affected UserId
 * @param mealPlanId Affected MealPlanId
 */
export async function setMealPlanAsDefault(userId: string, mealPlanId: string) {
  await db.transaction(async (tx) => {
    await tx
      .update(mealPlanAssignments)
      .set({ userDefault: false })
      .where(eq(mealPlanAssignments.userId, userId));

    await tx
      .update(mealPlanAssignments)
      .set({ userDefault: true })
      .where(
        and(
          eq(mealPlanAssignments.mealPlanId, mealPlanId),
          eq(mealPlanAssignments.userId, userId)
        )
      );
  });
}
