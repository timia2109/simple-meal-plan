import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { DateTime } from "luxon";
import React, { createRef, useEffect, useMemo, useState } from "react";
import type {
  ChangeSelectedDate,
  DateSelectionCommand,
} from "../../hooks/useActiveCell";
import { trpc } from "../../utils/trpc";

type MealEntryProps = {
  date: DateTime;
  isCurrentMonth: boolean;
  dispatch: ChangeSelectedDate;
  isActive: boolean;
};

export const MealEntry: React.FC<MealEntryProps> = ({
  date,
  isCurrentMonth,
  dispatch,
  isActive,
}) => {
  // Input Value
  const [mealValue, setMealValue] = useState("");
  // Ref to textarea
  const textFieldRef = createRef<HTMLTextAreaElement>();

  const mutation = trpc.mealPlan.setMealPlanFor.useMutation();
  const query = trpc.mealPlan.getMealPlanFor.useQuery({
    date: date.toISO(),
  });

  const isToday = useMemo(
    () =>
      DateTime.now().startOf("day").valueOf() == date.startOf("day").valueOf(),
    [date]
  );

  // Keep Server State in Sync with current Value
  useEffect(() => {
    setMealValue(query.data?.meal ?? "");
  }, [query.data?.meal]);

  // Focus the Element, when the div is clicked
  const onClick = () => {
    dispatch(date);
  };

  useEffect(() => {
    if (isActive) {
      textFieldRef.current?.focus();
    } else {
      if (mealValue !== query.data?.meal) {
        mutation.mutate({
          meal: mealValue,
          date: date.toISO(),
        });
      }
    }
  }, [isActive]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let command: DateSelectionCommand | null = null;
    switch (e.key) {
      case "ArrowLeft":
        command = "Left";
        break;
      case "ArrowRight":
        command = "Right";
        break;
      case "ArrowDown":
        command = "Down";
        break;
      case "ArrowUp":
        command = "Up";
        break;
    }
    if (command !== null) {
      e.preventDefault();
      dispatch(command);
    }
  };

  // Is anything loading
  const isLoading = query.isLoading || query.isFetching || mutation.isLoading;

  // Helper for textcolor
  const texts = {
    "text-black": isCurrentMonth,
    "text-gray-400": !isCurrentMonth,
  };

  return (
    <div
      onClick={onClick}
      className={classNames({
        "box-border h-[30vh] w-full cursor-text border bg-white p-1 transition md:h-32":
          true,
        "flex flex-col justify-between": true,
        "border-blue-400": !isActive && isCurrentMonth,
        "border-gray-400": !isActive && !isCurrentMonth,
        "border-dashed": !isActive && !isToday,
        "border-2 border-black": isActive,
        "border-2 border-solid border-red-400": isToday && !isActive,
        ...texts,
      })}
    >
      <div className="flex justify-between">
        <div className="overflow-hidden text-xs font-extrabold lg:text-lg">
          {date.setLocale("de-DE").weekdayShort} {date.day}
        </div>
        <div className="h-full w-5">
          {isLoading && (
            <FontAwesomeIcon icon={faSync} className="animate-spin" />
          )}
        </div>
      </div>

      <textarea
        disabled={isLoading}
        value={mealValue}
        onChange={(e) => setMealValue(e.currentTarget.value)}
        ref={textFieldRef}
        onFocus={() => dispatch(date)}
        onKeyDown={onKeyDown}
        className={classNames({
          "w-full flex-grow resize-none overflow-hidden break-words bg-transparent text-start text-xs text-white focus:border-none focus:outline-none lg:text-base":
            true,
          ...texts,
        })}
      />
    </div>
  );
};
