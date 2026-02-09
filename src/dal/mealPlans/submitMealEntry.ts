import { db } from "@/server/db";
import { mealEntries, type MealEntry } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

type Props = {
  mealPlanId: string;
  date: Date;
  meal: string;
};

function createMockMealEntry(date: Date, mealPlanId: string): MealEntry {
  return {
    createdAt: new Date(),
    date,
    meal: "",
    mealPlanId,
    updatedAt: new Date(),
  };
}

/** Creates or updates a meal entry */
export async function submitMealEntry({ date, mealPlanId, meal }: Props) {
  if (meal.trim().length === 0) {
    try {
      const existing = await db
        .select()
        .from(mealEntries)
        .where(
          and(
            eq(mealEntries.date, date),
            eq(mealEntries.mealPlanId, mealPlanId)
          )
        )
        .limit(1)
        .then((r) => r[0]);

      if (existing) {
        await db
          .delete(mealEntries)
          .where(
            and(
              eq(mealEntries.date, date),
              eq(mealEntries.mealPlanId, mealPlanId)
            )
          );
        return existing;
      }

      return createMockMealEntry(date, mealPlanId);
    } catch {
      return createMockMealEntry(date, mealPlanId);
    }
  }

  await db
    .insert(mealEntries)
    .values({
      date,
      meal,
      mealPlanId,
    })
    .onDuplicateKeyUpdate({
      set: {
        meal,
        updatedAt: new Date(),
      },
    });

  const result = await db
    .select()
    .from(mealEntries)
    .where(
      and(eq(mealEntries.date, date), eq(mealEntries.mealPlanId, mealPlanId))
    )
    .limit(1)
    .then((r) => r[0]);

  if (!result) {
    throw new Error("Failed to create or update meal entry");
  }

  return result;
}
