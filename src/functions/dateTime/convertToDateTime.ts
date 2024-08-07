import { DateTime } from "luxon";

export type DateLike = string | Date | DateTime;

/**
 * Converts a more open Date representation to a DateTime object
 * @param dateTime Given DateTime
 * @returns DateTime Object
 */
export const convertToDateTime = (dateTime: DateLike) => {
  if (dateTime instanceof DateTime) return dateTime;
  else if (dateTime instanceof Date) return DateTime.fromJSDate(dateTime);
  else return DateTime.fromISO(dateTime);
};
