import { toDateTimeRange, type DateLikeRange } from "../../types/TimeRange";

/**
 * Enumerates all Dates in the Range
 * @param range The range
 */
export function* enumerateDates(range: DateLikeRange) {
  const dtRange = toDateTimeRange(range);

  for (
    let current = dtRange.begin;
    current <= dtRange.end;
    current = current.plus({ day: 1 })
  ) {
    yield current;
  }
}
