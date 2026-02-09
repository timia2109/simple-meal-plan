import { db } from "@/server/db";
import { mealPlanAssignments } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Returns the default Meal Plan for this user
 * @param client db instance
 * @param userId UserId
 * @returns The Id for the default meal plan
 */
export const getDefaultMealPlanId = async (
  client: typeof db,
  userId: string
) => {
  const result = await client
    .select({ mealPlanId: mealPlanAssignments.mealPlanId })
    .from(mealPlanAssignments)
    .where(
      and(
        eq(mealPlanAssignments.userId, userId),
        eq(mealPlanAssignments.userDefault, true)
      )
    )
    .limit(1)
    .then((r) => r[0]);

  return result?.mealPlanId;
};
