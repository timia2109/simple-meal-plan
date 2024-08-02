"use server";
import { readMealEntries } from "@/dal/mealPlans/readMealEntries";
import type { DateLike } from "@/functions/dateTime/convertToDateTime";
import { convertToDateTime } from "@/functions/dateTime/convertToDateTime";
import { enumerateDates } from "@/functions/dateTime/enumerateDates";
import { getMonthRange } from "@/functions/dateTime/getMonth";
import { getLinkWithLocale } from "@/functions/user/redirectWithLocale";
import { getCurrentLocale } from "@/locales/server";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { MealPlan } from "@prisma/client";
import { DateTime } from "luxon";
import { MealEntryComponent } from "./MealEntry";
import { MoveMonthButton } from "./MoveMonthButton";

type Props = {
  mealPlan: MealPlan;
  keyDate: DateLike;
};

const useMonthMovementLink = (mealPlanId: string, keyDate: DateTime) => {
  return (factor: -1 | 1) => {
    const begin =
      factor == -1 ? keyDate.minus({ month: 1 }) : keyDate.plus({ month: 1 });
    const linkTemplate = `/mealPlan/${mealPlanId}/${begin.year}/${begin.month}`;
    return getLinkWithLocale(linkTemplate);
  };
};

export async function MealPlanContainer({ mealPlan, keyDate }: Props) {
  const locale = getCurrentLocale();
  const keyDateTime = convertToDateTime(keyDate).setLocale(locale);
  const range = getMonthRange(keyDateTime);

  const entries = await readMealEntries({
    mealPlanId: mealPlan.id,
    range,
  });

  const getEntryFor = (date: DateTime) => {
    return entries.find((e) =>
      date.hasSame(DateTime.fromJSDate(e.date), "day")
    );
  };

  const monthMovementLink = useMonthMovementLink(mealPlan.id, keyDateTime);
  const dates = [...enumerateDates(range)];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <MoveMonthButton icon={faArrowLeft} href={monthMovementLink(-1)} />

        <div className="text-2xl font-extrabold md:text-5xl">
          {keyDateTime.monthLong} {keyDateTime.year}
        </div>

        <MoveMonthButton icon={faArrowRight} href={monthMovementLink(1)} />
      </div>
      <div className="mt-5 grid w-full grid-cols-7">
        {dates.map((d) => (
          <MealEntryComponent
            entry={getEntryFor(d)}
            isoDate={d.toISO()!}
            isCurrentMonth={d.month === keyDateTime.month}
            mealPlanId={mealPlan.id}
            key={d.toISODate()}
            isToday={d.hasSame(DateTime.now(), "day")}
          />
        ))}
      </div>
    </div>
  );
}
