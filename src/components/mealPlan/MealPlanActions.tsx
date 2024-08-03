"use client";

import { setDefaultMealPlan } from "@/actions/setDefaultMealPlan";
import { useI18n } from "@/locales/client";
import { faCrown, faEye, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";
import { TooltipButton } from "../common/TooltipButton";
import { TooltipLink } from "../common/TooltipLink";
import { LeaveMealPlanButton } from "./LeaveMealPlanButton";

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
      <TooltipLink
        href={`mealPlan/invite/${mealPlan.id}`}
        className="btn btn-outline btn-secondary join-item"
        title={t("manageMealPlans.share")}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </TooltipLink>
      <LeaveMealPlanButton mealPlanAssignment={mealPlanAssignment} />
    </div>
  );
};
