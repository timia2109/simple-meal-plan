import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealEntry } from "@prisma/client";
import classNames from "classnames";
import { DateTime } from "luxon";
import { createRef, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

type MealEntryProps = {
  dateTime: DateTime;
  isCurrentMonth: boolean;
  entry: MealEntry;
  isLoading: boolean;
};

/** Component for a MealEntry */
export const MealEntryComponent: React.FC<MealEntryProps> = ({
  dateTime,
  isCurrentMonth,
  entry,
  isLoading,
}) => {
  // Focus State
  const [hasFocus, setHasFocus] = useState(false);
  // Input Value
  const [mealValue, setMealValue] = useState("");
  // State if the current day is today (Next issue)
  const [isToday, setIsToday] = useState(false);
  // Ref to textarea
  const textFieldRef = createRef<HTMLTextAreaElement>();

  const mutation = trpc.mealPlan.submitMealEntry.useMutation();

  // Set via Effect (Next issue)
  useEffect(() => {
    setIsToday(dateTime.hasSame(DateTime.now(), "day"));
  }, [dateTime]);

  // Keep Server State in Sync with current Value
  useEffect(() => {
    setMealValue(entry?.meal ?? "");
  }, [entry?.meal]);

  // Focus the Element, when the div is clicked
  const onClick = () => {
    textFieldRef.current?.focus();
  };

  // Upload the content on blur
  const onBlur = () => {
    setHasFocus(false);
    if (mealValue !== entry?.meal) {
      mutation.mutate({
        date: dateTime.toJSDate(),
        meal: mealValue,
        mealPlanId: entry.mealPlanId,
      });
    }
  };

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
        "border-blue-400": !hasFocus && isCurrentMonth,
        "border-gray-400": !hasFocus && !isCurrentMonth,
        "border-dashed": !hasFocus && !isToday,
        "border-2 border-black": hasFocus,
        "border-2 border-solid border-red-400": isToday && !hasFocus,
        ...texts,
      })}
    >
      <div className="flex justify-between">
        <div className="overflow-hidden text-xs font-extrabold lg:text-lg">
          {dateTime.weekdayShort} {dateTime.day}
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
        onFocus={() => setHasFocus(true)}
        onBlur={onBlur}
        className={classNames({
          "w-full flex-grow resize-none overflow-hidden break-words bg-transparent text-start text-xs text-white focus:border-none focus:outline-none lg:text-base":
            true,
          ...texts,
        })}
      />
    </div>
  );
};
