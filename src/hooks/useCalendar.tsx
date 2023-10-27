import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { enumerateDates } from "../functions/dateTime/enumerateDates";
import { getMonthRange } from "../functions/dateTime/getMonth";

export type DateEntity = {
  date: DateTime;
  isCurrentMonth: boolean;
};

const buildDaysArray = (start: DateTime) => {
  const range = getMonthRange(start);
  const month = start.month;
  return {
    ...range,
    dates: [
      ...enumerateDates(range, (d) => ({ isCurrentMonth: d.month == month })),
    ],
  };
};

const factor = { month: 1 };

const getDate = (startTime: string) => {
  const dt = DateTime.fromSQL(startTime);
  return dt.toUTC().plus({ minutes: dt.offset });
};

export const useCalendar = (startTime: string) => {
  const [selectedMonth, setSelectedMonth] = useState(getDate(startTime));

  const toNextMonth = () => setSelectedMonth((s) => s.plus(factor));
  const toLastMonth = () => setSelectedMonth((s) => s.minus(factor));

  const { dates, begin, end } = useMemo(
    () => buildDaysArray(selectedMonth),
    [selectedMonth]
  );

  return {
    toNextMonth,
    toLastMonth,
    selectedMonth,
    dates,
    begin,
    end,
  };
};
