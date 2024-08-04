import { prisma } from "@/server/db";
import { toDateRange, type DateLikeRange } from "../../types/TimeRange";

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
  return prisma.mealEntry.findMany({
    where: {
      mealPlanId,
      date: {
        gte: begin,
        lte: end,
      },
    },
  });
}
