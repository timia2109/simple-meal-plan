import { MealPlanCalender } from "@/components/mealEntries/MealPlanCalender";
import { MealPlanComponent } from "@/components/mealPlan/MealPlanComponent";
import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { createKeyDate } from "@/functions/dateTime/createKeyDate";
import { getUserId } from "@/functions/user/getUserId";
import { Page } from "@/PageProps";
import { notFound } from "next/navigation";


const MealPlanPage: Page<{selector: string[]}> = async ({params}) => {
  const user = await getUserId(true);
  const {selector} = await params;
  const [mealPlanId, year, month] = selector ?? [];

  const mealPlan = await getMealPlan(user, mealPlanId ?? null);
  if (mealPlan == null) notFound();

  const keyDate = createKeyDate(year, month);

  return (
    <div className="container mx-auto">
      <MealPlanComponent mealPlan={mealPlan} withUsers />
      <MealPlanCalender keyDate={keyDate} mealPlan={mealPlan} />
    </div>
  );
}

export default MealPlanPage;