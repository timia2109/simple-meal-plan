"use client";

import { useI18n } from "@/locales/client";
import {
  faCrown,
  faEye,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  mealPlan: MealPlan;
  mealPlanAssignment: MealPlanAssignment;
};

export const MealPlanActions: FC<Props> = ({
  mealPlan,
  mealPlanAssignment,
}) => {
  const t = useI18n();

  return (
    <div className="join">
      {!mealPlanAssignment.userDefault && (
        <button
          className="btn btn-primary join-item"
          title={t("manageMealPlans.setAsDefault")}
        >
          <FontAwesomeIcon icon={faCrown} />
        </button>
      )}
      <Link
        href={`mealPlan/${mealPlan.id}`}
        className="btn btn-outline btn-secondary join-item"
        title={t("manageMealPlans.open")}
      >
        <FontAwesomeIcon icon={faEye} />
      </Link>
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
  );
};
