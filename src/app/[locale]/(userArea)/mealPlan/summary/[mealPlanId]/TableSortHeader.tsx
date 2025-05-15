"use client";

import {
  OrderByEnum,
  SortDirectionEnum,
} from "@/dal/mealPlans/getMealPlanSummary";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { z } from "zod";

export const TableSortHeader: FC<{
  orderBy: z.infer<typeof OrderByEnum>;
  direction: z.infer<typeof SortDirectionEnum>;
  field: z.infer<typeof OrderByEnum>;
  title: string;
}> = ({ direction, field, orderBy, title }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const navigate = useRouter();

  const isActive = field == orderBy;
  const onClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("orderBy", field);

    let newDirection: z.infer<typeof SortDirectionEnum>;
    if (isActive) {
      if (direction == "asc") newDirection = "desc";
      else newDirection = "asc";
    } else newDirection = direction;

    newSearchParams.set("direction", newDirection);
    navigate.replace(pathName + "?" + newSearchParams.toString());
  };

  return (
    <th
      className={classNames({
        "text-black": isActive,
      })}
    >
      <button
        className="flex items-center justify-start gap-1"
        type="button"
        onClick={onClick}
      >
        {title}
        {isActive && (
          <FontAwesomeIcon
            className="h-6 w-6 shrink-0 stroke-current"
            icon={direction == "asc" ? faCaretUp : faCaretDown}
          />
        )}
      </button>
    </th>
  );
};
