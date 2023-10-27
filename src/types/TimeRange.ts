import type { DateTime } from "luxon";
import {
  convertToDateTime,
  type DateLike,
} from "../functions/dateTime/convertToDateTime";

/** A range of time */
export type DateTimeRange = {
  begin: DateTime;
  end: DateTime;
};

export type DateLikeRange = {
  begin: DateLike;
  end: DateLike;
};

export type DateRange = {
  begin: Date;
  end: Date;
};

export const toDateTimeRange: (
  dateLikeRange: DateLikeRange
) => DateTimeRange = ({ begin, end }) => ({
  begin: convertToDateTime(begin),
  end: convertToDateTime(end),
});

export const toDateRange: (dateLikeRange: DateLikeRange) => DateRange = ({
  begin,
  end,
}) => ({
  begin: convertToDateTime(begin).toJSDate(),
  end: convertToDateTime(end).toJSDate(),
});
