"use client";

import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { useI18n } from "@/locales/client";
import {
  faCrown,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";

type Props = {
  assignment: MealPlanAssignment;
  mealPlan: MealPlan;
};

export const MealPlanEntry: FC<Props> = ({ assignment, mealPlan }) => {
  const t = useI18n();

  return (
    <div className="flex justify-between border-e border-s border-t border-accent p-3 first:rounded-t last:rounded-b last:border-b">
      <h2>
        <span className="text-xl font-bold">
          {getMealPlanLabel(mealPlan, t)}
        </span>
        {assignment.userDefault && (
          <span className="badge badge-primary ms-1">
            <FontAwesomeIcon icon={faCrown} className="me-1" />
            {t("manageMealPlans.primary")}
          </span>
        )}
      </h2>
      <div className="join">
        {!assignment.userDefault && (
          <button
            className="btn btn-primary join-item"
            title={t("manageMealPlans.setAsDefault")}
          >
            <FontAwesomeIcon icon={faCrown} />
          </button>
        )}
        <button
          className="btn btn-outline btn-secondary join-item"
          title={t("manageMealPlans.share")}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
        <button
          className="btn btn-outline btn-error join-item"
          title={t("manageMealPlans.delete")}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
