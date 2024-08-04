"use client";

import { renameMealPlanAction } from "@/actions/renameMealPlanAction";
import { useScopedI18n } from "@/locales/client";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan } from "@prisma/client";
import type { FC } from "react";
import { createRef } from "react";
import { FormModal } from "../common/Modal";
import { TooltipButton } from "../common/TooltipButton";

type Props = {
  mealPlan: MealPlan;
};

export const RenameMealPlanButton: FC<Props> = ({ mealPlan }) => {
  const dialogRef = createRef<HTMLDialogElement>();
  const t = useScopedI18n("manageMealPlans");

  return (
    <>
      <TooltipButton
        className="btn btn-outline btn-secondary join-item"
        title={t("rename")}
        onClick={() => dialogRef.current?.showModal()}
      >
        <FontAwesomeIcon icon={faEdit} />
      </TooltipButton>
      <FormModal
        modalRef={dialogRef}
        cancelContent={t("cancel")}
        heading={t("renameMealPlan")}
        submitContent={t("rename")}
        action={renameMealPlanAction}
      >
        <label className="input input-bordered flex items-center gap-2">
          {t("name")}
          <input
            name="mealPlanName"
            type="text"
            className="grow"
            defaultValue={mealPlan.title}
          />
        </label>

        <input type="hidden" name="mealPlanId" value={mealPlan.id} />
      </FormModal>
    </>
  );
};
