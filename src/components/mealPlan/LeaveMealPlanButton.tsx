"use client";

import { leaveMealPlanAction } from "@/actions/leaveMealPlanAction";
import { useScopedI18n } from "@/locales/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";
import { createRef } from "react";
import { FormModal } from "../common/Modal";
import { TooltipButton } from "../common/TooltipButton";

type Props = {
  mealPlanAssignment: MealPlanAssignment;
  mealPlan: MealPlan;
};

export const LeaveMealPlanButton: FC<Props> = ({
  mealPlan,
  mealPlanAssignment,
}) => {
  const dialogRef = createRef<HTMLDialogElement>();
  const t = useScopedI18n("manageMealPlans");
  const tModal = useScopedI18n("confirmModal");

  return (
    <>
      <FormModal
        cancelContent={tModal("cancel")}
        heading={t("leaveTitle")}
        modalRef={dialogRef}
        submitContent={tModal("confirm")}
        action={leaveMealPlanAction}
      >
        <p className="py-4">{t("leaveMessage", { name: mealPlan.title })}</p>
        <input type="hidden" name="mealPlanId" value={mealPlan.id} />
      </FormModal>

      <TooltipButton
        className="btn btn-outline btn-error join-item"
        onClick={() => dialogRef.current?.showModal()}
        title={
          mealPlanAssignment.userDefault ? t("disabledDelete") : t("delete")
        }
        disabled={mealPlanAssignment.userDefault}
      >
        <FontAwesomeIcon icon={faTrash} />
      </TooltipButton>
    </>
  );
};
