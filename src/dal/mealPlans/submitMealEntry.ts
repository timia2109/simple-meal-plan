import { db } from "@/server/db";
import { mealEntries, type MealEntry } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

type Props = {
  mealPlanId: string;
  date: Date;
  meal: string;
};

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

      const mockItem: MealEntry = {
        createdAt: new Date(),
        date,
        meal: "",
        mealPlanId,
        updatedAt: new Date(),
      };
      return mockItem;
    } catch {
      // If there is no element, return a mock element
      const mockItem: MealEntry = {
        createdAt: new Date(),
        date,
        meal: "",
        mealPlanId,
        updatedAt: new Date(),
      };
      return mockItem;
    }
  }

  const result = await db
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
    })
    .then(() =>
      db
        .select()
        .from(mealEntries)
        .where(
          and(
            eq(mealEntries.date, date),
            eq(mealEntries.mealPlanId, mealPlanId)
          )
        )
        .limit(1)
        .then((r) => r[0]!)
    );

  return result;
}
