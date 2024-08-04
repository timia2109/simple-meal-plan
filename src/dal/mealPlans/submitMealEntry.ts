import { prisma } from "@/server/db";
import { type MealEntry } from "@prisma/client";

type Props = {
  mealPlanId: string;
  date: Date;
  meal: string;
};

/** Creates or updates a meal entry */
export async function submitMealEntry({ date, mealPlanId, meal }: Props) {
  if (meal.trim().length === 0) {
    try {
      const data = await prisma.mealEntry.delete({
        where: {
          date_mealPlanId: {
            date,
            mealPlanId,
          },
        },
      });
      return data;
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

  const result = await prisma.mealEntry.upsert({
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
