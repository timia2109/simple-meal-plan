"use client";

import { setCalendarLayoutAction } from "@/actions/setCalendarLayoutAction";
import type { CalendarLayout } from "@/functions/user/preferences";
import { useScopedI18n } from "@/locales/client";
import classNames from "classnames";
import type { FC } from "react";

const CalendarPreference: FC<{
  currentValue: CalendarLayout;
  value: CalendarLayout;
  label: string;
}> = ({ value, label, currentValue }) => (
  <button
    onClick={() => setCalendarLayoutAction(value)}
    className={classNames({
      "btn join-item": true,
      "btn-active": value == currentValue,
    })}
  >
    {label}
  </button>
);

export const CalendarLayoutSelection: FC<{ current: CalendarLayout }> = ({
  current,
}) => {
  const t = useScopedI18n("profile");

  return (
    <div className="join join-vertical">
      <CalendarPreference
        currentValue={current}
        value="RESPONSIVE"
        label={t("calendarLayoutResponsive")}
      />
      <CalendarPreference
        currentValue={current}
        value="FIXED"
        label={t("calendarLayoutFixed")}
      />
    </div>
  );
};
