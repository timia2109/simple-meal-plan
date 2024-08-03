import { MealPlanEntry } from "@/components/mealPlan/MealPlanEntry";
import { getMealPlans } from "@/dal/mealPlans/getMealPlans";
import { getUserId } from "@/functions/user/getUserId";
import { getScopedI18n } from "@/locales/server";

export default async function ManageMealPlansPage() {
  const userId = await getUserId(true);
  const mealPlanAssignments = await getMealPlans(userId);
  const t = await getScopedI18n("manageMealPlans");

  return (
    <div className="container mx-auto">
      <h1 className="mb-1 text-3xl font-extrabold">{t("manage")}</h1>
      <title>{t("manage")}</title>
      <div>
        {mealPlanAssignments.map((assignment) => (
          <MealPlanEntry
            key={assignment.mealPlanId}
            mealPlanAssignment={assignment}
            mealPlan={assignment.mealPlan}
            withActions
            withUsers
          />
        ))}
      </div>
    </div>
  );
}
