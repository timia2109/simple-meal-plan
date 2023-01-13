import { type MealEntry } from "@prisma/client";
import {
  withMealListAccessGuard,
  type MealPlanOperationProps,
} from "./mealListAccessGuard";

type Props = MealPlanOperationProps & {
  date: Date;
  meal: string;
};

/** Creates or updates a meal entry */
export const submitMealEntry = withMealListAccessGuard(
  async ({ client, date, mealPlanId, meal }: Props) => {
    if (meal.trim().length === 0) {
      try {
        const data = await client.mealEntry.delete({
          where: {
            date_mealPlanId: {
              date,
              mealPlanId,
            },
          },
        });
        return data;
      } catch (e) {
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

    const result = await client.mealEntry.upsert({
      create: {
        date,
        meal,
        mealPlanId,
      },
      update: {
        meal,
      },
      where: {
        date_mealPlanId: {
          date,
          mealPlanId,
        },
      },
    });

    return result;
  }
);
