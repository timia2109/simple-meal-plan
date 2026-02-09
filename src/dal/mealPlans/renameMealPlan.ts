import { db } from "@/server/db";
import { mealPlans } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function renameMealPlan(mealPlanId: string, title: string) {
  await db
    .update(mealPlans)
    .set({ title })
    .where(eq(mealPlans.id, mealPlanId));

  return db
    .select()
    .from(mealPlans)
    .where(eq(mealPlans.id, mealPlanId))
    .limit(1)
    .then((r) => r[0]!);
}
