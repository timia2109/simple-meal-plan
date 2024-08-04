"use client";

import { setDefaultMealPlanAction } from "@/actions/setDefaultMealPlanAction";
import { useI18n } from "@/locales/client";
import { faCrown, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";
import { TooltipButton } from "../common/TooltipButton";
import { TooltipLink } from "../common/TooltipLink";
import { LeaveMealPlanButton } from "./LeaveMealPlanButton";
import { RenameMealPlanButton } from "./RenameMealPlanButton";

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
    <div className="join last:justify-self-end">
      {!mealPlanAssignment.userDefault && (
        <TooltipButton
          onClick={() => setDefaultMealPlanAction(id)}
          className="btn btn-primary join-item"
          title={t("manageMealPlans.setAsDefault")}
        >
          <FontAwesomeIcon icon={faCrown} />
        </TooltipButton>
      )}
      <RenameMealPlanButton mealPlan={mealPlan} />
      <TooltipLink
        href={`mealPlan/invite/${mealPlan.id}`}
        className="btn btn-outline btn-secondary join-item"
        title={t("manageMealPlans.share")}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </TooltipLink>
      <LeaveMealPlanButton
        mealPlan={mealPlan}
        mealPlanAssignment={mealPlanAssignment}
      />
    </div>
  );
};
