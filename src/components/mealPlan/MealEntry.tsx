"use client";
import { updateMealEntry } from "@/actions/updateMealEntry";
import type { MealEntry } from "@prisma/client";
import classNames from "classnames";
import { DateTime } from "luxon";
import { createRef, useState } from "react";

type MealEntryProps = {
  isoDate: string;
  isCurrentMonth: boolean;
  entry?: MealEntry;
  mealPlanId: string;
  isToday: boolean;
};

/** Component for a MealEntry */
export const MealEntryComponent: React.FC<MealEntryProps> = ({
  isoDate,
  isCurrentMonth,
  entry,
  mealPlanId,
  isToday,
}) => {
  const dateTime = DateTime.fromISO(isoDate);
  // Focus State
  const [hasFocus, setHasFocus] = useState(false);
  // Ref to textarea
  const textFieldRef = createRef<HTMLTextAreaElement>();
  // Ref to form
  const formRef = createRef<HTMLFormElement>();

  // Set via Effect (Next issue)
  /*useEffect(() => {
    setIsToday(dateTime.hasSame(DateTime.now(), "day"));
  }, [dateTime]);*/

  // Focus the Element, when the div is clicked
  const onClick = () => {
    textFieldRef.current?.focus();
  };

  // Upload the content on blur
  const onBlur = () => {
    setHasFocus(false);
    formRef.current?.requestSubmit();
  };

  // Helper for text color
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
      <form action={updateMealEntry} ref={formRef}>
        <input type="hidden" name="date" value={isoDate} />
        <input type="hidden" name="mealPlanId" value={mealPlanId} />

        <div className="flex justify-between">
          <div className="overflow-hidden text-xs font-extrabold lg:text-lg">
            {dateTime.weekdayShort} {dateTime.day}
          </div>
        </div>

        <textarea
          defaultValue={entry?.meal}
          ref={textFieldRef}
          onFocus={() => setHasFocus(true)}
          name="meal"
          onBlur={onBlur}
          className={classNames({
            "w-full flex-grow resize-none overflow-hidden break-words bg-transparent text-start text-xs text-black focus:border-none focus:outline-none lg:text-base":
              true,
            ...texts,
          })}
        />
      </form>
    </div>
  );
};
