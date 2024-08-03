"use client";

import { setDefaultMealPlan } from "@/actions/setDefaultMealPlan";
import { useI18n } from "@/locales/client";
import {
  faCrown,
  faEye,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";
import { TooltipButton } from "../common/TooltipButton";
import { TooltipLink } from "../common/TooltipLink";

type Props = {
  mealPlan: MealPlan;
  mealPlanAssignment: MealPlanAssignment;
};

export const MealPlanActions: FC<Props> = ({
  mealPlan,
  mealPlanAssignment,
}) => {
  const t = useI18n();
  const id = mealPlan.id;

  return (
    <div className="join">
      {!mealPlanAssignment.userDefault && (
        <TooltipButton
          onClick={() => setDefaultMealPlan(id)}
          className="btn btn-primary join-item"
          title={t("manageMealPlans.setAsDefault")}
        >
          <FontAwesomeIcon icon={faCrown} />
        </TooltipButton>
      )}
      <TooltipLink
        href={`mealPlan/${mealPlan.id}`}
        className="btn btn-outline btn-secondary join-item"
        title={t("manageMealPlans.open")}
      >
        <FontAwesomeIcon icon={faEye} />
      </TooltipLink>
      <TooltipButton
        className="btn btn-outline btn-secondary join-item"
        title={t("manageMealPlans.share")}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </TooltipButton>
      <TooltipButton
        className="btn btn-outline btn-error join-item"
        title={
          mealPlanAssignment.userDefault
            ? t("manageMealPlans.disabledDelete")
            : t("manageMealPlans.delete")
        }
        disabled={mealPlanAssignment.userDefault}
      >
        <FontAwesomeIcon icon={faTrash} />
      </TooltipButton>
    </div>
  );
};
