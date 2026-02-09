import { db } from "@/server/db";
import { mealPlanAssignments, mealPlans } from "@/server/db/schema";
import { eq, asc } from "drizzle-orm";

/**
 * Gets all mealplans for this user
 * @param userId User Id of the current user
 * @returns List of available Meal Plans
 */
export async function getMealPlans(userId: string) {
  const assignments = await db
    .select({
      mealPlanId: mealPlanAssignments.mealPlanId,
      userId: mealPlanAssignments.userId,
      userDefault: mealPlanAssignments.userDefault,
      mealPlan: mealPlans,
    })
    .from(mealPlanAssignments)
    .innerJoin(mealPlans, eq(mealPlanAssignments.mealPlanId, mealPlans.id))
    .where(eq(mealPlanAssignments.userId, userId))
    .orderBy(asc(mealPlans.title));

  return assignments;
}
