import type { DateTimeRange } from "../../types/TimeRange";
import { convertToDateTime, type DateLike } from "./convertToDateTime";

/** Weeks that the calendar shows */
export const calendarShowWeeks = 6;

/**
 * Calculates the Date Range for the calendar
 * @param startTime Start Time
 * @returns The date range for the calendar
 */
export const getMonthRange: (startTime: DateLike) => DateTimeRange = (
  startTime
) => {
  const startDate = convertToDateTime(startTime);

  const begin = startDate.startOf("month").startOf("week");
  const end = begin.plus({ weeks: calendarShowWeeks }).endOf("week");

  return { begin, end };
};
