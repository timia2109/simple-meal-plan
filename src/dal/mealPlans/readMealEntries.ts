import { db } from "@/server/db";
import { mealEntries } from "@/server/db/schema";
import { toDateRange, type DateLikeRange } from "../../types/TimeRange";
import { eq, and, gte, lte } from "drizzle-orm";

type Props = {
  mealPlanId: string;
  range: DateLikeRange;
};

/**
 * Reads all entries of the MealPlan (if the user is allowed)
 * @param param0 Params
 * @returns The elements on this mealplan
 */
export async function readMealEntries({ mealPlanId, range }: Props) {
  const { begin, end } = toDateRange(range);
  return db
    .select()
    .from(mealEntries)
    .where(
      and(
        eq(mealEntries.mealPlanId, mealPlanId),
        gte(mealEntries.date, begin),
        lte(mealEntries.date, end)
      )
    );
}
