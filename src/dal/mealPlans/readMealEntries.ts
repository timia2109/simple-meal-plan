import type { TimeRange } from "../../types/TimeRange";
import {
  withMealListAccessGuard,
  type MealPlanOperationProps,
} from "./mealListAccessGuard";

type Props = MealPlanOperationProps & {
  range: TimeRange;
};

/**
 * Reads all entries of the MealPlan (if the user is allowed)
 * @param param0 Params
 * @returns The elements on this mealplan
 */
export const readMealEntries = withMealListAccessGuard(
  async ({ client, mealPlanId, range }: Props) =>
    client.mealEntry.findMany({
      where: {
        mealPlanId,
        date: {
          gte: range.begin,
          lte: range.end,
        },
      },
    })
);
