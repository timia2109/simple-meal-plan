import { DateTime } from "luxon";
import { notFound } from "next/navigation";

/**
 * Creates the key date (if any value is undefined, the current datetime is used)
 * @param stringYear Year (or undefined)
 * @param stringMonth Month (or undefined)
 * @returns Key Date
 */
export function createKeyDate(
  stringYear: string | undefined,
  stringMonth: string | undefined
) {
  const year = stringYear ? parseInt(stringYear) : DateTime.now().year;
  const month = stringMonth ? parseInt(stringMonth) : DateTime.now().month;

  const date = DateTime.fromObject({ year, month, day: 1 });
  if (date.isValid) return date;

  notFound();
}
