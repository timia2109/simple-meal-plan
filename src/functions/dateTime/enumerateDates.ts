import type { DateTime } from "luxon";
import type { DateLikeRange } from "../../types/TimeRange";

type DateInstance<TProps extends object> = {
  dateTime: DateTime;
} & TProps;

/**
 * Enumerates all Dates in the Range
 * @param range The range
 * @param appender A function to increase the object by properties
 */
export function* enumerateDates<TAppend extends object = Record<never, never>>(
  range: DateLikeRange,
  appender?: (date: DateTime) => TAppend
) {
  for (
    let current = range.begin;
    current <= range.end;
    current = current.plus({ day: 1 })
  ) {
    let data = {
      dateTime: current,
    } as Partial<DateInstance<TAppend>>;

    if (appender !== undefined) {
      data = { ...data, ...appender(current) };
    }

    yield data as DateInstance<TAppend>;
  }
}
