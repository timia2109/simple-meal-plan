import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCalendar } from "../../hooks/useCalendar";
import { MealEntry } from "./MealEntry";

export const Calendar: React.FC = () => {
  const { flatDates, selectedMonth, toLastMonth, toNextMonth } = useCalendar();

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <button
          className="h-10 w-10 rounded-full border bg-gray-500 transition hover:bg-gray-300"
          onClick={toLastMonth}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="p-2 text-white" />
        </button>
        <div className="text-2xl font-extrabold text-white md:text-5xl">
          {selectedMonth.setLocale("DE-de").monthLong} {selectedMonth.year}
        </div>
        <button
          className="h-10 w-10 rounded-full border bg-gray-500 transition hover:bg-gray-300"
          onClick={toNextMonth}
        >
          <FontAwesomeIcon icon={faArrowRight} className="p-2 text-white" />
        </button>
      </div>
      <div className="mt-5 grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {flatDates.map((d) => (
          <MealEntry {...d} key={d.date.toISODate()} />
        ))}
      </div>
    </div>
  );
};
