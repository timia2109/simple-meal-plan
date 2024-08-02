import { getMealPlans } from "@/dal/mealPlans/getMealPlans";
import { getUserId } from "@/functions/user/getUserId";
import { getScopedI18n } from "@/locales/server";
import { MealPlanEntry } from "./MealPlanEntry";

export default async function ManageMealPlansPage() {
  const userId = await getUserId(true);
  const mealPlanAssignments = await getMealPlans(userId);
  const t = await getScopedI18n("manageMealPlans");

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-extrabold">{t("manage")}</h1>
      <div>
        {mealPlanAssignments.map((assignment) => (
          <MealPlanEntry
            key={assignment.mealPlanId}
            assignment={assignment}
            mealPlan={assignment.mealPlan}
          />
        ))}
      </div>
    </div>
  );
}
