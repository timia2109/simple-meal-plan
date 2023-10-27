import { toDateRange, type DateLikeRange } from "../../types/TimeRange";
import {
  withMealListAccessGuard,
  type MealPlanOperationProps,
} from "./mealListAccessGuard";

type Props = MealPlanOperationProps & {
  range: DateLikeRange;
};

/**
 * Reads all entries of the MealPlan (if the user is allowed)
 * @param param0 Params
 * @returns The elements on this mealplan
 */
export const readMealEntries = withMealListAccessGuard(
  async ({ client, mealPlanId, range }: Props) => {
    const { begin, end } = toDateRange(range);
    return client.mealEntry.findMany({
      where: {
        mealPlanId,
        date: {
          gte: begin,
          lte: end,
        },
      },
    });
  }
);
