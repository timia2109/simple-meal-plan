import { MealPlanCalender } from "@/components/mealEntries/MealPlanCalender";
import { MealPlanComponent } from "@/components/mealPlan/MealPlanComponent";
import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { createKeyDate } from "@/functions/dateTime/createKeyDate";
import { getUserId } from "@/functions/user/getUserId";
import { notFound } from "next/navigation";

type Props = {
  params: {
    selector: string[];
  };
};

export default async function MealPlanPage({ params }: Props) {
  const user = await getUserId(true);
  const [mealPlanId, year, month] = params.selector ?? [];

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
