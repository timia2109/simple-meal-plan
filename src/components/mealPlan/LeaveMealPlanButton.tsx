"use client";

import { leaveMealPlanAction } from "@/actions/leaveMealPlanAction";
import { useScopedI18n } from "@/locales/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import type { FC } from "react";
import { createRef } from "react";
import { Heading } from "../common/Heading";
import { Modal } from "../common/Modal";
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
      <Modal modalRef={dialogRef}>
        <Heading>{t("leaveTitle")}</Heading>
        <p className="py-4">{t("leaveMessage", { name: mealPlan.title })}</p>
        <form method="dialog">
          <input type="hidden" name="mealPlanId" value={mealPlan.id} />
          <div className="modal-action">
            <button
              formAction={leaveMealPlanAction}
              type="submit"
              onClick={() => dialogRef.current?.close()}
              className="btn btn-primary "
            >
              {tModal("confirm")}
            </button>
            <button className="btn btn-outline btn-secondary " type="submit">
              {tModal("cancel")}
            </button>
          </div>
        </form>
      </Modal>
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
