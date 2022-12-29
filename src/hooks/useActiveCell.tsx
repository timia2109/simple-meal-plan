import { DateTime, type DurationLike } from "luxon";
import { useReducer, type Dispatch } from "react";

export type DateSelectionCommand =
  | "Up"
  | "Down"
  | "Left"
  | "Right"
  | undefined
  | DateTime;

export type ChangeSelectedDate = Dispatch<DateSelectionCommand>;

export function useDateSelection(minDate: DateTime, maxDate: DateTime) {
  /**
   * Adds the duration to the date if the new date is inside the range
   * @param source Source Date
   * @param unit Unit to add
   * @returns The changed date
   */
  const customAdd = (source: DateTime | undefined, unit: DurationLike) => {
    if (source === undefined) return undefined;

    const target = source.plus(unit);
    if (target < minDate) return source;
    if (target > maxDate) return source;
    return target;
  };

  const selectionReducer = (
    current: DateTime | undefined,
    command: DateSelectionCommand
  ) => {
    if (command === undefined) return undefined;

    if (command instanceof DateTime) return command;
    else {
      let duration: DurationLike;
      switch (command) {
        case "Left":
          duration = { day: -1 };
          break;
        case "Up":
          duration = { week: -1 };
          break;
        case "Right":
          duration = { day: 1 };
          break;
        case "Down":
          duration = { week: 1 };
          break;
      }
      return customAdd(current, duration);
    }
  };

  // Current selected Date
  const [selectedDate, changeSelectedDate] = useReducer(
    selectionReducer,
    undefined
  );
  return { selectedDate, changeSelectedDate };
}
