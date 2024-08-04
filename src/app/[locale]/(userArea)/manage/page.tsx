import { Heading } from "@/components/common/Heading";
import { MealPlanComponent } from "@/components/mealPlan/MealPlanComponent";
import { getMealPlans } from "@/dal/mealPlans/getMealPlans";
import { getUserId } from "@/functions/user/getUserId";
import { getScopedI18n } from "@/locales/server";

export default async function ManageMealPlansPage() {
  const userId = await getUserId(true);
  const mealPlanAssignments = await getMealPlans(userId);
  const t = await getScopedI18n("manageMealPlans");

  return (
    <div className="container mx-auto">
      <Heading>{t("manage")}</Heading>
      <title>{t("manage")}</title>
      <div>
        {mealPlanAssignments.map((assignment) => (
          <MealPlanComponent
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
