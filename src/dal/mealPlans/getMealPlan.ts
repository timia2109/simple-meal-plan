import { db } from "@/server/db";
import { mealPlans, mealPlanAssignments } from "@/server/db/schema";
import { eq, and, inArray } from "drizzle-orm";

/**
 * Gets the given mealplan if this user is allowed
 * @param userId Id of current user
 * @param mealPlanId Id of the mealplan or null if the default should used
 * @returns The MealPlan if the user is allowed (else null)
 */
export async function getMealPlan(userId: string, mealPlanId: string | null) {
  if (mealPlanId === null) {
    const assignments = await db
      .select()
      .from(mealPlanAssignments)
      .where(
        and(
          eq(mealPlanAssignments.userId, userId),
          eq(mealPlanAssignments.userDefault, true)
        )
      )
      .limit(1);

    if (assignments.length === 0) return null;

    return db
      .select()
      .from(mealPlans)
      .where(eq(mealPlans.id, assignments[0]!.mealPlanId))
      .limit(1)
      .then((r) => r[0] ?? null);
  }

  const assignments = await db
    .select()
    .from(mealPlanAssignments)
    .where(
      and(
        eq(mealPlanAssignments.userId, userId),
        eq(mealPlanAssignments.mealPlanId, mealPlanId)
      )
    )
    .limit(1);

  if (assignments.length === 0) return null;

  return db
    .select()
    .from(mealPlans)
    .where(eq(mealPlans.id, mealPlanId))
    .limit(1)
    .then((r) => r[0] ?? null);
}
