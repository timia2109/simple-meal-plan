import { db } from "@/server/db";
import { mealPlanAssignments } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Gets all mealplans for this user
 * @param userId User Id of the current user
 * @returns List of available Meal Plans
 */
export function getMealPlans(userId: string) {
  return db.query.mealPlanAssignments.findMany({
    where: eq(mealPlanAssignments.userId, userId),
    with: {
      mealPlan: true,
    },
  });
}
