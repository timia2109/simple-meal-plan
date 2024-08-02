"use client";
import { updateMealEntry } from "@/actions/updateMealEntry";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  return (
    <div
      onClick={onClick}
      className={classNames({
        "box-border h-[30vh] w-full cursor-text border bg-base-100 p-1 transition md:h-32":
          true,
        "flex flex-col justify-between": true,
        "border-info": !hasFocus && isCurrentMonth,
        "border-neutral-300": !hasFocus && !isCurrentMonth,
        "border-dashed": !hasFocus && !isToday,
        "border-2 border-primary": hasFocus,
        "border-2 border-solid": isToday && !hasFocus,
        "text-base-content": isCurrentMonth,
        "text-neutral-400": !isCurrentMonth,
      })}
    >
      <form action={updateMealEntry} ref={formRef} className="h-100">
        <input type="hidden" name="date" value={dateTime.toSQLDate()!} />
        <input type="hidden" name="mealPlanId" value={mealPlanId} />

        <div className="flex justify-between">
          <div className="overflow-hidden text-xs font-extrabold lg:text-lg">
            {dateTime.weekdayShort} {dateTime.day}
          </div>
          <div className="h-full w-5">
            {isToday && <FontAwesomeIcon icon={faCalendar} />}
          </div>
        </div>

        <textarea
          defaultValue={entry?.meal}
          ref={textFieldRef}
          onFocus={() => setHasFocus(true)}
          name="meal"
          onBlur={onBlur}
          className={classNames({
            "h-100 w-full flex-grow resize-none overflow-hidden break-words bg-transparent text-start text-xs focus:border-none focus:outline-none lg:text-base":
              true,
            "text-base-content": isCurrentMonth,
            "text-neutral-400": !isCurrentMonth,
          })}
        />
      </form>
    </div>
  );
};
