import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

export type DateEntity = {
  date: DateTime;
  isCurrentMonth: boolean;
};

const buildWeekArray = ({
  monday,
  month,
}: {
  monday: DateTime;
  month: number;
}) => {
  const entities: DateEntity[] = [];
  for (let i = 0; i < 7; i++) {
    const d = monday.plus({ day: i });

    entities.push({ date: d, isCurrentMonth: d.month == month });
  }
  return entities;
};

const buildDayRowsArray = ({ startPoint }: { startPoint: DateTime }) => {
  const rows: DateEntity[][] = [];

  const firstMonday = startPoint.startOf("week");

  for (let i = 0; i < 6; i++) {
    const currentSection = firstMonday.plus({ week: i });
    rows.push(
      buildWeekArray({
        monday: currentSection,
        month: startPoint.month,
      })
    );
  }

  return rows;
};

const factor = { month: 1 };

export const useCalendar = () => {
  // Static for Next
  const [selectedMonth, setSelectedMonth] = useState(
    DateTime.fromSQL("2022-12-01")
  );

  const toNextMonth = () => setSelectedMonth((s) => s.plus(factor));
  const toLastMonth = () => setSelectedMonth((s) => s.minus(factor));

  const dates = useMemo(
    () => buildDayRowsArray({ startPoint: selectedMonth }),
    [selectedMonth]
  );

  const flatDates = useMemo(() => dates.flatMap((e) => e), [dates]);

  // Effect to set current mounth (Next issue)
  useEffect(() => {
    const currentMonth = DateTime.now().startOf("month");
    setSelectedMonth(currentMonth);
  }, []);

  return {
    toNextMonth,
    toLastMonth,
    selectedMonth,
    dates,
    flatDates,
  };
};
