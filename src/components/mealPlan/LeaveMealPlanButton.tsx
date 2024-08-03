"use client";

import { leaveMealPlanAction } from "@/actions/leaveMealPlanAction";
import { useScopedI18n } from "@/locales/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { TooltipButton } from "../common/TooltipButton";

type Props = {
  mealPlanAssignment: MealPlanAssignment;
};

export const LeaveMealPlanButton: FC<Props> = ({ mealPlanAssignment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useScopedI18n("manageMealPlans");

  const wrap = useCallback(
    (action: () => void) => () => {
      setIsOpen(false);
      action();
    },
    []
  );

  return (
    <>
      <TooltipButton
        className="btn btn-outline btn-error join-item"
        onClick={() => setIsOpen(true)}
        title={
          mealPlanAssignment.userDefault ? t("disabledDelete") : t("delete")
        }
        disabled={mealPlanAssignment.userDefault}
      >
        <FontAwesomeIcon icon={faTrash} />
      </TooltipButton>
      {isOpen && (
        <ConfirmationModal
          onConfirm={wrap(() =>
            leaveMealPlanAction(mealPlanAssignment.mealPlanId)
          )}
          onCancel={wrap(() => {})}
        >
          <h3 className="text-lg font-bold">{t("leaveTitle")}</h3>
          <p className="py-4">{t("leaveMessage")}</p>
        </ConfirmationModal>
      )}
    </>
  );
};
