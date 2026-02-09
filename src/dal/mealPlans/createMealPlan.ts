import { db } from "@/server/db";
import { mealPlans, mealPlanAssignments } from "@/server/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

/**
 * Creates a empty MealPlan and assign it to the user
 * @param userId Current user id
 * @param title Title of the MealPlan (optional)
 * @returns The created MealPlan
 */
export async function createMealPlan(
  userId: string,
  title = "",
  isDefault = false
) {
  const mealPlanId = nanoid(25);

  await db.insert(mealPlans).values({
    id: mealPlanId,
    title,
  });

  await db.insert(mealPlanAssignments).values({
    userId: userId,
    userDefault: isDefault,
    mealPlanId: mealPlanId,
  });

  return db
    .select()
    .from(mealPlans)
    .where(eq(mealPlans.id, mealPlanId))
    .limit(1)
    .then((r) => r[0]!);
}
