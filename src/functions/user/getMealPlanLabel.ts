import { getScopedI18n } from "@/locales/server";
import type { MealPlan } from "@prisma/client";

export async function getMealPlanLabel(mealPlan: MealPlan): Promise<string> {
  if (mealPlan.title.length > 0) return mealPlan.title;

  const text = await getScopedI18n("mealPlan");
  return text("defaultLabel");
}
