"use server";
import { readMealEntries } from "@/dal/mealPlans/readMealEntries";
import type { DateLike } from "@/functions/dateTime/convertToDateTime";
import { convertToDateTime } from "@/functions/dateTime/convertToDateTime";
import { enumerateDates } from "@/functions/dateTime/enumerateDates";
import { getMonthRange } from "@/functions/dateTime/getMonth";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getCalendarLayout } from "@/functions/user/preferences";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getRoute } from "@/routes";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { MealPlan } from "@prisma/client";
import classNames from "classnames";
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
    return getRoute("mealPlan", mealPlanId, begin.year, begin.month);
  };
};

export async function MealPlanCalender({ mealPlan, keyDate }: Props) {
  const locale = getCurrentLocale();
  const keyDateTime = convertToDateTime(keyDate).setLocale(locale);
  const range = getMonthRange(keyDateTime);
  const t = await getI18n();

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
  const label = await getMealPlanLabel(mealPlan, t);
  const title = label + " | " + t("landing.title");
  const calendarLayout = getCalendarLayout();

  return (
    <div className="w-full">
      <title>{title}</title>
      <div className="flex justify-between rounded-b border-b border-e border-s border-accent p-1 pb-3">
        <MoveMonthButton icon={faArrowLeft} href={monthMovementLink(-1)} />

        <div className="text-2xl font-extrabold md:text-5xl">
          {keyDateTime.monthLong} {keyDateTime.year}
        </div>

        <MoveMonthButton icon={faArrowRight} href={monthMovementLink(1)} />
      </div>
      <div
        className={classNames({
          "mt-5 grid w-full": true,
          "grid-cols-7": calendarLayout === "FIXED",
          "grid-cols-1 md:grid-cols-7": calendarLayout === "RESPONSIVE",
        })}
      >
        {dates.map((d) => (
          <MealEntryComponent
            entry={getEntryFor(d)}
            isoDate={d.toISO()!}
            isCurrentMonth={d.month === keyDateTime.month}
            mealPlanId={mealPlan.id}
            key={d.toISODate()}
            isToday={d.hasSame(DateTime.now(), "day")}
            layout={calendarLayout}
          />
        ))}
      </div>
    </div>
  );
}
