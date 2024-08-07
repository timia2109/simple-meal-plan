import type { useI18n } from "@/locales/client";
import type { MealPlan } from "@prisma/client";

export async function getMealPlanLabel(
  mealPlan: MealPlan,
  t: ReturnType<typeof useI18n>
): Promise<string> {
  if (mealPlan.title.length > 0) return mealPlan.title;

  return t("mealPlan.defaultLabel");
}
