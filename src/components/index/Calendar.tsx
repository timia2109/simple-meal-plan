import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan } from "@prisma/client";
import { useCalendar } from "../../hooks/useCalendar";
import { useMealPlan } from "../../hooks/useMealPlan";
import { toDateRange } from "../../types/TimeRange";
import { MealEntryComponent } from "./MealEntry";

type Props = {
  startTime: string;
  mealPlan: MealPlan;
};
export const Calendar: React.FC<Props> = ({ startTime, mealPlan }) => {
  const { dates, selectedMonth, toLastMonth, toNextMonth, begin, end } =
    useCalendar(startTime);

  const { getEntryFor, isLoading } = useMealPlan(
    mealPlan.id,
    toDateRange({ begin, end })
  );

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <button
          className="h-10 w-10 rounded-full border bg-gray-500 transition hover:bg-gray-300"
          onClick={toLastMonth}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="p-2 text-white" />
        </button>
        <div className="text-2xl font-extrabold text-black md:text-5xl">
          {selectedMonth.monthLong} {selectedMonth.year}
        </div>
        <button
          className="h-10 w-10 rounded-full border bg-gray-500 transition hover:bg-gray-300"
          onClick={toNextMonth}
        >
          <FontAwesomeIcon icon={faArrowRight} className="p-2 text-white" />
        </button>
      </div>
      <div className="mt-5 grid w-full grid-cols-7">
        {dates.map((d) => (
          <MealEntryComponent
            {...d}
            isLoading={isLoading}
            entry={getEntryFor(d.dateTime)}
            key={d.dateTime.toISODate()}
          />
        ))}
      </div>
    </div>
  );
};
