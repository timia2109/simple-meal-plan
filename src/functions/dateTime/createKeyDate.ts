import { DateTime } from "luxon";

/**
 * Creates the key date (if any value is undefined, the current datetime is used)
 * @param year Year (or undefined)
 * @param month Month (or undefined)
 * @returns Key Date
 */
export function createKeyDate(
  year: string | undefined,
  month: string | undefined
) {
  const nYear = year ? parseInt(year) : DateTime.now().year;
  const nMonth = month ? parseInt(month) : DateTime.now().month;

  return DateTime.fromObject({ year: nYear, month: nMonth, day: 1 });
}
